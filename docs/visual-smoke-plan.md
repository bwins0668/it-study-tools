# Round 70.0 视觉回归截图体系报告

## 目标
固化截图 smoke，390 / 430 / 768 / 1366 / 1920，dark / light，截图不提交，只提交脚本。

## 截图脚本设计

### 1. 截图工具选择
- **macOS**：`screencapture`（命令行）
- **Windows**：`PowerShell`（调用 System.Drawing）
- **Linux**：`scrot` 或 `imagemagick`
- **跨平台**：Puppeteer（Headless Chrome）

### 2. 截图脚本功能
```javascript
// tools/visual_smoke.mjs
import puppeteer from 'puppeteer';

async function captureScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // 视口列表
  const viewports = [
    { width: 390, height: 844, name: 'mobile-390' },
    { width: 430, height: 932, name: 'mobile-430' },
    { width: 768, height: 1024, name: 'tablet-768' },
    { width: 1366, height: 768, name: 'desktop-1366' },
    { width: 1920, height: 1080, name: 'desktop-1920' }
  ];
  
  // 主题列表
  const themes = ['light', 'dark'];
  
  for (const vp of viewports) {
    for (const theme of themes) {
      await page.setViewport(vp);
      await page.goto('http://localhost:8080');
      // 设置主题
      await page.evaluate((t) => {
        localStorage.setItem('theme', t);
      }, theme);
      await page.reload();
      
      // 截图
      await page.screenshot({
        path: `screenshots/${vp.name}-${theme}.png`,
        fullPage: true
      });
    }
  }
  
  await browser.close();
}
```

### 3. 截图页面列表
- 首页（科目选择）
- 课程页面
- 测验页面
- Dashboard
- 术语库
- 打字练习
- 工具抽屉打开

### 4. 对比逻辑（未来）
- 基准截图（人工验证正确）
- 新截图自动对比
- 差异超过阈值 → 失败

### 5. 输出
- 截图保存到 `screenshots/` 目录
- 生成 HTML 报告（并排显示）
- 不提交截图到仓库（添加到 `.gitignore`）

## 实施步骤
1. 创建 `tools/visual_smoke.mjs`
2. 安装 Puppeteer（`npm install puppeteer`）
3. 配置截图页面列表
4. 测试：运行脚本，检查截图

## 依赖
- Node.js
- Puppeteer（或系统截图工具）

## Round 70.0 结论
PASS → 可实施，创建视觉回归截图脚本。
