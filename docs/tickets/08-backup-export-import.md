# 08. Export and import a backup

**Priority:** Must · **Requirements:** R14, R23, D1, D16 · **Depends on:** 04 · **Size:** M (about 4 h)

## Why

Documents live in one browser (D1). Backup is the only protection against clearing browser data, and the only way to move to another device.

## Done when

- [ ] `src/storage.js` gains `exportBackup()` and `importBackup(file)`, following the import rules in `Data model.md` (section 5).
- [ ] **Export backup** downloads one `.json` file with `app`, `schemaVersion`, `exportedAt`, `documents`, `shortlist`, and `prefs` (data-model.md, section 5). `shortlist` is an empty list for demo night, since the shortlist is deferred (D16), but the key is kept so later backups stay compatible.
- [ ] **Import backup** in a different browser restores everything. Importing the same file twice creates no duplicates.
- [ ] When the same document exists in both, the later `updatedAt` wins.
- [ ] A backup with `prefs` restores the saved nationality. A backup without `prefs` leaves the current nationality unchanged.
- [ ] The result is reported: "Imported 3 new documents and updated 1." or "Everything in this file is already here."
- [ ] A wrong or broken file shows "This file isn't a backup from this app." and changes nothing.
- [ ] Export is disabled when there's nothing to export.
- [ ] The week 7 end check passes: a document saved in one browser is restored in another.

## Touches

- `src/screens/space.js`
- `src/storage.js` (add `exportBackup()` and `importBackup(file)`)
- `tests/storage.test.js`

