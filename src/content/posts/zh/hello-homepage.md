---
title: 示例文章：搭建个人主页
description: 用 Astro + GitHub Pages 搭一个中英双语的个人主页。
date: 2026-10-06
tags: [Astro, 建站]
---

这是一篇示例文章，用来演示文章页的排版。新建文章只需要在 `src/content/posts/zh/` 下添加一个 Markdown 文件。

## 为什么选 Astro

- 原生支持多语言路由
- 用 Markdown 写文章
- 构建时自动拉取 GitHub 仓库信息

```js
const greeting = '你好，世界';
console.log(greeting);
```

> 同一篇文章的英文版放在 `src/content/posts/en/` 下，使用相同的文件名即可互相切换。
