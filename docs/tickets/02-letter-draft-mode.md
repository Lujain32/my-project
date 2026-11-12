# 02. Letter Assistant: Draft mode

**Priority:** Must · **Requirements:** R8, D10, D14 · **Depends on:** 01 · **Size:** M (about 3 h)

## Why

Drafting a letter is the core of the product (D9, D10). This replaces the S3 placeholder with a working Draft tab, so the main flow can be demoed early.

## Done when

- [ ] `#/assistant` shows the Draft tab with three labelled inputs: target opportunity, field, and key points about you.
- [ ] **Generate** is disabled until target opportunity and key points are filled in.
- [ ] While waiting, the button reads "Writing…", the status line reads "The assistant is writing your letter. This can take up to 10 seconds.", and the inputs keep their text (design.md, S3 Loading).
- [ ] The reply appears in an editable text area within 10 seconds on staging.
- [ ] The inputs are not written to `localStorage` (D14).
- [ ] **Copy** copies the editor text. Copy, Save and Download stay disabled while the editor is empty.
- [ ] Works with keyboard only, and at 375px width.

## Touches

- `src/screens/assistant.js` (new, replaces the placeholder)
- `src/lib/letter-client.js` (new: `fetch` to `/api/letter`)
- `src/main.js`
- `src/screens/placeholders.js`
- `src/styles.css`

