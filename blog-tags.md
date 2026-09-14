---
layout: default
title: Writing by tag — Sven Lutz
description: Browse technical writing by method, technology and domain.
permalink: /blog/tags/
---

<section class="page-hero taxonomy-hero">
  <p class="section-index">Writing / Tags</p>
  <h1>Methods, tools and domains.</h1>
  <p class="lede">Specific concepts used across the writing archive.</p>
  <a class="back-link" href="{{ '/blog/' | relative_url }}">← Writing archive</a>
</section>

<section class="section tag-index">
  {% assign sorted_tags = site.tags | sort %}
  <nav class="tag-cloud" aria-label="Tag index">
    {% for tag in sorted_tags %}<a href="#{{ tag[0] | slugify }}">{{ tag[0] }} <span>{{ tag[1].size }}</span></a>{% endfor %}
  </nav>
  <div class="tag-groups">
    {% for tag in sorted_tags %}
      <section id="{{ tag[0] | slugify }}" class="tag-group">
        <h2>{{ tag[0] }}</h2>
        {% for post in tag[1] %}<a href="{{ post.url | relative_url }}">{{ post.title }} <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y" }}</time></a>{% endfor %}
      </section>
    {% endfor %}
  </div>
</section>
