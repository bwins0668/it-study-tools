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
        private Timer _timer;

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

            _timer.Interval = 1000;
            _timer.Tick += OnTimerTick;
            _timer.Start();

            this.BackColor = Color.FromArgb(30, 40, 55);
            this.ForeColor = Color.FromArgb(200, 210, 220);
            this.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            this.Size = new Size(600, 110);

            this.Controls.Add(_titleLabel);
            this.Controls.Add(_pidLabel);
            this.Controls.Add(_sessionLabel);
            this.Controls.Add(_timeLabel);
            this.Controls.Add(_wbLabel);
            this.Controls.Add(_platformLabel);
            this.Controls.Add(_stateLabel);
            this.Controls.Add(_boundSessionLabel);
        }
    }
}
