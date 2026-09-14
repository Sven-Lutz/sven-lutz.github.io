---
layout: default
title: Research log
description: Short notes from work in progress — what I am building, reading and getting wrong, between the longer articles.
permalink: /log/
---

<div class="shell">

<header class="page-head">
  <p class="label">Log</p>
  <h1>Research log</h1>
  <p class="lede">Short notes from work in progress: what I am building, what I am reading, and what turned out not to work. The longer write-ups live in <a href="{{ '/blog/' | relative_url }}">Writing</a>.</p>
  <p class="inline-links">
    <a href="{{ '/feed/notes.xml' | relative_url }}">Notes feed</a>
    <a href="{{ '/feed.xml' | relative_url }}">Articles feed</a>
  </p>
</header>

<section class="section">
  {%- assign notes = site.notes | sort: "date" | reverse -%}
  {% if notes.size > 0 %}
    {%- assign notes_by_month = notes | group_by_exp: "note", "note.date | date: '%B %Y'" -%}
    {% for month in notes_by_month %}
      <div class="year-group">
        <h2>{{ month.name }}</h2>
        <ol class="log">
          {% for note in month.items %}
            <li class="log__entry" id="{{ note.date | date: '%Y-%m-%d' }}-{{ note.title | default: forloop.index | slugify }}">
              <p class="log__meta">
                <time datetime="{{ note.date | date_to_xmlschema }}">{{ note.date | date: "%-d %b" }}</time>
                {%- if note.tags %}{% for tag in note.tags %}<span class="log__tag">{{ tag }}</span>{% endfor %}{% endif -%}
              </p>
              <div class="log__body prose">
                {% if note.title %}<h3>{{ note.title }}</h3>{% endif %}
                {{ note.content | markdownify }}
              </div>
            </li>
          {% endfor %}
        </ol>
      </div>
    {% endfor %}
  {% else %}
    <p class="lede">No notes yet.</p>
  {% endif %}
</section>

</div>
