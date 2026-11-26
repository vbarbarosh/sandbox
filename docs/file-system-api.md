# File system API

The seven calls the sandbox makes on a source of files, and the WebDAV
requests that carry them over HTTP. A source that answers them, a server or
a script in the page, is a place the sandbox can keep its files.

## Paths

A path names a file or a folder from the source's root, `a/b/c.html`; the
root itself is `''`. Names are joined by `/`, with no `/` at either end; a
name is any text but `/`, `.` and `..`.

## The calls

Each call returns a Promise. A failure rejects with an `Error` whose `code`
is one of [Errors](#errors).

```js
list(path, {limit, next})       // -> {items, next?, total?}: one page of the folder's own entries
read(path, {offset, length})    // -> Blob: the whole file, or length bytes from offset
write(path, data, {overwrite})  // -> {version?}: data, a Blob, becomes the whole file
mkdir(path)                     // makes an empty folder
remove(path)                    // removes a file, or a folder with everything in it
rename(from, to)                // renames or moves a file or a folder
watch(path, on_change)          // -> stop(): tells on_change what others change under path
```

- `list`: `limit` is a hint the source may lower. No `next` means the last
  page; a `next` is passed back as it came, for the next page. A page may
  be short, even empty, and still have a `next`. `total`, the folder's
  number of entries, is there only when the source knows it exactly.
  Entries come in the source's own order. A later page may bring a name
  again, the newer entry wins, or `{name, deleted: true}` for one an
  earlier page gave: the folder changed while it was listed.
- `read`: without `offset` and `length`, the whole file.
- `write`: makes the file or replaces it whole, never at an offset.
  `overwrite` is `true` by default; `false` only makes it, `EEXIST` if it
  is there. The folder it goes in must exist, `ENOENT` if not.
- `mkdir`: `EEXIST` if the path is taken, `ENOENT` if its folder is
  missing.
- `remove`: a folder always goes whole; the UI asks first.
- `rename`: one call for a folder, whatever it holds. `to` must not exist,
  `EEXIST`; its folder must, `ENOENT`.
- `watch`: calls `on_change(changes)` with a batch per burst, in order.
  The changes this client made itself never come back: the answers to its
  own calls told it. `stop()` ends it.

### An entry

```js
{name: 'c.html', type: 'file', size: 1234, mtime: 1795682400000, version: '"5f2a"'}
```

| Field | When | What |
|---|---|---|
| `name` | always | its name in its folder |
| `type` | always | `'file'` or `'dir'` |
| `size` | if known | bytes, of a file |
| `mtime` | if known | the last change, in ms since 1970 |
| `version` | if known | opaque; changes whenever the content does |
| `count` | if known | the entries of a `'dir'`, when the listing gives them for free |

### A change

```js
{event: 'changed', path: 'a/b/c.html', type: 'file', version: '"5f2b"'}
```

`event` is `'changed'`, made or changed, `'deleted'`, or `'resync'`: the
source lost track, and the UI lists `path` again. `type` and `version` come
when known.

## Errors

| `code` | Means | The UI |
|---|---|---|
| `ENOENT` | the path, or the folder it goes in, does not exist | drops it from the tree |
| `EEXIST` | the path is taken | asks for another name |
| `EACCES` | not allowed | shows it read-only |
| `ENOTSUP` | the source cannot do this | hides the action |
| `EIO` | anything else: the source failed or cannot be reached | tries again later |

## Over HTTP: WebDAV

A server speaks WebDAV,
[RFC 4918](https://www.rfc-editor.org/rfc/rfc4918.html), at a base URL: a
path is its names percent-encoded after it, and a folder's URL ends with
`/`. Any WebDAV server answers the six file calls; `watch` and a paged
`list` need the `sync-collection` report of
[RFC 6578](https://www.rfc-editor.org/rfc/rfc6578.html) too.

| Call | Request | Its own errors |
|---|---|---|
| `list` | `PROPFIND`, `Depth: 1` | |
| `list` with `limit` | `REPORT` `sync-collection`, `Depth: 0`, `sync-level` 1, `limit` | |
| `read` | `GET`, `Range` for `offset` and `length` | |
| `write` | `PUT`; `If-None-Match: *` for `overwrite: false` | 409 `ENOENT`, 412 `EEXIST` |
| `mkdir` | `MKCOL` | 405 `EEXIST`, 409 `ENOENT` |
| `remove` | `DELETE` | 207, some members stayed: the first one's error |
| `rename` | `MOVE`, `Destination: <to's URL>`, `Overwrite: F` | 409 `ENOENT`, 412 `EEXIST` |
| `watch` | `REPORT` `sync-collection`, `Depth: 0`, `sync-level` infinite, polled | `DAV:valid-sync-token`: `'resync'` |

Every other answer: 2xx is done; 401 and 403 are `EACCES`, 404 `ENOENT`,
405 and 501 `ENOTSUP`; anything else, and no answer, `EIO`.

- An entry is a `DAV:response`: `name` from its `href`, `type` `'dir'` when
  `DAV:resourcetype` holds `DAV:collection`, `size` from
  `DAV:getcontentlength`, `mtime` from `DAV:getlastmodified`, `version`
  from `DAV:getetag`. WebDAV has no property for `count`, so it is not
  sent.
- `list` by `PROPFIND` gives the whole folder at once: no `next`, and
  `total` is the number of entries. With `limit`, a 507 on the folder's
  own URL in the answer means more, and `next` is the `DAV:sync-token` it
  gave; a member with status 404 is `{name, deleted: true}`.
- `read`: a server that ignores `Range` answers 200 with the whole file,
  and the client cuts it.
- `write` takes `version` from the answer's `ETag`, when the server sends
  one.
- `watch` reads the folder's `DAV:sync-token` (`PROPFIND`, `Depth: 0`) as
  it starts, before the UI lists the folder, then asks for the report from
  the newest token every few seconds. A member with properties is
  `'changed'`, one with status 404 `'deleted'`. A token the server no
  longer takes is `'resync'` of the folder, and watch starts again. The
  client drops its own changes: a path whose `DAV:getetag` its own `PUT`
  got back, a path its own `DELETE` or `MOVE` took away. A server without
  the report: `watch` rejects with `ENOTSUP`.

### A server on another origin

The sandbox runs in a browser, so a server on another origin lets it in by
CORS:

```
Access-Control-Allow-Origin: <the sandbox's origin>
Access-Control-Allow-Methods: GET, PUT, DELETE, MKCOL, MOVE, PROPFIND, REPORT
Access-Control-Allow-Headers: Authorization, Content-Type, Depth, Destination, If-None-Match, Overwrite, Range
Access-Control-Expose-Headers: ETag
```

Signing in is the server's: an `Authorization` header, or a cookie with
`Access-Control-Allow-Credentials: true`.

## Not in it

Copy, a `read` then a `write`; stat, the parent's `list`; append and writes
at an offset; locks, permissions and links; search; a write only if the
version is still the same.
