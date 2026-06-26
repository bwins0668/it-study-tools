using System;
using System.Diagnostics;
using System.Drawing;
using System.Windows.Forms;

namespace StudyTools.Mos365ExamHost
{
    public class ExamHostPaneControl : UserControl
    {
        private Label _titleLabel;
        private Label _pidLabel;
        private Label _sessionLabel;
        private Label _timeLabel;
        private Label _wbLabel;
        private Label _platformLabel;
        private Label _stateLabel;
        private Label _boundSessionLabel;
        private Label _taskInstructionJa;
        private Label _taskInstructionZh;
        private Button _completeBtn;
        private Label _completeStatus;
        private Button _scoreBtn;
        private Label _scoreResult;
        private Timer _timer;

        // Callback for completion button
        public Action OnCompleteClicked { get; set; }
        public Action OnScoreClicked { get; set; }

        public ExamHostPaneControl()
        {
            InitializeComponent();
        }

        public void UpdateSession(Guid sessionId, int processId)
        {
            _sessionLabel.Text = "Session: " + sessionId.ToString("N").Substring(0, 8) + "...";
            _pidLabel.Text = "Excel PID: " + processId;
        }

        public void UpdateSessionState(string state, string sessionId = null, int? excelPid = null)
        {
            _stateLabel.Text = (System.Threading.Thread.CurrentThread.CurrentUICulture.TwoLetterISOLanguageName == "ja" ? "状態：" : "状态：") + (state ?? "---");
            if (!string.IsNullOrEmpty(sessionId) && sessionId.Length > 12)
                sessionId = sessionId.Substring(0, 12) + "...";
            _boundSessionLabel.Text = "Session: " + (sessionId ?? "---") + "  Excel PID: " + (excelPid?.ToString() ?? "---");
        }

        public void UpdateWorkbook(string name)
        {
            string display = string.IsNullOrEmpty(name) ? "(no workbook)" : name;
            if (display.Length > 40) display = display.Substring(0, 37) + "...";
            _wbLabel.Text = "Workbook: " + display;
        }

        private void OnTimerTick(object sender, EventArgs e)
        {
            _timeLabel.Text = DateTime.Now.ToString("HH:mm:ss");
        }

        public void ShowTask(string instructionJa, string instructionZh)
        {
            _taskInstructionJa.Text = "練習\n" + (instructionJa ?? "");
            _taskInstructionZh.Text = "说明\n" + (instructionZh ?? "");
            _taskInstructionJa.Visible = true;
            _taskInstructionZh.Visible = true;
            _completeBtn.Visible = true;
            _completeStatus.Visible = true;
            _completeStatus.Text = "採点はまだ行われません。";
            _completeBtn.Text = "完了を記録する";
            _completeBtn.Enabled = true;
        }

        public void ShowCompletionAccepted()
        {
            _completeBtn.Enabled = false;
            _completeBtn.Text = "完了を記録する";
            _completeStatus.Text = "完了を記録しました。\n採点はまだ行われません。";
            // Show score button after completion
            _scoreBtn.Visible = true;
            _scoreResult.Visible = true;
            _scoreResult.Text = "採点はこの練習用ブックの1枚目のシート名だけを確認します。\n评分只检查本练习工作簿第1个工作表的名称。";
        }

        public void ShowScoreResult(string resultJa, string resultZh, bool correct)
        {
            _scoreBtn.Enabled = true;
            _scoreBtn.Text = "保存して採点する";
            _scoreResult.ForeColor = correct ? Color.FromArgb(100, 255, 150) : Color.FromArgb(255, 180, 100);
            _scoreResult.Text = "結果：" + (correct ? "正解" : "未完了") + "\n" + resultJa + "\n" + resultZh;
        }

        public void ShowScoreSaving()
        {
            _scoreBtn.Enabled = false;
            _scoreBtn.Text = "保存中…";
        }

        private void InitializeComponent()
        {
            _titleLabel = new Label();
            _pidLabel = new Label();
            _sessionLabel = new Label();
            _timeLabel = new Label();
            _wbLabel = new Label();
            _platformLabel = new Label();
            _stateLabel = new Label();
            _boundSessionLabel = new Label();
            _taskInstructionJa = new Label();
            _taskInstructionZh = new Label();
            _completeBtn = new Button();
            _completeStatus = new Label();
            _scoreBtn = new Button();
            _scoreResult = new Label();
            _timer = new Timer();

            _titleLabel.Text = "MOS Native Exam Host · R3 VSTO POC";
            _titleLabel.Font = new Font("Segoe UI", 11f, FontStyle.Bold);
            _titleLabel.ForeColor = Color.FromArgb(56, 242, 255);
            _titleLabel.Size = new Size(420, 30);
            _titleLabel.Location = new Point(15, 8);

            _pidLabel.Text = "Excel PID: ---";
            _pidLabel.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            _pidLabel.ForeColor = Color.FromArgb(180, 220, 240);
            _pidLabel.Size = new Size(200, 20);
            _pidLabel.Location = new Point(15, 42);

            _sessionLabel.Text = "Session: ---";
            _sessionLabel.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            _sessionLabel.ForeColor = Color.FromArgb(180, 220, 240);
            _sessionLabel.Size = new Size(280, 20);
            _sessionLabel.Location = new Point(15, 62);

            _timeLabel.Text = DateTime.Now.ToString("HH:mm:ss");
            _timeLabel.Font = new Font("Segoe UI", 9f, FontStyle.Bold);
            _timeLabel.ForeColor = Color.FromArgb(200, 200, 100);
            _timeLabel.Size = new Size(80, 25);
            _timeLabel.Location = new Point(450, 12);

            _wbLabel.Text = "Workbook: (no workbook)";
            _wbLabel.Font = new Font("Segoe UI", 8f, FontStyle.Regular);
            _wbLabel.ForeColor = Color.FromArgb(150, 180, 200);
            _wbLabel.Size = new Size(400, 20);
            _wbLabel.Location = new Point(15, 82);

            _platformLabel.Text = "Platform: x64";
            _platformLabel.Font = new Font("Segoe UI", 8f, FontStyle.Regular);
            _platformLabel.ForeColor = Color.FromArgb(140, 160, 180);
            _platformLabel.Size = new Size(150, 20);
            _platformLabel.Location = new Point(450, 80);

            _stateLabel.Text = "状态：---";
            _stateLabel.Font = new Font("Segoe UI", 9f, FontStyle.Bold);
            _stateLabel.ForeColor = Color.FromArgb(56, 242, 255);
            _stateLabel.Size = new Size(250, 20);
            _stateLabel.Location = new Point(15, 102);

            _boundSessionLabel.Text = "Session: ---  Excel PID: ---";
            _boundSessionLabel.Font = new Font("Segoe UI", 8f, FontStyle.Regular);
            _boundSessionLabel.ForeColor = Color.FromArgb(140, 160, 180);
            _boundSessionLabel.Size = new Size(500, 20);
            _boundSessionLabel.Location = new Point(15, 120);

            _taskInstructionJa.Text = "";
            _taskInstructionJa.Font = new Font("Segoe UI", 9f, FontStyle.Bold);
            _taskInstructionJa.ForeColor = Color.FromArgb(255, 220, 100);
            _taskInstructionJa.Size = new Size(560, 36);
            _taskInstructionJa.Location = new Point(15, 148);
            _taskInstructionJa.Visible = false;

            _taskInstructionZh.Text = "";
            _taskInstructionZh.Font = new Font("Segoe UI", 8f, FontStyle.Regular);
            _taskInstructionZh.ForeColor = Color.FromArgb(180, 200, 210);
            _taskInstructionZh.Size = new Size(560, 30);
            _taskInstructionZh.Location = new Point(15, 186);
            _taskInstructionZh.Visible = false;

            _completeBtn.Text = "完了を記録する";
            _completeBtn.Font = new Font("Segoe UI", 9f, FontStyle.Bold);
            _completeBtn.ForeColor = Color.White;
            _completeBtn.BackColor = Color.FromArgb(29, 103, 69);
            _completeBtn.FlatStyle = FlatStyle.Flat;
            _completeBtn.Size = new Size(140, 32);
            _completeBtn.Location = new Point(15, 224);
            _completeBtn.Visible = false;
            _completeBtn.Click += (s, ev) => OnCompleteClicked?.Invoke();

            _completeStatus.Text = "";
            _completeStatus.Font = new Font("Segoe UI", 8f, FontStyle.Italic);
            _completeStatus.ForeColor = Color.FromArgb(160, 200, 180);
            _completeStatus.Size = new Size(400, 30);
            _completeStatus.Location = new Point(165, 226);
            _completeStatus.Visible = false;

            _scoreBtn.Text = "保存して採点する";
            _scoreBtn.Font = new Font("Segoe UI", 9f, FontStyle.Bold);
            _scoreBtn.ForeColor = Color.White;
            _scoreBtn.BackColor = Color.FromArgb(140, 90, 30);
            _scoreBtn.FlatStyle = FlatStyle.Flat;
            _scoreBtn.Size = new Size(150, 32);
            _scoreBtn.Location = new Point(15, 268);
            _scoreBtn.Visible = false;
            _scoreBtn.Click += (s, ev) => OnScoreClicked?.Invoke();

            _scoreResult.Text = "";
            _scoreResult.Font = new Font("Segoe UI", 8f, FontStyle.Regular);
            _scoreResult.ForeColor = Color.FromArgb(180, 200, 210);
            _scoreResult.Size = new Size(500, 48);
            _scoreResult.Location = new Point(175, 260);
            _scoreResult.Visible = false;

            _timer.Interval = 1000;
            _timer.Tick += OnTimerTick;
            _timer.Start();

            this.BackColor = Color.FromArgb(30, 40, 55);
            this.ForeColor = Color.FromArgb(200, 210, 220);
            this.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            this.Size = new Size(600, 310);

            this.Controls.Add(_titleLabel);
            this.Controls.Add(_pidLabel);
            this.Controls.Add(_sessionLabel);
            this.Controls.Add(_timeLabel);
            this.Controls.Add(_wbLabel);
            this.Controls.Add(_platformLabel);
            this.Controls.Add(_stateLabel);
            this.Controls.Add(_boundSessionLabel);
            this.Controls.Add(_taskInstructionJa);
            this.Controls.Add(_taskInstructionZh);
            this.Controls.Add(_completeBtn);
            this.Controls.Add(_completeStatus);
            this.Controls.Add(_scoreBtn);
            this.Controls.Add(_scoreResult);
        }
    }
}
