# Decisions

Each decision records what was chosen, why, and what it costs. Newest decisions go at the bottom.

## D1. Documents are stored locally in the browser, with no login accounts

**Date:** 2 Nov 2026 · **Status:** Accepted

**Decision:** Letters and other documents are saved in the browser's `localStorage`. There are no user accounts, no login, and no server-side document storage for the 8-week project.

**Why:**
- Accounts would need authentication, a database, password resets, and security work. That's too much for one developer in 8 weeks at zero cost.
- CVs and letters are personal data. Keeping them in the user's own browser means we never hold anyone's personal documents.
- It resolves risk 6 in `brief.md`.

**Trade-offs:**
- Documents are tied to one browser on one device.
- Clearing browser data deletes them.
- **Mitigation:** export and import of a backup file (R14), plus a visible reminder in My Space (R23).

**Revisit when:** students in testing say cross-device access is essential.

## D2. Opportunity data comes from a hand-curated static JSON file

**Date:** 11 Oct 2026 · **Status:** Accepted

**Decision:** Opportunities are entered by hand into `data/opportunities.json`, with no scraping or paid APIs.

**Why:** zero cost, no legal or technical scraping risk, and full control over quality.
**Trade-off:** small coverage (20+ listings) and manual upkeep. Mitigated by `lastVerified` dates and a fortnightly recheck (rules 10 and 11).

## D3. Plain JavaScript, no framework

**Date:** 2 Nov 2026 · **Status:** Accepted

**Why:** five screens, one developer, a JS-focused track. A framework adds setup and learning time without clear benefit at this size.
**Trade-off:** more manual DOM code. Revisit if the screen count grows.

## D4. Netlify for hosting, staging, and the serverless function

**Date:** 2 Nov 2026 · **Status:** Accepted

**Why:** one free service provides static hosting, automatic deploy previews (the `staging` environment in `workflow.md`), and functions to hide the API key.
**Trade-off:** depends on Netlify's free-plan limits, which are to be verified (see `stack.md`).

## D5. Gemini API free tier for the letter assistant, with a visible data notice

**Date:** 2 Nov 2026 · **Status:** Accepted

**Decision:** use the Gemini API free tier through a server-side function.

**Why:** a standing free tier with no expiry, which meets the zero-cost constraint.

**Trade-off:** Google states that free-tier content may be used to improve its products and may be seen by human reviewers. So:
- users see a notice before using the assistant (R18)
- users are told not to include personal identifiers
- only the text the user chooses to send is sent, never their saved documents in bulk

**Revisit when:** there's any budget, since the paid tier doesn't use content for training.

## D6. English interface only

**Date:** 11 Oct 2026 · **Status:** Accepted
**Why:** most target opportunities and their applications are in English.
**Trade-off:** Arabic-first users may prefer Forsa or Telegram for discovery.

## D7. No automated deadline alerts

**Date:** 11 Oct 2026 · **Status:** Accepted
**Why:** alerts need accounts, email or push infrastructure, and scheduling, none of which fits the 8-week scope.
**Trade-off:** missed deadlines, one of the original pains, are only partly addressed, through visible "closes in X days" labels and sorting by deadline.

## D8. Text documents only, no file uploads

**Date:** 2 Nov 2026 · **Status:** Accepted

**Decision:** My Space stores plain-text documents (letters, CV text). Uploading PDF or Word files is out of scope.
**Why:** `localStorage` holds text only and is limited to about 5 MB. File storage would need IndexedDB and more testing.
**Trade-off:** students keep their formatted CV files elsewhere. Revisit after week 8.

## D9. Positioning: the application side, not discovery

**Date:** 2 Nov 2026 · **Status:** Accepted

**Decision:** the platform competes on helping students *apply* (letters and documents in one place), not on having more listings.
**Why:** `research.md` found that Forsa is free, large, and already filters by IT and Computer Science, so listings alone are not a differentiator.
**Follow-up:** update the Problem section of `brief.md`, which still claims existing sites charge fees.

## D10. The letter assistant is the core of the product, so it is built early

**Date:** 19 Nov 2026 · **Status:** Accepted

**Decision:** the Draft mode of the letter assistant is built straight after the project skeleton and the opportunities list (tickets 01, 02, then 03), before the filters and the rest of My Space.

**Why:**
- D9 positions the platform on the application side. Forsa already does discovery well, so the assistant is what makes this project worth demoing.
- The assistant has the most risk: a free-tier API, a server function, rate limits and timeouts. Building it early leaves time to find problems while there is still room to react.

**Rejected alternative:** building every discovery feature first (filters, search, sort). That would make the most polished part of the app the part competitors already do, and leave the riskiest part for the last week.

**Trade-off:** the opportunities list stays basic (no filters or search) for the first build week.

## D11. Filter opportunities by nationality, limited to the 22 Arab League countries

**Date:** 19 Nov 2026 · **Status:** Accepted

**Decision:** the Opportunities screen has a "My nationality" selector offering the 22 Arab League countries, with Jordan as the default. It hides listings the chosen nationality can't apply to. This adds two fields to Opportunity (`eligibleNationalities`, `eligibilityNote`), a new `localStorage` key (`sof.v1.prefs`), and `prefs` in the backup file (`data-model.md`). New requirement R5a and rule 11a.

**Why:**
- Designing S1 showed that a student can't tell from a card whether they're even allowed to apply. Opening a listing only to find it excludes your nationality is exactly the wasted time the brief describes.
- The target users are students in Jordan and the Arab region (`brief.md`), so 22 countries cover everyone the platform is for.

**Rejected alternatives:**
- **No nationality filter.** Simpler, but leaves ineligible listings in front of users, which weakens the "minutes, not hours" goal.
- **All countries of the world.** A list of about 200 entries is slower to use and harder to keep accurate, for users the brief doesn't target.
- **Country names as free text** (for example `"Jordan"`). Spelling differences break filtering, so ISO codes are used instead.

**Trade-offs:**
- Curating each listing takes longer, because eligibility must be read from the official page (ticket 05, about 1 extra hour for 10 listings).
- Non-Arab users get no useful selector. Accepted, since they are outside the target group.
- Pages that list eligible countries only in a PDF or a long table will slow curation down.

**Revisit when:** testing shows students from outside the Arab region using the platform.

## D12. The letter function's contract and limits

**Date:** 19 Nov 2026 · **Status:** Accepted

**Decision:** one Netlify Function, `netlify/functions/letter.js`, at `POST /api/letter`.

- **Request:** `{ "mode": "draft" | "improve", "inputs": { ... } }`. Draft inputs are `opportunity`, `field` and `keyPoints`. Improve input is `letter`.
- **Response:** `{ "text": "..." }` on success. Errors return a status code only, and the browser maps it to a plain message (`design.md`, S3 Error): 400 missing input, 413 too long, 429 busy or quota used up, 504 timeout.
- **Limits:** 4,000 characters of input in total (rule 12). The function gives up on Gemini after about 9 seconds, inside Netlify's 10-second limit, and the browser gives up after 12 seconds.
- **Privacy:** the key is read only from `GEMINI_API_KEY` (R19), and letter content is never logged (rule 15).

**Why:** a small, fixed contract lets the screen and the function be built and tested separately, and each error has exactly one message.

**Rejected alternative:** calling Gemini directly from the browser. It's simpler, but it exposes the API key to anyone who opens the page source (R19).

**Trade-off:** long letters close to 4,000 characters may sometimes hit the timeout on the free tier.

## D13. Remove the `type` field from Opportunity

**Date:** 19 Nov 2026 · **Status:** Accepted

**Decision:** `type` (`scholarship`, `internship`, `training`) is removed from the Opportunity data model. `level` (`masters`, `phd`, `internship`, `training`) is the only field describing what kind of opportunity it is. This answers Open question 3 in `design.md`.

**Why:**
- Designing every screen showed that no screen uses `type`. `level` already gives the same information.
- Two fields saying the same thing can contradict each other (for example `type: "internship"` with `level: "masters"`), and one less field means less to fill in for each of the 20 listings.

**Rejected alternative:** using `type` as a fifth filter on S1. It adds work to the filters ticket (06) for a filter that duplicates the level filter, at a time when the schedule already doesn't fit.

**Trade-off:** a master's scholarship and a master's training course can't be told apart by a field. If that matters later, the field can be added back.

## D14. The assistant's inputs are not saved

**Date:** 19 Nov 2026 · **Status:** Accepted

**Decision:** the Draft inputs (target opportunity, field, key points) and the Improve input (the pasted letter) are sent to `/api/letter` and then discarded. Only the letter the user chooses to save becomes a Document. This answers Open question 1 in `design.md`.

**Why:**
- It keeps the data model small: no new entity, no extra storage key.
- Users decide what is kept. Nothing is saved automatically (rule 14), which matches D1's privacy reasoning.

**Rejected alternative:** saving the inputs as a draft in `localStorage`, so they survive leaving the page. It needs a new field or key and more states to design, for a small benefit.

**Trade-off:** if the user leaves the assistant before generating, the inputs are lost. The inputs are short, so retyping them is a small cost.

## D15. The main field comes first, and the assistant pre-fills it

**Date:** 19 Nov 2026 · **Status:** Accepted

**Decision:** in `opportunities.json`, the first value in `fields` is the opportunity's main field. When the assistant is opened from an opportunity, it pre-fills the field input with that first value. The input stays editable. This answers Open question 2 in `design.md`.

**Why:** it gives a useful default without adding a new field to the data model, and the rule is easy to follow while curating (ticket 05). The pre-fill itself is deferred with the "Write a letter for this" ticket (D16), but the order rule still applies to curation.

**Rejected alternatives:**
- Adding a separate `mainField` field. Clearer, but it duplicates what the order of `fields` can already express.
- Leaving the field input empty. Safer, but it removes most of the benefit of starting a letter from an opportunity (R10).

**Trade-off:** the curator has to remember the order rule. Ticket 05 includes it as a "Done when" check.

## D16. Cut the backlog to eight tickets for demo night, and work about 9 hours a week

**Date:** 19 Nov 2026 · **Status:** Accepted

**Context:** after the design was finished, the backlog had 16 tickets (one over the limit of 15) and the Must tickets needed about 42 hours. Three build weeks (5, 6 and 7) at 5 to 8 hours a week give 15 to 24 hours. No code existed yet, so the project setup, `storage.js`, `check-data.js` and the letter function were also still to build.

**Decision:** demo night is built around the three steps in `brief.md` (filter opportunities, write a letter with the assistant, save it and find it again), plus the backup that protects saved documents. Eight tickets stay. Eight move to `docs/tickets/later/`. Weekly time goes up from 5–8 hours to about 9 hours, so the backup can stay.

**Kept (about 27.5 hours):** project skeleton and Netlify, the opportunities list with the nationality selector, the letter function and Draft mode, saving and opening a letter, 10 verified opportunities with the data check, filters and search, assistant errors and the privacy notice, and export and import.

**Cut to after the demo:**
- **Opportunity Detail screen (R5, S2).** The card gets the official link and the "Last verified" date instead, so R20 is still met.
- **"Write a letter for this" (R10).** Letters are saved with `opportunityId: null` for now.
- **Improve mode (R9).**
- **Edit, rename, delete, and New document (R13, D17).** Saved letters can still be opened and read.
- **About & Privacy screen (R16, R17, R21, S5).** The must-nevers are still met by what isn't built, and R18 is met by the notice on the assistant screen.
- **Shortlist (R7), sort by deadline (R6), and download as .txt (R15).**
- **Opportunities reduced from 20 to 10** (R1).

**Why:**
- Each kept ticket serves one of the brief's three demo steps or protects the brief's promise that no document gets lost. Each cut ticket adds convenience on top of a flow that already works end to end.
- The backup was kept over a lighter week because local storage (D1) has no other protection against a cleared browser.

**Rejected alternatives:**
- **Keep the 5–8 hours and cut the search and extra filters instead** (about 26 hours). Rejected: still over the limit, and it weakens demo step 1.
- **Drop the backup** (about 23.5 hours). Rejected: it breaks the mitigation in D1 and the "no document lost" measure in `brief.md`.
- **Keep everything and build into week 7's freeze or week 8.** Rejected: week 8 is for testing with students and the demo, and cutting late is failing with extra steps.

**Trade-offs:**
- About 9 hours a week is above the 5–8 hours in `scope.md`. The plan has no slack.
- The demo shows a smaller product: three screens instead of five.

**If a week runs over:** the next cut is ticket 06 reduced to the field filter only (about 1.5 hours saved), recorded here with a date before it happens.

**Revisit when:** the eight tickets are merged with time left before the week 7 freeze. Pick up `later/` tickets in the order its README suggests.

## D17. My Space has a "New document" action for CV text and other notes

**Date:** 19 Nov 2026 · **Status:** Accepted

**Decision:** S4 gets a **New document** button that opens a form with Title, Type (Motivation letter, CV text, Other) and a text box. This answers Open question 4 in `design.md` and adds the button to `SCREEN.md`. The button itself is deferred to after demo night (D16).

**Why:**
- The brief's problem is about CVs and letters getting lost, not only letters. Without this, `Document.kind` values `"cv-text"` and `"other"` could never be created, and R12 ("letters and other text documents") couldn't be met.
- It reuses the existing Document fields, so the data model doesn't change.

**Rejected alternative:** reducing `kind` to motivation letters only. Simpler, but it drops half of the document problem from the brief.

**Trade-off:** CVs are stored as plain text only, not as formatted files (D8).

## D18. Opportunities screen details decided while designing it

**Date:** 19 Nov 2026 · **Status:** Accepted

**Context:** building the S1 mockup with the model surfaced choices that no document had made. These are the ones accepted.

**Decisions:**
- **Platform name: Scholaroo.** Shown on the left of the navigation bar and as the page title. No document named the platform before.
- **"Closing soon" for deadlines 0 to 10 days away.** The card shows a "Closing soon" badge and the deadline line turns amber. The badge text is what carries the meaning, so color is never the only signal (rule 19). It partly answers the missed-deadlines pain in `brief.md`, which D7 left without alerts.
- **Card order follows `opportunities.json`.** Sorting is deferred (D16), so the curator controls the order.
- **Card layout:** level and funding badges at the top, then title, provider and country, then the deadline line, then **Apply on official site ↗** and "Last verified" below a divider. Fully funded is green, partially funded is gray.

**Proposed by the model and accepted:** the 10-day highlight (the number was chosen by the project owner), the badge colors, the card order, and the card layout.

**Rejected alternatives:**
- **No deadline highlight.** Simpler, but a student scanning the list can miss a listing that closes this week.
- **Color only for "closing soon".** Fails rule 19 for color-blind users and screen readers.

## D19. Letter Assistant details decided while designing it

**Date:** 19 Nov 2026 · **Status:** Accepted

**Context:** building the S3 mockup surfaced choices that `design.md` and the tickets hadn't made.

**Decisions:**
- **Field is optional.** Only target opportunity and key points are required to generate. A student who isn't sure how to name their field can still get a letter.
- **A second personal-data reminder under the key points input**, on top of the notice at the top of the screen (R18). Key points is where a student is most likely to type a phone number or address.
- **One tab, Draft, in a tab bar.** Improve is deferred (D16), but keeping the bar means Improve can be added back later without changing the layout.
- **The busy message ends with "Your text is safe."** It tells the user nothing was lost (R11).
- **Layout:** target opportunity and field side by side on wide screens, key points below them, and a one-line hint under every input.

**Proposed by the model and accepted:** the second reminder, "Your text is safe.", the layout, and the hints. The project owner decided that Field is optional and that the one-tab bar stays.

**Rejected alternatives:**
- **Field required.** Stricter input, but it blocks students who don't know which label fits, and the letter can be written without it.
- **No tab bar until Improve returns.** Cleaner today, but it means redesigning the screen when Improve is added.

## D20. My Space details decided while designing it

**Date:** 19 Nov 2026 · **Status:** Accepted

**Context:** building the S4 mockup showed that the empty state in `design.md` pointed to New document, which D16 deferred, and surfaced a few choices no document had made.

**Decisions:**
- **New empty state.** The heading "Start your first letter", one line saying letters saved in the Letter Assistant appear here and that a backup can be imported, and an **Open Letter Assistant** button. An invitation, not an apology, and it only points to things that exist on demo night.
- **Document count in the heading**, for example "Documents (3)". Calculated, not stored.
- **Importing shows only "Importing…" on the button.** No extra status line, as `design.md` already says.
- **The read-only view has no "read only" label.** It simply has no Save button. A label explaining a cut feature is a note for the developer, not for the user.

**Proposed by the model and accepted:** the new empty-state text and the document count. **Proposed by the model and rejected:** an extra "Reading your backup file…" status line during import, and a "Read only for demo night" label in the document view.

**Rejected alternatives:**
- **Keep the old empty state.** It told users to use New document, a button that won't exist on demo night.

## D21. Packages and tools for the project skeleton (ticket 01)

**Date:** 23 Nov 2026 · **Status:** Accepted

**Decision:** the project uses two packages, both as development tools only, and one tool installed on the developer's computer.

| Package | Installed as | Why |
|---|---|---|
| `vite` | devDependency | Local dev server and the production build (D3, `stack.md`) |
| `vitest` | devDependency | Runs the unit tests with `npm test` (`stack.md`) |
| `netlify-cli` | Global, on the developer's computer only (`npm install -g netlify-cli`) | Runs `netlify dev`, so the site and, from ticket 03, the letter function can be tested together locally |

Exact versions are recorded in `package-lock.json`.

**Also decided while planning ticket 01:**
- **No web fonts.** Text uses the fonts already on the device. Loading Inter from Google Fonts would break rule 16 (no third-party content).
- **No `vite.config.js`.** Vite's defaults are enough for now.

**Rejected alternatives:**
- **`netlify-cli` as a devDependency.** It's large (hundreds of megabytes) and isn't needed to build or deploy the site, so it stays off the project.
- **Deferring `netlify dev` to ticket 03.** Suggested by the model, since no function exists yet. The project owner chose to install it now.
- **Inter from Google Fonts.** It matches the design system, but sends every visitor's request to Google.

## D22. Protect Netlify's free credits

**Date:** 25 Nov 2026 · **Status:** Accepted

**Context:** while connecting Netlify for ticket 01, the dashboard showed the free plan's credits used up for the cycle 12 Nov to 11 Dec. The free plan gives 300 credits a month, and each successful production deploy costs 15, so about 20 production deploys a month. The site had been linked to the repo since 19 Nov, so every file upload straight to `main` was a production deploy. Deploy previews cost nothing.

**Decision:**
- **Nothing is committed to `main` directly**, docs included (already in `workflow.md`). Every change reaches `main` through a pull request.
- **Docs changes travel in the pull request of the ticket they belong to**, so each merge is one production deploy, not several.
- **Until 12 Dec 2026, tickets are tested and merged on their deploy previews.** `scholaroo.netlify.app` updates once credits reset.

**Rejected alternatives:**
- **Skip builds when only docs change**, with an `ignore` command in `netlify.toml`. It would save more credits, but the git command is hard to explain and its behavior on a first build is uncertain. Revisit if credits run short again.
- **Delete and recreate the Netlify project.** Credits belong to the account, not the project, so it wouldn't help.
- **A paid plan.** Breaks the zero-cost constraint.

**Watch:** before demo night, check that enough credits are left for the final deploy. If not, demo from the latest deploy preview.

