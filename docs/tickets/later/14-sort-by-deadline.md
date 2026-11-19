# 14. Sort by deadline

**Priority:** Should (3rd to cut) · **Requirements:** R6 · **Depends on:** 09 · **Size:** S (about 1 h)

## Why

Missed deadlines were one of the original pains, and alerts are out of scope (D7). Sorting is the cheap partial answer.

## Done when

- [ ] S1 has a sort control: nearest deadline first, with rolling (`null`) deadlines last.
- [ ] The order is correct for all listings, checked by a unit test.
- [ ] Sorting works together with every filter and the search.

## Touches

- `src/lib/opportunities.js`
- `src/screens/opportunities.js`
- `tests/opportunities.test.js`

