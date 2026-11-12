# 09. Filters, keyword search, and Clear filters

**Priority:** Must · **Requirements:** R2, R3 · **Depends on:** None · **Size:** M (about 3 h)

## Why

With 20+ listings, students need to narrow by field, level, funding and country to get from hours to minutes, which is the brief's main measure.

## Done when

- [ ] S1 has filters for field (the six fixed values), level, funding, and country (built from the dataset), plus a keyword box matching `title`, `provider`, and `summary`.
- [ ] Any combination updates the list and the count immediately, without reloading.
- [ ] Typing "machine learning" returns only listings containing that phrase (case-insensitive).
- [ ] **Clear filters** resets the four filters and the search box, but not nationality.
- [ ] The no-match empty state reads "No opportunities match. Try clearing a filter." with a Clear filters button.
- [ ] Unit tests cover combined filters and the keyword search in `visibleOpportunities`.

## Touches

- `src/lib/opportunities.js`
- `src/screens/opportunities.js`
- `src/styles.css`
- `tests/opportunities.test.js`

