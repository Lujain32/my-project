# Progress

Last updated: 26 Nov 2026

## Done

| Item | File |
|---|---|
| Problem framing and scope | `brief.md` |
| Competitor research (Forsa, Telegram, DAAD) | `research.md` |
| Git and environment rules | `workflow.md` |
| Repository and README | `README.md` |
| Requirements (23, each with "done when") | `requirements.md` |
| Screens (5) | `screens.md` |
| Data model | `data-model.md` |
| Architecture | `architecture.md` |
| Stack | `stack.md` |
| Code, data, AI, and privacy rules | `rules.md` |
| Decisions D1 to D9, including local storage | `decisions.md` |
| Week-by-week plan (rewritten for the 8 tickets) | `plan.md` |
| Design of every screen, with all four states | `design.md` |
| Backlog: 8 tickets for demo night, 8 deferred | `tickets/` |
| Decisions D10 to D20, including the scope cut (D16) and the screen details from the mockups (D18 to D20) | `decisions.md` |
| Mockups of S1, S3 and S4, reviewed with the three questions | `design.md`, D18 to D20 |
| Ticket 01: project skeleton, router, nav bar, Netlify staging | PR #5 |
| Ticket 02: opportunities list, nationality selector, `storage.js` | PR #6 |
| Ticket 03: letter function and Draft mode | PR #7 |
| Which model does what, and the fresh-chat review rule | `agents.md` |
| What the model may, must ask about, and must never do | `tools.md` |
| Packages and tools (D21), protecting Netlify credits (D22) | `decisions.md` |

## In progress

- Next: ticket 04 (save a letter to My Space).

## Open items carried from the brief

| Item | Status |
|---|---|
| Talk to at least 5 IT/AI students | Not started |
| Measure baseline search time | Not started |
| Confirm weekly hours | Done: about 9 hours a week (D16) |
| Set the feature cut order | Done: D16, and `tickets/later/` |
| Update Problem section of `brief.md` (paywall claim not supported) | Not started |
| Set a target for "students other than the owner who try it" | Not started |
| Verify Gemini and Netlify free-tier limits | Done. Netlify: 300 credits a month, 15 per production deploy, previews free (D22). Gemini: `gemini-3.1-flash-lite` is on the free tier |

## Log

Add one line per working session: date, what was done, what's next.

- **2 Nov 2026:** wrote all Task 03 planning documents. Next: project setup and the first 10 opportunities.
- **19 Nov 2026:** Task 04. Designed all five screens with four states each, added the nationality filter (D11), removed `type` (D13), recorded D10 to D17, cut the backlog to 8 tickets (D16), and renamed the docs to lowercase. Next: ticket 01.
- **19 Nov 2026 (later):** built mockups of S1, S3 and S4, listed what the model decided, and recorded the accepted and rejected choices in D18 to D20. Next: ticket 01.
- **23 to 26 Nov 2026:** Task 05. Installed Node, built and merged tickets 01, 02 and 03 through branches, pull requests, fresh-chat reviews and squash merges. Found Netlify's free credits used up until 12 Dec (D22). Next: ticket 04.

## What the model got wrong this week, and how I caught it

1. **The skip link could stop the whole site** (ticket 01). The model's code attached the skip link's click handler before starting the router, so a missing skip link would have stopped every screen. I caught it in the third reading pass ("which line breaks first?") and sent it back.
2. **The model overstated its own fix** (ticket 01). Its PR description said moving the router "fixed" the skip-link problem, but the error still happened. The fresh-chat review caught it, not me and not the chat that wrote it.
3. **The model broke a rule we wrote** (ticket 02). It grew `styles.css` to 376 lines, against rule 6 (about 200 lines). The tests passed and the screen worked, so only the fresh-chat review caught it, with "request changes".
4. **The letter assistant invented a student's experience** (ticket 03). From three facts (CIS graduate, GPA 88%, AI projects), the first real letter added skills and tasks I never gave it. I caught it by reading the letter against my own input. The cause was the model's prompt: a 250-word minimum pushed Gemini to fill the space.
5. **The model's fix broke something else** (ticket 03). To reduce invention, it lowered the temperature to 0.4. The next request timed out (504) twice. Google's Gemini 3 guide warns against values below 1.0. I caught it because the screen showed an error, and the status code in the `netlify dev` log showed which one.

**What I learned:** tests passing doesn't mean the work is right. Rules, prompts and fixes all have to be checked by reading, by running the real thing, and by a reviewer that didn't write the code.

**My own mistake:** I uploaded docs straight to `main` through GitHub's website, which broke `workflow.md` and D22 on the day D22 was written. I fixed the branch by merging `main` into it, and from now on every change goes through git on my computer.

