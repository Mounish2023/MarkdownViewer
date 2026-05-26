'use strict';

const prefs = { theme: 'auto', fontSize: 'medium', fontFamily: 'sans', showToc: true };

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

// ── Load saved prefs and reflect them in the UI ───────────────────────────────
chrome.storage.sync.get(
  { theme: 'auto', fontSize: 'medium', fontFamily: 'sans', showToc: true },
  saved => {
    Object.assign(prefs, saved);

    setActive('theme-group',  saved.theme);
    setActive('size-group',   saved.fontSize);
    setActive('family-group', saved.fontFamily);
    document.getElementById('toc-toggle').checked = saved.showToc;
  }
);

function setActive(groupId, val) {
  const group = document.getElementById(groupId);
  group.querySelectorAll('.seg-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === val);
  });
}

// ── Apply button ──────────────────────────────────────────────────────────────
document.getElementById('apply-btn').addEventListener('click', () => {
  chrome.storage.sync.set(prefs, () => {
    // Notify any open .md tab
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'PREFS_UPDATED', prefs })
          .catch(() => {}); // tab may not be a .md page — ignore
      }
    });

    const status = document.getElementById('status');
    status.textContent = 'Saved ✓';
    setTimeout(() => { status.textContent = ''; }, 1800);
  });
});
