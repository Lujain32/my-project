# 04. Save a letter to My Space, and open it again

**Priority:** Must · **Requirements:** R12, R13 (open only), R23, D1, D16, rules 1, 14 · **Depends on:** 02, 03 · **Size:** M (about 4.5 h)

## Why

Losing final versions is one of the two problems in the brief. This is the moment a letter stops being lost. A basic list in S4 proves it survives a reload. It also adds the document functions to `storage.js`, which ticket 02 started with prefs only.

## Done when

- [ ] `src/storage.js` gains `listDocuments()`, `getDocument(id)`, and `saveDocument(doc)`, reading and writing `sof.v1.documents`. A full or blocked storage returns a clear error instead of throwing.
- [ ] Unit tests cover saving a new document, updating an existing one by `id`, the storage-full error, and the storage-blocked error.
- [ ] **Save to My Space** in S3 asks for a title (max 100 characters) and saves with `kind: "motivation-letter"` and `opportunityId: null` (letters aren't linked to an opportunity for demo night, D16).
- [ ] Saving again from the same editor updates the same document instead of creating a copy.
- [ ] A confirmation "Saved to My Space" links to S4.
- [ ] S4 shows the storage banner (R23) and lists documents (title, type, Edited <date>), newest first.
- [ ] The empty state, the storage-full message, and the storage-blocked message match `Design.md` (S4).
- [ ] **Open** on a document shows its full text with **Copy** and **Back to My Space** (read only; editing, renaming and deleting are deferred, D16).
- [ ] A saved letter is still listed, and opens with the same text, after closing and reopening the browser.
- [ ] Nothing is saved automatically (rule 14).

## Touches

- `src/storage.js` (add document functions)
- `src/screens/assistant.js`
- `src/screens/space.js` (new)
- `src/main.js`, `src/screens/placeholders.js`, `src/styles.css`
- `tests/storage.test.js`
