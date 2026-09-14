---
layout: default
title: Writing — Sven Lutz
description: Technical articles and field notes on applied AI, research software, economics and building products.
permalink: /blog/
---

<section class="page-hero writing-hero">
  <p class="section-index">Writing / Archive</p>
  <h1>Methods, decisions and open questions.</h1>
  <p class="lede">Technical articles and field notes from work in applied AI, research software and product development. Written to preserve the reasoning behind a result—not only the result itself.</p>
  <div class="archive-links"><a href="{{ '/blog/categories/' | relative_url }}">Browse categories</a><a href="{{ '/blog/tags/' | relative_url }}">Browse tags</a><a href="{{ '/feed.xml' | relative_url }}">Subscribe via RSS</a></div>
</section>

<section class="section writing-archive">
  {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  {% for year in posts_by_year %}
    <div class="archive-year">
      <h2>{{ year.name }}</h2>
      <div class="writing-list">
        {% for post in year.items %}
          <a class="writing-row" href="{{ post.url | relative_url }}">
            <div><span>{{ post.category | default: 'Essay' }}{% if post.reading_time %} · {{ post.reading_time }} min{% endif %}</span><h3>{{ post.title }}</h3><p>{{ post.description }}</p></div>
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d" }}</time>
          </a>
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</section>
