# 07. Save a letter to My Space, with a basic documents list

**Priority:** Must · **Requirements:** R12, R23, rule 14 · **Depends on:** 02 · **Size:** M (about 3 h)

## Why

Losing final versions is one of the two problems in the brief. This is the moment a letter stops being lost. A basic list in S4 proves it survives a reload.

## Done when

- [ ] **Save to My Space** in S3 asks for a title (max 100 characters) and saves with `kind: "motivation-letter"` and `opportunityId` (or `null`).
- [ ] Saving again from the same editor updates the same document instead of creating a copy.
- [ ] A confirmation "Saved to My Space" links to S4.
- [ ] S4 shows the storage banner (R23) and lists documents (title, type, Edited <date>, and "For: <title>" when linked), newest first.
- [ ] The empty state, the storage-full message, and the storage-blocked message match design.md (S4).
- [ ] A saved letter is still listed after closing and reopening the browser.
- [ ] Nothing is saved automatically (rule 14).

## Touches

- `src/screens/assistant.js`
- `src/screens/space.js` (new)
- `src/main.js`
- `src/screens/placeholders.js`
- `src/styles.css`

