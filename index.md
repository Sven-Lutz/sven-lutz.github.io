---
layout: default
title: Sven Lutz
description: Applied AI and research software. Writing on GraphRAG, knowledge graphs, retrieval and research engineering by Sven Lutz, M.Sc. student in Information Systems at KIT.
graph: true
---

<div class="shell">

<section class="intro">
  <p class="label">Applied AI · Research software</p>
  <h1>Sven Lutz</h1>
  <div class="intro-copy">
    <p>I build AI systems for questions that do not fit neatly into a benchmark — knowledge graphs over municipal climate policy, forecasting models for charging infrastructure, control software for laboratory experiments.</p>
    <p>I am completing an M.Sc. in Information Systems at KIT, with a background in business administration and mathematics. This site documents how those systems are built and where they break.</p>
  </div>
  <p class="intro-meta">
    <span><strong>KIT</strong> M.Sc. Information Systems</span>
    <span><strong>Currently</strong> GraphRAG for climate policy</span>
    <span><strong>Previously</strong> Porsche · Fraunhofer FIT/FIM · ASML</span>
  </p>
</section>

<section class="section graph-section" aria-labelledby="graph-heading">
  <div class="section-head">
    <h2 id="graph-heading">Everything here, connected</h2>
    <a href="{{ '/blog/tags/' | relative_url }}">Browse by topic →</a>
  </div>
  <p class="section-note">Articles, projects and the topics they share — built from the content of this site, not drawn by hand. Select any item to filter the lists below.</p>

  {% include graph-data.html %}
  <figure class="graph" data-graph>
    <figcaption class="graph__legend">
      <span class="graph__key graph__key--article">Article</span>
      <span class="graph__key graph__key--project">Project</span>
      <span class="graph__key graph__key--topic">Topic</span>
    </figcaption>
  </figure>

  <p class="graph-status" data-graph-status role="status"></p>
  <button class="graph-clear" type="button" data-graph-clear hidden>Clear filter</button>
</section>

<section class="section">
  <div class="section-head">
    <h2>Writing</h2>
    <a href="{{ '/blog/' | relative_url }}">All writing →</a>
  </div>
  <ul class="entries">
    {% for post in site.posts limit:4 %}
      {% capture node_ids %}a{{ forloop.index }}{% for tag in post.tags %} t-{{ tag | slugify }}{% endfor %}{% endcapture %}
      {% include post-entry.html post=post node_ids=node_ids %}
    {% endfor %}
  </ul>
</section>

<section class="section">
  <div class="section-head">
    <h2>Projects</h2>
    <a href="{{ '/projects/' | relative_url }}">All projects →</a>
  </div>
  <div class="project-grid">
    {% assign ordered_projects = site.projects | sort: "order" %}
    {% for project in ordered_projects %}
      {% if project.featured %}
        {% capture node_ids %}p{{ forloop.index }}{% for tool in project.stack %} t-{{ tool | slugify }}{% endfor %}{% endcapture %}
        {% include project-card.html project=project node_ids=node_ids %}
      {% endif %}
    {% endfor %}
  </div>
</section>

<section class="section">
  <div class="section-head"><h2>Contact</h2></div>
  <p class="lede">Open to research collaborations, working-student and thesis positions in applied AI and research engineering.</p>
  <p class="inline-links">
    <a href="mailto:Lutz.sven@outlook.de">Lutz.sven@outlook.de</a>
    <a href="https://github.com/Sven-Lutz">GitHub</a>
    <a href="https://www.linkedin.com/in/lutzsven/">LinkedIn</a>
  </p>
</section>

</div>
