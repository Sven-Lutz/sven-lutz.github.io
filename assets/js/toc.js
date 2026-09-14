(() => {
  const article = document.querySelector('.article-body');
  const list = document.querySelector('#generated-toc');
  if (!article || !list) return;

  const headings = [...article.querySelectorAll('h2, h3')];
  const used = new Set();

  headings.forEach((heading, index) => {
    let id = heading.id || heading.textContent
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    if (!id) id = `section-${index + 1}`;
    const base = id;
    let suffix = 2;
    while (used.has(id) || document.querySelectorAll(`#${CSS.escape(id)}`).length > 1) {
      id = `${base}-${suffix++}`;
    }
    used.add(id);
    heading.id = id;

    const item = document.createElement('li');
    if (heading.tagName === 'H3') item.className = 'toc-subitem';
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    item.appendChild(link);
    list.appendChild(item);
  });

  if (!headings.length) document.querySelector('.toc-column')?.remove();
})();
