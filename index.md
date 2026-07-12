---
layout: default
title: VGalaxies
---

<a class="vr-skip" href="#main-content">跳到主要内容</a>

<main class="vr-shell vr-home" id="main-content">
  <section class="vr-home-hero" aria-labelledby="home-title">
    <div class="vr-home-copy">
      <p class="vr-kicker"><span class="vr-signal-dot" aria-hidden="true"></span> VGalaxies / Field notes from the AI frontier</p>
      <h1 class="vr-home-title" id="home-title" aria-label="Visual Reading">
        <span>VISUAL</span>
        <span class="vr-home-title-offset">READING</span>
      </h1>
      <p class="vr-home-intro">把论文、博客和长文重新拆成可探索的单页笔记。不是摘要仓库，而是一张持续生长的理解地图。</p>
      <div class="vr-home-actions">
        <a class="vr-primary-link" href="{{ '/visual-reading/' | relative_url }}">进入阅读星图 <span aria-hidden="true">↗</span></a>
        <span class="vr-home-count"><strong data-count-to="{{ site.data.visual_reading.entries.size }}">{{ site.data.visual_reading.entries.size }}</strong> notes in orbit</span>
      </div>
    </div>

    <div class="vr-orbit" aria-hidden="true">
      <div class="vr-orbit-ring vr-orbit-ring-one"></div>
      <div class="vr-orbit-ring vr-orbit-ring-two"></div>
      <div class="vr-orbit-sweep"></div>
      <div class="vr-orbit-core"><span>VR</span></div>
      <div class="vr-orbit-track vr-orbit-track-a"><span class="vr-orbit-node"></span></div>
      <div class="vr-orbit-track vr-orbit-track-b"><span class="vr-orbit-node"></span></div>
      <div class="vr-orbit-track vr-orbit-track-c"><span class="vr-orbit-node"></span></div>
      <span class="vr-orbit-label">INDEX / 2026</span>
    </div>
  </section>

  <section class="vr-home-latest" aria-labelledby="latest-title">
    <div class="vr-section-heading">
      <div>
        <p class="vr-section-index">01 / Latest signals</p>
        <h2 id="latest-title">最近捕获</h2>
      </div>
      <a class="vr-text-link" href="{{ '/visual-reading/' | relative_url }}">查看全部 {{ site.data.visual_reading.entries.size }} 篇 <span aria-hidden="true">→</span></a>
    </div>

    <ol class="vr-home-feed">
      {% for entry in site.data.visual_reading.entries limit:3 %}
      <li>
        <span class="vr-home-feed-index">0{{ forloop.index }}</span>
        <div class="vr-home-feed-content">
          <a href="{{ '/files/visual-reading/' | append: entry.slug | append: '/' | relative_url }}">{{ entry.title }}</a>
          <div class="vr-inline-tags" aria-label="主题标签">
            {% for tag in entry.tags limit:3 %}<span>{{ tag | escape }}</span>{% endfor %}
          </div>
        </div>
        <time datetime="{{ entry.date }}">{{ entry.date }}</time>
      </li>
      {% endfor %}
    </ol>
  </section>

  <section class="vr-home-manifesto" aria-label="Visual Reading 说明">
    <p class="vr-section-index">02 / Why this exists</p>
    <p>阅读留下的不该只是一个“看过”的勾。这里记录概念之间的引力、论证里的断层，以及那些值得带走继续思考的东西。</p>
    <span>READ · CONNECT · REBUILD</span>
  </section>
</main>
