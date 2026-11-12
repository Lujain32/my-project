# 04. Add the first 20 verified opportunities

**Priority:** Must · **Requirements:** R1, R20, D2, D11 · **Depends on:** None (can run alongside 02 and 03) · **Size:** M (about 4 h, about 12 min per listing)

## Why

The demo needs real listings, and the week 4 end check (20 real opportunities on production) is still open. Doing it in batches of 5 lets it run alongside the code tickets.

## Done when

- [ ] `data/opportunities.json` has at least 20 entries, all relevant to IT and AI students.
- [ ] Every entry was checked on the funder's official page (rule 8), with the summary in our own words (rule 9) and `lastVerified` set to the check date.
- [ ] Every entry has `eligibleNationalities` copied from the official page, and at least one Arab League country can apply (rule 11a).
- [ ] The main field is listed first in `fields` (D15).
- [ ] `npm run check-data` passes.
- [ ] With nationality set to Jordan, production shows no closed or ineligible listings.
- [ ] Committed as `data:` commits in batches.

## Touches

- `data/opportunities.json`

