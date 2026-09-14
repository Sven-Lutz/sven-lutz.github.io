---
layout: default
title: Writing
description: Technical articles and research notes on applied AI, GraphRAG, knowledge graphs, machine learning and research software engineering.
permalink: /blog/
search: true
---

<div class="shell">

<header class="page-head">
  <p class="label">Writing</p>
  <h1>Articles and research notes</h1>
  <p class="lede">Explanations of methods I use, write-ups of systems I build, and notes on what the evidence actually supported. Written for readers who want the reasoning, not only the result.</p>

  <form class="search" data-search="{{ '/search-index.json' | relative_url }}" role="search" hidden>
    <label class="search__label" for="search-input">Search articles and projects</label>
    <div class="search__field">
      <input id="search-input" type="search" name="q" placeholder="Search — try “retrieval” or “forecasting”" autocomplete="off" spellcheck="false">
      <kbd class="search__hint" aria-hidden="true">/</kbd>
    </div>
    <p class="search__note">Ranked with BM25 over an index built at deploy time. Runs entirely in your browser.</p>
  </form>

  <p class="inline-links">
    <a href="{{ '/blog/categories/' | relative_url }}">Categories</a>
    <a href="{{ '/blog/tags/' | relative_url }}">Tags</a>
    <a href="{{ '/feed.xml' | relative_url }}">RSS feed</a>
  </p>
</header>

<p class="search-status" data-search-status role="status" aria-live="polite"></p>
<ul class="entries search-results" data-search-results hidden></ul>

<div data-search-fallback>
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

</div>
