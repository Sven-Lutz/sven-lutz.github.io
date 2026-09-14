---
layout: default
title: Projects
description: Applied AI, research software and machine-learning projects by Sven Lutz.
permalink: /projects/
---

<section>
  <h1>Projects</h1>
  <p class="lede">Work in applied AI, research software and quantitative analysis. Each page describes the problem, the approach, what came out of it and where the limits are.</p>
</section>

<ul class="entry-list">
  {% assign ordered_projects = site.projects | sort: "order" %}
  {% for project in ordered_projects %}
    <li>
      <span class="entry-note">{{ project.type }}{% if project.status %} · {{ project.status }}{% endif %}{% if project.period %} · {{ project.period }}{% endif %}</span>
      <h3><a href="{{ project.url | relative_url }}">{{ project.short_title | default: project.title }}</a></h3>
      {% if project.description %}<p>{{ project.description }}</p>{% endif %}
      {% if project.stack %}<p>{{ project.stack | join: ", " }}</p>{% endif %}
    </li>
  {% endfor %}
</ul>
