---
title: "pi-coding-agent Skill 系统深度解析"
date: 2026-06-03
draft: false
tags: ["pi-coding-agent", "skill", "extension", "AI"]
categories: ["tech"]
series: ["pi-coding-agent"]
---

## 什么是 Skill？

Skill 是 pi-coding-agent 最强大的扩展机制之一。如果说 Extension 提供了**工具**和**能力**，那么 Skill 则提供了**知识**和**流程**——它告诉 AI 如何完成特定类型的任务。

一个 Skill 本质上是一个包含结构化指令的 Markdown 文件，当任务匹配特定模式时，pi 会自动加载并遵循这些指令。

## Skill 的工作原理

### 触发机制

每个 Skill 都有一个 `description` 字段，其中定义了触发条件。当用户的请求与描述匹配时，pi 会自动激活对应的 Skill。

例如，下面是一个 MySQL 查询 Skill 的触发配置：

```yaml
name: mysql-query
description: >
  Use when the user needs to query MySQL database,
  run SELECT/INSERT/UPDATE/DELETE statements.
```

当用户说"帮我查一下 users 表的数据"，pi 就会自动加载这个 Skill。

### 技能结构

一个典型的 Skill 目录结构如下：

```
~/.agents/skills/<skill-name>/
├── SKILL.md       # 主技能文件，包含指令
├── templates/     # 可选的模板目录
└── tools/         # 可选的辅助工具
```

### SKILL.md 格式

SKILL.md 文件采用标准 Markdown 编写，包含以下关键部分：

- **元信息**：名称、描述、触发条件
- **流程指令**：告诉 AI 按什么步骤完成任务
- **约束条件**：安全限制、最佳实践
- **示例**：帮助 AI 理解输出格式

## 实战：编写一个自定义 Skill

下面是一个自定义 Skill 的示例，用于帮助写 Git commit 消息：

```markdown
# git-commit-skill

## Description
Use when the user wants to commit changes or write a commit message.

## Instructions
1. Run `git diff --cached` to see staged changes
2. Analyze the changes and categorize them (feat/fix/docs/refactor/etc.)
3. Generate a conventional commit message
4. Present the message to the user for confirmation
5. If confirmed, run `git commit -m "<message>"`

## Constraints
- Always follow Conventional Commits spec
- Keep subject line under 72 characters
- Use Chinese for the description body if user prefers
```

## 内置技能

pi 内置了多个实用的 Skill，包括：

| Skill | 用途 |
|-------|------|
| `self-improving-agent` | 自我改进——从每次任务中学习，持续优化行为 |
| `smc` | Shopee SMC 插件管理器的 CLI 操作 |
| `smc-pam` | 通过 PAM 网关访问特权资源（SSH/MySQL/Redis/K8s） |
| `smc-service` | 操作 Bromo/ECP 服务、任务、部署 |
| `setup-remote-ssh-wrapper` | 配置 VSCode/Cursor 远程 SSH 连接 |

## Extension vs Skill

| 维度 | Extension | Skill |
|------|-----------|-------|
| 提供什么 | 新工具/命令/功能 | 流程/知识/最佳实践 |
| 本质 | 代码（Go/Python 等） | Markdown 文档 |
| 触发方式 | 用户调用的工具/命令 | 自动匹配用户意图 |
| 复杂度 | 高（需要编程） | 低（写文档即可） |
| 适用场景 | 新增外部能力 | 指导 AI 完成特定任务 |

## 结语

Skill 系统让 pi-coding-agent 从一个通用编码助手变成了**领域专家**。无论是数据库操作、云服务管理，还是代码审查流程，你都可以通过编写 Skill 来让 pi 掌握这些能力。这种"文档即代码"的设计理念，极大地降低了扩展门槛，让任何人都能定制自己的 AI 编程伙伴。
