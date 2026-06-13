# Supabase 准备指南（Round 17.3）

> 当前版本只是配置与客户端安全适配层。默认不连接 Supabase，不执行真实注册或登录，也不上传或同步任何数据。

## 为什么选择 Supabase

Supabase 提供托管 PostgreSQL、Supabase Auth 和 Row Level Security（RLS）。项目以后可以用 `auth.users` 识别用户，再通过 RLS 限制每个用户只能访问自己的学习数据，不需要由 Study Tools 自行保存或校验密码。

## 1. 创建项目

1. 打开 [Supabase Dashboard](https://supabase.com/dashboard) 并登录。
2. 选择 **New project**。
3. 选择组织，填写项目名称、数据库密码和区域。
4. 数据库密码只用于管理数据库，请保存在密码管理器中，不要写进本项目文件。
5. 等待项目初始化完成。

Round 17.3 不要求实际创建项目；以上步骤仅供以后人工配置。

## 2. 查找 URL 和 anon key

在 Supabase Dashboard 打开项目，进入 **Project Settings > API**：

- **Project URL**：填入本地配置的 `url`。
- **anon/public key**：填入本地配置的 `anonKey`。

`anon` key 是给浏览器客户端使用的公开项目密钥，但仍必须配合 RLS。不要把任何真实项目值提交到 Git。

### 绝对不能放到前端

- `service_role` key
- 数据库密码
- JWT secret
- 用户 access token / refresh token
- 真实用户密码

`service_role` 会绕过 RLS，绝不能写入 HTML、JavaScript、`.env` 前端构建变量或截图。

## 3. 创建本地配置

复制模板：

```powershell
Copy-Item assets/js/supabase-config.example.js assets/js/supabase-config.local.js
```

只编辑 `assets/js/supabase-config.local.js`。该文件已被 `.gitignore` 忽略。Round 17.3 应保持：

```js
window.STUDY_TOOLS_SUPABASE_CONFIG = {
  enabled: false,
  url: "",
  anonKey: "",
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
};
```

以后接入真实项目时，也应先保持 `enabled: false`，完成 RLS、安全检查和专门的连接测试后再启用。

## 4. 执行数据库初始化 SQL

SQL 草案位于 Windows 仓库的 `tools/init_supabase.sql`。推荐使用 Dashboard：

1. 打开 **SQL Editor**。
2. 新建查询。
3. 审核 `tools/init_supabase.sql`，确认目标项目无同名冲突。
4. 粘贴 SQL 后执行。
5. 在 **Table Editor** 检查表结构。

也可以使用 `psql`，但数据库连接串包含密码，不得写入仓库或终端截图：

```powershell
psql $env:SUPABASE_DB_URL -f tools/init_supabase.sql
```

Round 17.3 不执行该 SQL。

## 5. 启用并检查 RLS

当前 SQL 中的 RLS 语句是注释草案。真实连接前必须逐表审核、取消注释并执行：

```sql
ALTER TABLE public.example_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY example_isolation ON public.example_table
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

至少检查 `devices`、`user_settings`、`learning_progress`、`quiz_results`、`user_translations`、`bookmarks` 和 `sync_log`。仅有 `USING` 不足以保护插入/更新，正式策略还应包含 `WITH CHECK`。应使用两个测试用户验证互相无法读取或修改数据后，才允许接入真实登录。

## 当前明确未做

- 未加载 Supabase SDK
- 未请求 Supabase
- 未注册、登录或退出真实用户
- 未保存密码、JWT 或 token
- 未执行 `init_supabase.sql`
- 未启用云同步
