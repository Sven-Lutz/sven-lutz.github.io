---
layout: default
title: Tags
description: Writing grouped by method, technology and domain.
permalink: /blog/tags/
---

<div class="shell">

<header class="page-head">
  <p class="label">Writing</p>
  <h1>Tags</h1>
  <p class="lede">Specific methods, tools and domains across the archive.</p>
  <div class="chip-row">
    {% assign sorted_tags = site.tags | sort %}
    {% for tag in sorted_tags %}<a href="#{{ tag[0] | slugify }}">{{ tag[0] }} <span class="count">{{ tag[1].size }}</span></a>{% endfor %}
  </div>
</header>

<section class="section">
  {% for tag in sorted_tags %}
    <div class="year-group" id="{{ tag[0] | slugify }}">
      <h2>{{ tag[0] }}</h2>
      <ul class="entries">
        {% for post in tag[1] %}{% include post-entry.html post=post %}{% endfor %}
      </ul>
    </div>
  {% endfor %}
  <a class="back-link" href="{{ '/blog/' | relative_url }}">← All writing</a>
</section>

</div>
