---
layout: default
title: About
description: Sven Lutz — M.Sc. student in Information Systems at KIT, working on applied AI and research software. Background, experience and current work.
permalink: /about/
---

<div class="shell">

<header class="page-head">
  <p class="label">About</p>
  <h1>Sven Lutz</h1>
  <div class="about-intro">
    <img class="portrait" src="{{ '/assets/images/portrait.jpg' | relative_url }}" alt="Portrait of Sven Lutz" width="377" height="377" loading="lazy">
    <p class="lede">I work on applied AI and research software — the kind that has to run outside a notebook, on real data, with someone depending on the result.</p>
  </div>
</header>

<section class="section">
  <div class="prose">
    <p>I am completing an M.Sc. in Information Systems at the Karlsruhe Institute of Technology (KIT), after a B.Sc. in Business Administration at the University of Bayreuth and additional coursework in mathematics. That sequence is deliberate: I wanted the quantitative foundation and the organisational context, not one without the other.</p>
    <p>My work sits between research and engineering. A question gets formalised, implemented, measured, and then — most importantly — examined for the conditions under which the answer stops holding.</p>

    <p>Across these roles I have worked with retrieval and knowledge graphs, time-series forecasting, computer vision, experimental control software, industrial data and process automation.</p>

    <h2>Current work</h2>
    <p>I work at the Institute of Nanotechnology (INT) at KIT, on control and telemetry software for laboratory filtration systems: the layer between physical equipment, experiment procedures and the people running them.</p>
    <p>Alongside it I build a GraphRAG pipeline for municipal climate-policy information — crawling public material from Bavarian municipalities, extracting entities and relations into a knowledge graph, and keeping both the answers and the evidence behind them inspectable.</p>

    <h2>Interests</h2>
    <ul>
      <li><strong>AI and knowledge systems</strong> — retrieval, graphs, evaluation, and tools for navigating information that resists clean structure.</li>
      <li><strong>Economics and sustainability</strong> — how technical systems meet incentives, resources and public decisions.</li>
      <li><strong>Mathematics</strong> — formal structure, quantitative reasoning and the honest handling of uncertainty.</li>
      <li><strong>Entrepreneurship</strong> — designing and testing software that could stand on its own.</li>
    </ul>

    <h2>Contact</h2>
    <p>Email <a href="mailto:Lutz.sven@outlook.de">Lutz.sven@outlook.de</a>, or find me on <a href="https://github.com/Sven-Lutz">GitHub</a> and <a href="https://www.linkedin.com/in/lutzsven/">LinkedIn</a>. Questions about the work here, or about anything I have written, are always welcome.</p>
  </div>
</section>

<section class="section" aria-labelledby="experience-heading">
  <div class="section-head">
    <h2 id="experience-heading">Experience</h2>
  </div>
  {% include experience.html %}
</section>

</div>
