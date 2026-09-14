---
layout: default
title: Projects
description: Applied AI, machine learning and research software projects — problem, approach, result and limitations.
permalink: /projects/
---

<div class="shell">

<header class="page-head">
  <p class="label">Projects</p>
  <h1>Systems I have built</h1>
  <p class="lede">Each page states the problem, the approach, what the result actually showed and where it stops. Private repositories are marked as such rather than linked into a dead end.</p>
</header>

<section class="section">
  <div class="project-grid">
    {% assign ordered_projects = site.projects | sort: "order" %}
    {% for project in ordered_projects %}{% include project-card.html project=project %}{% endfor %}
  </div>
</section>

</div>
