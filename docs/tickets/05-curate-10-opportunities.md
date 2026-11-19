# 05. Add 10 verified opportunities, with the data check

**Priority:** Must · **Requirements:** R1, R20, D2, D11, D13, D16, rules 8 to 11a · **Depends on:** 01 (can run alongside the code tickets) · **Size:** M (about 3 h: 1 h for the script, about 12 min per listing)

## Why

The demo needs real listings, and every listing must have an official source and a check date (R20). The check script is written first, so every batch of listings is validated as it's added. Doing the listings in batches of 5 lets this run alongside the code tickets.

## Done when

**The check script**

- [ ] `npm run check-data` runs `scripts/check-data.js` and exits with an error, naming the entry, if any required field from `data-model.md` is missing, a date is invalid, an `id` is duplicated, or `eligibleNationalities` is empty, mixes `"ALL"` with codes, or has a code outside the 22 Arab League codes.
- [ ] It passes on a valid file and fails on a test file with one broken entry of each kind.

**The listings**

- [ ] The existing entry no longer has a `type` field (D13), and no new entry has one.
- [ ] `data/opportunities.json` has at least 10 entries (D16), all relevant to IT and AI students.
- [ ] Every entry was checked on the funder's official page (rule 8), with the summary in our own words (rule 9) and `lastVerified` set to the check date.
- [ ] Every entry has `eligibleNationalities` copied from the official page, and at least one Arab League country can apply (rule 11a).
- [ ] The main field is listed first in `fields` (D15).
- [ ] `npm run check-data` passes.
- [ ] With nationality set to Jordan, production shows no closed or ineligible listings.
- [ ] Committed as `data:` commits in batches.

## Touches

- `scripts/check-data.js` (new)
- `tests/fixtures/broken-opportunities.json` (new)
- `package.json` (the `check-data` script)
- `data/opportunities.json`
