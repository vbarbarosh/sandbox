# sandbox

The whole app is one page, [src/index.html](../src/index.html). Its editor,
previews and fonts load from CDNs, so it needs the network.

## What it does

- Snippets in folders, in the sidebar, with a search over their names.
- A new file starts from a template: HTML, JSON, XML, draw.io or Excalidraw.
- The code on the left, the result on the right, redrawn a moment after
  each change:
  - HTML runs in a sandboxed frame; its console output and uncaught errors
    show in the console under the preview;
  - Markdown and MDX are rendered;
  - JSON opens in a JSON editor;
  - draw.io and Excalidraw files are edited as diagrams;
  - images, audio, video and PDF are shown.
- Files dropped on the page become snippets. A file pasted into an HTML or
  Markdown snippet is saved next to it, and a reference to it goes in at
  the cursor.
- A snippet is copied to the clipboard or exported as .html; all of them
  are exported as one .zip; the preview opens in a tab of its own.
- A light and a dark theme.

## Practice

[src/practice.html](../src/practice.html), a page of its own beside the
sandbox, runs tree algorithms to practise on the same engine:
[Practice](practice.md).

## Where the snippets are kept

In the browser's localStorage, on this device only. Opened with
`?note=<uid>` by a notes server, the page edits that note's files instead,
and keeps its own settings in the note's `apps/sandbox/settings.json`.

## Other sandboxes in a browser

- [WebVM: A virtual Linux environment running in the browser via WebAssembly](https://webvm.io/)
- [CheerpX: Native code virtualization as a JavaScript library](https://cheerpx.io/docs/overview)
- [BrowserPod 4.0: the microVM that runs in the browser, now free for any use](https://browserpod.io/blog/browserpod-40/)
- [BrowserPod: Real Node.js, in the browser tab](https://browserpod.io/runtimes/node/)
- [BrowserCode: A browser-based playground for fast-prototyping full-stack apps and sharing them instantly](https://browsercode.io/)
- https://github.com/leaningtech/browserpod-meta
- [Php-Wasm: PHP in Browser, powered by WebAssembly](https://php-wasm.seanmorr.is/demos.html)
- [WordPress Playground](https://playground.wordpress.net/)
- https://3v4l.org/

## Databases in a browser

- [SQLite](https://sqlite.org/): [its official WASM build](https://sqlite.org/wasm), or [sql.js](https://sql.js.org/)
- [PostgreSQL](https://www.postgresql.org/): [PGlite](https://pglite.dev/)
- [MariaDB](https://mariadb.org/), the MySQL dialect: [lite4mariadb](https://lite4mariadb.shyim.de/)
- [Redis](https://redis.io/): [Valkey in the v86 emulator](https://valkey.io/try-valkey/); [wadis](https://github.com/cah4a/wadis) is a WASM build for Node.js and Bun tests, not for a browser
