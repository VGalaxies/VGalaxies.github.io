# VGalaxies.github.io

个人主页 — 当前主要承载 **visual reading** 栏目：把读过的论文 / 博客 / 长文做成单页可视化笔记。

- 站点：<https://vgalaxies.github.io/>
- Visual Reading 索引：<https://vgalaxies.github.io/visual-reading/>

## 仓库布局

```
_config.yml                          Jekyll 配置
_data/visual_reading.yml             visual reading 元数据（卡片列表）
_pages/visual-reading.md             /visual-reading/ 索引页（从 _data 渲染）
files/visual-reading/<slug>/index.html   独立 HTML 文件（self-contained）
index.md                             首页
```

## 发布新一篇 visual reading

1. 在本地准备好 self-contained HTML（参考 `vgalaxies-visual-reading` 私有 repo 的 `commands/blog-to-html.md`）。
2. 按 `commands/publish-visual-reading.md` 的流程把 HTML 放到 `files/visual-reading/<slug>/index.html`，并在 `_data/visual_reading.yml` 的 `entries` 顶部插入一条。
3. `git add` → commit → push。

## 旧版站点

旧的 Hugo 站点产物保留在 [`backup/hugo-site-2024`](https://github.com/VGalaxies/VGalaxies.github.io/tree/backup/hugo-site-2024) 分支。
