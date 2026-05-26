(function () {
  'use strict';

  // ── Guard ────────────────────────────────────────────────────────────────
  if (!document.body || window.__mvLoaded) return;
  if (!location.pathname.toLowerCase().endsWith('.md')) return;
  window.__mvLoaded = true;

  // ── Grab raw markdown BEFORE we touch the DOM ────────────────────────────
  const rawText = document.body.innerText;
  if (!rawText.trim()) return;

  const filename = decodeURIComponent(location.pathname.split('/').pop());
  document.title = filename.replace(/\.md$/i, '') + ' · Markdown Viewer';

  // ── Inject hljs theme links into <head> (we control enable/disable) ──────
  function makeThemeLink(href, id, disabled) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL(href);
    link.id = id;
    link.disabled = disabled;
    document.head.appendChild(link);
    return link;
  }
  const hljsLight = makeThemeLink('themes/hl-light.css', 'mv-hl-light', false);
  const hljsDark  = makeThemeLink('themes/hl-dark.css',  'mv-hl-dark',  true);

  // ── Configure marked (v4 API) ─────────────────────────────────────────────
  const idCounts = {};
  const renderer = new marked.Renderer();

  renderer.heading = function (text, level) {
    const base = text
      .replace(/<[^>]+>/g, '')
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    idCounts[base] = (idCounts[base] || 0) + 1;
    const id = idCounts[base] === 1 ? base : `${base}-${idCounts[base]}`;
    return `<h${level} id="${id}">${text}</h${level}>\n`;
  };

  // Wrap tables in a scrollable container
  renderer.table = function (header, body) {
    return `<div class="mv-table-wrap"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>\n`;
  };

  const html = marked.parse(rawText, { renderer, gfm: true, breaks: false });

  // ── Build page ────────────────────────────────────────────────────────────
  document.body.innerHTML = `
    <div id="mv-progress"></div>

    <div id="mv-layout">
      <aside id="mv-sidebar">
        <div id="mv-sidebar-header">
          <span id="mv-filename" title="${filename}">${filename}</span>
          <button id="mv-toc-toggle" title="Toggle sidebar (T)">☰</button>
        </div>
        <nav id="mv-toc"></nav>
      </aside>

      <main id="mv-main">
        <article id="mv-article">${html}</article>
      </main>
    </div>

    <button id="mv-back-top" title="Back to top (Home)">↑</button>
    <button id="mv-theme-btn" title="Toggle dark mode (D)">◐</button>
  `;

  // ── Build TOC ─────────────────────────────────────────────────────────────
  const article  = document.getElementById('mv-article');
  const toc      = document.getElementById('mv-toc');
  const sidebar  = document.getElementById('mv-sidebar');
  const main     = document.getElementById('mv-main');
  const headings = Array.from(article.querySelectorAll('h1, h2, h3, h4'));

  if (headings.length >= 2) {
    toc.innerHTML = headings.map(h => {
      const level = h.tagName[1];
      return `<a href="#${h.id}" class="mv-toc-h${level}" data-id="${h.id}">${h.textContent}</a>`;
    }).join('');
  } else {
    sidebar.style.display = 'none';
    main.style.marginLeft = '0';
  }

  // ── Syntax highlighting + copy buttons ───────────────────────────────────
  article.querySelectorAll('pre code').forEach(block => {
    hljs.highlightElement(block);

    const btn = document.createElement('button');
    btn.className = 'mv-copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(block.innerText).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    });
    block.parentElement.appendChild(btn);
  });

  // ── Theme ─────────────────────────────────────────────────────────────────
  const themeBtn = document.getElementById('mv-theme-btn');

  function setDark(on) {
    document.body.classList.toggle('mv-dark', on);
    hljsLight.disabled = on;
    hljsDark.disabled  = !on;
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      setDark(true);
    } else if (theme === 'light') {
      setDark(false);
    } else {
      setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  // ── Sidebar visibility ────────────────────────────────────────────────────
  function setSidebar(visible) {
    sidebar.classList.toggle('mv-hidden', !visible);
    main.style.marginLeft = visible ? '' : '0';
  }

  // ── Load stored prefs ─────────────────────────────────────────────────────
  chrome.storage.sync.get(
    { theme: 'auto', fontSize: 'medium', fontFamily: 'sans', showToc: true },
    prefs => {
      applyTheme(prefs.theme);
      document.body.dataset.fontSize   = prefs.fontSize;
      document.body.dataset.fontFamily = prefs.fontFamily;
      if (headings.length >= 2) setSidebar(prefs.showToc);
    }
  );

  // ── Theme button ──────────────────────────────────────────────────────────
  themeBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('mv-dark');
    setDark(isDark);
    chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
  });

  // ── Scroll: progress bar, back-to-top, active TOC item ───────────────────
  const progressBar = document.getElementById('mv-progress');
  const backTop     = document.getElementById('mv-back-top');
  const tocLinks    = Array.from(toc.querySelectorAll('a'));

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    backTop.classList.toggle('mv-visible', scrolled > 300);

    // Highlight the last heading that has passed the top of the viewport
    let activeId = null;
    headings.forEach(h => {
      if (h.getBoundingClientRect().top <= 90) activeId = h.id;
    });
    tocLinks.forEach(a => a.classList.toggle('mv-active', a.dataset.id === activeId));
  }, { passive: true });

  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'd' || e.key === 'D') themeBtn.click();
    if (e.key === 't' || e.key === 'T') setSidebar(sidebar.classList.contains('mv-hidden'));
    if (e.key === 'Home' && !e.ctrlKey) window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('mv-toc-toggle').addEventListener('click', () => {
    setSidebar(sidebar.classList.contains('mv-hidden'));
  });

  // ── Listen for preference changes sent by popup ───────────────────────────
  chrome.runtime.onMessage.addListener(msg => {
    if (msg.type !== 'PREFS_UPDATED') return;
    const p = msg.prefs;
    applyTheme(p.theme);
    document.body.dataset.fontSize   = p.fontSize;
    document.body.dataset.fontFamily = p.fontFamily;
    if (headings.length >= 2) setSidebar(p.showToc);
  });
})();
