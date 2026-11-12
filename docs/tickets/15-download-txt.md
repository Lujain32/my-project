# 15. Download a single document as .txt

**Priority:** Should (1st to cut) · **Requirements:** R15 · **Depends on:** 07 · **Size:** S (about 1 h)

## Why

Lets students take a finished letter into an application form or a word processor.

## Done when

- [ ] **Download .txt** in S3 and on each S4 row downloads the text as `<title>.txt`.
- [ ] Characters that aren't allowed in file names are replaced, and Arabic and other non-ASCII text in the content downloads correctly (UTF-8).
- [ ] Disabled while the editor is empty.

## Touches

- `src/lib/download.js` (new)
- `src/screens/assistant.js`
- `src/screens/space.js`

