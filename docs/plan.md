# Plan

Weeks 1 to 4 covered problem framing, research, rules, planning documents, and the design and backlog (Task 04). Weeks 5 to 7 are for building, and week 8 is for testing and the demo.

The backlog is the eight tickets in `tickets/` (D16). This plan only says which week each one belongs to. The tickets hold the detail.

Weekly time: about 9 hours (D16). There is no slack, so check progress at the end of every week.

## Week 5: The boring one, and the spine starts

- [ ] **01** Project skeleton, and Netlify with staging
- [ ] **02** Opportunities list, with the closed toggle and nationality selector
- [ ] **03** Letter function and Draft mode (start)
- [ ] **05** Write `check-data.js`, then add the first 5 opportunities

**End-of-week check:** the production URL shows the opportunities list with the nationality selector, and `/api/letter` answers on staging.

## Week 6: Finish the spine

- [ ] **03** Letter function and Draft mode (finish)
- [ ] **04** Save a letter to My Space, and open it again
- [ ] **06** Filters, keyword search, and Clear filters
- [ ] **05** Add opportunities 6 to 10

**End-of-week check:** the full demo path works on production: filter, draft a letter, save it, and open it again after a reload.

## Week 7: States and protection, then the freeze

- [ ] **07** Assistant error messages and privacy notice
- [ ] **08** Export and import a backup
- [ ] Check every "Done when" box in all eight tickets on staging

**End-of-week check:** all eight tickets are merged into `main`. From here, `main` is frozen for features (`workflow.md`).

## Week 8: Testing and demo night

- [ ] Test sessions with at least 5 IT/AI students: time their search, and watch them draft, save and reopen a letter
- [ ] Fix bugs only (`fix/*` branches)
- [ ] Recheck every opportunity's deadline and official link, and update `lastVerified`
- [ ] Check the must-nevers: no sign-up, no server storage, no payments or ads, no API key in the page source (R16, R17, R19, R21)
- [ ] Mobile check at 375px and keyboard-only check (R22)
- [ ] Prepare the demo script: choose a nationality, filter by field, draft a letter, save it, open it, export a backup
- [ ] Open the app once with no saved data, to rehearse the empty states
- [ ] Tag the demo version `v1.0`, and update `progress.md` and `README.md`

## If a week runs over

The next cut is set in D16: ticket **06** reduced to the field filter only, saving about 1.5 hours. Record it in `decisions.md` with a date before it happens.

## After the demo

Pick up the tickets in `tickets/later/`, in the order its README suggests.
