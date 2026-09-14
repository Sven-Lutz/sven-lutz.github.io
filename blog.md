---
layout: default
title: Writing
description: Articles and notes on applied AI, research software and empirical work by Sven Lutz.
permalink: /blog/
---

<section>
  <h1>Writing</h1>
  <p class="lede">Articles and notes from my work on applied AI and research software. I mostly write things down to keep the reasoning behind a result, not only the result.</p>
  <p class="inline-links"><a href="{{ '/blog/categories/' | relative_url }}">Categories</a> · <a href="{{ '/blog/tags/' | relative_url }}">Tags</a> · <a href="{{ '/feed.xml' | relative_url }}">RSS</a></p>
</section>

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in posts_by_year %}
  <h2 class="year-heading">{{ year.name }}</h2>
  <ul class="entry-list">
    {% for post in year.items %}
      <li>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b" }}</time>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        {% if post.description %}<p>{{ post.description }}</p>{% endif %}
      </li>
    {% endfor %}
  </ul>
{% endfor %}
