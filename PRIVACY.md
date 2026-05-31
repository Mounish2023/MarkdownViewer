# Privacy Policy — Markdown Viewer

_Last updated: May 2026_

## Summary

Markdown Viewer does not collect, store, or transmit any user data. Ever.

## What this extension does

Markdown Viewer reads local `.md` files that you open in Chrome and renders them as formatted HTML in your browser. That's it.

## Data collection

**We collect nothing.** Specifically:

- No personal information
- No browsing history
- No file contents are sent anywhere
- No analytics or tracking
- No cookies
- No third-party services

## Local storage

The extension saves your preferences (theme, font size, font family, sidebar visibility) using `chrome.storage.sync`. This data:

- Never leaves your browser except to sync across your own Chrome devices via your Google account
- Is never accessible to the extension developer
- Contains no personal information — only UI preference values like `"dark"` or `"medium"`

## Permissions

| Permission | Why it's needed |
|------------|----------------|
| `storage` | Save your theme and font preferences |
| `file://*` | Read local `.md` files you open in Chrome so they can be rendered |

No other permissions are requested or used.

## Third-party code

The extension bundles two open-source libraries locally:

- [marked.js](https://marked.js.org/) — Markdown parser
- [highlight.js](https://highlightjs.org/) — Syntax highlighter

Neither library makes any network requests. Both run entirely in your browser.

## Changes to this policy

If this policy ever changes, the updated version will be posted at this URL with a new date at the top.

## Contact

For questions, open an issue at [github.com/Mounish2023/MarkdownViewer](https://github.com/Mounish2023/MarkdownViewer).
