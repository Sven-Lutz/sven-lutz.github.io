/* A graph of this site's own content: articles, projects and the topics that
   connect them.

   Three things keep it honest rather than decorative:
   - the data comes from the site's own front matter, emitted at build time;
   - the layout is a small force simulation with a fixed seed, so the same
     content always produces the same picture;
   - it settles before the first paint, and labels are placed by a collision
     pass, so nothing overlaps and nothing moves unless the reader interacts.

   The lists below the graph are rendered server-side and remain the source of
   truth. If this script never runs, no information is lost. */
(() => {
  'use strict';

  const mount = document.querySelector('[data-graph]');
  const dataEl = document.getElementById('graph-data');
  if (!mount || !dataEl) return;

  let data;
  try {
    data = JSON.parse(dataEl.textContent);
  } catch {
    return;
  }
  if (!data.nodes || data.nodes.length < 3) return;

  const NS = 'http://www.w3.org/2000/svg';
  const SEED = 20260914;

  /* Deterministic pseudo-randomness: same content, same layout, every visit. */
  const seeded = (seed) => () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const RADIUS = { article: 5.5, project: 5, topic: 3.5 };
  const PRIORITY = { article: 0, project: 1, topic: 2 };

  /* The viewBox matches the container's pixel width, so one user unit is one CSS
     pixel: a 12px label is genuinely 12px on a phone as on a desktop. */
  const dimensions = () => {
    const width = Math.max(mount.clientWidth || 760, 300);
    const height = width < 620
      ? Math.round(Math.min(width * 1.6, 760))
      : Math.round(Math.min(620, Math.max(430, width * 0.56)));
    return { width, height };
  };

  let nodes = [];
  let links = [];
  let neighbours = new Map();
  let byId = new Map();
  let nodeEls = [];
  let linkEls = [];
  let svg = null;
  let selected = null;

  const legend = mount.querySelector('.graph__legend');
  const status = document.querySelector('[data-graph-status]');
  const clearButton = document.querySelector('[data-graph-clear]');
  const filterables = [...document.querySelectorAll('[data-node-ids]')];

  /* ---------- Simulation ---------- */

  const layout = (W, H) => {
    const random = seeded(SEED);

    /* Degrees on the full graph decide what is worth drawing at this size. */
    const degrees = new Map(data.nodes.map((n) => [n.id, 0]));
    (data.links || []).forEach((l) => {
      degrees.set(l.source, (degrees.get(l.source) || 0) + 1);
      degrees.set(l.target, (degrees.get(l.target) || 0) + 1);
    });

    /* A narrow frame cannot carry 29 labels. Topics that connect only a single
       item are leaves: dropping them keeps the connective structure legible. */
    const dense = W < 620;
    const source = dense
      ? data.nodes.filter((n) => n.type !== 'topic' || (degrees.get(n.id) || 0) > 1)
      : data.nodes;
    const count = source.length;

    nodes = source.map((node, i) => ({
      ...node,
      degree: 0,
      x: W / 2 + Math.cos((i / count) * Math.PI * 2) * (W * 0.22 + random() * W * 0.1),
      y: H / 2 + Math.sin((i / count) * Math.PI * 2) * (H * 0.24 + random() * H * 0.1),
      vx: 0,
      vy: 0,
    }));

    byId = new Map(nodes.map((n) => [n.id, n]));
    links = (data.links || [])
      .map((l) => ({ source: byId.get(l.source), target: byId.get(l.target) }))
      .filter((l) => l.source && l.target);

    links.forEach((l) => {
      l.source.degree += 1;
      l.target.degree += 1;
    });

    neighbours = new Map(nodes.map((n) => [n.id, new Set([n.id])]));
    links.forEach((l) => {
      neighbours.get(l.source.id).add(l.target.id);
      neighbours.get(l.target.id).add(l.source.id);
    });

    const iterations = 460;
    const linkDistance = Math.max(78, Math.min(120, W / 9));
    /* Labels extend to the right of a node, so horizontal room matters more
       than vertical: the repulsion is anisotropic on purpose. */
    const repulsion = linkDistance * linkDistance * 0.75;

    for (let step = 0; step < iterations; step += 1) {
      const cooling = 1 - step / iterations;

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = (b.y - a.y) * 1.7;
          let distance = Math.hypot(dx, dy) || 0.01;
          if (distance < 1) {
            dx = (random() - 0.5) * 2;
            dy = (random() - 0.5) * 2;
            distance = 1;
          }
          const force = repulsion / (distance * distance);
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          a.vx -= fx;
          a.vy -= fy;
          b.vx += fx;
          b.vy += fy;
        }
      }

      links.forEach(({ source, target }) => {
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.hypot(dx, dy) || 0.01;
        const force = (distance - linkDistance) * 0.055;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        source.vx += fx;
        source.vy += fy;
        target.vx -= fx;
        target.vy -= fy;
      });

      nodes.forEach((node) => {
        node.vx += (W / 2 - node.x) * 0.014;
        node.vy += (H / 2 - node.y) * 0.02;
        node.x += node.vx * cooling * 0.34;
        node.y += node.vy * cooling * 0.34;
        node.vx *= 0.82;
        node.vy *= 0.82;
      });
    }

    /* Fit the settled layout into the frame, leaving room for labels. */
    const padTop = 18;
    const padBottom = 18;
    const padSide = Math.min(90, W * 0.12);
    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const scaleX = (W - padSide * 2) / Math.max(maxX - minX, 1);
    const scaleY = (H - padTop - padBottom) / Math.max(maxY - minY, 1);
    /* Uniform scaling would waste a tall frame; unbounded stretching would
       distort the picture. Allow up to 40% anisotropy, no more. */
    const base = Math.min(scaleX, scaleY);
    const fitX = Math.min(scaleX, base * 1.4);
    const fitY = Math.min(scaleY, base * 1.4);
    const offsetX = (W - (maxX - minX) * fitX) / 2;
    const offsetY = (H - (maxY - minY) * fitY) / 2;
    nodes.forEach((node) => {
      node.x = offsetX + (node.x - minX) * fitX;
      node.y = offsetY + (node.y - minY) * fitY;
    });
  };

  /* ---------- Rendering ---------- */

  const intersects = (a, b, pad = 3) =>
    a.x1 - pad < b.x2 && b.x1 - pad < a.x2 && a.y1 - pad < b.y2 && b.y1 - pad < a.y2;

  const placeLabels = (W, H) => {
    /* Nodes occupy space too — a label may not sit on another node's mark. */
    const obstacles = nodes.map((node) => {
      const r = RADIUS[node.type] + 3;
      return { x1: node.x - r, y1: node.y - r, x2: node.x + r, y2: node.y + r };
    });

    const order = [...nodes].sort(
      (a, b) => PRIORITY[a.type] - PRIORITY[b.type] || b.degree - a.degree
    );

    /* Placed label boxes, tagged by priority so a topic can be displaced. */
    const placed = [];

    order.forEach((node) => {
      const el = node.labelEl;
      const width = node.labelWidth;
      const height = node.labelHeight;
      const gap = RADIUS[node.type] + 6;

      const candidates = [
        { anchor: 'start', dx: gap, dy: height * 0.32 },
        { anchor: 'end', dx: -gap, dy: height * 0.32 },
        { anchor: 'middle', dx: 0, dy: -gap - 2 },
        { anchor: 'middle', dx: 0, dy: gap + height * 0.75 },
      ];

      const boxFor = (candidate) => {
        const left = candidate.anchor === 'start'
          ? node.x + candidate.dx
          : candidate.anchor === 'end'
            ? node.x + candidate.dx - width
            : node.x - width / 2;
        const top = node.y + candidate.dy - height * 0.8;
        return { x1: left, y1: top, x2: left + width, y2: top + height };
      };
      const inFrame = (box) => box.x1 >= 2 && box.x2 <= W - 2 && box.y1 >= 0 && box.y2 <= H;

      let fitted = candidates.find((candidate) => {
        const box = boxFor(candidate);
        if (!inFrame(box)) return false;
        if (obstacles.some((o) => intersects(box, o))) return false;
        if (placed.some((entry) => intersects(box, entry.box))) return false;
        candidate.box = box;
        return true;
      });

      /* An article or project is the content itself: rather than hide its label,
         drop the topic labels it collides with. */
      if (!fitted && node.type !== 'topic') {
        fitted = candidates.find((candidate) => {
          const box = boxFor(candidate);
          if (!inFrame(box)) return false;
          if (obstacles.some((o) => intersects(box, o))) return false;
          if (placed.some((entry) => entry.type !== 'topic' && intersects(box, entry.box))) return false;
          candidate.box = box;
          return true;
        });
        if (fitted) {
          placed
            .filter((entry) => entry.type === 'topic' && intersects(fitted.box, entry.box))
            .forEach((entry) => {
              entry.el.classList.add('graph__label--deferred');
              entry.box = { x1: 0, y1: 0, x2: 0, y2: 0 };
            });
        }
      }

      if (fitted) {
        el.setAttribute('text-anchor', fitted.anchor);
        el.setAttribute('x', fitted.dx.toFixed(1));
        el.setAttribute('y', fitted.dy.toFixed(1));
        placed.push({ box: fitted.box, type: node.type, el });
      } else {
        /* No room: the label appears on hover or focus instead of colliding. */
        el.classList.add('graph__label--deferred');
        el.setAttribute('text-anchor', 'start');
        el.setAttribute('x', gap.toFixed(1));
        el.setAttribute('y', (height * 0.32).toFixed(1));
      }
    });
  };

  /* Below the graph's useful width a node-link diagram cannot carry its own
     labels. Rather than shrink it into decoration, the same data is offered as
     filter chips: same model, same filtering, a form that fits the screen. */
  const renderChips = () => {
    layout(1200, 700); /* builds the model; positions are unused here */

    const list = document.createElement('div');
    list.className = 'graph-chips';
    list.setAttribute('role', 'group');
    list.setAttribute('aria-label', 'Filter by topic');

    /* Chips are compact enough to carry every topic — the leaf filter exists for
       the diagram's labels, not here. Most connected first. */
    const topics = nodes
      .filter((node) => node.type === 'topic')
      .sort((a, b) => b.degree - a.degree || a.label.localeCompare(b.label));

    topics.forEach((node) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'graph-chip';
      chip.dataset.id = node.id;
      chip.setAttribute('aria-pressed', 'false');
      chip.innerHTML = `${node.label} <span class="graph-chip__count">${node.degree}</span>`;
      chip.addEventListener('click', () => applyFilter(selected === node.id ? null : node.id));
      list.appendChild(chip);
    });

    mount.replaceChildren(list);
    nodeEls = [];
    linkEls = [];
    svg = null;
    mount.classList.add('is-ready', 'is-compact');
  };

  const render = () => {
    const { width: W, height: H } = dimensions();
    if (W < 620) {
      renderChips();
      if (selected) applyFilter(selected, true);
      return;
    }
    mount.classList.remove('is-compact');
    layout(W, H);

    const next = document.createElementNS(NS, 'svg');
    next.setAttribute('viewBox', `0 0 ${W} ${H}`);
    next.setAttribute('class', 'graph__svg');
    next.setAttribute('role', 'group');
    next.setAttribute('aria-label',
      `Graph of ${nodes.length} connected items: articles, projects and the topics they share. ` +
      'The same items are listed below this graph.');

    const linkLayer = document.createElementNS(NS, 'g');
    linkLayer.setAttribute('class', 'graph__links');
    next.appendChild(linkLayer);

    const nodeLayer = document.createElementNS(NS, 'g');
    nodeLayer.setAttribute('class', 'graph__nodes');
    next.appendChild(nodeLayer);

    linkEls = links.map(({ source, target }) => {
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', source.x.toFixed(1));
      line.setAttribute('y1', source.y.toFixed(1));
      line.setAttribute('x2', target.x.toFixed(1));
      line.setAttribute('y2', target.y.toFixed(1));
      line.dataset.source = source.id;
      line.dataset.target = target.id;
      linkLayer.appendChild(line);
      return line;
    });

    nodeEls = nodes.map((node) => {
      const group = document.createElementNS(NS, 'g');
      group.setAttribute('class', `graph__node graph__node--${node.type}`);
      group.setAttribute('transform', `translate(${node.x.toFixed(1)} ${node.y.toFixed(1)})`);
      group.setAttribute('tabindex', '0');
      group.setAttribute('role', 'button');
      group.setAttribute('aria-label', `${node.label} — ${node.meta}. Select to filter the lists below.`);
      group.dataset.id = node.id;

      const hit = document.createElementNS(NS, 'circle');
      hit.setAttribute('class', 'graph__hit');
      hit.setAttribute('r', '16');
      group.appendChild(hit);

      if (node.type === 'project') {
        const size = RADIUS.project * 2;
        const square = document.createElementNS(NS, 'rect');
        square.setAttribute('class', 'graph__mark');
        square.setAttribute('x', String(-size / 2));
        square.setAttribute('y', String(-size / 2));
        square.setAttribute('width', String(size));
        square.setAttribute('height', String(size));
        group.appendChild(square);
      } else {
        const circle = document.createElementNS(NS, 'circle');
        circle.setAttribute('class', 'graph__mark');
        circle.setAttribute('r', String(RADIUS[node.type]));
        group.appendChild(circle);
      }

      const label = document.createElementNS(NS, 'text');
      label.setAttribute('class', 'graph__label');
      label.setAttribute('x', '10');
      label.setAttribute('y', '4');
      label.textContent = node.short;
      group.appendChild(label);

      node.labelEl = label;
      nodeLayer.appendChild(group);
      return group;
    });

    /* Swap in, measure real text boxes, then resolve label collisions. */
    mount.replaceChildren(legend, next);
    svg = next;

    nodes.forEach((node) => {
      const box = node.labelEl.getBBox();
      node.labelWidth = box.width;
      node.labelHeight = box.height || 12;
    });
    placeLabels(W, H);

    bind();
    mount.classList.add('is-ready');
    if (selected) applyFilter(selected, true);
  };

  /* ---------- Interaction ---------- */

  const setHighlight = (id) => {
    const active = id ? neighbours.get(id) : null;
    if (!svg) return;
    svg.classList.toggle('is-focused', Boolean(active));
    nodeEls.forEach((el) => {
      el.classList.toggle('is-active', Boolean(active) && active.has(el.dataset.id));
      el.classList.toggle('is-origin', el.dataset.id === id);
    });
    linkEls.forEach((el) => {
      el.classList.toggle(
        'is-active',
        Boolean(active) && (el.dataset.source === id || el.dataset.target === id)
      );
    });
  };

  function applyFilter(id, quiet) {
    selected = id;
    setHighlight(id);

    const active = id ? neighbours.get(id) : null;
    let shown = 0;
    filterables.forEach((item) => {
      const ids = item.dataset.nodeIds.split(' ').filter(Boolean);
      const visible = !active || ids.some((value) => active.has(value));
      item.hidden = !visible;
      if (visible) shown += 1;
    });

    mount.querySelectorAll('.graph-chip').forEach((chip) => {
      const on = chip.dataset.id === id;
      chip.setAttribute('aria-pressed', String(on));
      chip.classList.toggle('is-on', on);
    });

    if (clearButton) clearButton.hidden = !id;
    if (status && !quiet) {
      status.textContent = id
        ? `Filtered by “${byId.get(id).label}” — ${shown} ${shown === 1 ? 'item' : 'items'} shown below.`
        : '';
    }
  }

  function bind() {
    nodeEls.forEach((el) => {
      const id = el.dataset.id;
      el.addEventListener('pointerenter', () => { if (!selected) setHighlight(id); });
      el.addEventListener('pointerleave', () => { if (!selected) setHighlight(null); });
      el.addEventListener('focus', () => { if (!selected) setHighlight(id); });
      el.addEventListener('blur', () => { if (!selected) setHighlight(null); });
      el.addEventListener('click', () => applyFilter(selected === id ? null : id));
      el.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          applyFilter(selected === id ? null : id);
        }
      });
    });
  }

  clearButton?.addEventListener('click', () => applyFilter(null));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && selected) applyFilter(null);
  });

  render();

  /* Re-layout only when the width changes materially — the seed keeps it stable. */
  let lastWidth = mount.clientWidth;
  let resizeTimer;
  window.addEventListener('resize', () => {
    const crossed = (lastWidth < 620) !== (mount.clientWidth < 620);
    if (!crossed && Math.abs(mount.clientWidth - lastWidth) < 48) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      lastWidth = mount.clientWidth;
      render();
    }, 200);
  });
})();
