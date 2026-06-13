-- ============================================================
-- Study Tools - Supabase DB Init Draft (Round 17.4 review)
--
-- Purpose:  DDL draft for sync tables. NOT executed yet.
-- Schema:   public
-- Auth:     Supabase auth.users referenced via foreign key
-- Security: Row-Level Security (RLS) enabled with per-user policies
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()
-- pg_stat_statements is optional and intentionally not enabled by this script.


-- ── 1. devices ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.devices (
  id            UUID PRIMARY KEY,                     -- client-generated UUID (crypto.randomUUID)
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_name   VARCHAR(100),
  device_type   VARCHAR(20)  NOT NULL DEFAULT 'web',  -- 'web' | 'windows' | 'mobile'
  app_version   VARCHAR(20),                          -- e.g. 'v2026.6.13-r16.8'
  last_sync_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  is_deleted    BOOLEAN      NOT NULL DEFAULT FALSE,
  deleted_at    TIMESTAMPTZ
);

CREATE INDEX idx_devices_user_id ON public.devices(user_id);
CREATE INDEX idx_devices_last_sync ON public.devices(user_id, last_sync_at);

COMMENT ON TABLE public.devices IS 'Registered devices per user for sync routing';
COMMENT ON COLUMN public.devices.id IS 'Client-generated UUID (study_tools_device_id in localStorage)';

ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS device_isolation ON public.devices;
CREATE POLICY device_isolation ON public.devices
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ── 2. user_settings ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id     UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  language    VARCHAR(20) NOT NULL DEFAULT 'default-ja-zh',
  theme       VARCHAR(10) NOT NULL DEFAULT 'dark',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sync_version INTEGER   NOT NULL DEFAULT 1
);

COMMENT ON TABLE public.user_settings IS 'Per-user UI preferences, synced across devices';

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS user_settings_isolation ON public.user_settings;
CREATE POLICY user_settings_isolation ON public.user_settings
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ── 3. learning_progress ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.learning_progress (
  id                      BIGSERIAL PRIMARY KEY,
  user_id                 UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject                 VARCHAR(20)  NOT NULL,   -- 'sql' | 'java' | 'python' | 'itpass' | 'sg'
  lesson_id               INTEGER      NOT NULL,
  is_completed            BOOLEAN      NOT NULL DEFAULT FALSE,
  quiz_done               BOOLEAN      NOT NULL DEFAULT FALSE,
  code_run                BOOLEAN      NOT NULL DEFAULT FALSE,
  quiz_completed_indices  JSONB        NOT NULL DEFAULT '[]',  -- array of quiz question indices
  updated_at              TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  device_id               UUID         REFERENCES public.devices(id),
  created_at              TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  deleted_at              TIMESTAMPTZ,

  CONSTRAINT uq_learning_progress UNIQUE (user_id, subject, lesson_id)
);

CREATE INDEX idx_lp_user_subject ON public.learning_progress(user_id, subject);
CREATE INDEX idx_lp_user_updated ON public.learning_progress(user_id, updated_at);

COMMENT ON TABLE public.learning_progress IS 'Per-lesson completion state per user, sync foundation';

ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS lp_isolation ON public.learning_progress;
CREATE POLICY lp_isolation ON public.learning_progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ── 4. quiz_results ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id            BIGSERIAL PRIMARY KEY,
  user_id       UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject       VARCHAR(20)  NOT NULL,
  lesson_id     INTEGER      NOT NULL,
  quiz_index    INTEGER      NOT NULL,
  is_correct    BOOLEAN      NOT NULL,
  attempt_count INTEGER      NOT NULL DEFAULT 1,
  answered_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  device_id     UUID         REFERENCES public.devices(id),
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  deleted_at    TIMESTAMPTZ
);

CREATE INDEX idx_qr_user_subject ON public.quiz_results(user_id, subject, lesson_id);
CREATE INDEX idx_qr_user_answered ON public.quiz_results(user_id, answered_at);

COMMENT ON TABLE public.quiz_results IS 'Raw per-question results for history and analytics';

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS qr_isolation ON public.quiz_results;
CREATE POLICY qr_isolation ON public.quiz_results
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ── 5. user_translations ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_translations (
  id              BIGSERIAL PRIMARY KEY,
  user_id         UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_text     TEXT         NOT NULL,
  source_lang     VARCHAR(10)  NOT NULL DEFAULT 'ja',
  target_lang     VARCHAR(10)  NOT NULL,         -- 'vi' | 'my' | 'fr' | 'en' | etc.
  translated_text TEXT         NOT NULL,
  context         VARCHAR(100),                   -- optional: 'sql:lesson5:title'
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ,

  CONSTRAINT uq_user_translations UNIQUE (user_id, source_text, target_lang)
);

CREATE INDEX idx_ut_user_lang ON public.user_translations(user_id, target_lang);
CREATE INDEX idx_ut_user_updated ON public.user_translations(user_id, updated_at);

COMMENT ON TABLE public.user_translations IS 'User-customised translations for UI terms';

ALTER TABLE public.user_translations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS ut_isolation ON public.user_translations;
CREATE POLICY ut_isolation ON public.user_translations
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ── 6. bookmarks ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id            BIGSERIAL PRIMARY KEY,
  user_id       UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bookmark_type VARCHAR(20)  NOT NULL,          -- 'lesson' | 'glossary_term' | 'typing_article'
  reference_id  VARCHAR(100) NOT NULL,          -- e.g. 'sql:12', 'glossary:42'
  label         VARCHAR(200),                   -- user-defined label
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  deleted_at    TIMESTAMPTZ,

  CONSTRAINT uq_bookmarks UNIQUE (user_id, bookmark_type, reference_id)
);

CREATE INDEX idx_bm_user_type ON public.bookmarks(user_id, bookmark_type);
CREATE INDEX idx_bm_user_created ON public.bookmarks(user_id, created_at);

COMMENT ON TABLE public.bookmarks IS 'User bookmarks / favorites';

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS bm_isolation ON public.bookmarks;
CREATE POLICY bm_isolation ON public.bookmarks
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ── 7. sync_log ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.sync_log (
  id              BIGSERIAL PRIMARY KEY,
  user_id         UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id       UUID         REFERENCES public.devices(id),
  sync_type       VARCHAR(10)  NOT NULL,         -- 'push' | 'pull' | 'full'
  started_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  completed_at    TIMESTAMPTZ,
  status          VARCHAR(20)  NOT NULL DEFAULT 'in_progress',  -- 'in_progress' | 'success' | 'conflict' | 'error'
  records_pushed  INTEGER      NOT NULL DEFAULT 0,
  records_pulled  INTEGER      NOT NULL DEFAULT 0,
  error_message   TEXT,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_sl_user_started ON public.sync_log(user_id, started_at);
CREATE INDEX idx_sl_user_device ON public.sync_log(user_id, device_id);

COMMENT ON TABLE public.sync_log IS 'Operational log of every sync transaction';

ALTER TABLE public.sync_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS sl_isolation ON public.sync_log;
CREATE POLICY sl_isolation ON public.sync_log
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ── 8. Migration tracking ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.schema_migrations (
  version     INTEGER PRIMARY KEY,
  description TEXT NOT NULL,
  applied_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.schema_migrations IS 'Track applied schema versions for rollback/upgrade';


-- ============================================================
-- Additional indexes for sync performance
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_sync_pull_progress
  ON public.learning_progress(user_id, updated_at)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_sync_pull_translations
  ON public.user_translations(user_id, updated_at)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_sync_pull_bookmarks
  ON public.bookmarks(user_id, updated_at)
  WHERE deleted_at IS NULL;


-- ============================================================
-- NOTES
-- ============================================================
-- 1. Supabase Auth handles users table (auth.users), so we do not
--    create a separate users table. All user_id references point to
--    auth.users(id).
--
-- 2. RLS is enabled for all seven user-owned tables. Each policy
--    applies to authenticated users and checks both existing rows
--    (USING) and inserted/updated rows (WITH CHECK).
--
-- 3. No real project URL, API key, or secret is stored in this file.
--    Supabase project URL and anon key go to the gitignored browser
--    config file: assets/js/supabase-config.local.js.
--
-- 4. Run via Supabase SQL Editor or psql:
--    psql "$SUPABASE_DB_URL" -f tools/init_supabase.sql
--
-- 5. sync_version column (INTEGER) on user_settings enables
--    optimistic locking for conflict detection.
