---
layout: default
title: Sven Lutz — Applied AI & Research Software
description: Sven Lutz works on applied AI, research software and technology at the intersection of economics, sustainability and society.
---

<section class="home-intro">
  <div class="intro-index" aria-hidden="true">01 / Profile</div>
  <div class="intro-copy">
    <p class="eyebrow">Applied AI · Research software · Entrepreneurship</p>
    <h1>Applied AI and research software for complex, real-world questions.</h1>
    <p class="lede">I’m Sven Lutz, an Information Systems master’s student at KIT. I work across AI, software and empirical research, with a particular interest in economics, sustainability and society.</p>
    <div class="actions">
      <a class="button primary" href="{{ '/projects/' | relative_url }}">View selected projects</a>
      <a class="button secondary" href="{{ '/about/' | relative_url }}">Background & focus</a>
    </div>
  </div>
  <aside class="profile-note">
    <img src="https://avatars.githubusercontent.com/u/160597035?v=4" alt="Portrait of Sven Lutz">
    <div>
      <span>Currently</span>
      <p>Developing a GraphRAG-based knowledge system for municipal climate-policy information and exploring software product ideas.</p>
    </div>
  </aside>
</section>

<section class="signal-strip" aria-label="Profile summary">
  <div><span>Academic focus</span><strong>M.Sc. Information Systems, KIT</strong></div>
  <div><span>Practice</span><strong>AI systems and experimental software</strong></div>
  <div><span>Perspective</span><strong>Business, mathematics and product thinking</strong></div>
</section>

<section class="section" id="projects">
  <div class="section-heading">
    <div><p class="section-index">02 / Selected projects</p><h2>From research question to working system.</h2></div>
    <div><p>I document the problem, the implementation and the limits of the result—not just the final screenshot.</p><a class="text-link" href="{{ '/projects/' | relative_url }}">All projects →</a></div>
  </div>
  <div class="project-list">
    {% assign featured_projects = site.projects | where: "featured", true | sort: "order" %}
    {% for project in featured_projects limit:4 %}
      <a class="project-row" href="{{ project.url | relative_url }}">
        <span class="project-number">0{{ forloop.index }}</span>
        <div><span class="project-type">{{ project.type }} · {{ project.status }}</span><h3>{{ project.short_title | default: project.title }}</h3><p>{{ project.description }}</p></div>
        <span class="project-arrow" aria-hidden="true">↗</span>
      </a>
    {% endfor %}
  </div>
</section>

<section class="section experience-section">
  <div class="section-heading compact-heading">
    <div><p class="section-index">03 / Experience</p><h2>Research, industry and product work.</h2></div>
  </div>
  <div class="experience-grid">
    <div class="experience-intro">
      <p>My experience spans research and development, industrial software and product work. The common thread is translating ambiguous questions into systems that can be tested.</p>
      <a class="text-link" href="{{ '/about/' | relative_url }}">Full background →</a>
    </div>
    <ol class="experience-list">
      <li><span>2026</span><div><strong>Porsche</strong><small>Research & development internship</small></div></li>
      <li><span>2025—26</span><div><strong>KIT × ASML</strong><small>Research software for experimental systems</small></div></li>
      <li><span>2022—25</span><div><strong>Fraunhofer FIT / FIM</strong><small>Student research assistant</small></div></li>
      <li><span>Earlier</span><div><strong>soffico</strong><small>Product & innovation management</small></div></li>
    </ol>
  </div>
</section>

<section class="section writing-preview">
  <div class="section-heading">
    <div><p class="section-index">04 / Recent writing</p><h2>Methods, decisions and lessons from the work.</h2></div>
    <a class="text-link" href="{{ '/blog/' | relative_url }}">Writing archive →</a>
  </div>
  <div class="writing-list">
    {% for post in site.posts limit:3 %}
      <a class="writing-row" href="{{ post.url | relative_url }}">
        <div><span>{{ post.category | default: 'Essay' }}{% if post.reading_time %} · {{ post.reading_time }} min{% endif %}</span><h3>{{ post.title }}</h3><p>{{ post.description }}</p></div>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
      </a>
    {% endfor %}
  </div>
</section>
