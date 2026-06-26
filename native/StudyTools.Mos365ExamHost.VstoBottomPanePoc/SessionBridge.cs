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
    }

    public class SessionBridge
    {
        private readonly string _baseUrl;
        private readonly JavaScriptSerializer _json;
        private int _retryCount;
        private const int MaxRetries = 5;
        private const int RetryDelayMs = 1500;
        private const int TimeoutMs = 2000;

        public SessionBridge() : this("http://127.0.0.1") { }

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
                try
                {
                    return TryVerify(workbookPath, excelPid);
                }
                catch (WebException ex)
                {
                    var statusCode = (ex.Response as HttpWebResponse)?.StatusCode;
                    // 4xx errors are final — don't retry
                    if (statusCode >= HttpStatusCode.BadRequest && statusCode < HttpStatusCode.InternalServerError)
                    {
                        var resp = (HttpWebResponse)ex.Response;
                        using (var reader = new StreamReader(resp.GetResponseStream(), Encoding.UTF8))
                        {
                            var body = reader.ReadToEnd();
                            return ParseError(body, (int)statusCode);
                        }
                    }
                    // 5xx or timeout — retry
                    _retryCount++;
                    if (_retryCount >= MaxRetries)
                    {
                        return new SessionVerificationResult
                        {
                            Ok = false,
                            ErrorCode = "HTTP_FAILED",
                            ErrorMessage = "验证服务不可用: " + ex.Message
                        };
                    }
                    System.Threading.Thread.Sleep(RetryDelayMs);
                }
                catch (Exception ex)
                {
                    _retryCount++;
                    if (_retryCount >= MaxRetries)
                    {
                        return new SessionVerificationResult
                        {
                            Ok = false,
                            ErrorCode = "HTTP_FAILED",
                            ErrorMessage = "验证请求失败: " + ex.Message
                        };
                    }
                    System.Threading.Thread.Sleep(RetryDelayMs);
                }
            }
            return new SessionVerificationResult { Ok = false, ErrorCode = "HTTP_FAILED", ErrorMessage = "重试耗尽" };
        }

        private SessionVerificationResult TryVerify(string workbookPath, int excelPid)
        {
            var payload = new
            {
                workbookPath = workbookPath,
                excelPid = excelPid,
                client = "vsto"
            };
            string jsonPayload = _json.Serialize(payload);

            var request = (HttpWebRequest)WebRequest.Create(_baseUrl + "/api/mos365/session/verify");
            request.Method = "POST";
            request.ContentType = "application/json";
            request.Timeout = TimeoutMs;
            var bytes = Encoding.UTF8.GetBytes(jsonPayload);
            request.ContentLength = bytes.Length;
            using (var stream = request.GetRequestStream())
            {
                stream.Write(bytes, 0, bytes.Length);
            }

            using (var response = (HttpWebResponse)request.GetResponse())
            {
                using (var reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                {
                    var body = reader.ReadToEnd();
                    var result = _json.Deserialize<VerifyResponse>(body);
                    if (result.ok)
                    {
                        return new SessionVerificationResult
                        {
                            Ok = true,
                            SessionId = result.session.sessionId,
                            State = result.session.state,
                            ExcelPid = result.session.excelPid
                        };
                    }
                    return new SessionVerificationResult
                    {
                        Ok = false,
                        ErrorCode = "REJECTED",
                        ErrorMessage = "服务端拒绝验证"
                    };
                }
            }
        }

        private SessionVerificationResult ParseError(string body, int statusCode)
        {
            try
            {
                var error = _json.Deserialize<ErrorResponse>(body);
                return new SessionVerificationResult
                {
                    Ok = false,
                    ErrorCode = error.error ?? ("HTTP_" + statusCode),
                    ErrorMessage = error.messageJa ?? ("HTTP " + statusCode)
                };
            }
            catch
            {
                return new SessionVerificationResult
                {
                    Ok = false,
                    ErrorCode = "HTTP_" + statusCode,
                    ErrorMessage = "HTTP " + statusCode
                };
            }
        }

        private class VerifyResponse
        {
            public bool ok { get; set; }
            public SessionData session { get; set; }
        }

        private class SessionData
        {
            public string sessionId { get; set; }
            public string state { get; set; }
            public int excelPid { get; set; }
            public string createdAt { get; set; }
        }

        private class ErrorResponse
        {
            public bool success { get; set; }
            public string error { get; set; }
            public string messageJa { get; set; }
            public string messageZh { get; set; }
        }
    }
}
