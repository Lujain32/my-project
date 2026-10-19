# Project Brief: Free Scholarship & Training Opportunity Finder

## The Problem

IT and AI students and graduates waste hours searching for funded master's programs, internships, and free training opportunities abroad. The information is spread across dozens of channels: Telegram groups, aggregator sites, LinkedIn, and individual university portals. Some sites charge for information that is freely available on official university pages, and others present it in a confusing way.

Once students start applying, their documents become a second problem. CVs and motivation letters get edited across several AI tools and saved in random folders, so final versions are lost and the effort is duplicated.

## Who Has It

- **Primary:** IT and AI students and recent graduates in Jordan and the Arab region who are looking for funded opportunities abroad.
- **First user:** the project owner, an AI student currently searching for a funded master's or internship abroad.
- **Language:** English, since most target opportunities are international.

> Evidence so far comes from one user (the project owner). Validation with other students is planned. See Risks and Unknowns.

## Today Without It

A typical search session looks like this:

1. Open Telegram channels, aggregator sites (e.g. Hafiz, Forsa), LinkedIn, and university portals.
2. Keep dozens of browser tabs open, then copy links into a Word document or notes app.
3. Download the requirements for each opportunity separately.
4. Draft and edit motivation letters across multiple AI chat tools.
5. Save drafts in whatever folder is handy, such as Downloads or "AI_Applications."

**Result:** hours spent searching, lost final versions of documents, and missed deadlines caused by the scattered workflow.

## What Success Looks Like

On demo night, a user can:

1. Filter and search a curated set of scholarships and training opportunities by field (AI/IT).
2. Use the built-in AI assistant to draft or edit a motivation letter.
3. Save that letter into a personal document space and find it again later.

**Measures:**

| Measure | Baseline (today) | Target (week 8) |
|---|---|---|
| Time to find relevant opportunities in one search session | _To be measured this week_ | Minutes, not hours |
| Final document versions lost | Happens regularly | Zero: every saved letter is retrievable in the platform |
| Students other than the owner who try it | 0 | _To be set_ |

## Scope

**In scope (8 weeks):**

- A curated opportunity list, entered manually or loaded from a static JSON dataset, with filters by field
- An AI assistant for drafting and editing motivation letters, using a free-tier API
- A personal document space where letters are saved and can be retrieved

**Out of scope:**

- Automated deadline alerts and reminders
- Web scraping or paid data APIs
- Arabic interface
- Native mobile app

**Constraints:**

- One developer
- 8 weeks, limited weekly hours (_exact hours to be confirmed_)
- Zero financial cost: free hosting and free-tier AI only

## Risks and Unknowns

| # | Risk or unknown | Why it matters | How it will be resolved |
|---|---|---|---|
| 1 | Problem validated by one user only | The brief targets a whole region, but the evidence is one person | Talk to at least 5 IT/AI students before week 2 |
| 2 | Claim that existing sites paywall free information is unverified | If the main alternatives are free, the value argument weakens | Document 2 to 3 sites students use, including what they charge and what they lack |
| 3 | Students may prefer existing AI chat tools for letters | The in-platform assistant may add little over tools they already use | Ask about this in the student conversations |
| 4 | Listing data goes stale | Manual data can't guarantee opportunities are still "active" | Record a source and deadline for every listing, and define who updates it after week 8 |
| 5 | Free-tier API limits and data policy | Rate limits, output quality, and whether the provider trains on users' personal letters | Check the provider's terms before choosing one |
| 6 | Storing personal documents | CVs and letters are personal data, so access and security need a decision | Decide between user accounts and local-only storage in week 1 |
| 7 | Three features for one developer with limited hours | Scope may not fit the timeline | Confirm weekly hours. If behind schedule, cut in this order: _priority to be set_ |
| 8 | No baseline for search time | "Hours to minutes" can't be proven without one | Time one real search session this week |