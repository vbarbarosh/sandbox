# sandbox

The whole app is one page, [src/index.html](../src/index.html). Its editor,
previews and fonts load from CDNs, so it needs the network.

## What it does

- Snippets in folders, in the sidebar, with a search over their names.
- A new file starts from a template: HTML, JavaScript, PHP, Markdown, JSON, XML,
  draw.io or Excalidraw. The wizard's Node.js tab makes a project instead, a
  folder with package.json and index.js: Hello, or Hello Express. The wizard
  opens where it was left, its tab and its last pick.
- Four Node.js examples come with a database, running in the program itself,
  in memory: SQLite (Node's own node:sqlite), PostgreSQL (PGlite), Valkey, the
  open fork of Redis (valkey-wasm, through ioredis), and NeDB, documents
  queried as in MongoDB. PostgreSQL and Valkey are built to WebAssembly and
  need what BrowserPod's WebAssembly lacks, Global and Tag among them: their
  project's wasm-fill.js takes it from the browser's own. MySQL through
  MariaDB (lite4mariadb) does not run there: it starts 16 threads sharing one
  WebAssembly memory, and in BrowserPod it never finishes starting.
- The code on the left, the result on the right, redrawn a moment after
  each change:
  - HTML runs in a sandboxed frame; its console output and uncaught errors
    show in the console under the preview;
  - Markdown and MDX are rendered;
  - JSON opens in a JSON editor;
  - draw.io and Excalidraw files are edited as diagrams;
  - images, audio, video and PDF are shown;
  - a .js file in a folder with package.json runs in Node.js 22, in
    [BrowserPod](https://browserpod.io): its terminal takes the preview's place,
    npm install runs first when package.json changed, and Stop ends a server.
    It needs the page cross-origin isolated: in Chrome and Edge a service
    worker of the sandbox makes it so, reloading the page once on the first
    visit. Opened from a file, or in Firefox or Safari, the project does not
    run.
- Files dropped on the page become snippets. A file pasted into an HTML or
  Markdown snippet is saved next to it, and a reference to it goes in at
  the cursor.
- A snippet is copied to the clipboard or exported as .html; all of them
  are exported as one .zip; the preview opens in a tab of its own.
- A light and a dark theme.

## Practice

[src/practice.html](../src/practice.html), a page of its own beside the
sandbox, runs tree and array algorithms to practise on the same engine:
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
- [v86: x86 PC emulator and x86-to-wasm JIT, running in the browser](https://github.com/copy/v86)
- [Browser Shell: a Linux VM mounting a JS filesystem with a Service Worker web server](https://humphd.github.io/browser-shell/)
- [browser-vm: the small Linux of Browser Shell, a Buildroot image for v86](https://github.com/humphd/browser-vm)
- [BrowserVM: browserscale's script runtime inside its cloud browsers, for automation](https://browserscale.cloud/browservm)

## Databases in a browser

- [SQLite](https://sqlite.org/): [its official WASM build](https://sqlite.org/wasm), or [sql.js](https://sql.js.org/)
- [PostgreSQL](https://www.postgresql.org/): [PGlite](https://pglite.dev/), [its repository](https://github.com/electric-sql/pglite)
- [MariaDB](https://mariadb.org/), the MySQL dialect: [lite4mariadb](https://lite4mariadb.shyim.de/)
- [Redis](https://redis.io/): [Valkey in the v86 emulator](https://valkey.io/try-valkey/); [wadis](https://github.com/cah4a/wadis) is a WASM build for Node.js and Bun tests, not for a browser
- [MongoDB](https://www.mongodb.com/), its query language: [mingo](https://github.com/kofrasa/mingo), plain JavaScript over objects in memory, no WASM
