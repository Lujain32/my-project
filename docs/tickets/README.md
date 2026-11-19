# Tickets

Task 04 backlog: eight tickets for demo night. Each has **Why**, **Done when**, and **Touches**. Each ticket is one `feature/<slug>` branch and one pull request (`workflow.md`). A ticket is done only when every "Done when" box is ticked on `staging`.

**Nothing has been built yet.** The project setup, `storage.js`, `check-data.js`, and the letter function are all part of the tickets below.

For every ticket with UI, "done" also means it works at 375px width and with keyboard only (R22, rules 19 and 20).

The numbers are the build order. Eight more tickets were cut from demo night on 19 Nov 2026 (D16) and are kept in [`later/`](later/README.md) for after the demo.

## Build order

The order follows the task's rule: the boring one first, then the spine (see opportunities, write a letter, save it), then the states, then the rest.

| # | Ticket | Stage | Size | Depends on |
|---|---|---|---|---|
| 01 | [Project skeleton, and Netlify with staging](01-project-skeleton-and-netlify.md) | Boring | 3 h | None |
| 02 | [Opportunities list, with the closed toggle and nationality selector](02-opportunities-list.md) | Spine | 3 h | 01 |
| 03 | [Letter function and Draft mode](03-letter-function-and-draft.md) | Spine | 5 h | 01 |
| 04 | [Save a letter to My Space, and open it again](04-save-letter-to-space.md) | Spine | 4.5 h | 02, 03 |
| 05 | [Add 10 verified opportunities, with the data check](05-curate-10-opportunities.md) | Data, runs alongside | 3 h | 01 |
| 06 | [Filters, keyword search, and Clear filters](06-filters-and-search.md) | Spine (brief's demo step 1) | 3 h | 02 |
| 07 | [Assistant error messages and privacy notice](07-assistant-errors-and-privacy.md) | States | 2 h | 02, 03 |
| 08 | [Export and import a backup](08-backup-export-import.md) | Protection | 4 h | 04 |

Sizes are estimates for planning, not commitments.

## Build first (week 5)

1. **01 Project skeleton, and Netlify with staging.** The boring one: a project that runs, three empty screens, and a staging URL.
2. **02 Opportunities list.** The first piece of the spine: open the site and see listings you can apply to.
3. **03 Letter function and Draft mode.** The core differentiator (D10), on a real URL.

Alongside these, start **05** with the check script, then add opportunities in batches of 5 per session.

## Schedule check

- **Total:** 8 tickets, about 27.5 hours.
- **Available:** three build weeks (5, 6 and 7) at about 9 hours a week (D16), so about 27 hours.
- **Week 8:** testing with students, bug fixes, and the demo. No new features.

This is tight, with no slack. If a week runs over, the next cut is **06**, reduced to the field filter only (saves about 1.5 h). The cut goes in `decisions.md` with a date and a reason before it happens.

## Requirement coverage

| Requirement | Ticket | Demo night |
|---|---|---|
| R1 | 02 (list), 05 (data, 10 listings) | Yes |
| R2, R3 | 06 | Yes |
| R4, R5a | 02 | Yes |
| R5 | 02 (official link and Last verified on the card) | Partly. The Detail screen is deferred |
| R8 | 03 | Yes |
| R11, R18 | 07 | Yes |
| R12 | 04 | Letters only. Other document types are deferred |
| R13 | 04 | Open only. Edit, rename and delete are deferred |
| R14 | 08 | Yes |
| R16, R17, R21 | Met by what isn't built (no sign-up, no server storage, no payments). Checked in week 8 | Yes |
| R19 | 03 (function), 01 (environment variables) | Yes |
| R20 | 02, 05 | Yes |
| R22 | 01, and every UI ticket | Yes |
| R23 | 04 | Yes |
| R6, R7, R9, R10, R15 | `later/` | No (D16) |
