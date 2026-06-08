"""AI providers and local learning analytics for Study Tools."""

from __future__ import annotations

import datetime as dt
import contextlib
import hashlib
import html
from html.parser import HTMLParser
import json
import os
import re
import sqlite3
import urllib.error
import urllib.parse
import urllib.request
import uuid


SUBJECTS = ("sql", "java", "python", "itpass", "sg")
DEFAULT_MODELS = {
    "gemini": "gemini-2.5-flash",
    "openai": "gpt-5-mini",
    "ollama": "",
}
PUBLIC_TRANSLATOR_PROVIDER = "public-google"
PUBLIC_TRANSLATOR_MODEL = "gtx"
TRANSLATION_CACHE_VERSION = "20260608_public_v2"


class ServiceError(Exception):
    def __init__(self, code, message, status=400, details=None):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status = status
        self.details = details

    def as_dict(self):
        error = {"code": self.code, "message": self.message}
        if self.details is not None:
            error["details"] = self.details
        return {"success": False, "error": error}


def _now():
    return dt.datetime.now(dt.timezone.utc).isoformat()


def _today():
    return dt.date.today().isoformat()


def _safe_json(value, fallback=None):
    if value in (None, ""):
        return fallback
    try:
        return json.loads(value)
    except (TypeError, json.JSONDecodeError):
        return fallback


class LearningStore:
    def __init__(self, db_path):
        self.db_path = db_path
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        self.initialize()

    def connect(self):
        conn = sqlite3.connect(self.db_path, timeout=10)
        conn.row_factory = sqlite3.Row
        return conn

    @contextlib.contextmanager
    def connection(self):
        conn = self.connect()
        try:
            with conn:
                yield conn
        finally:
            conn.close()

    def initialize(self):
        with self.connection() as conn:
            conn.executescript(
                """
                PRAGMA journal_mode=WAL;
                CREATE TABLE IF NOT EXISTS learning_events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    created_at TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    event_type TEXT NOT NULL,
                    item_id TEXT,
                    topic TEXT,
                    success INTEGER,
                    score REAL,
                    duration_ms INTEGER,
                    hint_count INTEGER NOT NULL DEFAULT 0,
                    error_type TEXT,
                    source TEXT NOT NULL DEFAULT 'official',
                    metadata_json TEXT NOT NULL DEFAULT '{}'
                );
                CREATE INDEX IF NOT EXISTS idx_learning_events_subject_time
                    ON learning_events(subject, created_at);
                CREATE INDEX IF NOT EXISTS idx_learning_events_topic
                    ON learning_events(subject, topic);

                CREATE TABLE IF NOT EXISTS daily_plans (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    plan_date TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    task_type TEXT NOT NULL,
                    title_zh TEXT NOT NULL,
                    title_ja TEXT NOT NULL,
                    item_id TEXT,
                    completed_at TEXT,
                    UNIQUE(plan_date, subject, task_type, item_id)
                );

                CREATE TABLE IF NOT EXISTS generated_questions (
                    id TEXT PRIMARY KEY,
                    created_at TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    topic TEXT,
                    difficulty INTEGER NOT NULL,
                    provider TEXT NOT NULL,
                    model TEXT NOT NULL,
                    status TEXT NOT NULL,
                    question_json TEXT NOT NULL,
                    validation_json TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS translation_cache (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL,
                    target_lang TEXT NOT NULL,
                    source_lang TEXT NOT NULL,
                    source_hash TEXT NOT NULL,
                    text_format TEXT NOT NULL,
                    provider TEXT NOT NULL,
                    model TEXT NOT NULL,
                    translated_text TEXT NOT NULL,
                    UNIQUE(target_lang, source_hash, text_format, provider, model)
                );
                CREATE INDEX IF NOT EXISTS idx_translation_cache_lookup
                    ON translation_cache(target_lang, source_hash, text_format, provider, model);

                CREATE TABLE IF NOT EXISTS app_metadata (
                    key TEXT PRIMARY KEY,
                    value TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );
                """
            )

    def get_translation_cache(self, target_lang, items, provider, model):
        if not items:
            return {}
        hashes = sorted({item["source_hash"] for item in items})
        placeholders = ",".join("?" for _ in hashes)
        params = [target_lang, provider or "", model or "", *hashes]
        with self.connection() as conn:
            rows = conn.execute(
                f"""
                SELECT source_hash, translated_text
                  FROM translation_cache
                 WHERE target_lang = ?
                   AND provider = ?
                   AND model = ?
                   AND source_hash IN ({placeholders})
                """,
                params,
            ).fetchall()
        return {row["source_hash"]: row["translated_text"] for row in rows}

    def save_translation_cache(self, target_lang, records, provider, model):
        if not records:
            return
        now = _now()
        with self.connection() as conn:
            conn.executemany(
                """
                INSERT INTO translation_cache(
                    created_at, updated_at, target_lang, source_lang, source_hash,
                    text_format, provider, model, translated_text
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(target_lang, source_hash, text_format, provider, model)
                DO UPDATE SET
                    updated_at = excluded.updated_at,
                    translated_text = excluded.translated_text
                """,
                [
                    (
                        now,
                        now,
                        target_lang,
                        record["source_lang"],
                        record["source_hash"],
                        record["format"],
                        provider or "",
                        model or "",
                        record["translated_text"],
                    )
                    for record in records
                ],
            )

    def record_event(self, body):
        subject = str(body.get("subject", "")).lower()
        if subject not in SUBJECTS:
            raise ServiceError("INVALID_SUBJECT", "不支持的科目。")
        event_type = str(body.get("eventType", "")).strip()
        if not event_type:
            raise ServiceError("INVALID_EVENT", "eventType 不能为空。")

        metadata = body.get("metadata") or {}
        if not isinstance(metadata, dict):
            metadata = {}
        with self.connection() as conn:
            cursor = conn.execute(
                """
                INSERT INTO learning_events (
                    created_at, subject, event_type, item_id, topic, success,
                    score, duration_ms, hint_count, error_type, source, metadata_json
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    _now(),
                    subject,
                    event_type[:80],
                    str(body.get("itemId", ""))[:160] or None,
                    str(body.get("topic", ""))[:240] or None,
                    None if body.get("success") is None else int(bool(body.get("success"))),
                    body.get("score"),
                    body.get("durationMs"),
                    int(body.get("hintCount") or 0),
                    str(body.get("errorType", ""))[:120] or None,
                    str(body.get("source", "official"))[:40],
                    json.dumps(metadata, ensure_ascii=False),
                ),
            )
            return {"id": cursor.lastrowid, "createdAt": _now()}

    def import_progress(self, body):
        progress = body.get("progress") or {}
        with self.connection() as conn:
            imported = conn.execute(
                "SELECT value FROM app_metadata WHERE key = 'local_storage_import_v1'"
            ).fetchone()
            if imported:
                return {"imported": False, "reason": "already_imported"}

            count = 0
            for subject in SUBJECTS:
                values = progress.get(subject) or []
                if not isinstance(values, list):
                    continue
                for item_id in values:
                    conn.execute(
                        """
                        INSERT INTO learning_events (
                            created_at, subject, event_type, item_id, success, score,
                            source, metadata_json
                        ) VALUES (?, ?, 'lesson_complete', ?, 1, 100, 'legacy_import', '{}')
                        """,
                        (_now(), subject, str(item_id)),
                    )
                    count += 1
            conn.execute(
                """
                INSERT OR REPLACE INTO app_metadata(key, value, updated_at)
                VALUES ('local_storage_import_v1', ?, ?)
                """,
                (json.dumps({"count": count}), _now()),
            )
        return {"imported": True, "count": count}

    def _subject_stats(self, conn, subject):
        rows = conn.execute(
            """
            SELECT success, score, duration_ms, hint_count, event_type, topic, error_type
            FROM learning_events WHERE subject = ?
            ORDER BY id DESC LIMIT 500
            """,
            (subject,),
        ).fetchall()
        attempts = [r for r in rows if r["success"] is not None]
        successes = sum(1 for r in attempts if r["success"])
        accuracy = round(successes * 100 / len(attempts)) if attempts else 0
        scored = [float(r["score"]) for r in rows if r["score"] is not None]
        avg_score = round(sum(scored) / len(scored), 1) if scored else accuracy
        hints = sum(int(r["hint_count"] or 0) for r in rows)
        penalty = min(20, hints * 0.5)
        mastery = max(0, min(100, round((accuracy * 0.55 + avg_score * 0.45) - penalty)))
        completed = len(
            {
                (r["event_type"], r["topic"])
                for r in rows
                if r["event_type"] == "lesson_complete" and r["topic"]
            }
        )
        return {
            "subject": subject,
            "mastery": mastery,
            "accuracy": accuracy,
            "averageScore": avg_score,
            "attempts": len(attempts),
            "completedItems": completed,
            "hintsUsed": hints,
        }

    def _ensure_daily_plan(self, conn, subject_stats):
        today = _today()
        exists = conn.execute(
            "SELECT 1 FROM daily_plans WHERE plan_date = ? LIMIT 1", (today,)
        ).fetchone()
        if exists:
            return
        weakest = sorted(subject_stats, key=lambda item: item["mastery"])[:2]
        tasks = []
        for item in weakest:
            tasks.append(
                (
                    today,
                    item["subject"],
                    "adaptive_practice",
                    f"完成 5 道 {item['subject'].upper()} 弱项练习",
                    f"{item['subject'].upper()} の弱点問題を5問練習する",
                    "adaptive",
                )
            )
        tasks.append(
            (
                today,
                weakest[0]["subject"] if weakest else "sql",
                "review_errors",
                "复习最近错题并重新作答",
                "最近の誤答を復習して再回答する",
                "recent-errors",
            )
        )
        conn.executemany(
            """
            INSERT OR IGNORE INTO daily_plans(
                plan_date, subject, task_type, title_zh, title_ja, item_id
            ) VALUES (?, ?, ?, ?, ?, ?)
            """,
            tasks,
        )

    def dashboard(self):
        with self.connection() as conn:
            subjects = [self._subject_stats(conn, subject) for subject in SUBJECTS]
            self._ensure_daily_plan(conn, subjects)
            plan_rows = conn.execute(
                """
                SELECT id, subject, task_type, title_zh, title_ja, item_id, completed_at
                FROM daily_plans WHERE plan_date = ? ORDER BY id
                """,
                (_today(),),
            ).fetchall()
            weak_rows = conn.execute(
                """
                SELECT subject, COALESCE(topic, error_type, '未分类') AS topic,
                       COUNT(*) AS attempts,
                       SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) AS failures
                FROM learning_events
                WHERE success IS NOT NULL
                GROUP BY subject, COALESCE(topic, error_type, '未分类')
                HAVING failures > 0
                ORDER BY failures DESC, attempts DESC LIMIT 8
                """
            ).fetchall()
            trend_rows = conn.execute(
                """
                SELECT substr(created_at, 1, 10) AS day,
                       ROUND(AVG(COALESCE(score, success * 100)), 1) AS score
                FROM learning_events
                WHERE created_at >= datetime('now', '-13 days')
                  AND (score IS NOT NULL OR success IS NOT NULL)
                GROUP BY substr(created_at, 1, 10)
                ORDER BY day
                """
            ).fetchall()
            active_days = {
                row["day"]
                for row in conn.execute(
                    "SELECT DISTINCT substr(created_at, 1, 10) AS day FROM learning_events"
                ).fetchall()
            }

        streak = 0
        cursor = dt.date.today()
        while cursor.isoformat() in active_days:
            streak += 1
            cursor -= dt.timedelta(days=1)
        overall = round(sum(item["mastery"] for item in subjects) / len(subjects))
        return {
            "overallMastery": overall,
            "streakDays": streak,
            "subjects": subjects,
            "weakTopics": [dict(row) for row in weak_rows],
            "trend": [dict(row) for row in trend_rows],
            "todayPlan": [dict(row) for row in plan_rows],
        }

    def recommendations(self):
        dashboard = self.dashboard()
        weakest = sorted(dashboard["subjects"], key=lambda item: item["mastery"])
        recommendations = []
        for item in weakest[:3]:
            recommendations.append(
                {
                    "subject": item["subject"],
                    "priority": "high" if item["mastery"] < 50 else "medium",
                    "titleZh": f"优先巩固 {item['subject'].upper()}",
                    "titleJa": f"{item['subject'].upper()} を優先して復習",
                    "reasonZh": f"当前掌握度 {item['mastery']}%，建议先复习错题，再做自适应练习。",
                    "reasonJa": f"現在の習熟度は {item['mastery']}%。誤答復習後に適応問題を練習しましょう。",
                }
            )
        return {"recommendations": recommendations, "generatedLocally": True}

    def complete_plan(self, body):
        plan_id = body.get("id")
        if not plan_id:
            raise ServiceError("INVALID_PLAN", "缺少计划 ID。")
        with self.connection() as conn:
            row = conn.execute(
                "SELECT * FROM daily_plans WHERE id = ?", (plan_id,)
            ).fetchone()
            if not row:
                raise ServiceError("PLAN_NOT_FOUND", "未找到学习计划。", 404)
            conn.execute(
                "UPDATE daily_plans SET completed_at = ? WHERE id = ?",
                (_now(), plan_id),
            )
        self.record_event(
            {
                "subject": row["subject"],
                "eventType": "plan_complete",
                "itemId": row["item_id"],
                "topic": row["task_type"],
                "success": True,
                "score": 100,
            }
        )
        return {"id": plan_id, "completedAt": _now()}

    def save_generated_question(
        self, subject, topic, difficulty, provider, model, question, validation
    ):
        question_id = "ai-" + uuid.uuid4().hex[:16]
        question["id"] = question_id
        with self.connection() as conn:
            conn.execute(
                """
                INSERT INTO generated_questions(
                    id, created_at, subject, topic, difficulty, provider, model,
                    status, question_json, validation_json
                ) VALUES (?, ?, ?, ?, ?, ?, ?, 'validated', ?, ?)
                """,
                (
                    question_id,
                    _now(),
                    subject,
                    topic,
                    difficulty,
                    provider,
                    model,
                    json.dumps(question, ensure_ascii=False),
                    json.dumps(validation, ensure_ascii=False),
                ),
            )
        return question


def _request_json(url, payload=None, headers=None, timeout=30, method=None):
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        headers=headers or {},
        method=method or ("POST" if data is not None else "GET"),
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8", errors="replace")
        parsed = _safe_json(raw, {})
        message = (
            parsed.get("error", {}).get("message")
            if isinstance(parsed.get("error"), dict)
            else raw[:500]
        )
        if exc.code in (401, 403):
            code = "AUTH_FAILED"
        elif exc.code == 404:
            code = "MODEL_NOT_FOUND"
        elif exc.code == 429:
            code = "RATE_LIMITED"
        else:
            code = "PROVIDER_ERROR"
        raise ServiceError(code, message or f"AI 服务返回 HTTP {exc.code}", 502)
    except TimeoutError:
        raise ServiceError("AI_TIMEOUT", "AI 服务请求超时。", 504)
    except urllib.error.URLError as exc:
        reason = str(exc.reason)
        code = "SERVICE_UNAVAILABLE"
        raise ServiceError(code, f"无法连接 AI 服务：{reason}", 503)
    except json.JSONDecodeError:
        raise ServiceError("INVALID_PROVIDER_RESPONSE", "AI 服务返回了无效 JSON。", 502)


def provider_status(ollama_url="http://127.0.0.1:11434"):
    providers = [
        {
            "id": "gemini",
            "configured": bool(
                os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
            ),
            "defaultModel": DEFAULT_MODELS["gemini"],
            "models": [DEFAULT_MODELS["gemini"]],
        },
        {
            "id": "openai",
            "configured": bool(os.environ.get("OPENAI_API_KEY")),
            "defaultModel": DEFAULT_MODELS["openai"],
            "models": [DEFAULT_MODELS["openai"]],
        },
    ]
    ollama = {
        "id": "ollama",
        "configured": False,
        "defaultModel": "",
        "models": [],
    }
    try:
        data = _request_json(ollama_url.rstrip("/") + "/api/tags", timeout=1.5)
        models = [
            item.get("name")
            for item in data.get("models", [])
            if item.get("name")
        ]
        ollama.update(
            {
                "configured": True,
                "models": models,
                "defaultModel": models[0] if models else "",
            }
        )
    except ServiceError:
        pass
    providers.append(ollama)
    return {"providers": providers}


def _normalize_messages(messages):
    cleaned = []
    for item in (messages or [])[-16:]:
        if not isinstance(item, dict):
            continue
        role = item.get("role")
        content = str(item.get("content", "")).strip()
        if role in ("user", "assistant", "system") and content:
            cleaned.append({"role": role, "content": content[:12000]})
    return cleaned


def call_provider(provider, model, messages, api_key="", ollama_url=""):
    provider = (provider or "").lower()
    model = model or DEFAULT_MODELS.get(provider, "")
    messages = _normalize_messages(messages)
    if not messages:
        raise ServiceError("INVALID_MESSAGES", "消息内容不能为空。")

    if provider == "openai":
        key = api_key or os.environ.get("OPENAI_API_KEY")
        if not key:
            raise ServiceError("API_KEY_MISSING", "缺少 OpenAI API Key。")
        data = _request_json(
            "https://api.openai.com/v1/responses",
            {"model": model, "input": messages},
            {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {key}",
            },
            timeout=45,
        )
        text = data.get("output_text", "")
        if not text:
            chunks = []
            for output in data.get("output", []):
                for content in output.get("content", []):
                    if content.get("type") in ("output_text", "text"):
                        chunks.append(content.get("text", ""))
            text = "\n".join(chunks)
    elif provider == "gemini":
        key = (
            api_key
            or os.environ.get("GEMINI_API_KEY")
            or os.environ.get("GOOGLE_API_KEY")
        )
        if not key:
            raise ServiceError("API_KEY_MISSING", "缺少 Gemini API Key。")
        url = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            + urllib.parse.quote(model, safe="")
            + ":generateContent?key="
            + urllib.parse.quote(key, safe="")
        )
        system_parts = [m["content"] for m in messages if m["role"] == "system"]
        contents = []
        for item in messages:
            if item["role"] == "system":
                continue
            contents.append(
                {
                    "role": "model" if item["role"] == "assistant" else "user",
                    "parts": [{"text": item["content"]}],
                }
            )
        payload = {"contents": contents}
        if system_parts:
            payload["systemInstruction"] = {
                "parts": [{"text": "\n".join(system_parts)}]
            }
        data = _request_json(
            url, payload, {"Content-Type": "application/json"}, timeout=45
        )
        candidates = data.get("candidates") or []
        parts = candidates[0].get("content", {}).get("parts", []) if candidates else []
        text = "\n".join(part.get("text", "") for part in parts)
    elif provider == "ollama":
        base = (ollama_url or "http://127.0.0.1:11434").rstrip("/")
        if not model:
            status = provider_status(base)["providers"][-1]
            model = status["defaultModel"]
        if not model:
            raise ServiceError("MODEL_NOT_FOUND", "Ollama 中没有已安装模型。")
        data = _request_json(
            base + "/api/chat",
            {"model": model, "messages": messages, "stream": False},
            {"Content-Type": "application/json"},
            timeout=120,
        )
        text = data.get("message", {}).get("content", "")
    else:
        raise ServiceError("INVALID_PROVIDER", "不支持的 AI Provider。")

    if not str(text).strip():
        raise ServiceError("EMPTY_AI_RESPONSE", "AI 没有返回有效内容。", 502)
    return {"provider": provider, "model": model, "text": str(text).strip()}


def _translation_hash(source_lang, text_format, text):
    payload = "\0".join([
        TRANSLATION_CACHE_VERSION,
        source_lang or "auto",
        text_format or "text",
        text or "",
    ])
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def _parse_translation_payload(text):
    cleaned = str(text or "").strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.I)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    try:
        payload = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        match = re.search(r"\{.*\}", cleaned, flags=re.S)
        if not match:
            raise ServiceError(
                "INVALID_TRANSLATION_RESPONSE",
                "AI 翻译结果不是有效 JSON。",
                502,
            ) from exc
        try:
            payload = json.loads(match.group(0))
        except json.JSONDecodeError as inner_exc:
            raise ServiceError(
                "INVALID_TRANSLATION_RESPONSE",
                "AI 翻译结果 JSON 解析失败。",
                502,
            ) from inner_exc
    if not isinstance(payload, dict) or not isinstance(payload.get("items"), list):
        raise ServiceError(
            "INVALID_TRANSLATION_RESPONSE",
            "AI 翻译结果缺少 items 数组。",
            502,
        )
    translations = {}
    for item in payload["items"]:
        if isinstance(item, dict) and "id" in item and "text" in item:
            translations[str(item["id"])] = str(item["text"])
    return translations


def _build_translation_messages(target_lang, target_label, items):
    compact_items = [
        {
            "id": item["id"],
            "sourceLang": item["source_lang"],
            "format": item["format"],
            "context": item.get("context", ""),
            "text": item["text"],
        }
        for item in items
    ]
    system = (
        "You are the translation engine for a Japanese-first study app. "
        "Translate every item into the requested target language. "
        "Preserve code blocks, SQL/Java/Python keywords, table names, variable names, "
        "HTML tag structure, Markdown syntax, numbers, and placeholders. "
        "Do not add explanations. Return strict JSON only."
    )
    user = json.dumps(
        {
            "targetLanguageCode": target_lang,
            "targetLanguageName": target_label or target_lang,
            "outputSchema": {"items": [{"id": "same id", "text": "translated text"}]},
            "items": compact_items,
        },
        ensure_ascii=False,
    )
    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ]


def _translation_lang_code(lang):
    aliases = {
        "default-ja-zh": "zh-CN",
        "zh": "zh-CN",
        "zh-hans": "zh-CN",
        "zh-cn": "zh-CN",
        "zh-hant": "zh-TW",
        "zh-tw": "zh-TW",
        "ja": "ja",
        "auto": "auto",
    }
    value = str(lang or "auto").strip()
    return aliases.get(value.lower(), value)


def _has_explicit_ai_credentials(provider, api_key):
    provider = (provider or "").lower()
    if api_key:
        return True
    if provider == "openai":
        return bool(os.environ.get("OPENAI_API_KEY"))
    if provider == "gemini":
        return bool(os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"))
    return provider == "ollama"


def _can_public_translate_fallback(error):
    return getattr(error, "code", "") in {
        "API_KEY_MISSING",
        "AUTH_FAILED",
        "MODEL_NOT_FOUND",
        "INVALID_PROVIDER",
        "AI_TIMEOUT",
        "SERVICE_UNAVAILABLE",
        "PROVIDER_ERROR",
        "RATE_LIMITED",
        "INVALID_PROVIDER_RESPONSE",
        "EMPTY_AI_RESPONSE",
    }


def _public_translate_chunk(text, target_lang, source_lang="auto"):
    text = str(text or "")
    if not text.strip():
        return text
    params = urllib.parse.urlencode(
        {
            "client": "gtx",
            "sl": _translation_lang_code(source_lang),
            "tl": _translation_lang_code(target_lang),
            "dt": "t",
            "q": text,
        }
    )
    data = _request_json(
        "https://translate.googleapis.com/translate_a/single?" + params,
        timeout=12,
        method="GET",
    )
    try:
        return "".join(part[0] for part in data[0] if part and part[0])
    except Exception as exc:
        raise ServiceError(
            "PUBLIC_TRANSLATION_FAILED",
            "免配置翻译服务暂时不可用。",
            502,
        ) from exc


def _split_translate_text(text, target_lang, source_lang="auto", max_len=1200):
    text = str(text or "")
    if len(text) <= max_len:
        return _public_translate_chunk(text, target_lang, source_lang)
    parts = re.split(r"(\n\s*\n)", text)
    output = []
    buffer = ""
    for part in parts:
        if len(buffer) + len(part) <= max_len:
            buffer += part
            continue
        if buffer:
            output.append(_public_translate_chunk(buffer, target_lang, source_lang))
        buffer = part
    if buffer:
        output.append(_public_translate_chunk(buffer, target_lang, source_lang))
    return "".join(output)


class _PublicHtmlTranslator(HTMLParser):
    SKIP_TAGS = {"code", "pre", "kbd", "samp", "var", "script", "style"}
    SPACED_INLINE_TAGS = {"strong", "b", "em", "i", "span"}

    def __init__(self, target_lang, source_lang):
        super().__init__(convert_charrefs=False)
        self.target_lang = target_lang
        self.source_lang = source_lang
        self.parts = []
        self.skip_depth = 0

    def _space_if_needed(self):
        if self.parts and self.parts[-1] and not self.parts[-1][-1].isspace():
            self.parts.append(" ")

    def _attrs(self, attrs):
        rendered = []
        for key, value in attrs:
            if value is None:
                rendered.append(key)
            else:
                rendered.append(f'{key}="{html.escape(value, quote=True)}"')
        return (" " + " ".join(rendered)) if rendered else ""

    def handle_starttag(self, tag, attrs):
        if tag.lower() in self.SPACED_INLINE_TAGS:
            self._space_if_needed()
        if tag.lower() in self.SKIP_TAGS:
            self.skip_depth += 1
        self.parts.append(f"<{tag}{self._attrs(attrs)}>")

    def handle_startendtag(self, tag, attrs):
        self.parts.append(f"<{tag}{self._attrs(attrs)} />")

    def handle_endtag(self, tag):
        self.parts.append(f"</{tag}>")
        if tag.lower() in self.SKIP_TAGS and self.skip_depth:
            self.skip_depth -= 1
        if tag.lower() in self.SPACED_INLINE_TAGS:
            self.parts.append(" ")

    def handle_data(self, data):
        if self.skip_depth or not data.strip():
            self.parts.append(data)
            return
        leading = re.match(r"^\s*", data).group(0)
        trailing = re.search(r"\s*$", data).group(0)
        core = data[len(leading):len(data) - len(trailing) if trailing else len(data)]
        translated = _split_translate_text(core, self.target_lang, self.source_lang)
        self.parts.append(leading + html.escape(translated, quote=False) + trailing)

    def handle_entityref(self, name):
        self.parts.append(f"&{name};")

    def handle_charref(self, name):
        self.parts.append(f"&#{name};")

    def handle_comment(self, data):
        self.parts.append(f"<!--{data}-->")

    def result(self):
        return "".join(self.parts)


def _public_translate_item_text(item, target_lang):
    text = item["text"]
    source_lang = item.get("source_lang", "auto")
    if item["format"] == "html":
        parser = _PublicHtmlTranslator(target_lang, source_lang)
        parser.feed(text)
        parser.close()
        return parser.result()
    return _split_translate_text(text, target_lang, source_lang)


def _translate_missing_with_public(target_lang, items):
    records = []
    for item in items:
        translated_text = ""
        for _attempt in range(2):
            try:
                translated_text = _public_translate_item_text(item, target_lang)
                break
            except ServiceError:
                translated_text = ""
        if not translated_text:
            continue
        records.append(
            {
                "id": item["id"],
                "key": item["key"],
                "source_lang": item["source_lang"],
                "source_hash": item["source_hash"],
                "format": item["format"],
                "translated_text": translated_text,
            }
        )
    return records


def translate_items(body, learning_store):
    target_lang = str(body.get("targetLang", "")).strip()
    target_label = str(body.get("targetLabel", "")).strip()
    if not target_lang or target_lang == "default-ja-zh":
        return {"items": [], "provider": "", "model": ""}

    raw_items = body.get("items") or []
    if not isinstance(raw_items, list):
        raise ServiceError("INVALID_TRANSLATION_ITEMS", "翻译项目必须是数组。")

    provider = str(body.get("provider") or "gemini").strip().lower()
    model = str(body.get("model") or DEFAULT_MODELS.get(provider, "")).strip()
    api_key = str(body.get("apiKey") or "")
    ollama_url = str(body.get("ollamaUrl") or "")
    use_public_first = not _has_explicit_ai_credentials(provider, api_key)
    cache_provider = PUBLIC_TRANSLATOR_PROVIDER if use_public_first else provider
    cache_model = PUBLIC_TRANSLATOR_MODEL if use_public_first else model

    items = []
    for index, raw in enumerate(raw_items[:80]):
        if not isinstance(raw, dict):
            continue
        text = str(raw.get("text") or "").strip()
        if not text:
            continue
        text_format = str(raw.get("format") or "text").lower()
        if text_format not in ("text", "html", "markdown"):
            text_format = "text"
        source_lang = str(raw.get("sourceLang") or "auto").strip() or "auto"
        item_id = str(raw.get("id") or f"item-{index}")
        item = {
            "id": item_id,
            "key": str(raw.get("key") or item_id),
            "source_lang": source_lang,
            "format": text_format,
            "context": str(raw.get("context") or "")[:500],
            "text": text[:16000],
        }
        item["source_hash"] = _translation_hash(
            item["source_lang"], item["format"], item["text"]
        )
        items.append(item)

    if not items:
        return {"items": [], "provider": provider, "model": model}

    cached = learning_store.get_translation_cache(
        target_lang, items, cache_provider, cache_model
    )
    translated_by_hash = dict(cached)
    missing = [item for item in items if item["source_hash"] not in translated_by_hash]

    if missing:
        if use_public_first:
            provider = PUBLIC_TRANSLATOR_PROVIDER
            model = PUBLIC_TRANSLATOR_MODEL
            cache_records = _translate_missing_with_public(target_lang, missing)
        else:
            try:
                result = call_provider(
                    provider,
                    model,
                    _build_translation_messages(target_lang, target_label, missing),
                    api_key,
                    ollama_url,
                )
                provider = result["provider"]
                model = result["model"]
                parsed = _parse_translation_payload(result["text"])
                cache_records = []
                for item in missing:
                    translated = parsed.get(item["id"], "").strip()
                    if not translated:
                        continue
                    cache_records.append(
                        {
                            "source_lang": item["source_lang"],
                            "source_hash": item["source_hash"],
                            "format": item["format"],
                            "translated_text": translated,
                        }
                    )
            except ServiceError as exc:
                if not _can_public_translate_fallback(exc):
                    raise
                provider = PUBLIC_TRANSLATOR_PROVIDER
                model = PUBLIC_TRANSLATOR_MODEL
                public_cached = learning_store.get_translation_cache(
                    target_lang, missing, provider, model
                )
                translated_by_hash.update(public_cached)
                still_missing = [
                    item for item in missing
                    if item["source_hash"] not in translated_by_hash
                ]
                cache_records = _translate_missing_with_public(target_lang, still_missing)

        for record in cache_records:
            translated_by_hash[record["source_hash"]] = record["translated_text"]
        learning_store.save_translation_cache(target_lang, cache_records, provider, model)

    response_items = []
    for item in items:
        translated = translated_by_hash.get(item["source_hash"])
        if translated:
            response_items.append(
                {
                    "id": item["id"],
                    "key": item["key"],
                    "text": translated,
                    "cached": item["source_hash"] in cached,
                }
            )

    return {"items": response_items, "provider": provider, "model": model}


def build_tutor_messages(body):
    action = body.get("action", "chat")
    hint_level = max(1, min(3, int(body.get("hintLevel") or 1)))
    context = body.get("context") or {}
    action_rules = {
        "debug": "定位错误，解释根因，给修改步骤。不要直接重写全部答案。",
        "explain": "按关键语句解释代码目的、数据流和重要语法。",
        "trace": "用编号步骤模拟执行过程，展示关键变量和输出变化。",
        "hint": (
            "这是第 %d 级提示。1级只给方向且禁止代码答案；"
            "2级给伪代码或带空格的结构；3级才可给接近完整的参考代码。" % hint_level
        ),
        "coach": "根据学习数据总结弱项，并给出今天可执行的学习安排。",
        "review": "讲解错题原因、正确思路和一个相近变式，不泄露其他考试题。",
        "chat": "回答学生问题，并优先结合当前课程上下文。",
    }
    system = (
        "你是 Study Tools 的中日双语学习导师。先用中文清楚回答，再给简洁日文摘要。"
        "面向初学者，语气友好、准确，明确区分事实与建议。"
        + action_rules.get(action, action_rules["chat"])
    )
    context_text = json.dumps(context, ensure_ascii=False)[:24000]
    messages = [{"role": "system", "content": system}]
    messages.extend(_normalize_messages(body.get("messages")))
    messages.append(
        {
            "role": "user",
            "content": "当前学习上下文：\n" + context_text,
        }
    )
    return messages


def _extract_json(text):
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start >= 0 and end > start:
            try:
                return json.loads(text[start : end + 1])
            except json.JSONDecodeError:
                pass
    raise ServiceError("GENERATION_VALIDATION_FAILED", "AI 返回的题目不是有效 JSON。")


def _question_prompt(subject, topic, difficulty, source_context):
    common = (
        "生成一道原创学习题。必须直接返回单个 JSON 对象，不要 Markdown。"
        "所有题干和解释必须同时包含中文与日文，不得声称是官方真题。"
        f"科目={subject}; 知识点={topic}; 难度={difficulty}/3。\n"
        f"可参考的本地课程摘要：{source_context[:12000]}\n"
    )
    if subject == "sql":
        return common + (
            '字段必须为: {"type":"implement","dbGroup":"school或shop",'
            '"titleZh":"","titleJa":"","taskZh":"","taskJa":"","solutionQuery":"","hintZh":"","hintJa":""}。'
            "只能使用 school 的 students_mst/departments_mst，或 shop 的 books/cats/members/orders。"
            "标准答案只能是单条 SELECT。"
        )
    if subject in ("java", "python"):
        return common + (
            '{"type":"implement","titleZh":"","titleJa":"","taskZh":"","taskJa":"",'
            '"templateCode":"","solutionCode":"","stdinExample":"","expectedOutput":"",'
            '"hintZh":"","hintJa":""}。标准答案必须可独立运行，输出必须与 expectedOutput 一致。'
        )
    return common + (
        '{"type":"choice","titleZh":"","titleJa":"","questionZh":"","questionJa":"",'
        '"optionsZh":["","","",""],"optionsJa":["","","",""],"answer":0,'
        '"explanationZh":"","explanationJa":""}。answer 必须是 0 到 3，且只能有一个最佳答案。'
    )


def _create_sql_fixture(db_group):
    conn = sqlite3.connect(":memory:")
    if db_group == "school":
        conn.executescript(
            """
            CREATE TABLE students_mst(
                student_id INTEGER, student_name TEXT, student_name_kana TEXT,
                student_number INTEGER, department_id INTEGER, gender INTEGER,
                age INTEGER, test_score INTEGER, insert_at TEXT, update_at TEXT,
                delete_at TEXT
            );
            CREATE TABLE departments_mst(
                department_id INTEGER, department_name TEXT, insert_at TEXT,
                update_at TEXT, delete_at TEXT
            );
            INSERT INTO students_mst VALUES
                (1,'A','A',20110401,1,0,20,90,'2026-01-01','2026-01-01',NULL),
                (2,'B','B',20110402,2,1,25,70,'2026-01-01','2026-01-01',NULL);
            INSERT INTO departments_mst VALUES
                (1,'IT','2026-01-01','2026-01-01',NULL),
                (2,'Business','2026-01-01','2026-01-01',NULL);
            """
        )
    else:
        conn.executescript(
            """
            CREATE TABLE books(book_id INTEGER,title TEXT,author TEXT,price INTEGER,stock INTEGER,cat_id INTEGER);
            CREATE TABLE cats(cat_id INTEGER,cat_name TEXT);
            CREATE TABLE members(mem_id INTEGER,name TEXT,age INTEGER,gender TEXT,city TEXT);
            CREATE TABLE orders(order_id INTEGER,mem_id INTEGER,book_id INTEGER,qty INTEGER,total INTEGER);
            INSERT INTO books VALUES (1,'SQL','A',2800,5,2),(2,'Python','B',3200,3,2);
            INSERT INTO cats VALUES (1,'Literature'),(2,'Technology');
            INSERT INTO members VALUES (1,'Alice',22,'F','Tokyo'),(2,'Bob',30,'M','Osaka');
            INSERT INTO orders VALUES (1,1,1,1,2800),(2,2,2,1,3200);
            """
        )
    return conn


def validate_question(subject, question, run_java, run_python):
    required_bilingual = ("titleZh", "titleJa")
    for field in required_bilingual:
        if not str(question.get(field, "")).strip():
            raise ServiceError(
                "GENERATION_VALIDATION_FAILED", f"生成题缺少字段 {field}。"
            )
    if subject == "sql":
        db_group = question.get("dbGroup")
        query = str(question.get("solutionQuery", "")).strip()
        if db_group not in ("school", "shop") or not re.match(
            r"(?is)^select\b", query
        ):
            raise ServiceError(
                "GENERATION_VALIDATION_FAILED", "SQL 题数据库组或标准查询无效。"
            )
        if ";" in query.rstrip(";"):
            raise ServiceError(
                "GENERATION_VALIDATION_FAILED", "SQL 标准答案只能包含一条语句。"
            )
        conn = _create_sql_fixture(db_group)
        try:
            cursor = conn.execute(query)
            cursor.fetchmany(5)
        except sqlite3.Error as exc:
            raise ServiceError(
                "GENERATION_VALIDATION_FAILED", f"SQL 标准答案执行失败：{exc}"
            )
        finally:
            conn.close()
        return {"executable": True, "engine": "sqlite-fixture"}
    if subject == "java":
        result = run_java(
            str(question.get("solutionCode", "")),
            str(question.get("stdinExample", "")),
        )
        error = result.get("compileError") or result.get("runtimeError")
        if error:
            raise ServiceError(
                "GENERATION_VALIDATION_FAILED", f"Java 标准答案执行失败：{error}"
            )
        if result.get("output", "").strip() != str(
            question.get("expectedOutput", "")
        ).strip():
            raise ServiceError(
                "GENERATION_VALIDATION_FAILED", "Java 标准答案输出与期望输出不一致。"
            )
        return {"executable": True, "engine": "javac"}
    if subject == "python":
        result = run_python(
            str(question.get("solutionCode", "")),
            str(question.get("stdinExample", "")),
            "",
        )
        error = result.get("compileError") or result.get("runtimeError")
        if error:
            raise ServiceError(
                "GENERATION_VALIDATION_FAILED", f"Python 标准答案执行失败：{error}"
            )
        if result.get("output", "").strip() != str(
            question.get("expectedOutput", "")
        ).strip():
            raise ServiceError(
                "GENERATION_VALIDATION_FAILED", "Python 标准答案输出与期望输出不一致。"
            )
        return {"executable": True, "engine": "python"}

    options_zh = question.get("optionsZh")
    options_ja = question.get("optionsJa")
    answer = question.get("answer")
    if (
        not isinstance(options_zh, list)
        or not isinstance(options_ja, list)
        or len(options_zh) != 4
        or len(options_ja) != 4
        or not isinstance(answer, int)
        or answer not in range(4)
        or len(set(map(str, options_zh))) != 4
        or len(set(map(str, options_ja))) != 4
    ):
        raise ServiceError(
            "GENERATION_VALIDATION_FAILED", "选择题必须有四个唯一选项和一个有效答案。"
        )
    for field in ("questionZh", "questionJa", "explanationZh", "explanationJa"):
        if not str(question.get(field, "")).strip():
            raise ServiceError(
                "GENERATION_VALIDATION_FAILED", f"生成题缺少字段 {field}。"
            )
    return {"structure": True, "uniqueAnswer": True}


def generate_question(body, store, run_java, run_python):
    subject = str(body.get("subject", "")).lower()
    if subject not in SUBJECTS:
        raise ServiceError("INVALID_SUBJECT", "不支持的科目。")
    topic = str(body.get("topic", "综合复习")).strip()[:240]
    difficulty = max(1, min(3, int(body.get("difficulty") or 1)))
    provider = str(body.get("provider", "gemini")).lower()
    model = str(body.get("model", "")).strip()
    api_key = str(body.get("apiKey", ""))
    ollama_url = str(body.get("ollamaUrl", ""))
    source_context = json.dumps(body.get("sourceContext") or {}, ensure_ascii=False)
    prompt = _question_prompt(subject, topic, difficulty, source_context)
    last_error = None
    for attempt in range(2):
        messages = [
            {
                "role": "system",
                "content": "你是严谨的双语命题老师，只输出符合指定结构的 JSON。",
            },
            {
                "role": "user",
                "content": prompt
                + ("\n上一次格式或答案校验失败，请修正后重新生成。" if attempt else ""),
            },
        ]
        result = call_provider(provider, model, messages, api_key, ollama_url)
        try:
            question = _extract_json(result["text"])
            validation = validate_question(
                subject, question, run_java, run_python
            )
            review_result = call_provider(
                provider,
                model,
                [
                    {
                        "role": "system",
                        "content": "你是题目质量审核员，只返回 JSON。",
                    },
                    {
                        "role": "user",
                        "content": (
                            "审核下面的双语学习题。检查题干是否清楚、答案是否唯一、"
                            "标准答案是否符合题意。只返回 "
                            '{"approved":true或false,"reason":"简短原因"}。\n'
                            + json.dumps(question, ensure_ascii=False)
                        ),
                    },
                ],
                api_key,
                ollama_url,
            )
            review = _extract_json(review_result["text"])
            if review.get("approved") is not True:
                raise ServiceError(
                    "GENERATION_VALIDATION_FAILED",
                    "AI 二次审核未通过：" + str(review.get("reason", "未说明原因")),
                )
            validation["aiReview"] = {
                "approved": True,
                "reason": str(review.get("reason", ""))[:500],
            }
            saved = store.save_generated_question(
                subject,
                topic,
                difficulty,
                result["provider"],
                result["model"],
                question,
                validation,
            )
            return {
                "question": saved,
                "validation": validation,
                "provider": result["provider"],
                "model": result["model"],
            }
        except ServiceError as exc:
            last_error = exc
    raise last_error or ServiceError(
        "GENERATION_VALIDATION_FAILED", "AI 题目校验失败。"
    )
