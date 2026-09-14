---
layout: default
title: Notes — Sven Lutz
description: Notes by Sven Lutz on applied AI, research software, economics and building products.
permalink: /notes/
---

<section class="page-hero">
  <p class="eyebrow">Notes</p>
  <h1>Working notes from the intersection of research and building.</h1>
  <p class="lede">Short essays about applied AI, software projects, quantitative questions and the lessons that emerge while making things.</p>
</section>

<section class="section">
  <div class="note-list">
    {% for post in site.posts %}
      <a class="note-row" href="{{ post.url | relative_url }}">
        <div><span>{{ post.category | default: 'Note' }}</span><h2>{{ post.title }}</h2><p>{{ post.description }}</p></div>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
      </a>
    {% endfor %}
  </div>
</section>
