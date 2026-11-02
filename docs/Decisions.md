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