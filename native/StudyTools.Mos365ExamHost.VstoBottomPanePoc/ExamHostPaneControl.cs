using System;
using System.Drawing;
using System.Windows.Forms;

namespace StudyTools.Mos365ExamHost
{
    /// <summary>
    /// MOS training task pane with proper state machine.
    /// States: connecting → retrying → attached → failed → ending → ended
    /// Exit button is always available during connecting/retrying/failed states.
    /// </summary>
    public class ExamHostPaneControl : UserControl
    {
        private Label _titleLabel;
        private Label _stateLabel;
        private Label _progressLabel;
        private Label _taskInstructionJa;
        private Label _taskInstructionZh;
        private Button _gradeBtn;
        private Button _retryBtn;
        private Button _exitBtn;
        private Label _resultLabel;

        public Action OnGradeClicked { get; set; }
        public Action OnRetryClicked { get; set; }
        public Action OnExitClicked { get; set; }

        public ExamHostPaneControl()
        {
            InitializeComponent();
            ShowConnecting();
        }

        public void UpdateSession(Guid sessionId, int processId)
        {
            ShowConnecting();
        }

        public void UpdateWorkbook(string name)
        {
        }

        /// <summary>
        /// State machine: accepts "connecting", "retrying", "attached", "failed", "ending", "ended".
        /// </summary>
        public void UpdateSessionState(string state, string sessionId = null, int? excelPid = null)
        {
            if (string.IsNullOrEmpty(state)) { ShowConnecting(); return; }

            switch (state.ToLowerInvariant())
            {
                case "connecting":
                    ShowConnecting();
                    break;
                case "retrying":
                    ShowRetrying();
                    break;
                case "attached":
                case "connected":
                    _stateLabel.Text = "接続済み / 已连接";
                    break;
                case "failed":
                    ShowConnectionFailed(null);
                    break;
                case "ending":
                    ShowEnding();
                    break;
                case "ended":
                    ShowEnded();
                    break;
                default:
                    // Legacy: check for error keywords in state string
                    if (state.IndexOf("HTTP", StringComparison.OrdinalIgnoreCase) >= 0 ||
                        state.IndexOf("FAILED", StringComparison.OrdinalIgnoreCase) >= 0 ||
                        state.IndexOf("REJECTED", StringComparison.OrdinalIgnoreCase) >= 0 ||
                        state.IndexOf("失败", StringComparison.OrdinalIgnoreCase) >= 0)
                    {
                        ShowConnectionFailed(null);
                    }
                    else
                    {
                        ShowConnecting();
                    }
                    break;
            }
        }

        public void ShowTask(string instructionJa, string instructionZh)
        {
            _stateLabel.Text = "接続済み / 已连接";
            _progressLabel.Text = "問題 1 / 1";
            _taskInstructionJa.Text = "日本語:\n" + (instructionJa ?? "");
            _taskInstructionZh.Text = "中文:\n" + (instructionZh ?? "");
            _taskInstructionJa.Visible = true;
            _taskInstructionZh.Visible = true;
            _gradeBtn.Visible = true;
            _gradeBtn.Enabled = true;
            _gradeBtn.Text = "完成并评分";
            _retryBtn.Visible = false;
            _exitBtn.Visible = true;
            _exitBtn.Enabled = true;
            _resultLabel.Visible = true;
            _resultLabel.ForeColor = Color.FromArgb(210, 220, 225);
            _resultLabel.Text = "Excel で操作してから採点します。\n完成 Excel 操作后可评分。";
        }

        public void ShowCompletionAccepted()
        {
            _resultLabel.Visible = true;
            _resultLabel.ForeColor = Color.FromArgb(210, 220, 225);
            _resultLabel.Text = "完了を記録しました。\n已记录完成状态。";
        }

        public void ShowScoreSaving()
        {
            _gradeBtn.Enabled = false;
            _gradeBtn.Text = "採点中...";
            _exitBtn.Enabled = false;
            _resultLabel.Visible = true;
            _resultLabel.ForeColor = Color.FromArgb(210, 220, 225);
            _resultLabel.Text = "採点しています / 正在评分";
        }

        public void ShowScoreResult(string resultJa, string resultZh, int earned, int total)
        {
            var correct = total > 0 && earned == total;
            _gradeBtn.Enabled = true;
            _gradeBtn.Text = "完成并评分";
            _exitBtn.Enabled = true;
            _retryBtn.Visible = false;
            _resultLabel.Visible = true;
            _resultLabel.ForeColor = correct
                ? Color.FromArgb(80, 170, 100)
                : Color.FromArgb(180, 105, 80);
            _resultLabel.Text =
                earned + "/" + total + (correct ? " correct" : " incorrect") + "\n" +
                (correct ? "正解です / 正确" : "不正解です / 不正确") + "\n" +
                (resultJa ?? "") + "\n" + (resultZh ?? "") + "\n" +
                (correct ? "次の練習へ / 下一题或返回训练" : "もう一度試す / 再试一次");
        }

        public void ShowConnectionFailed(string message)
        {
            _stateLabel.Text = "接続できませんでした / 连接失败";
            _progressLabel.Text = "問題 1 / 1";
            _taskInstructionJa.Visible = false;
            _taskInstructionZh.Visible = false;
            _gradeBtn.Visible = false;
            _retryBtn.Visible = true;
            _retryBtn.Enabled = true;
            _exitBtn.Visible = true;
            _exitBtn.Enabled = true;
            _resultLabel.Visible = true;
            _resultLabel.ForeColor = Color.FromArgb(180, 105, 80);
            _resultLabel.Text = "接続を再試行できます。\n可以重新连接训练面板。";
        }

        public void ShowEnding()
        {
            _stateLabel.Text = "終了中 / 正在结束";
            _gradeBtn.Enabled = false;
            _retryBtn.Enabled = false;
            _exitBtn.Enabled = false;
            _resultLabel.Visible = true;
            _resultLabel.ForeColor = Color.FromArgb(210, 220, 225);
            _resultLabel.Text = "このトレーニングを終了しています。\n正在结束本次训练。";
        }

        public void ShowEnded()
        {
            _stateLabel.Text = "終了しました / 训练已结束";
            _taskInstructionJa.Visible = false;
            _taskInstructionZh.Visible = false;
            _gradeBtn.Visible = false;
            _retryBtn.Visible = false;
            _exitBtn.Enabled = false;
            _exitBtn.Visible = true;
            _resultLabel.Visible = true;
            _resultLabel.ForeColor = Color.FromArgb(210, 220, 225);
            _resultLabel.Text = "今回のセッションは終了しました。\n本次 session 已结束。";
        }

        /// <summary>
        /// Connecting state: exit button IS visible so user can cancel.
        /// </summary>
        private void ShowConnecting()
        {
            _stateLabel.Text = "接続を確認しています / 正在连接训练…";
            _progressLabel.Text = "問題 1 / 1";
            _taskInstructionJa.Visible = false;
            _taskInstructionZh.Visible = false;
            _gradeBtn.Visible = false;
            _retryBtn.Visible = false;
            // Exit button available during connecting — user can bail out
            _exitBtn.Visible = true;
            _exitBtn.Enabled = true;
            _resultLabel.Visible = true;
            _resultLabel.ForeColor = Color.FromArgb(210, 220, 225);
            _resultLabel.Text = "右侧面板正在连接训练服务…\nパネルがトレーニングに接続しています…";
        }

        private void ShowRetrying()
        {
            _stateLabel.Text = "再接続しています… / 正在重新连接…";
            _progressLabel.Text = "問題 1 / 1";
            _taskInstructionJa.Visible = false;
            _taskInstructionZh.Visible = false;
            _gradeBtn.Visible = false;
            _retryBtn.Visible = false;
            _exitBtn.Visible = true;
            _exitBtn.Enabled = true;
            _resultLabel.Visible = true;
            _resultLabel.ForeColor = Color.FromArgb(210, 220, 225);
            _resultLabel.Text = "再接続中…\n正在尝试重新连接训练面板。";
        }

        private static Label BuildLabel(Font font, Color color, Size size, Point location)
        {
            return new Label
            {
                Font = font,
                ForeColor = color,
                Size = size,
                Location = location,
                AutoSize = false
            };
        }

        private void InitializeComponent()
        {
            _titleLabel = BuildLabel(
                new Font("Segoe UI", 12f, FontStyle.Bold),
                Color.FromArgb(18, 92, 68),
                new Size(320, 28),
                new Point(18, 16));

            _stateLabel = BuildLabel(
                new Font("Segoe UI", 10f, FontStyle.Bold),
                Color.FromArgb(18, 92, 68),
                new Size(320, 26),
                new Point(18, 52));

            _progressLabel = BuildLabel(
                new Font("Segoe UI", 10f, FontStyle.Bold),
                Color.FromArgb(58, 76, 70),
                new Size(320, 24),
                new Point(18, 82));

            _taskInstructionJa = BuildLabel(
                new Font("Segoe UI", 9.5f, FontStyle.Bold),
                Color.FromArgb(35, 45, 42),
                new Size(320, 82),
                new Point(18, 118));

            _taskInstructionZh = BuildLabel(
                new Font("Segoe UI", 9.5f, FontStyle.Regular),
                Color.FromArgb(62, 78, 72),
                new Size(320, 78),
                new Point(18, 206));

            _resultLabel = BuildLabel(
                new Font("Segoe UI", 9f, FontStyle.Regular),
                Color.FromArgb(62, 78, 72),
                new Size(320, 116),
                new Point(18, 344));

            _titleLabel.Text = "MOS 実技トレーニング";
            _taskInstructionJa.Visible = false;
            _taskInstructionZh.Visible = false;

            _gradeBtn = new Button
            {
                Text = "完成并评分",
                Font = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = Color.FromArgb(29, 103, 69),
                FlatStyle = FlatStyle.Flat,
                Size = new Size(150, 34),
                Location = new Point(18, 292),
                Visible = false
            };
            _gradeBtn.Click += (s, ev) => OnGradeClicked?.Invoke();

            _retryBtn = new Button
            {
                Text = "再接続する / 重新连接",
                Font = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = Color.FromArgb(29, 103, 69),
                FlatStyle = FlatStyle.Flat,
                Size = new Size(150, 34),
                Location = new Point(18, 292),
                Visible = false
            };
            _retryBtn.Click += (s, ev) => OnRetryClicked?.Invoke();

            _exitBtn = new Button
            {
                Text = "退出训练",
                Font = new Font("Segoe UI", 9f, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = Color.FromArgb(154, 58, 53),
                FlatStyle = FlatStyle.Flat,
                Size = new Size(150, 34),
                Location = new Point(188, 292),
                Visible = false
            };
            _exitBtn.Click += (s, ev) => OnExitClicked?.Invoke();

            this.AutoScroll = true;
            this.BackColor = Color.FromArgb(248, 250, 247);
            this.ForeColor = Color.FromArgb(32, 50, 43);
            this.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            this.Size = new Size(360, 560);

            this.Controls.Add(_titleLabel);
            this.Controls.Add(_stateLabel);
            this.Controls.Add(_progressLabel);
            this.Controls.Add(_taskInstructionJa);
            this.Controls.Add(_taskInstructionZh);
            this.Controls.Add(_gradeBtn);
            this.Controls.Add(_retryBtn);
            this.Controls.Add(_exitBtn);
            this.Controls.Add(_resultLabel);
        }
    }
}
