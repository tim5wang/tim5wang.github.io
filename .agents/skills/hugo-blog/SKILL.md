---
name: hugo-blog
description: >
  Manage tim5wang.github.io Hugo blog — create new posts, preview locally,
  and publish. Use when the user asks to write a new blog post, create
  content, publish, or update the blog.
---

# Hugo Blog — tim5wang.github.io

This is a [Hugo](https://gohugo.io) static site with the **PaperMod** theme, deployed via GitHub Actions to GitHub Pages.

## Project Structure

```
tim5wang.github.io/
├── content/posts/          # Blog posts (Markdown)
├── hugo.toml               # Site configuration
├── themes/PaperMod/        # PaperMod theme (git submodule)
├── .github/workflows/      # CI/CD (auto-deploy on push to master)
└── .agents/skills/         # Project skills
```

## How to Create a New Post

### 1. Create the post

```bash
cd /Users/taiwu.wang/Documents/leader_agent/tim5wang.github.io
hugo new content posts/<slug>.md
```

Edit the file. Frontmatter conventions:

```yaml
---
title: "文章标题"
date: {{ .Date }}           # or set manually, e.g. 2026-06-04
draft: true                 # true = hide from production; set false when ready
tags: ["tag1", "tag2"]      # lowercase, kebab-case
categories: ["tech"]        # category name
series: ["series-name"]     # optional: group related posts
---
```

**Content style:**
- Write in **Chinese** unless the user specifies otherwise
- Use standard Markdown (headings, lists, code blocks, tables, links)
- Code blocks: specify language for syntax highlighting
- Keep paragraphs concise for readability
- Always end with a concluding section (e.g., 结语)

### 2. Preview locally

```bash
hugo server -D
# Opens at http://localhost:1313
# -D includes draft posts in preview
```

### 3. Publish

When the post is ready, set `draft: false` in frontmatter, then commit and push:

```bash
git add -A
git commit -m "feat: new post - <title>"
git push origin master
```

GitHub Actions will auto-build and deploy. The site updates at https://tim5wang.github.io within ~1-2 minutes.

## Other Useful Commands

| Command | Purpose |
|---------|---------|
| `hugo` | Build production site to `public/` |
| `hugo --minify` | Build with minification |
| `hugo new content posts/xyz.md` | Scaffold a new post |

## Deployment

- **Platform:** GitHub Pages
- **Trigger:** Push to `master` branch
- **Workflow:** `.github/workflows/deploy.yml`
- **URL:** https://tim5wang.github.io
