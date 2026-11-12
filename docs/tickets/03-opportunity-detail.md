# 03. Opportunity Detail screen

**Priority:** Must · **Requirements:** R5, R20, R5a · **Depends on:** None · **Size:** M (about 3 h)

## Why

Students decide whether to apply here, and it's where "Write a letter for this" (ticket 06) starts. It's also where the official link and "Last verified" date build trust (R20).

## Done when

- [ ] `#/opportunity/<id>` shows title, provider, country, level and funding badges, fields, deadline with days left, Last verified, Who can apply (plus `eligibilityNote` when present), summary, and the requirements list (design.md, S2 Full).
- [ ] **Apply on official site** opens `officialUrl` in a new tab with `rel="noopener"`.
- [ ] An unknown id shows "Opportunity not found" and a link back to Opportunities.
- [ ] A closed listing shows the text notice "This opportunity is closed. The deadline was <date>."
- [ ] A listing the saved nationality can't apply to shows the "Not open to <nationality> applicants" note.
- [ ] An empty `requirements` list shows "No specific requirements listed. Check the official page."
- [ ] Unit tests cover the "Who can apply" text for `["ALL"]` and for a list of codes.

## Touches

- `src/screens/detail.js` (new)
- `src/lib/opportunities.js` (eligibility text helper)
- `src/main.js`
- `src/screens/placeholders.js`
- `src/styles.css`
- `tests/opportunities.test.js`

