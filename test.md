# Markdown Viewer — Feature Test

This file tests every major feature of the extension. Open it in Chrome after installing.

---

## Table of Contents (auto-generated in the sidebar)

The sidebar on the left is generated automatically from headings in this file.  
Press **T** to toggle it. Press **D** to toggle dark mode.

---

## Text Formatting

Normal paragraph with **bold**, *italic*, ~~strikethrough~~, and `inline code`.

> This is a blockquote. It should have a blue left border and a light blue background.  
> Multiple lines work fine.

---

## Code Blocks with Syntax Highlighting

Python:

```python
def greet(name: str) -> str:
    """Return a greeting string."""
    return f"Hello, {name}!"

for person in ["Alice", "Bob", "Claude"]:
    print(greet(person))
```

JavaScript:

```javascript
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

fetchData('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

Bash:

```bash
# Install and load the extension
cd ~/MarkdownViewer
git init && git add . && git commit -m "Initial commit"
```

JSON:

```json
{
  "name": "Markdown Viewer",
  "version": "1.0.0",
  "manifest_version": 3,
  "permissions": ["storage"]
}
```

---

## Tables

| Feature              | Supported | Notes                        |
|----------------------|-----------|------------------------------|
| Headings (H1–H4)     | ✅         | Auto-linked in TOC           |
| Code blocks          | ✅         | Syntax highlighted + Copy btn|
| Tables               | ✅         | Scrollable on small screens  |
| Blockquotes          | ✅         | Styled with accent border    |
| Dark mode            | ✅         | Press D or use popup         |
| TOC sidebar          | ✅         | Press T to toggle            |
| Print support        | ✅         | Sidebar hides on print       |

---

## Lists

Unordered:
- Item one
- Item two
  - Nested item A
  - Nested item B
- Item three

Ordered:
1. First step — install the extension
2. Second step — enable file URL access
3. Third step — open any `.md` file in Chrome

Task list (GFM):
- [x] Create manifest.json
- [x] Write content.js and content.css
- [x] Generate icons
- [ ] Publish to Chrome Web Store

---

## Links and Images

Visit [GitHub](https://github.com) to host the open-source repo.

Relative link to the manifest: [manifest.json](manifest.json)

---

## Inline Elements

- Keyboard shortcut: Press `Ctrl+Shift+P` to open the command palette
- File path: `D:\Mounish\MarkdownViewer\content.js`
- Math-ish: The value of π is approximately `3.14159`

---

## Long Code Block (tests horizontal scroll)

```
This is a very long line of code that should trigger horizontal scrolling inside the code block container without breaking the page layout or overflowing into the sidebar area. Lorem ipsum dolor sit amet consectetur adipiscing elit.
```

---

## H3 Heading Example

### Sub-section under H2

Content under an H3. This heading also appears in the TOC, slightly indented.

#### H4 Example

H4 headings appear even more indented in the TOC.

---

## Scroll Test

Scroll down to see the **progress bar** at the top fill up.  
The **↑ back-to-top button** (bottom right) appears after scrolling down.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

---

*Extension built with marked.js v4 and highlight.js v11. Open source — made for humans.*
