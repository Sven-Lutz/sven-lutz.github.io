/* Article enhancements: heading anchors, table of contents with scroll spy,
   and code blocks with a language label and copy button.
   Everything degrades gracefully: without JavaScript the article still reads. */
(() => {
  'use strict';

  const article = document.querySelector('.article-body');
  if (!article) return;

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'section';

  /* ---------- Headings: stable ids and anchor links ---------- */

  const headings = [...article.querySelectorAll('h2, h3')].filter(
    (h) => !h.closest('.callout, .panel, .series-nav, .toc')
  );

  const used = new Set(
    [...document.querySelectorAll('[id]')].map((el) => el.id)
  );

  headings.forEach((heading) => {
    if (!heading.id) {
      const base = slugify(heading.textContent);
      let id = base;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      heading.id = id;
    }
    used.add(heading.id);

    const anchor = document.createElement('a');
    anchor.className = 'heading-anchor';
    anchor.href = `#${heading.id}`;
    anchor.textContent = '#';
    anchor.setAttribute('aria-label', `Link to section: ${heading.textContent}`);
    heading.appendChild(anchor);
  });

  /* ---------- Table of contents ---------- */

  const lists = [...document.querySelectorAll('[data-toc]')];

  if (lists.length) {
    if (headings.length < 2) {
      document.querySelectorAll('.toc-column, .toc-mobile').forEach((el) => el.remove());
    } else {
      lists.forEach((list) => {
        headings.forEach((heading) => {
          const item = document.createElement('li');
          if (heading.tagName === 'H3') item.className = 'toc-h3';
          const link = document.createElement('a');
          link.href = `#${heading.id}`;
          link.textContent = heading.textContent.replace(/#$/, '').trim();
          link.dataset.tocFor = heading.id;
          item.appendChild(link);
          list.appendChild(item);
        });
      });

      /* Scroll spy: highlight the heading closest above the reading position. */
      const links = [...document.querySelectorAll('[data-toc-for]')];
      let active = null;

      const setActive = (id) => {
        if (id === active) return;
        active = id;
        links.forEach((link) => {
          link.classList.toggle('is-active', link.dataset.tocFor === id);
        });
      };

      const onScroll = () => {
        const offset = 96;
        let current = headings[0];
        for (const heading of headings) {
          if (heading.getBoundingClientRect().top - offset <= 0) current = heading;
          else break;
        }
        const atBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
        setActive(atBottom ? headings[headings.length - 1].id : current.id);
      };

      let ticking = false;
      const schedule = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
      };

      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      onScroll();

      /* Close the mobile disclosure once a destination is chosen. */
      const mobile = document.querySelector('.toc-mobile');
      mobile?.addEventListener('click', (event) => {
        if (event.target.closest('a')) mobile.open = false;
      });
    }
  }

  /* ---------- Code blocks ---------- */

  const canCopy = Boolean(navigator.clipboard && window.isSecureContext);

  article.querySelectorAll('div.highlight, div.highlighter-rouge').forEach((block) => {
    const pre = block.querySelector('pre');
    if (!pre || block.closest('.code-block')) return;

    const classes = `${block.className} ${block.parentElement?.className || ''}`;
    const match = classes.match(/language-([\w+#-]+)/);
    const language = match ? match[1] : '';

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    block.parentNode.insertBefore(wrapper, block);

    const bar = document.createElement('div');
    bar.className = 'code-block__bar';

    const label = document.createElement('span');
    label.className = 'code-block__lang';
    label.textContent = language || 'code';
    bar.appendChild(label);

    if (canCopy) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy';
      button.textContent = 'Copy';
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pre.innerText.replace(/\n$/, ''));
          button.textContent = 'Copied';
          button.dataset.copied = 'true';
          setTimeout(() => {
            button.textContent = 'Copy';
            delete button.dataset.copied;
          }, 1600);
        } catch {
          button.textContent = 'Press ⌘/Ctrl+C';
          setTimeout(() => (button.textContent = 'Copy'), 1600);
        }
      });
      bar.appendChild(button);
    }

    wrapper.appendChild(bar);
    wrapper.appendChild(block);
  });

  /* ---------- Tables: allow horizontal scrolling on narrow screens ---------- */

  article.querySelectorAll('table').forEach((table) => {
    if (table.closest('.table-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Table, scrollable');
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });
})();
