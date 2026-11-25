# 02. Opportunities list, with the closed toggle and nationality selector

**Priority:** Must · **Requirements:** R1, R4, R5a, R20, D11, D16, D18 · **Depends on:** 01 · **Size:** M (about 3 h)

## Why

This is the spine of the product: open the site and see real opportunities you're allowed to apply to. With the Detail screen deferred (D16), each card also carries the official link, so a student can go straight from here to applying. It also creates `storage.js`, because the nationality choice is the first thing the app remembers (rule 1: only `storage.js` touches `localStorage`).

## Done when

- [ ] `#/` loads `data/opportunities.json` and shows one card per listing: title, provider and country, level badge, funding badge, and the deadline line ("Closes in X days", "Closes today", "Closes tomorrow", "Rolling deadline", or "Closed"). Cards appear in the order of the entries in the file (D18).
- [ ] A listing whose deadline is 0 to 10 days away shows a "Closing soon" badge and an amber deadline line. A listing 11 days away doesn't (D18).
- [ ] Each card has an **Apply on official site ↗** link that opens `officialUrl` in a new tab with `rel="noopener"`, and a "Last verified <date>" line (R20). These replace the Detail screen for demo night (D16).
- [ ] A count above the cards reads "N opportunities" ("1 opportunity" for one).
- [ ] Listings with a deadline before today are hidden. Ticking **Show closed** shows them dimmed and labelled "Closed" in text.
- [ ] A **My nationality** selector lists the 22 Arab League countries in alphabetical order, with Jordan selected by default.
- [ ] Only listings whose `eligibleNationalities` is `["ALL"]` or contains the chosen code are shown.
- [ ] The chosen nationality is still selected after reloading the page (`sof.v1.prefs`). An unknown saved value silently falls back to Jordan.
- [ ] `src/storage.js` exists with `getPrefs()` and `setPrefs()`. Every read and write is wrapped in `try/catch`, so the list still works when storage is blocked (the choice then lasts for the current visit only).
- [ ] The empty states match `design.md` S1: "No opportunities have been added yet." when the file is empty, and "No opportunities match. Try clearing a filter." when the nationality hides everything.
- [ ] ~~If `opportunities.json` fails to load, the screen shows an error.~~ _Removed while planning (26 Nov 2026): the data is imported into the page code, so there is no separate load to fail. A broken data file stops the build before it can be deployed._
- [ ] Unit tests cover the deadline text, the closed check, the 10-day "Closing soon" boundary, and the nationality filter.
- [ ] One column of cards at 375px and two from about 768px. Works with keyboard only.

## Touches

- `src/screens/opportunities.js` (new, replaces the placeholder)
- `src/lib/opportunities.js` (new: deadline text, closed check, eligibility filter)
- `src/nationalities.js` (new: the 22 codes and their names)
- `src/storage.js` (new: prefs only)
- `src/main.js`, `src/screens/placeholders.js`, `src/styles.css`
- `src/router.js` (one import line)
- `tests/sample.test.js` (one import line)
- `data/opportunities.json` (nationality names changed to codes)
- `tests/opportunities.test.js`, `tests/storage.test.js` (new)

## Answers to questions raised while planning (26 Nov 2026)

- **The data is imported, not fetched.** `design.md` says the data is part of the page with no wait, while this ticket asked for a load error. Importing matches the design and removes a failure the user could see, so the load-error line was removed.
- **The one listing in the data used country names** (`"Jordan"`), and the filter uses codes (`"JO"`), so nothing would show. The names were changed to codes. Checking every listing against its official page is still ticket 05's job.
- **`router.js` and `tests/sample.test.js` change by one import line each**, because the Opportunities screen moved out of `placeholders.js`.
- **Dates in tests are fixed.** Every date function takes "today" as an input, so the tests pass on any day.
- **Two columns from 768px**, as this ticket says. The design canvas shows three on wide screens; the ticket wins.
- **Only the count and cards redraw** when nationality or Show closed changes, so keyboard focus stays on the control.
- **No Clear filters button yet.** It arrives with the filters in ticket 06.

