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

只编辑 `assets/js/supabase-config.local.js`。该文件已被 `.gitignore` 忽略。Round 17.4 验证时应保持：

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

## Round 17.4 手动配置检查清单

### 配置 Auth Providers

在 Supabase Dashboard 打开 **Authentication > Providers**：

1. 保留 Email provider 时，先确认是否要求邮箱验证。
2. Google、GitHub 等 OAuth provider 默认不要随意开启；启用前必须配置对应平台的 Client ID、Client Secret 和 Redirect URL。
3. Redirect URL 必须是自己控制的地址，不要复制陌生教程中的回调地址。
4. Round 17.4 只检查设置页面，不进行真实注册或登录。

### 本地文件加载顺序

`index.html` 已提供注释式可选加载位。需要人工验证本地配置时：

1. 复制模板为 `assets/js/supabase-config.local.js`。
2. 保持 `enabled: false`。
3. 在本机临时取消 `supabase-config.local.js` 那一行的 HTML 注释。
4. 不要取消外部 Supabase SDK CDN 的注释；本轮不需要联网加载 SDK。
5. 确认加载顺序为：local config、可选 SDK、`supabase-client.js`、`auth-ui.js`。
6. 验证结束后，不得提交 local 文件或任何真实配置值。

### 状态验证

在浏览器控制台只检查布尔值和状态码，不要打印完整配置：

```js
StudySupabase.isConfigured()
StudySupabase.isEnabled()
StudySupabase.getStatus().code
StudySupabase.getClient()
```

预期状态：

| 条件 | 状态 |
|:---|:---|
| URL 或 anon key 为空 | `not_configured` |
| 配置完整但 `enabled: false` | `disabled` |
| 已启用但 SDK 不存在 | `sdk_missing` |
| 已启用且 SDK 存在，但尚未初始化 | `ready_to_initialize` |

本轮不要调用真实登录方法，也不要在控制台输出 URL、anon key、密码、session 或 token。

### 执行 SQL 后检查 RLS

未来在真实项目中执行 `tools/init_supabase.sql` 后，应在 **Database > Tables** 或 SQL Editor 检查七张用户表均已启用 RLS，并确认策略同时包含：

```sql
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id)
```

应使用两个独立测试用户验证互相无法读取、插入、更新或删除对方数据。完成这项隔离测试前，不得进入真实登录或云同步阶段。

## Round 17.5 最小 Auth 接入

本轮支持会话检测、Magic Link、测试性邮箱密码登录和登出，但仍不上传或下载任何学习数据。

### 启用步骤

1. 手动创建 Supabase 项目，并在 **Authentication > Providers** 启用 Email。
2. 复制 `supabase-config.example.js` 为 ignored 的 `supabase-config.local.js`。
3. 只在 local 文件填写 Project URL 和 anon public key，确认不是 `service_role`。
4. 完成 RLS 检查后，将 local 配置改为 `enabled: true`。
5. 在 `index.html` 中取消 local config 与 Supabase SDK 两处注释。
6. 保持加载顺序：local config、SDK、`supabase-client.js`、`auth-ui.js`。

SDK 加载失败、离线、配置缺失或 `enabled: false` 时，应用继续以本地模式运行。

### Magic Link

Magic Link 是推荐入口。它调用 Supabase SDK 的 `signInWithOtp()`，不会要求或保存密码。发送后应检查邮箱，并通过同一浏览器打开登录链接。

在 Supabase Dashboard 的 **Authentication > URL Configuration** 中配置允许的 Site URL 和 Redirect URLs。不要使用不受自己控制的回调地址。

### 邮箱密码登录

邮箱密码入口仅用于测试已启用的 Email provider：

- 密码只作为当前 SDK 调用参数使用。
- 页面不会把密码写入 localStorage、sessionStorage 或自定义配置。
- token/session 仅由 Supabase SDK 的内置 session 机制管理。
- 正式产品体验仍需后续补丁和安全复核。

### 数据边界

Round 17.5 不调用任何学习数据表，不读取或写入 `learning_progress`、`quiz_results`、`bookmarks` 等表，也不启用 `StudySync` 云端 push/pull。
