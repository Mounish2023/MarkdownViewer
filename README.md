# Markdown Viewer

A Chrome extension that renders `.md` files beautifully — instead of showing raw text, it gives you a fully styled reading experience with syntax highlighting, a table of contents, dark mode, and more.

Built for anyone who downloads AI-generated markdown files (Claude, ChatGPT, etc.) and wants to actually read them.

---

## What it looks like

| Light mode | Dark mode |
|---|---|
| Sidebar TOC, GitHub-style typography, syntax-highlighted code | Press `D` to toggle — full dark theme |

---

## Features

- **GitHub-style rendering** — headings, tables, blockquotes, lists, images, strikethrough
- **Syntax highlighting** — Python, JavaScript, Bash, JSON, and 190+ other languages
- **Auto-generated TOC** — sidebar built from your headings, with active-section tracking
- **Dark / light / auto mode** — follows your OS setting by default, or override it
- **Copy button** — hover any code block to copy it instantly
- **Scroll progress bar** — thin accent bar at the top of the page
- **Back-to-top button** — appears after scrolling down
- **Settings popup** — change font size, font family, theme, and TOC visibility
- **Keyboard shortcuts** — `D` toggles dark mode, `T` toggles sidebar
- **Print support** — sidebar hides, content expands to full width
- **Works offline** — all libraries are bundled, no internet required

---

## Installation (Chrome)

### Option A — Load from source (no store required)

> Use this if you want to run the latest code directly, or if you're a developer.

**Step 1 — Download the extension**

Click **Code → Download ZIP** on this page, then unzip it anywhere on your computer.

Or clone it:
```bash
git clone https://github.com/Mounish2023/MarkdownViewer.git
```

**Step 2 — Open Chrome Extensions**

Go to `chrome://extensions` in your Chrome address bar.

**Step 3 — Enable Developer Mode**

Toggle **Developer mode** on using the switch in the top-right corner.

![Developer mode toggle](https://i.imgur.com/placeholder.png)

**Step 4 — Load the extension**

Click **Load unpacked** and select the `MarkdownViewer` folder you downloaded.

The extension will appear in your list with the name **Markdown Viewer**.

**Step 5 — Allow access to local files** ← *required*

1. Find **Markdown Viewer** in your extensions list
2. Click **Details**
3. Scroll down and toggle **"Allow access to file URLs"** ON

Without this step, Chrome's security sandbox will block the extension from reading local `.md` files.

**Step 6 — Open a Markdown file**

- Drag any `.md` file into Chrome, or
- Press `Ctrl+O` and select a `.md` file

The file will render immediately.

---

### Option B — Chrome Web Store

> Coming soon. Star this repo to get notified.

---

## Usage

### Opening a file

Any of these work:
- Drag a `.md` file from File Explorer into Chrome
- Press `Ctrl+O` in Chrome and select a `.md` file
- Navigate to a local file URL: `file:///C:/path/to/file.md`

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| `D` | Toggle dark / light mode |
| `T` | Toggle the sidebar / TOC |
| `Home` | Scroll back to top |

### Settings popup

Click the **Markdown Viewer icon** in your Chrome toolbar to open the settings panel:

- **Theme** — Light / Auto (follows OS) / Dark
- **Font size** — Small / Medium / Large
- **Font family** — Sans-serif / Serif / Monospace
- **Show sidebar** — toggle the TOC on or off

Settings are saved to your Chrome profile and sync across devices if you're signed into Chrome.

---

## File structure

```
MarkdownViewer/
├── manifest.json           # Chrome extension config (Manifest V3)
├── content.js              # Core rendering logic — runs on every .md file
├── content.css             # Full visual design with CSS variables for theming
├── popup.html              # Settings panel UI
├── popup.js                # Settings logic
├── popup.css               # Settings panel styles
├── generate_icons.html     # One-time tool to regenerate the extension icons
├── test.md                 # Test file covering all supported features
├── libs/
│   ├── marked.min.js       # Markdown parser (marked.js v4)
│   └── highlight.min.js    # Syntax highlighter (highlight.js v11)
├── themes/
│   ├── hl-light.css        # highlight.js GitHub light theme
│   └── hl-dark.css         # highlight.js GitHub dark theme
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## How it works

When Chrome opens a local `.md` file, it normally displays the raw text inside a `<pre>` tag. This extension injects a content script that:

1. Grabs the raw markdown text from the page
2. Parses it with **marked.js** (GitHub Flavored Markdown)
3. Replaces the page body with a two-column layout (TOC sidebar + article)
4. Applies **highlight.js** to all code blocks
5. Reads your saved preferences and applies theme / font settings

Everything runs locally in your browser — no data is sent anywhere.

---

## Tech stack

| Library | Version | Purpose |
|---------|---------|---------|
| [marked.js](https://marked.js.org/) | v4 | Markdown → HTML parsing |
| [highlight.js](https://highlightjs.org/) | v11 | Syntax highlighting |
| Vanilla JS / HTML / CSS | — | Everything else |

No build step, no framework, no Node.js required.

---

## Contributing

Issues and pull requests are welcome. To run locally, just follow the **Load from source** steps above — any file changes take effect after clicking the refresh icon on `chrome://extensions`.

---

## License

MIT
