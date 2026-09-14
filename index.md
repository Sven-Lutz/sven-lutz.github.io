---
layout: default
title: Sven Lutz — Applied AI & Research Software
description: Sven Lutz builds applied AI and research software at the intersection of technology, economics and sustainability.
---

<section class="hero">
  <div class="hero-copy">
    <p class="eyebrow">Applied AI · Research Software · Entrepreneurship</p>
    <h1>I explore complex questions and build software that makes them tractable.</h1>
    <p class="lede">I'm Sven Lutz, a Master's student in Information Systems at KIT. My work connects AI, experimental systems and product thinking with interests in economics, sustainability and society.</p>
    <div class="actions">
      <a class="button primary" href="#work">Explore my work</a>
      <a class="button secondary" href="mailto:Lutz.sven@outlook.de">Get in touch</a>
    </div>
  </div>
  <aside class="hero-card" aria-label="Current focus">
    <img src="https://avatars.githubusercontent.com/u/160597035?v=4" alt="Portrait of Sven Lutz">
    <div>
      <p class="eyebrow">Current focus</p>
      <p>Knowledge systems and GraphRAG for the analysis of municipal climate-policy information.</p>
    </div>
  </aside>
</section>

<section class="signal-strip" aria-label="Background">
  <div><span>Studying</span><strong>M.Sc. Information Systems at KIT</strong></div>
  <div><span>Building</span><strong>AI and research software</strong></div>
  <div><span>Exploring</span><strong>Software products and entrepreneurship</strong></div>
</section>

<section class="section" id="work">
  <div class="section-heading">
    <div><p class="eyebrow">Selected work</p><h2>Research meets implementation.</h2></div>
    <p>I care about understanding the problem, building the system and communicating what the result can — and cannot — show.</p>
  </div>
  <div class="project-grid">
    <article class="project-card featured">
      <div class="project-meta"><span>Research software</span><span>Python · PySide6</span></div>
      <h3><a href="https://github.com/Sven-Lutz/INT">Experimental process-control systems</a></h3>
      <p>Software for laboratory filtration and Aqua systems, covering hardware integration, experimental workflows, operator interfaces, telemetry and data logging.</p>
      <a class="text-link" href="https://github.com/Sven-Lutz/INT">View repository →</a>
    </article>
    <article class="project-card">
      <div class="project-meta"><span>Work in progress</span><span>GraphRAG · NLP</span></div>
      <h3>Municipal climate-policy knowledge system</h3>
      <p>A pipeline for collecting structured public information from German municipalities and preparing it for analysis with language models and graph-based retrieval.</p>
      <span class="text-link muted">Private development</span>
    </article>
    <article class="project-card">
      <div class="project-meta"><span>Bachelor's thesis</span><span>Time series · LSTM</span></div>
      <h3><a href="https://github.com/Sven-Lutz/BA_EV_Charging">Forecasting EV charging demand</a></h3>
      <p>User-centric load forecasting for charging stations using Gaussian mixture clustering and recurrent neural networks.</p>
      <a class="text-link" href="https://github.com/Sven-Lutz/BA_EV_Charging">View thesis →</a>
    </article>
    <article class="project-card">
      <div class="project-meta"><span>Student research</span><span>ClimateBERT · POLIANNA</span></div>
      <h3><a href="https://github.com/Sven-Lutz/SA_Polianna">NLP for climate-policy analysis</a></h3>
      <p>An exploratory study of transformer-based classification and sampling strategies for imbalanced policy annotations.</p>
      <a class="text-link" href="https://github.com/Sven-Lutz/SA_Polianna">View research project →</a>
    </article>
  </div>
</section>

<section class="section split-section">
  <div><p class="eyebrow">Perspective</p><h2>Technical depth benefits from a wider lens.</h2></div>
  <div class="prose compact">
    <p>My background combines business administration, information systems and university-level mathematics. Research roles and industrial projects taught me to move between theory, software and the realities of an operating environment.</p>
    <p>I am especially interested in projects where AI interacts with economic decisions, sustainability or social systems — and in turning promising ideas into useful products.</p>
    <a class="text-link" href="{{ '/about/' | relative_url }}">More about my background →</a>
  </div>
</section>

<section class="section notes-preview">
  <div class="section-heading">
    <div><p class="eyebrow">Notes</p><h2>Ideas, projects and lessons learned.</h2></div>
    <a class="text-link" href="{{ '/notes/' | relative_url }}">All notes →</a>
  </div>
  <div class="note-list">
    {% for post in site.posts limit:3 %}
      <a class="note-row" href="{{ post.url | relative_url }}">
        <div><span>{{ post.category | default: 'Note' }}</span><h3>{{ post.title }}</h3></div>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
      </a>
    {% endfor %}
  </div>
</section>
