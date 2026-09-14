---
layout: default
title: Tags
description: Writing by Sven Lutz, grouped by method, technology and domain.
permalink: /blog/tags/
---

<h1>Tags</h1>
<p class="lede">Specific methods, tools and domains used across the writing.</p>

{% assign sorted_tags = site.tags | sort %}
<ul class="tag-list" aria-label="Tag index">
  {% for tag in sorted_tags %}<li><a href="#{{ tag[0] | slugify }}">{{ tag[0] }} ({{ tag[1].size }})</a></li>{% endfor %}
</ul>

{% for tag in sorted_tags %}
  <h2 id="{{ tag[0] | slugify }}" class="year-heading">{{ tag[0] }}</h2>
  <ul class="entry-list">
    {% for post in tag[1] %}
      <li>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b %Y" }}</time>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

<a class="back-link" href="{{ '/blog/' | relative_url }}">← All writing</a>
