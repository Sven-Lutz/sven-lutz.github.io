---
layout: default
title: Writing
description: Technical articles and research notes on applied AI, GraphRAG, machine learning and research software engineering.
permalink: /blog/
---

<div class="shell">

<header class="page-head">
  <p class="label">Writing</p>
  <h1>Articles and research notes</h1>
  <p class="lede">Explanations of methods I use, write-ups of systems I build, and notes on what the evidence actually supported. Written for readers who want the reasoning, not only the result.</p>
  <p class="inline-links">
    <a href="{{ '/blog/categories/' | relative_url }}">Categories</a>
    <a href="{{ '/blog/tags/' | relative_url }}">Tags</a>
    <a href="{{ '/feed.xml' | relative_url }}">RSS feed</a>
  </p>
</header>

<section class="section">
  {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  {% for year in posts_by_year %}
    <div class="year-group">
      <h2>{{ year.name }}</h2>
      <ul class="entries">
        {% for post in year.items %}{% include post-entry.html post=post %}{% endfor %}
      </ul>
    </div>
  {% endfor %}
</section>

</div>
