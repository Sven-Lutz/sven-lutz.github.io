/* Search across articles and project pages.

   Ranking is Okapi BM25 over a build-time index, with field weighting — it is
   lexical, not semantic: there is no embedding model in the page, because a
   model download would cost megabytes to answer questions a few hundred
   documents can answer instantly. Everything runs locally; no query leaves the
   browser and nothing is logged. */
(() => {
  'use strict';

  const form = document.querySelector('[data-search]');
  if (!form) return;

  const input = form.querySelector('input[type="search"]');
  const results = document.querySelector('[data-search-results]');
  const status = document.querySelector('[data-search-status]');
  const fallback = document.querySelector('[data-search-fallback]');
  if (!input || !results) return;

  form.hidden = false;

  const K1 = 1.5;
  const B = 0.75;
  const FIELD_WEIGHTS = { t: 3.2, g: 2.4, d: 1.8, c: 1.4, b: 1 };

  const tokenize = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .split(/[^a-z0-9äöüß]+/i)
      .filter((token) => token.length > 1);

  let index = null;
  let loading = null;

  const build = (documents) => {
    const postings = new Map();
    const lengths = [];

    documents.forEach((doc, docId) => {
      const fields = {
        t: tokenize(doc.t),
        d: tokenize(doc.d || ''),
        c: tokenize(doc.c || ''),
        g: tokenize((doc.g || []).join(' ')),
        b: tokenize(doc.b || ''),
      };

      let weighted = 0;
      Object.entries(fields).forEach(([field, tokens]) => {
        const weight = FIELD_WEIGHTS[field];
        weighted += tokens.length * weight;
        tokens.forEach((token) => {
          if (!postings.has(token)) postings.set(token, new Map());
          const docs = postings.get(token);
          docs.set(docId, (docs.get(docId) || 0) + weight);
        });
      });
      lengths[docId] = weighted || 1;
    });

    const average = lengths.reduce((sum, n) => sum + n, 0) / (lengths.length || 1);
    return { documents, postings, lengths, average };
  };

  const load = () => {
    if (index) return Promise.resolve(index);
    if (loading) return loading;
    loading = fetch(form.dataset.search)
      .then((response) => {
        if (!response.ok) throw new Error(`Index unavailable (${response.status})`);
        return response.json();
      })
      .then((documents) => {
        index = build(documents);
        return index;
      });
    return loading;
  };

  const search = (query) => {
    const terms = tokenize(query);
    if (!terms.length) return [];

    const total = index.documents.length;
    const scores = new Map();

    terms.forEach((term) => {
      /* Prefix matching so a half-typed word still ranks, at a small discount. */
      const matches = index.postings.has(term)
        ? [[term, index.postings.get(term), 1]]
        : [...index.postings.entries()]
            .filter(([candidate]) => candidate.startsWith(term))
            .slice(0, 12)
            .map(([candidate, docs]) => [candidate, docs, 0.6]);

      matches.forEach(([, docs, discount]) => {
        const idf = Math.log(1 + (total - docs.size + 0.5) / (docs.size + 0.5));
        docs.forEach((frequency, docId) => {
          const norm = 1 - B + B * (index.lengths[docId] / index.average);
          const score = idf * ((frequency * (K1 + 1)) / (frequency + K1 * norm));
          scores.set(docId, (scores.get(docId) || 0) + score * discount);
        });
      });
    });

    return [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([docId, score]) => ({ doc: index.documents[docId], score, terms }));
  };

  /* Front matter is hand-written: `period: 2025` arrives as a number, not a
     string. Coerce before touching string methods. */
  const escape = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const snippet = (doc, terms) => {
    const body = String(doc.b || doc.d || '');
    const lower = body.toLowerCase();
    let at = -1;
    for (const term of terms) {
      const found = lower.indexOf(term);
      if (found !== -1 && (at === -1 || found < at)) at = found;
    }
    if (at === -1) return escape(doc.d || body.slice(0, 160));

    const start = Math.max(0, body.lastIndexOf(' ', Math.max(0, at - 70)));
    const end = Math.min(body.length, at + 150);
    const text = `${start > 0 ? '…' : ''}${body.slice(start, end).trim()}${end < body.length ? '…' : ''}`;

    const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    return escape(text).replace(pattern, '<mark>$1</mark>');
  };

  const render = (matches, query) => {
    if (fallback) fallback.hidden = query.length > 0;
    results.hidden = query.length === 0;

    if (!query) {
      results.innerHTML = '';
      if (status) status.textContent = '';
      return;
    }

    if (!matches.length) {
      results.innerHTML = `<li class="search-empty">Nothing matches “${escape(query)}”.</li>`;
      if (status) status.textContent = `No results for ${query}.`;
      return;
    }

    results.innerHTML = matches
      .map(({ doc, terms }) => `
        <li class="entry">
          <p class="entry-meta">
            ${doc.p ? `<span>${escape(doc.p)}</span>` : ''}
            ${doc.c ? `<span class="dot" aria-hidden="true"></span><span>${escape(doc.c)}</span>` : ''}
          </p>
          <h3><a href="${escape(doc.u)}">${escape(doc.t)}</a></h3>
          <p>${snippet(doc, terms)}</p>
        </li>`)
      .join('');

    if (status) {
      status.textContent = `${matches.length} ${matches.length === 1 ? 'result' : 'results'} for ${query}.`;
    }
  };

  let timer;
  const run = () => {
    const query = input.value.trim();
    if (!query) {
      render([], '');
      return;
    }
    load()
      .then(() => render(search(query), query))
      .catch((error) => {
        console.error('Search failed:', error);
        results.hidden = false;
        results.innerHTML = '<li class="search-empty">Search is unavailable right now.</li>';
        if (status) status.textContent = 'Search is unavailable.';
      });
  };

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(run, 90);
  });
  input.addEventListener('focus', () => { load().catch(() => {}); }, { once: true });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearTimeout(timer);
    run();
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      input.value = '';
      render([], '');
    }
  });

  /* "/" focuses search from anywhere on the page, as in most developer tools. */
  document.addEventListener('keydown', (event) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable;
    if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey) {
      event.preventDefault();
      input.focus();
    }
  });
})();
