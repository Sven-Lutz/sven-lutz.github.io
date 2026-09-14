---
layout: default
title: Writing by category — Sven Lutz
description: Browse technical writing by broad subject area.
permalink: /blog/categories/
---

<section class="page-hero taxonomy-hero">
  <p class="section-index">Writing / Categories</p>
  <h1>Broad areas of inquiry.</h1>
  <p class="lede">Categories stay intentionally small. Use tags for specific methods, tools and domains.</p>
  <a class="back-link" href="{{ '/blog/' | relative_url }}">← Writing archive</a>
</section>

<section class="section taxonomy-list">
  {% assign sorted_categories = site.categories | sort %}
  {% for category in sorted_categories %}
    <section id="{{ category[0] | slugify }}" class="taxonomy-group">
      <div><p class="eyebrow">Category</p><h2>{{ category[0] }}</h2><span>{{ category[1].size }} {% if category[1].size == 1 %}article{% else %}articles{% endif %}</span></div>
      <div class="writing-list">
        {% for post in category[1] %}
          <a class="writing-row compact-row" href="{{ post.url | relative_url }}"><div><h3>{{ post.title }}</h3><p>{{ post.description }}</p></div><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time></a>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</section>
