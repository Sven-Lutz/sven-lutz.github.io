---
layout: default
title: Categories
description: Writing by Sven Lutz, grouped by subject area.
permalink: /blog/categories/
---

<h1>Categories</h1>
<p class="lede">Broad subject areas. Tags are more specific — see <a href="{{ '/blog/tags/' | relative_url }}">tags</a>.</p>

{% assign sorted_categories = site.categories | sort %}
{% for category in sorted_categories %}
  <h2 id="{{ category[0] | slugify }}" class="year-heading">{{ category[0] }} ({{ category[1].size }})</h2>
  <ul class="entry-list">
    {% for post in category[1] %}
      <li>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b %Y" }}</time>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

<a class="back-link" href="{{ '/blog/' | relative_url }}">← All writing</a>
