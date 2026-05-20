---
layout: page
title: Visual Reading
permalink: /visual-reading/
---

把读过的论文 / 博客 / 长文做成单页可视化笔记。新的在前。

<style>
  .vr-list { list-style: none; padding: 0; margin: 2rem 0; }
  .vr-list li { padding: 1rem 0; border-bottom: 1px solid #e8dcc7; }
  .vr-list li:last-child { border-bottom: none; }
  .vr-title { font-size: 1.1rem; font-weight: 600; color: #2a1d10; text-decoration: none; }
  .vr-title:hover { color: #8a5a1e; text-decoration: underline; }
  .vr-meta { font-size: 0.85rem; color: #7a6a55; margin-top: 0.3rem; }
  .vr-meta a { color: #8a5a1e; text-decoration: none; }
  .vr-meta a:hover { text-decoration: underline; }
  .vr-tag { display: inline-block; padding: 0.05rem 0.5rem; background: #f4ead7; color: #6a4a1e; border-radius: 3px; font-size: 0.75rem; margin-right: 0.4rem; }
  .vr-empty { color: #7a6a55; font-style: italic; }
</style>

{% if site.data.visual_reading.entries.size > 0 %}
<ul class="vr-list">
{% for entry in site.data.visual_reading.entries %}
  <li>
    <a class="vr-title" href="{{ '/files/visual-reading/' | append: entry.slug | append: '/' | relative_url }}">{{ entry.title }}</a>
    <div class="vr-meta">
      <span class="vr-tag">{{ entry.source_type | default: "blog" }}</span>
      <span>{{ entry.date }}</span>
      {% if entry.source_url %}
        · <a href="{{ entry.source_url }}" target="_blank" rel="noopener">原文 ↗</a>
      {% endif %}
    </div>
  </li>
{% endfor %}
</ul>
{% else %}
<p class="vr-empty">还没有条目。</p>
{% endif %}
