# 11. Export and import a backup

**Priority:** Must · **Requirements:** R14, R23, D1 · **Depends on:** 07 · **Size:** M (about 3 h)

## Why

Documents live in one browser (D1). Backup is the only protection against clearing browser data, and the only way to move to another device.

## Done when

- [ ] **Export backup** downloads one `.json` file with `app`, `schemaVersion`, `exportedAt`, `documents`, and `shortlist` (data-model.md, section 4).
- [ ] **Import backup** in a different browser restores everything. Importing the same file twice creates no duplicates.
- [ ] When the same document exists in both, the later `updatedAt` wins.
- [ ] The result is reported: "Imported 3 new documents and updated 1." or "Everything in this file is already here."
- [ ] A wrong or broken file shows "This file isn't a backup from this app." and changes nothing.
- [ ] Export is disabled when there's nothing to export.
- [ ] The week 6 end check passes: a document saved in one browser is restored in another.

## Touches

- `src/screens/space.js`
- `src/storage.js` (already has export and import; wire up only)
- `tests/storage.test.js`

