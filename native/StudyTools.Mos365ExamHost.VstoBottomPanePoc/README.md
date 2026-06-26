# MOS Excel VSTO Host POC

Excel VSTO Bottom CustomTaskPane 开发 POC，已验证 F5 调试运行时。

## 状态

- ✅ F5 Runtime 已通过（Visual Studio 2019 调试）
- ❌ ClickOnce / VSTOInstaller 部署未验证
- ❌ 非正式 MOS 考试产品

## 前置条件

- Visual Studio 2019+ with Office Developer Tools
- Microsoft Excel Desktop (16.0+)
- VSTO Runtime 10.0+
- .NET Framework 4.8

## 调试方式

1. 在 Visual Studio 中打开 `StudyTools.Mos365ExamHost.sln`
2. 确认启动项目为 `StudyTools.Mos365ExamHost`
3. 按 F5 启动调试
4. Excel 启动后底部应出现 "MOS Native Exam Host · R3 VSTO POC" 面板

> 注：Pane 标题中 "R3 VSTO POC" 是历史运行时标题，不代表代码未迁移。实际命名空间已统一为 `StudyTools.Mos365ExamHost`。

## Runtime 日志

调试运行时会自动写入：
```
%LOCALAPPDATA%\Coco\VSTO-Gate-R3\runtime-logs\runtime-probe.jsonl
```

## 项目结构

```
native/StudyTools.Mos365ExamHost.VstoBottomPanePoc/
├── StudyTools.Mos365ExamHost.sln
├── StudyTools.Mos365ExamHost.csproj
├── ThisAddIn.cs              # VSTO Add-in 入口
├── ThisAddIn.Designer.cs     # Designer 生成代码
├── ThisAddIn.Designer.xml    # Designer 清单
├── ExamHostPaneControl.cs    # Bottom Pane 控件
├── RuntimeProbe.cs           # 运行时探针（JSONL 日志）
├── Properties/
│   ├── AssemblyInfo.cs
│   ├── Resources.resx / Designer.cs
│   └── Settings.settings / Designer.cs
└── README.md
```

## 不包含

- 证书、私钥、PFX、SNK
- ClickOnce 部署工件
- 生产服务器配置
- 用户数据或考试题库
