---
title: "pi-coding-agent 介绍 — 你的 AI 编程搭档"
date: 2026-06-03
draft: false
tags: ["pi-coding-agent", "AI", "coding", "tool"]
categories: ["tech"]
series: ["pi-coding-agent"]
---

## 什么是 pi-coding-agent？

**pi-coding-agent** 是一个运行在终端中的 AI 编码助手。它不是一个 IDE 插件，而是一个独立的、会话式的编程代理，能够理解你的项目上下文，执行命令，编辑文件，并帮助你完成整个编码任务。

与 GitHub Copilot、Cursor 等工具不同，pi 更像是一位**真正的结对编程伙伴**——你给它一个任务描述，它会自主地探索代码库、分析问题、编写代码、运行测试，甚至修复自己的错误。

### 核心特性

| 特性 | 说明 |
|------|------|
| 🧠 **自主代理** | 理解任务目标，自主规划并执行多步操作 |
| 🛠 **工具集成** | 内置文件读写、bash 执行、代码编辑等工具 |
| 📦 **扩展系统** | 通过 Extension 和 Skill 机制扩展能力 |
| 🎨 **TUI 界面** | 终端 UI 支持多会话、主题自定义 |
| 🔁 **自我改进** | Self-improving agent 技能实现持续学习进化 |

## 安装

pi 基于 Bun 运行时，安装非常简单：

```bash
# 通过 npm/bun 全局安装
bun install -g @mariozechner/pi-coding-agent

# 或者使用 npm
npm install -g @mariozechner/pi-coding-agent
```

安装完成后，在项目目录中运行：

```bash
pi
```

即可启动交互式会话，开始你的 AI 编程之旅。

## 工作模式

pi 支持两种工作模式：

1. **会话模式（默认）** — 启动交互式终端，你提需求，pi 自主执行
2. **单次模式** — 通过 `-p` 参数指定提示词，一次性完成任务后退出

```bash
# 会话模式
pi

# 单次模式
pi -p "给这个项目添加一个 README.md"
```

## 结语

pi-coding-agent 代表了 AI 辅助编程的新方向——从补全代码到**完成任务**。它特别适合重构、脚手架搭建、Bug 修复、文档编写等场景。在接下来的文章中，我会深入介绍它的 Skill 系统和扩展开发。
