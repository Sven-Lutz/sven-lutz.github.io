# sven-lutz.github.io

Personal site of Sven Lutz: writing on applied AI and research software, plus project write-ups.
Built with Jekyll, written in Markdown, deployed to GitHub Pages.

- **Live:** https://sven-lutz.github.io
- **Deploy:** every push to `main` runs `.github/workflows/jekyll-gh-pages.yml`

---

## Writing an article

```bash
bin/new-post "GraphRAG explained"
bin/new-post "Evaluating retrieval" --category "Research notes" --tags "Evaluation, Retrieval"
bin/new-post "Short note" --publish      # straight into _posts/ instead of _drafts/
```

The script creates a draft in `_drafts/` with complete front matter and the building blocks
below already stubbed in. Preview it:

```bash
bundle exec jekyll serve --drafts --livereload
```

Publish by moving the file into `_posts/` with a date prefix — the slug becomes the URL,
so keep it stable once published:

```bash
git mv _drafts/graphrag-explained.md _posts/2026-09-14-graphrag-explained.md
```

### Front matter

| Field | Required | Purpose |
|---|---|---|
| `title` | yes | Article title; also the `<title>` and social-card title |
| `description` | yes | One sentence; used in the archive, search results and link previews |
| `date` | yes | Publication date (the filename date wins for the URL) |
| `category` | recommended | One broad area, e.g. `Explainers`, `Research notes` |
| `tags` | recommended | Specific methods and technologies |
| `toc` | optional | `true` adds the sidebar table of contents with scroll tracking |
| `math` | optional | `true` loads KaTeX **on that page only** |
| `project` | optional | `slug` of a file in `_projects/`; cross-links both pages |
| `series` / `series_order` | optional | Adds series navigation between articles |
| `updated` | optional | Shown next to the date after a material revision |
| `reading_time` | optional | Overrides the automatic estimate (210 words per minute) |
| `redirect_from` | optional | Keeps an old URL working after a rename |
| `published: false` | optional | Keeps a dated post out of the build |

### Building blocks

Everything below is plain Markdown plus a few HTML wrappers. `markdown="1"` lets kramdown
keep formatting the content inside the wrapper.

**Code** — fenced blocks get a language label and a copy button automatically:

````markdown
```python
def segment(document: str) -> list[str]:
    ...
```
````

**Callouts** — `callout--note`, `callout--tip`, `callout--warning`, `callout--example`:

```markdown
<div class="callout callout--warning" markdown="1">

This step dominates the indexing cost.

</div>
```

Add `data-label="Prerequisite"` to relabel a box.

**Panels** for prerequisites, key takeaways or summaries:

```markdown
<div class="panel" markdown="1">

#### Key takeaways

- The two or three things worth remembering

</div>
```

**Step flows** — for pipelines and processes. Steps are separated by `|`, an
optional note follows a `:`:

```liquid
{% include pipeline.html
   steps="Crawl : public sites | Segment : text units | Extract : entities | Query : local and global"
   caption="Figure 1. What the pipeline does." %}
```

**Results** — a row of stated numbers, usable in an article or in a project's
`metrics:` front matter:

```liquid
{% include metrics.html items="RMSE : 9.8 : best model | Baseline : 12.4 : naive" %}
```

**Hand-drawn diagrams** — inline SVG using the `.diagram__*` classes
(`__box`, `__fill`, `__line`, `__text`, `__text--muted`, `__arrow`, and the
`--accent` variants). They take their colours from the design tokens, so they
work in both themes without a second set of values. Always give the `<svg>`
`role="img"` with a `<title>` and `<desc>`; see `_projects/int.md` for a worked
example.

**Figures**, optionally wider than the text column on large screens:

```markdown
<figure class="wide">
  <img src="/assets/images/pipeline.svg" alt="Describe what the figure shows">
  <figcaption>Figure 1. What the reader should notice.</figcaption>
</figure>
```

**Maths** with `math: true` in the front matter: `$inline$` and `$$display$$`.
KaTeX is served from `assets/vendor/katex/`, not from a CDN.

**Tables** are plain Markdown; they become horizontally scrollable on narrow screens.
Footnotes use kramdown syntax (`[^1]`).

---

## Research log

Short notes that do not warrant an article:

```bash
bin/new-note "Leiden over Louvain here" --tags "GraphRAG,Clustering"
```

Notes live in `_notes/` and appear on `/log/` immediately — no draft step, no
page of their own. They have a separate feed at `/feed/notes.xml`. The Log entry
in the navigation appears only once at least one note exists.

---

## Experience

`_data/experience.yml`, newest first. Required: `org`, `role`, `period`.
Optional: `unit`, `summary`, `highlights` (list), `stack` (list), `project`
(a slug from `_projects/`, which links the entry to that page) and `current`.

```yaml
- org: Karlsruhe Institute of Technology
  unit: Institute of Nanotechnology (INT)
  role: Research software engineering
  period: 2025 — present
  current: true
  summary: >
    One or two sentences about the role.
  highlights:
    - What you built, and what came of it
  stack: [Python, PySide6]
  project: int
```

---

## Social preview cards

The site-wide card is `assets/images/og-card.png`, set in `_config.yml`. For a
per-article card:

```bash
bin/og-card _posts/2026-09-14-graphrag-explained.md
```

It writes `assets/images/og/<slug>.png` and prints the `image:` line to add to
that article's front matter. It needs Playwright with Chromium
(`pip install playwright && playwright install chromium`); set `CHROMIUM_PATH`
to use a browser you already have. Skipping it is fine — the site-wide card is
the fallback.

---

## Adding a project

Create `_projects/project-slug.md`:

```yaml
---
title: "Full project title"
short_title: "Short title for lists"
slug: project-slug           # referenced by a post's `project:` field
description: "One sentence."
type: Applied AI             # Research software, Bachelor's thesis, …
status: Work in progress     # Active development, Completed, …
period: 2026—present
role: Independent research and development
stack: [GraphRAG, Neo4j, Python]
repository: https://github.com/Sven-Lutz/example
repository_public: false     # shows "Private repository" instead of a dead link
featured: true               # appears on the start page
order: 1
metrics: "Stages : 7 : crawl to query | Repository : private : research workflow"
---
```

`metrics` renders the results row under the project's facts. Leave it out when
there is nothing measured to state.

---

## Structure

```text
_posts/            published articles
_drafts/           work in progress (built only with --drafts)
_projects/         project pages
_notes/            research log entries, rendered on /log/
_data/             experience.yml
_layouts/          default, post, project
_includes/         post-entry, project-card, series-nav, experience,
                   pipeline, metrics, graph-data, person-schema
assets/css/        main.css (design system), fonts.css (generated @font-face rules)
assets/fonts/      self-hosted Inter, Source Serif 4, JetBrains Mono (OFL)
assets/js/         article.js — table of contents, anchors, code copy buttons
                   graph.js   — the content graph on the start page
                   search.js  — BM25 search over the build-time index
assets/vendor/     self-hosted KaTeX
assets/images/     portrait, social preview card
bin/new-post       draft scaffolding
bin/new-note       research log entry
bin/og-card        per-article social preview card
```

### Design system

`assets/css/main.css` starts with the tokens — colour, type scale, spacing, measure.
Change a value there rather than overriding it further down. Two rules matter for layout:

- Header, content and footer all resolve to the same shell width, so every left edge lines up.
- Pages with `toc: true` get `body.has-sidebar`, which widens that shared shell.

Light and dark palettes are both defined in the tokens; there is no theme switch, the
site follows the operating system. Printing an article is supported (`@media print`).

### Third-party assets

Fonts and KaTeX are served from this origin. No request leaves the visitor's browser to a
third party, which keeps the site simple and avoids the legal questions around hotlinked
webfonts in Germany. Both are under open licences (SIL OFL, MIT); the KaTeX package was
installed from npm and verified against the registry's published checksum.

---

## Local development

```bash
bundle install
bundle exec jekyll serve --drafts --livereload
```

Open `http://localhost:4000`.

---

## Notes

- **Privacy:** no private CV files, addresses, phone numbers or matriculation details in this
  repository. A public CV must be a separately prepared, sanitised document.
- **Scaling up:** when the archive gets long enough to be awkward to browse, add build-time
  pagination first, then a small static search index. Neither changes existing URLs.
