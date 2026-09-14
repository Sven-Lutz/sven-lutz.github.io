---
layout: default
title: Sven Lutz
description: Notes and writing on applied AI and research software by Sven Lutz, Information Systems student at KIT.
---

<section>
  <h1>Sven Lutz</h1>
  <p>I am a master's student in Information Systems at KIT. I work on applied AI and research software — mostly where those meet economics, sustainability and public decision-making.</p>
  <p>At the moment I am building a GraphRAG-based knowledge system for municipal climate-policy information, and I write down what I learn along the way.</p>
  <p>This site is where I keep that writing: notes on methods, project write-ups, and the occasional post about what did not work. You can reach me by <a href="mailto:Lutz.sven@outlook.de">email</a>.</p>
</section>

<section>
  <h2>Recent writing</h2>
  <ul class="entry-list">
    {% for post in site.posts limit:5 %}
      <li>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b %Y" }}</time>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        {% if post.description %}<p>{{ post.description }}</p>{% endif %}
      </li>
    {% endfor %}
  </ul>
  <p class="inline-links"><a href="{{ '/blog/' | relative_url }}">All writing</a> · <a href="{{ '/feed.xml' | relative_url }}">RSS</a></p>
</section>

<section>
  <h2>Projects</h2>
  <ul class="entry-list">
    {% assign featured_projects = site.projects | where: "featured", true | sort: "order" %}
    {% for project in featured_projects limit:4 %}
      <li>
        <span class="entry-note">{{ project.type }}{% if project.status %} · {{ project.status }}{% endif %}</span>
        <h3><a href="{{ project.url | relative_url }}">{{ project.short_title | default: project.title }}</a></h3>
        {% if project.description %}<p>{{ project.description }}</p>{% endif %}
      </li>
    {% endfor %}
  </ul>
  <p class="inline-links"><a href="{{ '/projects/' | relative_url }}">All projects</a></p>
</section>
