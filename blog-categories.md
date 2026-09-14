---
layout: default
title: Categories
description: Writing grouped by subject area.
permalink: /blog/categories/
---

<div class="shell">

<header class="page-head">
  <p class="label">Writing</p>
  <h1>Categories</h1>
  <p class="lede">Broad subject areas. For specific methods and technologies, see <a href="{{ '/blog/tags/' | relative_url }}">tags</a>.</p>
  <div class="chip-row">
    {% assign sorted_categories = site.categories | sort %}
    {% for category in sorted_categories %}<a href="#{{ category[0] | slugify }}">{{ category[0] }} <span class="count">{{ category[1].size }}</span></a>{% endfor %}
  </div>
</header>

<section class="section">
  {% for category in sorted_categories %}
    <div class="year-group" id="{{ category[0] | slugify }}">
      <h2>{{ category[0] }}</h2>
      <ul class="entries">
        {% for post in category[1] %}{% include post-entry.html post=post %}{% endfor %}
      </ul>
    </div>
  {% endfor %}
  <a class="back-link" href="{{ '/blog/' | relative_url }}">← All writing</a>
</section>

</div>
