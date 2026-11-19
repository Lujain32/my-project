# 13. Save opportunities to a shortlist

**Priority:** Should (2nd to cut) · **Requirements:** R7 · **Depends on:** 03, 07 · **Size:** S (about 2 h)

## Why

Lets students keep the few opportunities they're applying to next to their letters in My Space.

## Done when

- [ ] S1 cards and S2 have a **Save** button showing Save or Saved.
- [ ] S4 has a Shortlist section: title (linking to S2), provider, deadline line, and **Remove**.
- [ ] Ids no longer in `opportunities.json` are skipped silently.
- [ ] The shortlist survives a reload and is included in the backup.
- [ ] Blocked storage shows "Your browser is blocking storage, so saved items can't be kept."

## Touches

- `src/screens/opportunities.js`
- `src/screens/detail.js`
- `src/screens/space.js`

