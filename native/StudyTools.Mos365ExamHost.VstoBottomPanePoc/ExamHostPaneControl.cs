using System;
using System.Drawing;
using System.Windows.Forms;

namespace StudyTools.Mos365ExamHost
{
    /// <summary>
    /// MOS 底部极简训练控制台 — R34 灰黑与浅色高级内容区四层布局。
    ///
    /// 四层结构（嵌套于 Panel 中，绝无 sibling 遮挡）：
    ///   A. 顶部状态栏（BgMain: #15171A, 计时器, 状态）
    ///   B. 进度导航栏（BgLayer: #202328, 项目与任务进度）
    ///   C. 主任务题干区（暖灰白: #F3F1ED, 题干高对比，主文字 #1C2228, 辅助文字 #59616A）
    ///   D. 操作栏（BgMain: #15171A, 開始/一時停止/再開/採点する/終了する/再試行 + 提示与结果）
    /// </summary>
    public class ExamHostPaneControl : UserControl
    {
        // ── 配色令牌（灰黒与浅色层级）
        private static readonly Color BgMain    = Color.FromArgb(0x15, 0x17, 0x1A); // #15171A
        private static readonly Color BgLayer   = Color.FromArgb(0x20, 0x23, 0x28); // #202328
        private static readonly Color BgContent = Color.FromArgb(0xF3, 0xF1, 0xED); // #F3F1ED (暖灰白内容区)
        private static readonly Color Divider   = Color.FromArgb(0x34, 0x38, 0x3E); // #34383E

        // ── 文本颜色
        private static readonly Color TextMainDark = Color.FromArgb(0x1C, 0x22, 0x28); // #1C2228 (浅色区主字)
        private static readonly Color TextSubDark  = Color.FromArgb(0x59, 0x61, 0x6A); // #59616A (浅色区副字)
        private static readonly Color TextMainLight = Color.FromArgb(0xF3, 0xF4, 0xF6); // #F3F4F6 (深色区主字)
        private static readonly Color TextSubLight  = Color.FromArgb(0xA9, 0xAF, 0xB8); // #A9AFB8 (深色区副字)
        private static readonly Color TextWeak      = Color.FromArgb(0x72, 0x79, 0x84); // #727984

        // ── 按钮配色
        private static readonly Color BtnMainBg   = Color.FromArgb(0xE2, 0xE8, 0xF0); // #E2E8F0 (主要操作背景)
        private static readonly Color BtnMainFg   = Color.FromArgb(0x1E, 0x29, 0x3B); // #1E293B
        private static readonly Color BtnPauseBg  = Color.FromArgb(0x47, 0x55, 0x69); // #475569
        private static readonly Color BtnGradeBg  = Color.FromArgb(0x1E, 0x29, 0x3B); // #1E293B (评分深色)
        private static readonly Color BtnExitBg   = Color.FromArgb(0x33, 0x41, 0x55); // #334155


        private static readonly Color ColCorrect   = Color.FromArgb(0x10, 0x5B, 0x3E); // 暗绿色（适合浅色背景）
        private static readonly Color ColIncorrect = Color.FromArgb(0x99, 0x1B, 0x1B); // 暗红色（适合浅色背景）

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
        private Button _startBtn;        // 開始
        private Button _pauseBtn;        // 一時停止
        private Button _resumeBtn;       // 再開
        private Button _gradeBtn;        // 採点する
        private Button _retryBtn;        // 再試行
        private Button _exitBtn;         // 終了する
        private Label  _resultLabel;     // 评分结果及提示

        // ── 分割线
        private Panel _dividerAB;
        private Panel _dividerBC;
        private Panel _dividerCD;

        public Action OnStartClicked  { get; set; }
        public Action OnPauseClicked  { get; set; }
        public Action OnResumeClicked { get; set; }
        public Action OnGradeClicked  { get; set; }
        public Action OnRetryClicked  { get; set; }
        public Action OnExitClicked   { get; set; }

        private long _renderGeneration;
        public long RenderGeneration { get { return _renderGeneration; } }

        // 计时器 (支持暂停与累计)
        private System.Windows.Forms.Timer _timer;
        private TimeSpan _accumulatedTime = TimeSpan.Zero;
        private DateTime _timerStart;
        private bool _timerRunning;

        private bool _taskVisible;
        private string _currentUIState = "idle";
        private bool _sessionBound = false;

        public ExamHostPaneControl()
        {
            _renderGeneration = 0;
            _taskVisible = false;
            InitializeComponent();
            ShowIdle();
        }

        public void UpdateSession(Guid sessionId, int processId)
        {
            // 不清除题干，保持状态
        }

        public void UpdateWorkbook(string name)
        {
            // 由 StartBindWorkbook 驱动
        }

        public long NewRenderGeneration()
        {
            return System.Threading.Interlocked.Increment(ref _renderGeneration);
        }

        /// <summary>
        /// 从 workbook 安全元数据立即渲染题干。
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

            _accumulatedTime = TimeSpan.Zero;
            _statusBarTimer.Text = "00:00";

            ApplyUIState("ready_to_start");
        }

        /// <summary>
        /// 从服务端 attach 结果渲染或更新题干。
        /// </summary>
        public bool ShowTask(string instrJa, string instrZh, long gen)
        {
            if (gen != _renderGeneration) return false;

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
                if (!string.IsNullOrEmpty(instrJa)) _taskInstrJa.Text = instrJa;
                if (!string.IsNullOrEmpty(instrZh)) _taskInstrZh.Text = instrZh;
            }

            _sessionBound = true;
            if (_currentUIState == "running")
            {
                _gradeBtn.Enabled = true;
                _resultLabel.Text = "Excel で操作してから「採点する」を押してください。\n完成 Excel 操作后，点击「评分」。";
                _resultLabel.ForeColor = TextMainLight;
            }

            return true;
        }

        public void ShowTask(string instrJa, string instrZh)
        {
            ShowTask(instrJa, instrZh, _renderGeneration);
        }

        public void EnableGrading()
        {
            _sessionBound = true;
            if (_currentUIState == "running")
            {
                _gradeBtn.Enabled = true;
            }
        }

        public void UpdateSessionState(string state, string sessionId = null, int? excelPid = null)
        {
            if (string.IsNullOrEmpty(state)) return;

            switch (state.ToLowerInvariant())
            {
                case "connecting":
                case "attach_verified":
                    _statusBarState.Text = "接続中 / 正在连接…";
                    if (!_taskVisible)
                    {
                        _resultLabel.Text      = "トレーニングサービスに接続しています…\n正在连接训练服务…";
                        _resultLabel.ForeColor = TextWeak;
                        _resultLabel.Visible   = true;
                    }
                    break;

                case "retrying":
                    _statusBarState.Text = "再接続中 / 正在重新连接…";
                    break;

                case "attached":
                case "connected":
                    _sessionBound = true;
                    if (_currentUIState == "running")
                    {
                        _gradeBtn.Enabled = true;
                    }
                    break;

                case "failed":
                    _statusBarState.Text = "接続失敗 / 连接失败";
                    if (!_taskVisible)
                    {
                        ShowConnectionFailed(null);
                    }
                    else
                    {
                        _resultLabel.Text      = "接続に失敗しました。再試行または終了してください。\n连接失败，请重试或退出。";
                        _resultLabel.ForeColor = ColIncorrect;
                        _resultLabel.Visible   = true;
                        _retryBtn.Visible      = true;
                    }
                    break;

                case "ending":
                    ApplyUIState("ending");
                    break;

                case "ended":
                    ApplyUIState("ended");
                    break;
            }
        }

        public void ShowTaskLoadFailed()
        {
            if (_taskVisible) return;
            _statusBarState.Text = "接続失敗 / 连接失败";
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
            _resultLabel.ForeColor = TextSubLight;
            _resultLabel.Visible   = true;
        }

        public void ShowScoreSaving()
        {
            ApplyUIState("scoring");
        }

        public void ShowScoreResult(string resultJa, string resultZh, int earned, int total)
        {
            var correct = total > 0 && earned == total;
            ApplyUIState(correct ? "scored_correct" : "scored_incorrect");
            _resultLabel.Visible   = true;
            _resultLabel.ForeColor = correct ? ColCorrect : ColIncorrect;
            _resultLabel.Text  =
                (correct ? "✓ " : "× ") +
                earned + " / " + total + (correct ? " correct" : " incorrect") + "   " +
                (correct ? "正解 / 回答正确" : "再確認 / 请重新检查") + "\n" +
                (correct ? "" : "目标单元格或公式有误，请重新检查。");
        }

        public void ShowConnectionFailed(string message)
        {
            _statusBarState.Text = "接続失敗 / 连接失败";
            if (_taskVisible)
            {
                _resultLabel.Text      = "接続できませんでした。再試行または終了してください。\n请重新连接或退出训练。";
                _resultLabel.ForeColor = ColIncorrect;
                _resultLabel.Visible   = true;
                _retryBtn.Visible      = true;
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
            ApplyUIState("ending");
        }

        public void ShowEnded()
        {
            ApplyUIState("ended");
        }

        // ── 状态机管理
        public void ApplyUIState(string state)
        {
            _currentUIState = state;
            switch (state)
            {
                case "idle":
                    _statusBarState.Text = "起動中 / 正在启动…";
                    _startBtn.Visible   = true;  _startBtn.Enabled   = false;
                    _pauseBtn.Visible   = false; _pauseBtn.Enabled   = false;
                    _resumeBtn.Visible  = false; _resumeBtn.Enabled  = false;
                    _gradeBtn.Visible   = true;  _gradeBtn.Enabled   = false;
                    _exitBtn.Visible    = true;  _exitBtn.Enabled    = true;
                    _retryBtn.Visible   = false;
                    _resultLabel.Text   = "トレーニングを準備しています…\n正在准备训练环境…";
                    _resultLabel.ForeColor = TextWeak;
                    _resultLabel.Visible = true;
                    break;

                case "ready_to_start":
                    _statusBarState.Text = "準備完了 / 已准备";
                    _startBtn.Visible   = true;  _startBtn.Enabled   = true;
                    _pauseBtn.Visible   = false; _pauseBtn.Enabled   = false;
                    _resumeBtn.Visible  = false; _resumeBtn.Enabled  = false;
                    _gradeBtn.Visible   = true;  _gradeBtn.Enabled   = false;
                    _exitBtn.Visible    = true;  _exitBtn.Enabled    = true;
                    _retryBtn.Visible   = false;
                    _resultLabel.Text   = "「開始」をクリックして、トレーニングを開始してください。\n请点击「开始」以开始训练。";
                    _resultLabel.ForeColor = TextSubLight;
                    _resultLabel.Visible = true;
                    break;

                case "running":
                    _statusBarState.Text = "進行中 / 进行中";
                    _startBtn.Visible   = false; _startBtn.Enabled   = false;
                    _pauseBtn.Visible   = true;  _pauseBtn.Enabled   = true;
                    _resumeBtn.Visible  = false; _resumeBtn.Enabled  = false;
                    _gradeBtn.Visible   = true;  _gradeBtn.Enabled   = _sessionBound;
                    _exitBtn.Visible    = true;  _exitBtn.Enabled    = true;
                    _retryBtn.Visible   = false;
                    _resultLabel.Text   = "Excel で操作してから「採点する」を押してください。\n完成 Excel 操作后，点击「评分」。";
                    _resultLabel.ForeColor = TextMainLight;
                    _resultLabel.Visible = true;
                    break;

                case "paused":
                    _statusBarState.Text = "一時停止 / 已暂停";
                    _startBtn.Visible   = false; _startBtn.Enabled   = false;
                    _pauseBtn.Visible   = false; _pauseBtn.Enabled   = false;
                    _resumeBtn.Visible  = true;  _resumeBtn.Enabled  = true;
                    _gradeBtn.Visible   = true;  _gradeBtn.Enabled   = false;
                    _exitBtn.Visible    = true;  _exitBtn.Enabled    = true;
                    _retryBtn.Visible   = false;
                    _resultLabel.Text   = "トレーニングは一時停止しています。「再開」で続行します。\n训练已暂停。点击「继续」以恢复。";
                    _resultLabel.ForeColor = TextWeak;
                    _resultLabel.Visible = true;
                    break;

                case "scoring":
                    _statusBarState.Text = "採点中 / 评分中…";
                    _startBtn.Visible   = false; _startBtn.Enabled   = false;
                    _pauseBtn.Visible   = false; _pauseBtn.Enabled   = false;
                    _resumeBtn.Visible  = false; _resumeBtn.Enabled  = false;
                    _gradeBtn.Visible   = true;  _gradeBtn.Enabled   = false;
                    _exitBtn.Visible    = true;  _exitBtn.Enabled    = false;
                    _retryBtn.Visible   = false;
                    _resultLabel.Text   = "採点しています / 正在评分…";
                    _resultLabel.ForeColor = TextWeak;
                    _resultLabel.Visible = true;
                    break;

                case "scored_correct":
                    _statusBarState.Text = "採点済み ✓ / 已评分";
                    _startBtn.Visible   = false; _startBtn.Enabled   = false;
                    _pauseBtn.Visible   = true;  _pauseBtn.Enabled   = true;
                    _resumeBtn.Visible  = false; _resumeBtn.Enabled  = false;
                    _gradeBtn.Visible   = true;  _gradeBtn.Enabled   = true;
                    _exitBtn.Visible    = true;  _exitBtn.Enabled    = true;
                    _retryBtn.Visible   = false;
                    break;

                case "scored_incorrect":
                    _statusBarState.Text = "採点済み × / 已评分";
                    _startBtn.Visible   = false; _startBtn.Enabled   = false;
                    _pauseBtn.Visible   = true;  _pauseBtn.Enabled   = true;
                    _resumeBtn.Visible  = false; _resumeBtn.Enabled  = false;
                    _gradeBtn.Visible   = true;  _gradeBtn.Enabled   = true;
                    _exitBtn.Visible    = true;  _exitBtn.Enabled    = true;
                    _retryBtn.Visible   = false;
                    break;

                case "ending":
                    _statusBarState.Text = "終了中 / 正在结束";
                    _startBtn.Visible   = false; _startBtn.Enabled   = false;
                    _pauseBtn.Visible   = false; _pauseBtn.Enabled   = false;
                    _resumeBtn.Visible  = false; _resumeBtn.Enabled  = false;
                    _gradeBtn.Visible   = false; _gradeBtn.Enabled   = false;
                    _exitBtn.Visible    = true;  _exitBtn.Enabled    = false;
                    _retryBtn.Visible   = false;
                    _resultLabel.Text   = "このトレーニングを終了しています。\n正在结束本次训练。";
                    _resultLabel.ForeColor = TextWeak;
                    _resultLabel.Visible = true;
                    break;

                case "ended":
                    _statusBarState.Text = "終了 / 已结束";
                    _startBtn.Visible   = false; _startBtn.Enabled   = false;
                    _pauseBtn.Visible   = false; _pauseBtn.Enabled   = false;
                    _resumeBtn.Visible  = false; _resumeBtn.Enabled  = false;
                    _gradeBtn.Visible   = false; _gradeBtn.Enabled   = false;
                    _exitBtn.Visible    = true;  _exitBtn.Enabled    = false;
                    _retryBtn.Visible   = false;
                    _resultLabel.Text   = "トレーニングを終了しました / 训练已结束";
                    _resultLabel.ForeColor = TextSubLight;
                    _resultLabel.Visible = true;
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
            ApplyUIState("idle");
        }

        // ── 计时器控制
        public void StartTimer()
        {
            if (_timerRunning) return;
            _timerStart   = DateTime.Now;
            _timerRunning = true;
            _timer.Start();
        }

        public void PauseTimer()
        {
            if (!_timerRunning) return;
            _accumulatedTime += (DateTime.Now - _timerStart);
            _timerRunning = false;
            _timer.Stop();
        }

        public void ResumeTimer()
        {
            if (_timerRunning) return;
            _timerStart   = DateTime.Now;
            _timerRunning = true;
            _timer.Start();
        }

        public void StopTimer()
        {
            _timerRunning = false;
            _timer.Stop();
        }

        private void OnTimerTick(object sender, EventArgs e)
        {
            if (!_timerRunning) return;
            var elapsed = _accumulatedTime + (DateTime.Now - _timerStart);
            _statusBarTimer.Text = string.Format("{0:D2}:{1:D2}", (int)elapsed.TotalMinutes, elapsed.Seconds % 60);
        }

        // ── InitializeComponent（嵌套式防遮挡灰黑四层布局）
        private void InitializeComponent()
        {
            const int StatusH   = 44;   // A. 顶部状态栏
            const int DivH      = 1;    // 分割线高度
            const int ProgressH = 30;   // B. 进度导航栏
            const int TaskH     = 102;  // C. 主任务题干区
            const int ActionH   = 58;   // D. 操作栏
            const int PadX      = 14;
            const int FullW     = 9000;

            // ── A. 顶部状态栏 ──────────────────────────────────────
            _statusBarTitle = new Label
            {
                Text      = "MOS Excel 365  実技トレーニング / 实操训练",
                Font      = new Font("Segoe UI", 9.5f, FontStyle.Bold),
                ForeColor = TextMainLight,
                BackColor = Color.Transparent,
                Location  = new Point(PadX, 8),
                Size      = new Size(520, 26),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft
            };

            _statusBarState = new Label
            {
                Text      = "起動中 / 正在启动…",
                Font = new Font("Segoe UI", 8.5f, FontStyle.Regular),
                ForeColor = TextSubLight,
                BackColor = Color.Transparent,
                Location  = new Point(550, 8),
                Size      = new Size(300, 26),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft
            };

            _statusBarTimer = new Label
            {
                Text      = "00:00",
                Font      = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = TextWeak,
                BackColor = Color.Transparent,
                Location  = new Point(870, 8),
                Size      = new Size(60, 26),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleRight
            };

            var statusBarBg = new Panel
            {
                BackColor = BgMain,
                Location  = new Point(0, 0),
                Size      = new Size(FullW, StatusH)
            };
            statusBarBg.Controls.Add(_statusBarTitle);
            statusBarBg.Controls.Add(_statusBarState);
            statusBarBg.Controls.Add(_statusBarTimer);

            _dividerAB = new Panel { BackColor = Divider, Location = new Point(0, StatusH), Size = new Size(FullW, DivH) };

            // ── B. 进度导航栏 ──────────────────────────────────────
            _progressBar = new Label
            {
                Text      = "プロジェクト 1 / 1  ·  タスク 1 / 1  ·  基礎",
                Font      = new Font("Segoe UI", 8f, FontStyle.Regular),
                ForeColor = TextWeak,
                BackColor = Color.Transparent,
                Location  = new Point(PadX, 6),
                Size      = new Size(600, 18),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft
            };

            var progressBg = new Panel
            {
                BackColor = BgLayer,
                Location  = new Point(0, StatusH + DivH),
                Size      = new Size(FullW, ProgressH)
            };
            progressBg.Controls.Add(_progressBar);

            _dividerBC = new Panel { BackColor = Divider, Location = new Point(0, StatusH + DivH + ProgressH), Size = new Size(FullW, DivH) };

            // ── C. 主任务题干区（浅色暖灰白高级配色） ───────────────────────
            _taskTitleJa = new Label
            {
                Font      = new Font("Segoe UI", 12f, FontStyle.Bold),
                ForeColor = TextMainDark,
                BackColor = Color.Transparent,
                Location  = new Point(PadX, 6),
                Size      = new Size(400, 24),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft,
                Visible   = false
            };

            _taskTitleZh = new Label
            {
                Font      = new Font("Segoe UI", 9f, FontStyle.Regular),
                ForeColor = TextSubDark,
                BackColor = Color.Transparent,
                Location  = new Point(PadX, 30),
                Size      = new Size(400, 18),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft,
                Visible   = false
            };

            _taskInstrJa = new Label
            {
                Font      = new Font("Segoe UI", 9.5f, FontStyle.Regular),
                ForeColor = TextMainDark,
                BackColor = Color.Transparent,
                Location  = new Point(440, 6),
                Size      = new Size(500, 52),
                AutoSize  = false,
                TextAlign = ContentAlignment.TopLeft,
                Visible   = false
            };

            _taskInstrZh = new Label
            {
                Font      = new Font("Segoe UI", 8.5f, FontStyle.Regular),
                ForeColor = TextSubDark,
                BackColor = Color.Transparent,
                Location  = new Point(440, 60),
                Size      = new Size(500, 36),
                AutoSize  = false,
                TextAlign = ContentAlignment.TopLeft,
                Visible   = false
            };

            _taskLocation = new Label
            {
                Font      = new Font("Segoe UI", 8.5f, FontStyle.Bold),
                ForeColor = TextSubDark,
                BackColor = Color.Transparent,
                Location  = new Point(960, 6),
                Size      = new Size(200, 26),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft,
                Visible   = false
            };

            var taskBg = new Panel
            {
                BackColor = BgContent,
                Location  = new Point(0, StatusH + DivH + ProgressH + DivH),
                Size      = new Size(FullW, TaskH)
            };
            taskBg.Controls.Add(_taskTitleJa);
            taskBg.Controls.Add(_taskTitleZh);
            taskBg.Controls.Add(_taskInstrJa);
            taskBg.Controls.Add(_taskInstrZh);
            taskBg.Controls.Add(_taskLocation);

            _dividerCD = new Panel { BackColor = Divider, Location = new Point(0, StatusH + DivH + ProgressH + DivH + TaskH), Size = new Size(FullW, DivH) };

            // ── D. 操作栏 ──────────────────────────────────────────
            _startBtn = new Button
            {
                Text      = "開始",
                Font      = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = BtnMainFg,
                BackColor = BtnMainBg,
                FlatStyle = FlatStyle.Flat,
                Size      = new Size(100, 32),
                Location  = new Point(PadX, 12),
                Visible   = true,
                Enabled   = false
            };
            _startBtn.FlatAppearance.BorderColor = Divider;
            _startBtn.Click += (s, ev) => OnStartClicked?.Invoke();

            _pauseBtn = new Button
            {
                Text      = "一時停止",
                Font      = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = BtnPauseBg,
                FlatStyle = FlatStyle.Flat,
                Size      = new Size(100, 32),
                Location  = new Point(PadX + 110, 12),
                Visible   = false,
                Enabled   = false
            };
            _pauseBtn.FlatAppearance.BorderColor = Divider;
            _pauseBtn.Click += (s, ev) => OnPauseClicked?.Invoke();

            _resumeBtn = new Button
            {
                Text      = "再開",
                Font      = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = BtnMainFg,
                BackColor = BtnMainBg,
                FlatStyle = FlatStyle.Flat,
                Size      = new Size(100, 32),
                Location  = new Point(PadX + 220, 12),
                Visible   = false,
                Enabled   = false
            };
            _resumeBtn.FlatAppearance.BorderColor = Divider;
            _resumeBtn.Click += (s, ev) => OnResumeClicked?.Invoke();

            _gradeBtn = new Button
            {
                Text      = "採点する",
                Font      = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = BtnGradeBg,
                FlatStyle = FlatStyle.Flat,
                Size      = new Size(100, 32),
                Location  = new Point(PadX + 330, 12),
                Visible   = true,
                Enabled   = false
            };
            _gradeBtn.FlatAppearance.BorderColor = Divider;
            _gradeBtn.Click += (s, ev) => OnGradeClicked?.Invoke();

            _exitBtn = new Button
            {
                Text      = "終了する",
                Font      = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = BtnExitBg,
                FlatStyle = FlatStyle.Flat,
                Size      = new Size(100, 32),
                Location  = new Point(PadX + 440, 12),
                Visible   = true,
                Enabled   = true
            };
            _exitBtn.FlatAppearance.BorderColor = Divider;
            _exitBtn.Click += (s, ev) => OnExitClicked?.Invoke();

            _retryBtn = new Button
            {
                Text      = "再試行",
                Font      = new Font("Segoe UI", 9f, FontStyle.Regular),
                ForeColor = Color.White,
                BackColor = BtnPauseBg,
                FlatStyle = FlatStyle.Flat,
                Size      = new Size(100, 32),
                Location  = new Point(PadX + 550, 12),
                Visible   = false,
                Enabled   = true
            };
            _retryBtn.FlatAppearance.BorderColor = Divider;
            _retryBtn.Click += (s, ev) => OnRetryClicked?.Invoke();

            _resultLabel = new Label
            {
                Font      = new Font("Segoe UI", 8.5f, FontStyle.Regular),
                ForeColor = TextWeak,
                BackColor = Color.Transparent,
                Location  = new Point(PadX + 680, 10),
                Size      = new Size(560, 40),
                AutoSize  = false,
                TextAlign = ContentAlignment.MiddleLeft,
                Visible   = false
            };

            var actionBg = new Panel
            {
                BackColor = BgMain,
                Location  = new Point(0, StatusH + DivH + ProgressH + DivH + TaskH + DivH),
                Size      = new Size(FullW, ActionH)
            };
            actionBg.Controls.Add(_startBtn);
            actionBg.Controls.Add(_pauseBtn);
            actionBg.Controls.Add(_resumeBtn);
            actionBg.Controls.Add(_gradeBtn);
            actionBg.Controls.Add(_exitBtn);
            actionBg.Controls.Add(_retryBtn);
            actionBg.Controls.Add(_resultLabel);

            // ── 计时器 ─────────────────────────────────────────────
            _timer = new System.Windows.Forms.Timer { Interval = 1000 };
            _timer.Tick += OnTimerTick;

            // ── 整体面板设置 ────────────────────────────────────────
            this.BackColor  = BgMain;
            this.ForeColor  = TextMainLight;
            this.Font       = new Font("Segoe UI", 9f, FontStyle.Regular);
            this.AutoScroll = false;

            this.Controls.Add(statusBarBg);
            this.Controls.Add(progressBg);
            this.Controls.Add(taskBg);
            this.Controls.Add(actionBg);
            this.Controls.Add(_dividerAB);
            this.Controls.Add(_dividerBC);
            this.Controls.Add(_dividerCD);
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
