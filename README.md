# sven-lutz.github.io

Personal portfolio and technical publication platform for Sven Lutz. It is built with Jekyll, keeps articles in portable Markdown and deploys through GitHub Pages.

## Why Jekyll

The site already runs on GitHub Pages, and Jekyll covers the requirements without adding a JavaScript build stack:

- Markdown posts, drafts and stable permalinks
- A structured project collection
- RSS, sitemap, redirects and SEO metadata
- Syntax highlighting and optional KaTeX
- No client-side framework for core navigation or content

Astro would become useful if the site later needs component-heavy interactive work, a large content graph or client-side search. At the current scale, migrating would add maintenance cost without a corresponding reader benefit.

## Information architecture

```text
_projects/             structured project case studies
_posts/                published technical articles
_drafts/               unpublished work in progress
_layouts/project.html  project detail template
_layouts/post.html     long-form article template
projects.md             project index at /projects/
blog.md                 chronological archive at /blog/
blog-categories.md      generated category view
blog-tags.md            generated tag view
```

Projects and posts connect through the post’s `project` field. Only categories and tags that are actually used are rendered.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. To include unpublished drafts:

```bash
bundle exec jekyll serve --drafts
```

## Writing workflow

Start a draft in `_drafts/descriptive-slug.md`. A complete article front matter block looks like this:

```yaml
---
title: "A precise, descriptive title"
description: "One sentence used in archives and search previews."
date: 2026-09-14
updated: 2026-09-14
category: Research Notes
tags:
  - GraphRAG
  - Evaluation
reading_time: 8
project: climate-policy-knowledge-system
toc: true
math: true
series: "Evaluating retrieval systems"
series_order: 1
canonical_url: https://example.com/original-article/
# published: false
---
```

Only `title`, `description`, `category` and `tags` should normally be considered essential while drafting. Use the optional fields as follows:

- `updated` records a material revision.
- `project` must match the `slug` of a file in `_projects/` and creates links in both directions.
- `toc: true` generates a table of contents from level-two and level-three headings.
- `math: true` loads KaTeX only for that article. Inline math uses `$...$`; display math uses `$$...$$`.
- `series` and `series_order` create article-to-article series navigation.
- `canonical_url` overrides the canonical URL when the piece was originally published elsewhere.
- `published: false` keeps a dated post out of production; prefer `_drafts/` for ordinary work in progress.
- `redirect_from` preserves an older URL after a rename.

To publish, move the file to `_posts/YYYY-MM-DD-descriptive-slug.md`, keep the filename slug stable and run a production build before pushing.

## Long-form content

Standard fenced code blocks receive Rouge syntax highlighting. Markdown tables scroll horizontally on narrow screens. Figures can use semantic HTML:

```html
<figure class="wide">
  <img src="/assets/images/example.svg" alt="Describe the information in the figure">
  <figcaption>Figure 1. Explain what the reader should notice.</figcaption>
</figure>
```

References can be a final `## References` section with ordinary Markdown links or footnotes. Article content stays portable: the special features are progressive enhancements, not requirements for reading the Markdown source.

## Adding a project

Create `_projects/project-slug.md` with the fields used by the existing projects: `title`, `short_title`, `slug`, `description`, `type`, `status`, `period`, `role`, `stack`, `featured` and `order`. Set `repository_public: false` for private work so the site shows an honest availability label instead of a dead link.

## Deployment and future growth

Pushes to `main` deploy through `.github/workflows/jekyll-gh-pages.yml`. `/feed.xml` is generated automatically.

The current archive intentionally avoids premature complexity. When the article count makes browsing difficult, the next additions should be build-time pagination followed by a small static search index. Both can be added without changing existing article URLs or Markdown files.

## Privacy

Do not add private CV files, addresses, phone numbers, matriculation details or unreviewed exports to this repository. Any future public CV must be a separately prepared, sanitized document.
