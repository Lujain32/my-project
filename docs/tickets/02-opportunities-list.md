# 02. Opportunities list, with the closed toggle and nationality selector

**Priority:** Must · **Requirements:** R1, R4, R5a, R20, D11, D16 · **Depends on:** 01 · **Size:** M (about 3 h)

## Why

This is the spine of the product: open the site and see real opportunities you're allowed to apply to. With the Detail screen deferred (D16), each card also carries the official link, so a student can go straight from here to applying. It also creates `storage.js`, because the nationality choice is the first thing the app remembers (rule 1: only `storage.js` touches `localStorage`).

## Done when

- [ ] `#/` loads `data/opportunities.json` and shows one card per listing: title, provider and country, level badge, funding badge, and the deadline line ("Closes in X days", "Closes today", "Closes tomorrow", "Rolling deadline", or "Closed").
- [ ] Each card has an **Apply on official site ↗** link that opens `officialUrl` in a new tab with `rel="noopener"`, and a "Last verified <date>" line (R20). These replace the Detail screen for demo night (D16).
- [ ] A count above the cards reads "N opportunities".
- [ ] Listings with a deadline before today are hidden. Ticking **Show closed** shows them dimmed and labelled "Closed" in text.
- [ ] A **My nationality** selector lists the 22 Arab League countries in alphabetical order, with Jordan selected by default.
- [ ] Only listings whose `eligibleNationalities` is `["ALL"]` or contains the chosen code are shown.
- [ ] The chosen nationality is still selected after reloading the page (`sof.v1.prefs`). An unknown saved value silently falls back to Jordan.
- [ ] `src/storage.js` exists with `getPrefs()` and `setPrefs()`. Every read and write is wrapped in `try/catch`, so the list still works when storage is blocked (the choice then lasts for the current visit only).
- [ ] The empty states match `design.md` S1: "No opportunities have been added yet." when the file is empty, and "No opportunities match. Try clearing a filter." when the nationality hides everything.
- [ ] If `opportunities.json` fails to load, the screen shows "We couldn't load the opportunities. Please refresh the page." instead of a blank page.
- [ ] Unit tests cover the deadline text, the closed check, and the nationality filter.
- [ ] One column of cards at 375px and two from about 768px. Works with keyboard only.

## Touches

- `src/screens/opportunities.js` (new, replaces the placeholder)
- `src/lib/opportunities.js` (new: deadline text, closed check, eligibility filter)
- `src/nationalities.js` (new: the 22 codes and their names)
- `src/storage.js` (new: prefs only)
- `src/main.js`, `src/screens/placeholders.js`, `src/styles.css`
- `tests/opportunities.test.js`, `tests/storage.test.js` (new)
