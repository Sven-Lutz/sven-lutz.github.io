---
layout: default
title: Projects — Sven Lutz
description: Selected applied AI, research software and machine-learning projects by Sven Lutz.
permalink: /projects/
---

<section class="page-hero projects-hero">
  <p class="section-index">Projects / Selected work</p>
  <h1>Research questions, implemented and examined.</h1>
  <p class="lede">A curated set of projects across applied AI, experimental software and quantitative research. Each page focuses on the problem, the approach, the result and its limits.</p>
</section>

<section class="section project-index">
  {% assign ordered_projects = site.projects | sort: "order" %}
  {% for project in ordered_projects %}
    <a class="project-index-row" href="{{ project.url | relative_url }}">
      <span class="project-number">{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}</span>
      <div class="project-index-main">
        <span class="project-type">{{ project.type }} · {{ project.status }}</span>
        <h2>{{ project.short_title | default: project.title }}</h2>
        <p>{{ project.description }}</p>
      </div>
      <div class="project-index-tools">{{ project.stack | join: "<br>" }}</div>
      <span class="project-arrow" aria-hidden="true">↗</span>
    </a>
  {% endfor %}
</section>
