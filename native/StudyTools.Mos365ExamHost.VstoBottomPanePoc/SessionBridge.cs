using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;

namespace StudyTools.Mos365ExamHost
{
    public class SessionVerificationResult
    {
        public bool Ok { get; set; }
        public string SessionId { get; set; }
        public string State { get; set; }
        public int? ExcelPid { get; set; }
        public string ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string TaskId { get; set; }
        public string InstructionJa { get; set; }
        public string InstructionZh { get; set; }
        public bool CompletionAcknowledged { get; set; }
        public string ResultJa { get; set; }
        public string ResultZh { get; set; }
        public int Earned { get; set; }
        public int Total { get; set; }
        public bool FileSaved { get; set; }
    }

    public class SessionBridge
    {
        private readonly string _baseUrl;
        private readonly JavaScriptSerializer _json;
        private int _retryCount;
        private const int MaxRetries = 5;
        private const int RetryDelayMs = 1500;
        private const int TimeoutMs = 2000;

        public SessionBridge() : this("http://127.0.0.1:8080") { }

        public SessionBridge(string baseUrl)
        {
            _baseUrl = baseUrl;
            _json = new JavaScriptSerializer();
            _retryCount = 0;
        }

        public SessionVerificationResult VerifyWorkbook(string workbookPath, int excelPid)
        {
            _retryCount = 0;
            while (_retryCount < MaxRetries)
            {
                try { return TryVerify(workbookPath, excelPid); }
                catch (WebException ex)
                {
                    var statusCode = (ex.Response as HttpWebResponse)?.StatusCode;
                    if (statusCode >= HttpStatusCode.BadRequest && statusCode < HttpStatusCode.InternalServerError)
                    {
                        var resp = (HttpWebResponse)ex.Response;
                        using (var reader = new StreamReader(resp.GetResponseStream(), Encoding.UTF8))
                        {
                            return ParseError(reader.ReadToEnd(), (int)statusCode);
                        }
                    }
                    _retryCount++;
                    if (_retryCount >= MaxRetries)
                        return new SessionVerificationResult { Ok = false, ErrorCode = "CONNECTION_FAILED", ErrorMessage = "验证服务不可用: " + ex.Message };
                    System.Threading.Thread.Sleep(RetryDelayMs);
                }
                catch (Exception ex)
                {
                    _retryCount++;
                    if (_retryCount >= MaxRetries)
                        return new SessionVerificationResult { Ok = false, ErrorCode = "CONNECTION_FAILED", ErrorMessage = "验证请求失败: " + ex.Message };
                    System.Threading.Thread.Sleep(RetryDelayMs);
                }
            }
            return new SessionVerificationResult { Ok = false, ErrorCode = "CONNECTION_FAILED", ErrorMessage = "重试耗尽" };
        }

        private SessionVerificationResult TryVerify(string workbookPath, int excelPid)
        {
            var payload = new { workbookPath = workbookPath, excelPid = excelPid, client = "vsto" };
            string jsonPayload = _json.Serialize(payload);
            var request = (HttpWebRequest)WebRequest.Create(_baseUrl + "/api/mos365/session/verify");
            request.Method = "POST"; request.ContentType = "application/json"; request.Timeout = TimeoutMs;
            var bytes = Encoding.UTF8.GetBytes(jsonPayload); request.ContentLength = bytes.Length;
            using (var stream = request.GetRequestStream()) { stream.Write(bytes, 0, bytes.Length); }
            using (var response = (HttpWebResponse)request.GetResponse())
            using (var reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
            {
                var body = reader.ReadToEnd();
                var envelope = _json.Deserialize<ApiResponse<VerifyResponse>>(body);
                var result = envelope != null && envelope.success && envelope.data != null
                    ? envelope.data
                    : _json.Deserialize<VerifyResponse>(body);
                if (result != null && result.ok && result.session != null)
                {
                    var vr = new SessionVerificationResult { Ok = true, SessionId = result.session.sessionId, State = result.session.state, ExcelPid = result.session.excelPid };
                    if (result.session.training != null)
                    {
                        vr.TaskId = result.session.training.taskId;
                        vr.InstructionJa = result.session.training.instructionJa;
                        vr.InstructionZh = result.session.training.instructionZh;
                        vr.CompletionAcknowledged = result.session.training.completionAcknowledged;
                    }
                    return vr;
                }
                return new SessionVerificationResult { Ok = false, ErrorCode = "REJECTED", ErrorMessage = "服务端拒绝验证" };
            }
        }

        private SessionVerificationResult ParseError(string body, int statusCode)
        {
            try
            {
                var error = _json.Deserialize<ErrorResponse>(body);
                return new SessionVerificationResult { Ok = false, ErrorCode = error.error ?? ("HTTP_" + statusCode), ErrorMessage = error.messageJa ?? ("HTTP " + statusCode) };
            }
            catch
            {
                return new SessionVerificationResult { Ok = false, ErrorCode = "HTTP_" + statusCode, ErrorMessage = "HTTP " + statusCode };
            }
        }

        public SessionVerificationResult SendCompletion(string sessionId, int excelPid)
        {
            var payload = new { sessionId = sessionId, excelPid = excelPid, client = "vsto" };
            string jsonPayload = _json.Serialize(payload);
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(_baseUrl + "/api/mos365/session/complete");
                request.Method = "POST"; request.ContentType = "application/json"; request.Timeout = TimeoutMs;
                var bytes = Encoding.UTF8.GetBytes(jsonPayload); request.ContentLength = bytes.Length;
                using (var stream = request.GetRequestStream()) { stream.Write(bytes, 0, bytes.Length); }
                using (var response = (HttpWebResponse)request.GetResponse())
                using (var reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                    return new SessionVerificationResult { Ok = true, SessionId = sessionId, CompletionAcknowledged = true };
            }
            catch (WebException ex) { return new SessionVerificationResult { Ok = false, ErrorCode = "CONNECTION_FAILED", ErrorMessage = ex.Message }; }
            catch (Exception ex) { return new SessionVerificationResult { Ok = false, ErrorCode = "CONNECTION_FAILED", ErrorMessage = ex.Message }; }
        }

        public SessionVerificationResult SendScore(string sessionId, int excelPid)
        {
            var payload = new { sessionId = sessionId, excelPid = excelPid, client = "vsto" };
            string jsonPayload = _json.Serialize(payload);
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(_baseUrl + "/api/mos365/session/score");
                request.Method = "POST"; request.ContentType = "application/json"; request.Timeout = TimeoutMs;
                var bytes = Encoding.UTF8.GetBytes(jsonPayload); request.ContentLength = bytes.Length;
                using (var stream = request.GetRequestStream()) { stream.Write(bytes, 0, bytes.Length); }
                using (var response = (HttpWebResponse)request.GetResponse())
                using (var reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                {
                    var body = reader.ReadToEnd();
                    var envelope = _json.Deserialize<ApiResponse<ScoreResponse>>(body);
                    var result = envelope != null && envelope.success && envelope.data != null
                        ? envelope.data
                        : _json.Deserialize<ScoreResponse>(body);
                    if (result.ok && result.assessment != null)
                        return new SessionVerificationResult { Ok = true, SessionId = sessionId, Earned = result.assessment.earned, Total = result.assessment.total, ResultJa = result.resultJa, ResultZh = result.resultZh };
                    return new SessionVerificationResult { Ok = false, ErrorCode = "REJECTED" };
                }
            }
            catch (WebException ex) { return new SessionVerificationResult { Ok = false, ErrorCode = "CONNECTION_FAILED", ErrorMessage = ex.Message }; }
            catch (Exception ex) { return new SessionVerificationResult { Ok = false, ErrorCode = "CONNECTION_FAILED", ErrorMessage = ex.Message }; }
        }

        public SessionVerificationResult EndSession(string sessionId, int excelPid)
        {
            var payload = new { sessionId = sessionId, excelPid = excelPid, client = "vsto" };
            string jsonPayload = _json.Serialize(payload);
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(_baseUrl + "/api/mos365/session/end");
                request.Method = "POST"; request.ContentType = "application/json"; request.Timeout = TimeoutMs;
                var bytes = Encoding.UTF8.GetBytes(jsonPayload); request.ContentLength = bytes.Length;
                using (var stream = request.GetRequestStream()) { stream.Write(bytes, 0, bytes.Length); }
                using (var response = (HttpWebResponse)request.GetResponse())
                using (var reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                {
                    var body = reader.ReadToEnd();
                    var envelope = _json.Deserialize<ApiResponse<VerifyResponse>>(body);
                    var result = envelope != null && envelope.success && envelope.data != null
                        ? envelope.data
                        : _json.Deserialize<VerifyResponse>(body);
                    if (result != null && result.ok)
                        return new SessionVerificationResult { Ok = true, SessionId = sessionId, State = "ended" };
                    return new SessionVerificationResult { Ok = false, ErrorCode = "REJECTED" };
                }
            }
            catch (WebException ex) { return new SessionVerificationResult { Ok = false, ErrorCode = "CONNECTION_FAILED", ErrorMessage = ex.Message }; }
            catch (Exception ex) { return new SessionVerificationResult { Ok = false, ErrorCode = "CONNECTION_FAILED", ErrorMessage = ex.Message }; }
        }

        private class ApiResponse<T> { public bool success { get; set; } public T data { get; set; } public string error { get; set; } }
        private class VerifyResponse { public bool ok { get; set; } public SessionData session { get; set; } }
        private class SessionData { public string sessionId { get; set; } public string state { get; set; } public int excelPid { get; set; } public string createdAt { get; set; } public TrainingData training { get; set; } }
        private class TrainingData { public string mode { get; set; } public string taskId { get; set; } public string instructionJa { get; set; } public string instructionZh { get; set; } public bool completionAcknowledged { get; set; } }
        private class ScoreResponse { public bool ok { get; set; } public AssessmentData assessment { get; set; } public string resultJa { get; set; } public string resultZh { get; set; } }
        private class AssessmentData { public string type { get; set; } public string result { get; set; } public int earned { get; set; } public int total { get; set; } }
        private class ErrorResponse { public bool success { get; set; } public string error { get; set; } public string messageJa { get; set; } public string messageZh { get; set; } }
    }
}
