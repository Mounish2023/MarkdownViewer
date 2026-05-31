'use strict';

const prefs = {
  theme:      localStorage.getItem('mv-theme')      || 'auto',
  fontSize:   localStorage.getItem('mv-fontSize')   || 'medium',
  fontFamily: localStorage.getItem('mv-fontFamily') || 'sans',
  showToc:    localStorage.getItem('mv-showToc')    !== 'false',
};

// ── Wire segmented buttons ────────────────────────────────────────────────────
function initGroup(groupId, prefKey) {
  const group = document.getElementById(groupId);
  group.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      prefs[prefKey] = btn.dataset.val;
    });
  });
}

initGroup('theme-group',  'theme');
initGroup('size-group',   'fontSize');
initGroup('family-group', 'fontFamily');

document.getElementById('toc-toggle').addEventListener('change', e => {
  prefs.showToc = e.target.checked;
});

// ── Reflect saved prefs in UI ─────────────────────────────────────────────────
function setActive(groupId, val) {
  const group = document.getElementById(groupId);
  group.querySelectorAll('.seg-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === val);
  });
}

setActive('theme-group',  prefs.theme);
setActive('size-group',   prefs.fontSize);
setActive('family-group', prefs.fontFamily);
document.getElementById('toc-toggle').checked = prefs.showToc;

// ── Apply button ──────────────────────────────────────────────────────────────
document.getElementById('apply-btn').addEventListener('click', () => {
  localStorage.setItem('mv-theme',      prefs.theme);
  localStorage.setItem('mv-fontSize',   prefs.fontSize);
  localStorage.setItem('mv-fontFamily', prefs.fontFamily);
  localStorage.setItem('mv-showToc',    prefs.showToc);

  const status = document.getElementById('status');
  status.textContent = 'Saved ✓  Reload the .md file to apply.';
  setTimeout(() => { status.textContent = ''; }, 3000);
});
