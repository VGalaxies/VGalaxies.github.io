---
layout: default
title: Visual Reading
permalink: /visual-reading/
---

<a class="vr-skip" href="#main-content">跳到主要内容</a>

<main class="vr-shell vr-catalog" id="main-content">
  <header class="vr-catalog-hero">
    <a class="vr-back-link" href="{{ '/' | relative_url }}"><span aria-hidden="true">←</span> VGalaxies</a>
    <div class="vr-catalog-heading">
      <div>
        <p class="vr-kicker"><span class="vr-signal-dot" aria-hidden="true"></span> Signal archive / updated continuously</p>
        <h1>阅读星图</h1>
      </div>
      <div class="vr-catalog-stats" aria-label="目录统计">
        <strong>{{ site.data.visual_reading.entries.size }}</strong>
        <span>notes<br>in orbit</span>
      </div>
    </div>
    <p class="vr-catalog-intro">把读过的论文、博客和长文做成单页可视化笔记。按主题筛选，从任意一个信号进入。</p>
  </header>

  {% assign all_tags = site.data.visual_reading.entries | map: "tags" | join: "," | split: "," | uniq | sort %}
  <section class="vr-filter-panel" aria-label="按主题筛选笔记">
    <span class="vr-filter-label">FILTER SIGNAL</span>
    <div class="vr-filters" role="group" aria-label="主题">
      <button class="vr-filter is-active" type="button" data-filter="all" aria-pressed="true">全部</button>
      {% for tag in all_tags %}
      {% assign clean_tag = tag | strip %}
      {% if clean_tag != "" %}<button class="vr-filter" type="button" data-filter="{{ clean_tag | escape }}" aria-pressed="false">{{ clean_tag | escape }}</button>{% endif %}
      {% endfor %}
    </div>
    <p class="vr-filter-status" aria-live="polite"><span data-visible-count>{{ site.data.visual_reading.entries.size }}</span> / {{ site.data.visual_reading.entries.size }} signals visible</p>
  </section>

  {% if site.data.visual_reading.entries.size > 0 %}
  <ol class="vr-list">
  {% for entry in site.data.visual_reading.entries %}
    <li class="vr-entry" data-tags="{{ entry.tags | join: '|' | escape }}" style="--entry-index: {{ forloop.index0 }}">
      <span class="vr-entry-index" aria-hidden="true">{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}</span>
      <article>
        <div class="vr-entry-topline">
          <span class="vr-type"><span aria-hidden="true"></span>{{ entry.source_type | default: "blog" }}</span>
          <time datetime="{{ entry.date }}">{{ entry.date }}</time>
        </div>
        <h2><a href="{{ '/files/visual-reading/' | append: entry.slug | append: '/' | relative_url }}">{{ entry.title }} <span aria-hidden="true">↗</span></a></h2>
        <div class="vr-entry-footer">
          <div class="vr-entry-tags" aria-label="主题标签">
            {% for tag in entry.tags %}<button type="button" data-filter-tag="{{ tag | escape }}">{{ tag | escape }}</button>{% endfor %}
          </div>
          {% if entry.source_url %}<a class="vr-source-link" href="{{ entry.source_url }}" target="_blank" rel="noopener">原文 <span aria-hidden="true">↗</span></a>{% endif %}
        </div>
      </article>
    </li>
  {% endfor %}
  </ol>
  <p class="vr-empty" data-empty hidden>这条轨道上还没有笔记。换一个 tag 试试。</p>
  {% else %}
  <p class="vr-empty">还没有条目。</p>
  {% endif %}
</main>
