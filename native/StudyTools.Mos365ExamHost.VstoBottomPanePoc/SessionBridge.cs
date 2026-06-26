using System;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
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
        private readonly HttpClient _httpClient;

        // Retry: 3 attempts max, intervals 250ms / 750ms / 1500ms
        private const int MaxRetries = 3;
        private static readonly int[] RetryDelaysMs = { 250, 750, 1500 };
        private const int RequestTimeoutMs = 2500;

        public SessionBridge() : this("http://127.0.0.1:8765") { }

        public SessionBridge(string baseUrl)
        {
            _baseUrl = baseUrl;
            _json = new JavaScriptSerializer();
            _httpClient = new HttpClient
            {
                Timeout = TimeSpan.FromMilliseconds(RequestTimeoutMs)
            };
        }

        /// <summary>
        /// Async verify workbook against the training session.
        /// Uses up to 3 retries with progressive backoff.
        /// Respects CancellationToken for immediate cancellation on exit.
        /// </summary>
        public async Task<SessionVerificationResult> VerifyWorkbookAsync(
            string workbookPath, int excelPid,
            CancellationToken cancellationToken = default)
        {
            for (int attempt = 0; attempt < MaxRetries; attempt++)
            {
                cancellationToken.ThrowIfCancellationRequested();

                try
                {
                    return await TryVerifyAsync(workbookPath, excelPid, cancellationToken)
                        .ConfigureAwait(false);
                }
                catch (TaskCanceledException)
                {
                    // HttpClient timeout or user cancellation
                    if (cancellationToken.IsCancellationRequested)
                        return new SessionVerificationResult
                        {
                            Ok = false, ErrorCode = "CANCELLED",
                            ErrorMessage = "接続がキャンセルされました。"
                        };
                    if (attempt >= MaxRetries - 1)
                        return new SessionVerificationResult
                        {
                            Ok = false, ErrorCode = "TIMEOUT",
                            ErrorMessage = "接続がタイムアウトしました。"
                        };
                }
                catch (HttpRequestException ex)
                {
                    if (attempt >= MaxRetries - 1)
                    {
                        return new SessionVerificationResult
                        {
                            Ok = false, ErrorCode = "CONNECTION_FAILED",
                            ErrorMessage = "验证服务不可用: " + ex.Message
                        };
                    }
                }
                catch (Exception ex)
                {
                    if (attempt >= MaxRetries - 1)
                    {
                        return new SessionVerificationResult
                        {
                            Ok = false, ErrorCode = "CONNECTION_FAILED",
                            ErrorMessage = "验证请求失败: " + ex.Message
                        };
                    }
                }

                // Wait before retry (respect cancellation)
                try
                {
                    await Task.Delay(RetryDelaysMs[attempt], cancellationToken)
                        .ConfigureAwait(false);
                }
                catch (TaskCanceledException)
                {
                    return new SessionVerificationResult
                    {
                        Ok = false, ErrorCode = "TIMEOUT",
                        ErrorMessage = "接続がタイムアウトしました。"
                    };
                }
                catch (OperationCanceledException)
                {
                    return new SessionVerificationResult
                    {
                        Ok = false, ErrorCode = "CANCELLED",
                        ErrorMessage = "接続がキャンセルされました。"
                    };
                }
            }

            return new SessionVerificationResult
            {
                Ok = false, ErrorCode = "RETRIES_EXHAUSTED",
                ErrorMessage = "重试耗尽"
            };
        }

        private async Task<SessionVerificationResult> TryVerifyAsync(
            string workbookPath, int excelPid,
            CancellationToken cancellationToken)
        {
            var payload = new { workbookPath, excelPid, client = "vsto" };
            string jsonPayload = _json.Serialize(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(
                _baseUrl + "/api/mos365/session/verify", content, cancellationToken)
                .ConfigureAwait(false);

            var body = await response.Content.ReadAsStringAsync()
                .ConfigureAwait(false);

            if (!response.IsSuccessStatusCode)
            {
                return ParseError(body, (int)response.StatusCode);
            }

            var envelope = _json.Deserialize<ApiResponse<VerifyResponse>>(body);
            var result = envelope != null && envelope.success && envelope.data != null
                ? envelope.data
                : _json.Deserialize<VerifyResponse>(body);

            if (result != null && result.ok && result.session != null)
            {
                var vr = new SessionVerificationResult
                {
                    Ok = true,
                    SessionId = result.session.sessionId,
                    State = result.session.state,
                    ExcelPid = result.session.excelPid
                };
                if (result.session.training != null)
                {
                    vr.TaskId = result.session.training.taskId;
                    vr.InstructionJa = result.session.training.instructionJa;
                    vr.InstructionZh = result.session.training.instructionZh;
                    vr.CompletionAcknowledged = result.session.training.completionAcknowledged;
                }
                return vr;
            }

            return new SessionVerificationResult
            {
                Ok = false, ErrorCode = "REJECTED",
                ErrorMessage = "服务端拒绝验证"
            };
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

        /// <summary>
        /// Async send completion signal to the server.
        /// </summary>
        public async Task<SessionVerificationResult> SendCompletionAsync(
            string sessionId, int excelPid,
            CancellationToken cancellationToken = default)
        {
            var payload = new { sessionId, excelPid, client = "vsto" };
            string jsonPayload = _json.Serialize(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync(
                    _baseUrl + "/api/mos365/session/complete", content, cancellationToken)
                    .ConfigureAwait(false);
                return new SessionVerificationResult
                {
                    Ok = true, SessionId = sessionId, CompletionAcknowledged = true
                };
            }
            catch (Exception ex)
            {
                return new SessionVerificationResult
                {
                    Ok = false, ErrorCode = "CONNECTION_FAILED",
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Async send score request and get results.
        /// </summary>
        public async Task<SessionVerificationResult> SendScoreAsync(
            string sessionId, int excelPid,
            CancellationToken cancellationToken = default)
        {
            var payload = new { sessionId, excelPid, client = "vsto" };
            string jsonPayload = _json.Serialize(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync(
                    _baseUrl + "/api/mos365/session/score", content, cancellationToken)
                    .ConfigureAwait(false);
                var body = await response.Content.ReadAsStringAsync()
                    .ConfigureAwait(false);

                var envelope = _json.Deserialize<ApiResponse<ScoreResponse>>(body);
                var result = envelope != null && envelope.success && envelope.data != null
                    ? envelope.data
                    : _json.Deserialize<ScoreResponse>(body);

                if (result.ok && result.assessment != null)
                {
                    return new SessionVerificationResult
                    {
                        Ok = true, SessionId = sessionId,
                        Earned = result.assessment.earned,
                        Total = result.assessment.total,
                        ResultJa = result.resultJa,
                        ResultZh = result.resultZh
                    };
                }
                return new SessionVerificationResult
                {
                    Ok = false, ErrorCode = "REJECTED"
                };
            }
            catch (Exception ex)
            {
                return new SessionVerificationResult
                {
                    Ok = false, ErrorCode = "CONNECTION_FAILED",
                    ErrorMessage = ex.Message
                };
            }
        }

        /// <summary>
        /// Async end the training session.
        /// Short timeout — exit must not wait indefinitely.
        /// </summary>
        public async Task<SessionVerificationResult> EndSessionAsync(
            string sessionId, int excelPid,
            CancellationToken cancellationToken = default)
        {
            var payload = new { sessionId, excelPid, client = "vsto" };
            string jsonPayload = _json.Serialize(payload);

            // Use a short-lived cancellation token for session end
            using (var endCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken))
            {
                endCts.CancelAfter(3000); // Max 3 seconds for end

                try
                {
                    var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                    var response = await _httpClient.PostAsync(
                        _baseUrl + "/api/mos365/session/end", content, endCts.Token)
                        .ConfigureAwait(false);
                    var body = await response.Content.ReadAsStringAsync()
                        .ConfigureAwait(false);

                    var envelope = _json.Deserialize<ApiResponse<VerifyResponse>>(body);
                    var result = envelope != null && envelope.success && envelope.data != null
                        ? envelope.data
                        : _json.Deserialize<VerifyResponse>(body);

                    if (result != null && result.ok)
                    {
                        return new SessionVerificationResult
                        {
                            Ok = true, SessionId = sessionId, State = "ended"
                        };
                    }
                    return new SessionVerificationResult
                    {
                        Ok = false, ErrorCode = "REJECTED"
                    };
                }
                catch (OperationCanceledException)
                {
                    // Timeout or user cancellation — don't block exit
                    return new SessionVerificationResult
                    {
                        Ok = false, ErrorCode = "END_TIMEOUT",
                        ErrorMessage = "セッション終了がタイムアウトしました。"
                    };
                }
                catch (Exception ex)
                {
                    return new SessionVerificationResult
                    {
                        Ok = false, ErrorCode = "CONNECTION_FAILED",
                        ErrorMessage = ex.Message
                    };
                }
            }
        }

        private class ApiResponse<T>
        {
            public bool success { get; set; }
            public T data { get; set; }
            public string error { get; set; }
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
            public TrainingData training { get; set; }
        }

        private class TrainingData
        {
            public string mode { get; set; }
            public string taskId { get; set; }
            public string instructionJa { get; set; }
            public string instructionZh { get; set; }
            public bool completionAcknowledged { get; set; }
        }

        private class ScoreResponse
        {
            public bool ok { get; set; }
            public AssessmentData assessment { get; set; }
            public string resultJa { get; set; }
            public string resultZh { get; set; }
        }

        private class AssessmentData
        {
            public string type { get; set; }
            public string result { get; set; }
            public int earned { get; set; }
            public int total { get; set; }
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
