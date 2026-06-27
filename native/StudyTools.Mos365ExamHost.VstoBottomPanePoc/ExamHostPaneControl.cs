using System;
using System.Drawing;
using System.Windows.Forms;

namespace StudyTools.Mos365ExamHost
{
    /// <summary>
    /// MOS 底部极简训练控制台 — R33 灰黑四层布局。
    ///
    /// 四层结构：
    ///   A. 顶部状态栏（训练名 + 状态 + 计时）
    ///   B. 进度导航栏（プロジェクト / タスク）
    ///   C. 主任务题干区（日文主层 + 中文辅助 + 作業場所）
    ///   D. 操作栏（採点する / 終了する）
    ///
    /// 状态合约：
    ///   task_metadata_ready → 立即渲染题干，不等 attach
    ///   connecting         → 只更新状态标，不覆盖题干
    ///   ready              → 只更新状态标，不清空题干
    ///   failed             → 保留题干，只更新状态标
    ///   ended              → 保留最后题干，操作变不可用
    ///
    /// Generation 防护：ShowTask(gen) 检查 gen == _renderGeneration。
    /// ShowTaskFromMetadata 不需要 gen，因为来自 workbook 本地读取。
    /// </summary>
    public class ExamHostPaneControl : UserControl
    {
        // ── 配色令牌（灰黒极简）
        private static readonly Color BgMain    = Color.FromArgb(0x15, 0x17, 0x1A); // #15171A
        private static readonly Color BgLayer   = Color.FromArgb(0x20, 0x23, 0x28); // #202328
        private static readonly Color BgSection = Color.FromArgb(0x28, 0x2C, 0x32); // #282C32
        private static readonly Color Divider   = Color.FromArgb(0x34, 0x38, 0x3E); // #34383E
        private static readonly Color TextMain  = Color.FromArgb(0xF3, 0xF4, 0xF6); // #F3F4F6
        private static readonly Color TextSub   = Color.FromArgb(0xA9, 0xAF, 0xB8); // #A9AFB8
        private static readonly Color TextWeak  = Color.FromArgb(0x72, 0x79, 0x84); // #727984
        private static readonly Color BtnMain   = Color.FromArgb(0x3B, 0x3F, 0x46); // #3B3F46
        private static readonly Color BtnExit   = Color.FromArgb(0x46, 0x3B, 0x3B); // #463B3B
        private static readonly Color BtnDisabledBg  = Color.FromArgb(0x28, 0x2C, 0x32);
        private static readonly Color ColCorrect = Color.FromArgb(0x6E, 0xE7, 0xB7); // soft green
        private static readonly Color ColIncorrect = Color.FromArgb(0xFC, 0xA5, 0xA5); // soft red

        // ── A. 顶部状态栏
        private Label _statusBarTitle;   // "MOS Excel 365 実技トレーニング"
        private Label _statusBarState;   // 状态文字（左侧）
        private Label _statusBarTimer;   // 计时（右侧）

        // ── B. 进度导航栏
        private Label _progressBar;      // "プロジェクト 1 / 1  ·  タスク 1 / 1  ·  基礎"

        // ── C. 主任务题干区
        private Label _taskTitleJa;      // 日文任务标题（大字，主层）
        private Label _taskTitleZh;      // 中文标题（辅助）
        private Label _taskInstrJa;      // 日文任务说明
        private Label _taskInstrZh;      // 中文辅助说明
        private Label _taskLocation;     // 作業場所：シート名!セル

        // ── D. 操作栏
        private Button _gradeBtn;        // 採点する
        private Button _retryBtn;        // 再試行
        private Button _exitBtn;         // 終了する
        private Label  _resultLabel;     // 评分结果

        // ── 分割线（WinForms Panel 模拟）
        private Panel _dividerAB;
        private Panel _dividerBC;
        private Panel _dividerCD;

        public Action OnGradeClicked { get; set; }
        public Action OnRetryClicked { get; set; }
        public Action OnExitClicked  { get; set; }

        // R31 generation 防护
        private long _renderGeneration;
        public long RenderGeneration { get { return _renderGeneration; } }

        // 计时器
        private System.Windows.Forms.Timer _timer;
        private DateTime _timerStart;
        private bool _timerRunning;

        // 当前是否已显示任务题干（workbook 元数据或服务端 attach 均可触发）
        private bool _taskVisible;

        public ExamHostPaneControl()
        {
            _renderGeneration = 0;
            _taskVisible = false;
            InitializeComponent();
            ShowIdle();
        }

        // ── 公开接口

        public void UpdateSession(Guid sessionId, int processId)
        {
            // 不清空题干，只确保状态为初始
        }

        public void UpdateWorkbook(string name)
        {
            // 不做任何事：workbook 切换由 StartBindWorkbook 驱动
        }

        public long NewRenderGeneration()
        {
            return System.Threading.Interlocked.Increment(ref _renderGeneration);
        }

        /// <summary>
        /// R33 核心：从 workbook 安全元数据立即渲染题干。
        /// 不需要 generation guard（本地读取，不是服务端异步）。
        /// 此方法设置 _taskVisible = true，后续状态更新不覆盖题干。
        /// </summary>
        public void ShowTaskFromMetadata(
            string titleJa, string titleZh,
            string instrJa, string instrZh,
            string sheetLabel, string targetLabel)
        {
            _taskVisible = true;
            _taskTitleJa.Text  = titleJa  ?? "";
            _taskTitleZh.Text  = titleZh  ?? "";
            _taskInstrJa.Text  = instrJa  ?? "";
            _taskInstrZh.Text  = instrZh  ?? "";
            _taskLocation.Text = BuildLocationText(sheetLabel, targetLabel);

            _taskTitleJa.Visible  = true;
            _taskTitleZh.Visible  = true;
            _taskInstrJa.Visible  = true;
            _taskInstrZh.Visible  = true;
            _taskLocation.Visible = !(string.IsNullOrEmpty(sheetLabel) && string.IsNullOrEmpty(targetLabel));

            _resultLabel.Text      = "Excel で操作してください。\n完成 Excel 操作后，点击採点する。";
            _resultLabel.ForeColor = TextWeak;
            _resultLabel.Visible   = true;

            // 评分按钮：等到服务端 ready 才启用（grade 需要 _boundSessionId）
            _gradeBtn.Enabled  = false;
            _gradeBtn.Visible  = true;
            _retryBtn.Visible  = false;
            _exitBtn.Visible   = true;
            _exitBtn.Enabled   = true;

            SetStatusState("task_metadata_ready");
            StartTimer();
        }

        /// <summary>
        /// 从服务端 attach 结果渲染题干（有 generation guard）。
        /// </summary>
        public bool ShowTask(string instrJa, string instrZh, long gen)
        {
            if (gen != _renderGeneration) return false;

            // 如果 workbook 元数据已经渲染了题干，只更新说明文字（服务端版本可能更详细）
            if (!_taskVisible)
            {
                _taskInstrJa.Text = instrJa ?? "";
                _taskInstrZh.Text = instrZh ?? "";
                _taskInstrJa.Visible = true;
                _taskInstrZh.Visible = true;
                _taskVisible = true;
            }
            else
            {
                // 已有 metadata 版本：只更新指令（服务端数据更权威）
                if (!string.IsNullOrEmpty(instrJa)) _taskInstrJa.Text = instrJa;
                if (!string.IsNullOrEmpty(instrZh)) _taskInstrZh.Text = instrZh;
            }

            _resultLabel.Text      = "Excel で操作してから採点します。\n完成 Excel 操作后可评分。";
            _resultLabel.ForeColor = TextWeak;
            _resultLabel.Visible   = true;

            // attach 成功 → 启用评分按钮
            _gradeBtn.Enabled = true;
            _gradeBtn.Visible = true;
            _retryBtn.Visible = false;
            _exitBtn.Visible  = true;
            _exitBtn.Enabled  = true;

            SetStatusState("ready");
            return true;
        }

        /// <summary>backward compat</summary>
        public void ShowTask(string instrJa, string instrZh)
        {
            ShowTask(instrJa, instrZh, _renderGeneration);
        }

        /// <summary>服务端 attach 成功 → 只启用评分按钮，不清空题干。</summary>
        public void EnableGrading()
        {
            _gradeBtn.Enabled = true;
        }

        public void UpdateSessionState(string state, string sessionId = null, int? excelPid = null)
        {
            if (string.IsNullOrEmpty(state)) return;

            switch (state.ToLowerInvariant())
            {
                case "connecting":
                    // R33 关键：connecting 不覆盖题干，只更新状态标
                    SetStatusState("connecting");
                    // 如果没有 metadata，显示连接中提示（不替换题干区）
                    if (!_taskVisible)
                    {
                        _resultLabel.Text      = "トレーニングサービスに接続しています…\n正在连接训练服务…";
                        _resultLabel.ForeColor = TextWeak;
                        _resultLabel.Visible   = true;
                    }
                    break;

                case "retrying":
                    SetStatusState("retrying");
                    break;

                case "attached":
                case "connected":
                    // 不在这里清空题干，由 ShowTask() 处理
                    SetStatusState("ready");
                    _gradeBtn.Enabled = true;
                    break;

                case "attach_verified":
                    SetStatusState("connecting");
                    if (!_taskVisible)
                    {
                        _resultLabel.Text      = "トレーニング問題を読み込んでいます…\n正在加载训练题目…";
                        _resultLabel.ForeColor = TextWeak;
                        _resultLabel.Visible   = true;
                    }
                    break;

                case "task_metadata_ready":
                    SetStatusState("task_metadata_ready");
                    break;

                case "failed":
                    // R33 关键：failed 保留题干，只更新状态栏
                    SetStatusState("failed");
                    if (!_taskVisible)
                    {
                        ShowConnectionFailed(null);
                    }
                    else
                    {
                        // 有题干：显示重试选项但不清空题干
                        _resultLabel.Text      = "接続に失敗しました。再試行または終了してください。\n连接失败，请重试或退出。";
                        _resultLabel.ForeColor = ColIncorrect;
                        _resultLabel.Visible   = true;
                        _retryBtn.Visible      = true;
                        _gradeBtn.Visible      = false;
                    }
                    break;

                case "ending":
                    ShowEnding();
                    break;

                case "ended":
                    ShowEnded();
                    break;

                default:
                    if (state.IndexOf("HTTP", StringComparison.OrdinalIgnoreCase) >= 0 ||
                        state.IndexOf("FAILED", StringComparison.OrdinalIgnoreCase) >= 0 ||
                        state.IndexOf("REJECTED", StringComparison.OrdinalIgnoreCase) >= 0)
                    {
                        if (!_taskVisible) ShowConnectionFailed(null);
                        else SetStatusState("failed");
                    }
                    break;
            }
        }

        public void ShowTaskLoadFailed()
        {
            if (_taskVisible) return; // 已有 metadata 题干，不覆盖
            SetStatusState("failed");
            _resultLabel.Text      = "訓練問題を取得できませんでした。再接続してください。\n无法获取训练题目，请重新连接。";
            _resultLabel.ForeColor = ColIncorrect;
            _resultLabel.Visible   = true;
            _retryBtn.Visible      = true;
            _retryBtn.Enabled      = true;
            _gradeBtn.Visible      = false;
        }

        public void ShowCompletionAccepted()
        {
            _resultLabel.Text      = "完了を記録しました。\n已记录完成状态。";
            _resultLabel.ForeColor = TextSub;
            _resultLabel.Visible   = true;
        }

        public void ShowScoreSaving()
        {
            _gradeBtn.Enabled = false;
            _gradeBtn.Text    = "採点中…";
            _exitBtn.Enabled  = false;
            _resultLabel.Text      = "採点しています / 正在评分…";
            _resultLabel.ForeColor = TextWeak;
            _resultLabel.Visible   = true;
        }

        public void ShowScoreResult(string resultJa, string resultZh, int earned, int total)
        {
            var correct = total > 0 && earned == total;
            _gradeBtn.Enabled  = true;
            _gradeBtn.Text     = "採点する";
            _exitBtn.Enabled   = true;
            _retryBtn.Visible  = false;
            _resultLabel.Visible   = true;
            _resultLabel.ForeColor = correct ? ColCorrect : ColIncorrect;
            _resultLabel.Text  =
                (correct ? "✓ " : "× ") +
                earned + " / " + total + (correct ? " correct" : " incorrect") + "\n" +
                (correct ? "正解 / 正确" : "再確認 / 请重新检查") + "\n" +
                (resultJa ?? "") +
                (correct ? "" : "\n目標セルと数式を確認してください。\n请检查目标单元格或公式。");
        }

        public void ShowConnectionFailed(string message)
        {
            SetStatusState("failed");
            if (_taskVisible)
            {
                // 有题干 → 只显示操作提示，不清空题干
                _resultLabel.Text      = "接続できませんでした。再試行または終了してください。\n请重新连接或退出训练。";
                _resultLabel.ForeColor = ColIncorrect;
                _resultLabel.Visible   = true;
                _retryBtn.Visible      = true;
                _gradeBtn.Visible      = false;
            }
            else
            {
                _taskTitleJa.Visible  = false;
                _taskTitleZh.Visible  = false;
                _taskInstrJa.Visible  = false;
                _taskInstrZh.Visible  = false;
                _taskLocation.Visible = false;
                _gradeBtn.Visible     = false;
                _retryBtn.Visible     = true;
                _retryBtn.Enabled     = true;
                _exitBtn.Visible      = true;
                _exitBtn.Enabled      = true;
                _resultLabel.Text      = "再接続するか、終了してください。\n请重新连接或退出训练。";
                _resultLabel.ForeColor = ColIncorrect;
                _resultLabel.Visible   = true;
            }
        }

        public void ShowEnding()
        {
            SetStatusState("ending");
            StopTimer();
            _gradeBtn.Enabled = false;
            _retryBtn.Enabled = false;
            _exitBtn.Enabled  = false;
            _resultLabel.Text      = "このトレーニングを終了しています。\n正在结束本次训练。";
            _resultLabel.ForeColor = TextWeak;
            _resultLabel.Visible   = true;
        }

        public void ShowEnded()
        {
            SetStatusState("ended");
            StopTimer();
            _gradeBtn.Visible = false;
            _retryBtn.Visible = false;
            _exitBtn.Enabled  = false;
            _exitBtn.Visible  = true;
            _resultLabel.Text      = "今回のセッションは終了しました。\n本次训练已结束。";
            _resultLabel.ForeColor = TextSub;
            _resultLabel.Visible   = true;
        }

        // ── 私有：状态栏文字

        private void SetStatusState(string state)
        {
            switch (state)
            {
                case "task_metadata_ready":
                    _statusBarState.Text = "準備完了 / 已准备（接続中…）";
                    break;
                case "connecting":
                    _statusBarState.Text = "接続中 / 正在连接…";
                    break;
                case "ready":
                    _statusBarState.Text = "トレーニング中 / 训练中";
                    break;
                case "retrying":
                    _statusBarState.Text = "再接続中 / 正在重新连接…";
                    break;
                case "failed":
                    _statusBarState.Text = "接続失敗 / 连接失败";
                    break;
                case "scoring":
                    _statusBarState.Text = "採点中 / 评分中…";
                    break;
                case "scored_correct":
                    _statusBarState.Text = "採点済み ✓ / 已评分";
                    break;
                case "scored_incorrect":
                    _statusBarState.Text = "採点済み × / 已评分";
                    break;
                case "ending":
                    _statusBarState.Text = "終了中 / 正在结束";
                    break;
                case "ended":
                    _statusBarState.Text = "終了 / 已结束";
                    break;
                default:
                    _statusBarState.Text = state;
                    break;
            }
        }

        private string BuildLocationText(string sheetLabel, string targetLabel)
        {
            if (string.IsNullOrEmpty(sheetLabel) && string.IsNullOrEmpty(targetLabel)) return "";
            if (string.IsNullOrEmpty(sheetLabel)) return "作業場所：" + targetLabel;
            if (string.IsNullOrEmpty(targetLabel)) return "作業場所：" + sheetLabel;
            return "作業場所：" + sheetLabel + " !" + targetLabel;
        }

        private void ShowIdle()
        {
            _statusBarState.Text   = "起動中 / 正在启动…";
            _progressBar.Text      = "プロジェクト 1 / 1  ·  タスク 1 / 1";
            _taskTitleJa.Visible   = false;
            _taskTitleZh.Visible   = false;
            _taskInstrJa.Visible   = false;
            _taskInstrZh.Visible   = false;
            _taskLocation.Visible  = false;
            _gradeBtn.Visible      = false;
            _retryBtn.Visible      = false;
            _exitBtn.Visible       = true;
            _exitBtn.Enabled       = true;
            _resultLabel.Text      = "トレーニングを準備しています…\n正在准备训练环境…";
            _resultLabel.ForeColor = TextWeak;
            _resultLabel.Visible   = true;
        }

        // ── 计时器

        private void StartTimer()
        {
            if (_timerRunning) return;
            _timerStart   = DateTime.Now;
            _timerRunning = true;
            _timer.Start();
        }

        private void StopTimer()
        {
            _timerRunning = false;
            _timer.Stop();
        }

        private void OnTimerTick(object sender, EventArgs e)
        {
            if (!_timerRunning) return;
            var elapsed = DateTime.Now - _timerStart;
            _statusBarTimer.Text = string.Format("{0:D2}:{1:D2}", (int)elapsed.TotalMinutes, elapsed.Seconds % 60);
        }

        // ── InitializeComponent（灰黑四层布局）

        private void InitializeComponent()
        {
            // Panel 高度定义
            const int StatusH   = 44;   // A. 顶部状态栏
            const int DivH      = 1;    // 分割线高度
            const int ProgressH = 30;   // B. 进度导航栏
            const int TaskH     = 102;  // C. 主任务题干区
            const int ActionH   = 58;   // D. 操作栏
            const int PadX      = 14;
            const int FullW     = 9000; // 水平充满（底部 pane 横向布局，AutoScroll）

            // 以下坐标为整体控件内的绝对位置
            int y = 0;

            // ── A. 顶部状态栏 ──────────────────────────────────────
            _statusBarTitle = new Label
            {
                Text      = "MOS Excel 365  実技トレーニング / 实操训练",
                Font      = new Font("Segoe UI", 9.5f, FontStyle.Bold),
                ForeColor = TextMain,
                BackColor = BgMain,
                Location  = new Point(PadX, y + 8),
                Size      = new Size(520, 26),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft
            };

            _statusBarState = new Label
            {
                Text      = "起動中 / 正在启动…",
                Font      = new Font("Segoe UI", 8.5f, FontStyle.Regular),
                ForeColor = TextSub,
                BackColor = BgMain,
                Location  = new Point(550, y + 8),
                Size      = new Size(300, 26),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft
            };

            _statusBarTimer = new Label
            {
                Text      = "00:00",
                Font      = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = TextWeak,
                BackColor = BgMain,
                Location  = new Point(870, y + 8),
                Size      = new Size(60, 26),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleRight
            };

            y += StatusH;
            _dividerAB = new Panel { BackColor = Divider, Location = new Point(0, y), Size = new Size(FullW, DivH) };
            y += DivH;

            // ── B. 进度导航栏 ──────────────────────────────────────
            _progressBar = new Label
            {
                Text      = "プロジェクト 1 / 1  ·  タスク 1 / 1  ·  基礎",
                Font      = new Font("Segoe UI", 8f, FontStyle.Regular),
                ForeColor = TextWeak,
                BackColor = BgLayer,
                Location  = new Point(PadX, y + 6),
                Size      = new Size(600, 18),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft
            };

            y += ProgressH;
            _dividerBC = new Panel { BackColor = Divider, Location = new Point(0, y), Size = new Size(FullW, DivH) };
            y += DivH;

            // ── C. 主任务题干区 ────────────────────────────────────
            int taskY = y + 6;

            _taskTitleJa = new Label
            {
                Font      = new Font("Segoe UI", 13f, FontStyle.Bold),
                ForeColor = TextMain,
                BackColor = BgSection,
                Location  = new Point(PadX, taskY),
                Size      = new Size(400, 26),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft,
                Visible   = false
            };

            _taskTitleZh = new Label
            {
                Font      = new Font("Segoe UI", 9f, FontStyle.Regular),
                ForeColor = TextSub,
                BackColor = BgSection,
                Location  = new Point(PadX, taskY + 28),
                Size      = new Size(400, 18),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft,
                Visible   = false
            };

            _taskInstrJa = new Label
            {
                Font      = new Font("Segoe UI", 9.5f, FontStyle.Regular),
                ForeColor = TextMain,
                BackColor = BgSection,
                Location  = new Point(440, taskY),
                Size      = new Size(500, 52),
                AutoSize  = false,
                TextAlign = ContentAlignment.TopLeft,
                Visible   = false
            };

            _taskInstrZh = new Label
            {
                Font      = new Font("Segoe UI", 8.5f, FontStyle.Regular),
                ForeColor = TextSub,
                BackColor = BgSection,
                Location  = new Point(440, taskY + 54),
                Size      = new Size(500, 36),
                AutoSize  = false,
                TextAlign = ContentAlignment.TopLeft,
                Visible   = false
            };

            _taskLocation = new Label
            {
                Font      = new Font("Segoe UI", 8.5f, FontStyle.Bold),
                ForeColor = TextWeak,
                BackColor = BgSection,
                Location  = new Point(960, taskY),
                Size      = new Size(200, 26),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft,
                Visible   = false
            };

            y += TaskH;
            _dividerCD = new Panel { BackColor = Divider, Location = new Point(0, y), Size = new Size(FullW, DivH) };
            y += DivH;

            // ── D. 操作栏 ──────────────────────────────────────────
            int btnY = y + 12;

            _gradeBtn = new Button
            {
                Text      = "採点する",
                Font      = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = TextMain,
                BackColor = BtnMain,
                FlatStyle = FlatStyle.Flat,
                Size      = new Size(110, 32),
                Location  = new Point(PadX, btnY),
                Visible   = false,
                Enabled   = false
            };
            _gradeBtn.FlatAppearance.BorderColor = Divider;
            _gradeBtn.Click += (s, ev) => OnGradeClicked?.Invoke();

            _retryBtn = new Button
            {
                Text      = "再試行 / 重新连接",
                Font      = new Font("Segoe UI", 8.5f, FontStyle.Regular),
                ForeColor = TextSub,
                BackColor = BtnMain,
                FlatStyle = FlatStyle.Flat,
                Size      = new Size(130, 32),
                Location  = new Point(PadX + 120, btnY),
                Visible   = false,
                Enabled   = true
            };
            _retryBtn.FlatAppearance.BorderColor = Divider;
            _retryBtn.Click += (s, ev) => OnRetryClicked?.Invoke();

            _exitBtn = new Button
            {
                Text      = "終了する",
                Font      = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = TextMain,
                BackColor = BtnExit,
                FlatStyle = FlatStyle.Flat,
                Size      = new Size(100, 32),
                Location  = new Point(PadX + 260, btnY),
                Visible   = false,
                Enabled   = true
            };
            _exitBtn.FlatAppearance.BorderColor = Divider;
            _exitBtn.Click += (s, ev) => OnExitClicked?.Invoke();

            _resultLabel = new Label
            {
                Font      = new Font("Segoe UI", 8.5f, FontStyle.Regular),
                ForeColor = TextWeak,
                BackColor = BgMain,
                Location  = new Point(PadX + 380, btnY - 2),
                Size      = new Size(560, 40),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft,
                Visible   = false
            };

            // ── 计时器 ─────────────────────────────────────────────
            _timer = new System.Windows.Forms.Timer { Interval = 1000 };
            _timer.Tick += OnTimerTick;

            // ── 整体面板设置 ────────────────────────────────────────
            this.BackColor  = BgSection;
            this.ForeColor  = TextMain;
            this.Font       = new Font("Segoe UI", 9f, FontStyle.Regular);
            this.AutoScroll = false;

            // 添加背景层（用 Panel 覆盖分层背景色）
            var statusBarBg = new Panel
            {
                BackColor = BgMain,
                Location  = new Point(0, 0),
                Size      = new Size(FullW, StatusH)
            };
            var progressBg = new Panel
            {
                BackColor = BgLayer,
                Location  = new Point(0, StatusH + DivH),
                Size      = new Size(FullW, ProgressH)
            };
            var taskBg = new Panel
            {
                BackColor = BgSection,
                Location  = new Point(0, StatusH + DivH + ProgressH + DivH),
                Size      = new Size(FullW, TaskH)
            };
            var actionBg = new Panel
            {
                BackColor = BgMain,
                Location  = new Point(0, StatusH + DivH + ProgressH + DivH + TaskH + DivH),
                Size      = new Size(FullW, ActionH)
            };

            // 注意：WinForms 中 Controls 越后添加 z-order 越高（在背景之上）
            this.Controls.Add(statusBarBg);
            this.Controls.Add(progressBg);
            this.Controls.Add(taskBg);
            this.Controls.Add(actionBg);
            this.Controls.Add(_dividerAB);
            this.Controls.Add(_dividerBC);
            this.Controls.Add(_dividerCD);
            this.Controls.Add(_statusBarTitle);
            this.Controls.Add(_statusBarState);
            this.Controls.Add(_statusBarTimer);
            this.Controls.Add(_progressBar);
            this.Controls.Add(_taskTitleJa);
            this.Controls.Add(_taskTitleZh);
            this.Controls.Add(_taskInstrJa);
            this.Controls.Add(_taskInstrZh);
            this.Controls.Add(_taskLocation);
            this.Controls.Add(_gradeBtn);
            this.Controls.Add(_retryBtn);
            this.Controls.Add(_exitBtn);
            this.Controls.Add(_resultLabel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                StopTimer();
                _timer?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
