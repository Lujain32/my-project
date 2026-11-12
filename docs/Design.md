# Design

Task 04. One section per screen in `screens.md`. Each section lists the data the screen shows, mapped to fields that exist in `data-model.md`, then describes the screen in four states: **Empty**, **Loading**, **Error**, and **Full**.

Rules for this document:

- Every piece of data on a screen comes from a field in `data-model.md`, or is calculated from one (for example, "Closes in 12 days" is calculated from `deadline`). Calculated values are marked *(derived)*.
- Fixed text (labels, notices, help text) and controls listed in `screens.md` are not data, so they don't need a field.
- Anything a screen needs that `data-model.md` doesn't have is listed under **Open questions** at the end, not invented.

## Data sources at a glance

| Source | Where it lives | Used by |
|---|---|---|
| Opportunity | `data/opportunities.json`, bundled into the site at build time | S1, S2, S3, S4 |
| Document | `localStorage` key `sof.v1.documents` | S3, S4 |
| Shortlist | `localStorage` key `sof.v1.shortlist` (opportunity `id`s) | S1, S2, S4 |
| Preferences | `localStorage` key `sof.v1.prefs` (`nationality`) | S1 |
| Backup file | Downloaded or uploaded `.json` file | S4 |

Because the opportunity data is bundled and `localStorage` reads are instant, most screens have no network wait. The only real **Loading** state is in S3, while the letter function replies. Other screens describe the brief moment before the page's JavaScript has run.

---

## S1. Opportunities (home)

**Route:** `#/` · **Requirements:** R1, R2, R3, R4, R5a, R6, R7

### Data shown

| On screen | Field |
|---|---|
| Card title (links to S2) | `Opportunity.title`, link built from `Opportunity.id` |
| Provider and country line | `Opportunity.provider`, `Opportunity.country` |
| Level badge | `Opportunity.level` (shown as Master's, PhD, Internship, Training) |
| Funding badge | `Opportunity.funding` (shown as Fully funded or Partially funded) |
| Deadline line | `Opportunity.deadline` → "Closes in X days", "Closes today", "Closes tomorrow", "Rolling deadline" if `null`, or "Closed" *(derived)* |
| Save button state (Saved / Save) | Whether `Opportunity.id` is in `Shortlist` |
| Result count | Number of listings after filtering *(derived)* |

### Controls and the fields they use

| Control | Field |
|---|---|
| My nationality selector (default Jordan, remembered) | Reads and writes `Preferences.nationality`; filters on `Opportunity.eligibleNationalities` |
| Field filter | `Opportunity.fields` (fixed list of six values from `data-model.md`) |
| Level filter | `Opportunity.level` |
| Funding filter | `Opportunity.funding` |
| Country filter | `Opportunity.country` (options built from the countries in the dataset) |
| Keyword search | Matches `Opportunity.title`, `Opportunity.provider`, `Opportunity.summary` |
| Show closed toggle | Compares `Opportunity.deadline` with today's date |
| Sort by deadline (Should) | `Opportunity.deadline`, nearest first; rolling (`null`) deadlines go last |
| Clear filters | Resets the field, level, funding and country filters and the search box. Nationality stays, because it's a saved preference, not a filter |

### States

**Empty.** There are two cases, with different messages:
- *No data at all* (`opportunities.json` is an empty list): the heading and controls show, the count reads "0 opportunities", and the message says "No opportunities have been added yet."
- *Nothing matches* (data exists, but the filters, search or nationality hide everything): the count reads "0 opportunities", and the message says "No opportunities match. Try clearing a filter." with a **Clear filters** button next to it. If closed listings would match, the message adds "or show closed ones."

**Loading.** The data is part of the page, so there's no wait to fetch it. Before the script runs, the main area is blank under the navigation bar. If the script is slow (a weak mobile connection), a single line says "Loading opportunities…". No spinners or skeleton cards.

**Error.**
- *Bad data in the file:* this is caught before deploying by `npm run check-data` (R20), so users never see it. A listing that fails the check can't reach production.
- *Saved nationality isn't in the list* (for example, an old or edited `Preferences.nationality`): the screen silently falls back to Jordan. No message.
- *Browser storage blocked* (some private modes): the list still works with the Jordan default. Changing nationality works for the current visit but isn't remembered. Pressing **Save** on a card shows a short message under the button: "Your browser is blocking storage, so saved items can't be kept."

**Full.** Under the heading come the nationality selector, the search box, the four filters, **Clear filters**, **Show closed** and the sort control. Then a count ("18 opportunities") and the cards: one column on phones, two on wider screens. Each card shows the title as a link, provider and country, the level and funding badges, the deadline line, and a **Save** button. Listings this nationality can't apply to never appear. Closed listings appear only when **Show closed** is ticked. Those cards are dimmed and say "Closed" in text, never by color alone (rule 19).

---

## S2. Opportunity Detail

**Route:** `#/opportunity/<id>` · **Requirements:** R5, R7, R10, R20

### Data shown

| On screen | Field |
|---|---|
| Title (page heading) | `Opportunity.title` |
| Provider, country | `Opportunity.provider`, `Opportunity.country` |
| Level and funding badges | `Opportunity.level`, `Opportunity.funding` |
| Fields covered | `Opportunity.fields` (for example "AI · Data science") |
| Deadline, and days left | `Opportunity.deadline` *(days left: derived)* |
| Last verified | `Opportunity.lastVerified` (for example "Last verified 1 Nov 2026") |
| Who can apply | `Opportunity.eligibleNationalities` ("Open to all nationalities" if `["ALL"]`, otherwise the country names), plus `Opportunity.eligibilityNote` when present |
| Summary | `Opportunity.summary` |
| Requirements list | `Opportunity.requirements` |
| Apply on official site (opens a new tab) | `Opportunity.officialUrl` |
| Save to shortlist (Saved / Save) | `Opportunity.id` in `Shortlist` |
| Write a letter for this (to S3) | Passes `Opportunity.id` to S3 (`#/assistant?for=<id>`) |

### States

**Empty.** A listing must have every required field, so the screen is never partly empty. Two optional parts can be missing:
- `eligibilityNote` is absent: that line is left out.
- `requirements` is an empty list: the section says "No specific requirements listed. Check the official page."

**Loading.** As in S1, there's no network wait. Before the script runs, the area is blank. The page never shows a half-built listing.

**Error.**
- *Unknown id* (an old shared link, a listing that was removed, or a typo in the URL): the heading says "Opportunity not found". The text says "It may have been removed or the link is wrong." There's a **Back to opportunities** link.
- *Closed listing* (opened from an old link, or with **Show closed** on): the page still opens. Under the title, a clear text notice says "This opportunity is closed. The deadline was 1 Oct 2026." The Apply button stays, since the funder's page may already show the next round. **Write a letter for this** stays too.
- *Listing the chosen nationality can't apply to* (reached by a direct link): the page opens, and the "Who can apply" line is shown first with the note "Not open to Jordanian applicants." The nationality name comes from `Preferences.nationality`.
- *Storage blocked when pressing Save:* the same message as S1.

**Full.** A back link "← Opportunities" sits above the title. Then come the provider and country, the badges, and a highlighted deadline box with the date and days left, plus "Last verified" under it. Next are the "Who can apply" line, the summary, and the requirements as a bulleted list. At the bottom are three actions: **Apply on official site ↗** (main button), **Write a letter for this**, and **Save**. On phones, the actions stack full width.

---

## S3. Letter Assistant

**Route:** `#/assistant`, or `#/assistant?for=<id>` when opened from S2 · **Requirements:** R8, R9, R10, R11, R15, R18

### Data shown and saved

| On screen | Field |
|---|---|
| Pre-filled target (when opened from S2) | `Opportunity.title` and `Opportunity.provider` for the `id` in the URL |
| Pre-filled field (when opened from S2) | The first value in `Opportunity.fields` *(see Open question 2)* |
| Editor text | Becomes `Document.content` on save |
| Title asked for on save | `Document.title` (max 100 characters) |
| Link to the opportunity | `Document.opportunityId`, set to the `id` from the URL. Otherwise `null` |
| Document type on save | `Document.kind` = `"motivation-letter"` |
| Saved timestamps | `Document.createdAt`, `Document.updatedAt` (set automatically) |

The Draft inputs (target opportunity, field, key points about you) and the Improve input (the pasted letter) are sent to `/api/letter` and are **not stored**. See Open question 1.

### States

**Empty.** This is the first visit, with nothing typed.
- Before first use, the privacy notice (R18) appears above the tabs. It says text sent to the assistant goes to a third-party AI service, and not to include ID numbers, phone numbers, or addresses. It has a **Got it** button. After that, a shorter version of the notice stays visible on the screen (rule 18).
- The **Draft** tab is selected. Its three inputs are empty, each with a label and a one-line hint. **Generate** is disabled until the target opportunity and key points are filled in.
- The editor below shows the placeholder "Your letter will appear here. You can edit it freely."
- **Save to My Space**, **Copy**, and **Download .txt** are disabled while the editor is empty.

**Loading.** After **Generate** or **Improve**, that button changes to "Writing…" and is disabled. A text status reads "The assistant is writing your letter. This can take up to 10 seconds." Inputs stay visible and keep their text. Any text already in the editor stays visible and isn't replaced until a reply arrives. The other actions are disabled until the reply arrives or fails.

**Error.** Each case has a plain message shown above the editor, and the user's text is never lost (R11):
- *Busy or quota used up:* "The assistant is busy, try again in a few minutes."
- *Timeout (no reply in about 9 seconds):* "The assistant took too long to reply. Please try again."
- *Too long (over 4,000 characters):* "Your text is too long. Please keep it under 4,000 characters."
- *Missing input:* "Something is missing. Please fill in the required fields." The missing field is marked in text, not only in color.
- *No internet connection:* "You seem to be offline. Your text is safe. Try again when you're connected."
- *Unknown `for=` id in the URL:* the assistant opens empty in Draft mode with a small note: "We couldn't find that opportunity, so nothing was pre-filled."
- *Save fails because storage is full:* "Your browser storage is full. Export a backup, then delete old documents." with a link to My Space. The editor text stays.
- *Empty title on save:* "Please give the document a title."

**Full.**
- *Draft mode:* the inputs are filled, and the generated letter is in the editor and can be edited. Below the editor are **Save to My Space**, **Copy**, and **Download .txt**. If it was opened from S2, a line above the inputs says "Writing for: DAAD EPOS Master's Scholarship (DAAD)", and that link is kept on save.
- *Improve mode:* the pasted letter and the revised version appear side by side on wide screens, stacked on phones, labelled "Your version" and "Suggested version". Each has a **Use this version** button. The chosen text moves into the editor. Nothing is saved until the user presses **Save to My Space** (rule 14).
- *After saving:* a confirmation reads "Saved to My Space" with a link to it. Saving again from the same editor updates the same document instead of creating a copy.

---

## S4. My Space

**Route:** `#/space` · **Requirements:** R7, R12, R13, R14, R15, R23

### Data shown

**Documents list**

| On screen | Field |
|---|---|
| Title | `Document.title` |
| Type | `Document.kind` (shown as Motivation letter, CV text, Other) |
| Last edited | `Document.updatedAt` (for example "Edited 12 Nov 2026") |
| "For: <opportunity>" line, when linked | `Document.opportunityId` → `Opportunity.title` |
| Order | Newest `updatedAt` first |
| Open / edit | `Document.content` loaded into an editor |
| Rename | Writes `Document.title` |
| Download .txt | `Document.content`, file named after `Document.title` |
| Delete (with confirmation) | Removes the document by `Document.id` |

**Shortlist**

| On screen | Field |
|---|---|
| Each saved item | `Shortlist` id → `Opportunity.title`, `Opportunity.provider`, deadline line from `Opportunity.deadline` *(derived)* |
| Link | To S2 via `Opportunity.id` |
| Remove | Removes the id from `Shortlist` |

**Backup**

| On screen | Field |
|---|---|
| Export backup | Downloads a Backup file with `app`, `schemaVersion`, `exportedAt`, `documents`, `shortlist` |
| Import backup | Reads a Backup file, checks `app` and `schemaVersion`, and merges by `Document.id` using the later `updatedAt` |

### States

**Empty.**
- The storage banner (R23) always shows, empty or not: "Your documents are saved only in this browser. Export a backup regularly."
- *No documents:* "No documents yet. Start one in the Letter Assistant." with a link to S3.
- *Empty shortlist:* "No saved opportunities yet. Press Save on any opportunity to keep it here." with a link to S1.
- **Export backup** is disabled when there are no documents and no shortlist items. **Import backup** stays available, since that's how a new browser gets its data back.

**Loading.** Reading storage is instant, so the screen shows no loading state for the lists. The only wait is while an imported file is read. The **Import backup** button shows "Importing…" and is disabled until it's done.

**Error.**
- *Storage blocked:* in place of both lists, a message says "Your browser is blocking storage, so documents can't be saved here. Try a normal (non-private) window." Export and Import are disabled.
- *Stored data can't be read (corrupted):* the screen treats it as empty and shows the empty states. Nothing crashes.
- *Import file isn't a backup* (wrong `app` or `schemaVersion`, or not JSON): "This file isn't a backup from this app." Existing data is unchanged.
- *Import succeeded:* not an error, but the result is reported: "Imported 3 new documents and updated 1." Or, if nothing changed: "Everything in this file is already here."
- *Saving an edit or rename fails (storage full):* "Your browser storage is full. Export a backup, then delete old documents." The unsaved text stays in the editor.
- *Shortlisted opportunity no longer exists:* skipped silently, as `data-model.md` specifies.
- *Linked opportunity no longer exists:* the "For:" line is left out.

**Full.** The banner sits at the top, with **Export backup** and **Import backup** beside it. Then the **Documents** section: one row per document with title, type, and "Edited <date>", plus the "For: <opportunity>" line when linked. Each row has **Open**, **Rename**, **Download .txt**, and **Delete**. Delete asks "Delete '<title>'? This can't be undone." and needs a second press to confirm. Opening a document shows its content in an editor with **Save** and **Back to My Space**. Then the **Shortlist** section: each item shows the title (linking to S2), provider, deadline line, and **Remove**. Closed shortlisted items say "Closed" in text.

---

## S5. About & Privacy

**Route:** `#/about` · **Requirements:** R16, R17, R18, R21

### Data shown

This screen is fixed text. It shows no records from `data-model.md`. Its content describes the data model in plain words:

- What the platform is and who it's for (from `brief.md`).
- Where opportunity data comes from: each listing is checked against the funder's official page (`officialUrl`), and each shows its `lastVerified` date. All listings are rechecked at least every two weeks (rule 10).
- What's stored, and where: documents and the shortlist, in this browser only (`sof.v1.documents`, `sof.v1.shortlist`), plus the chosen nationality (`sof.v1.prefs`). No account, no email, no server copy.
- What's sent to the AI service: only the text you send with **Generate** or **Improve**. The free-tier provider may use it to improve its products (D5).
- How to back up (Export in My Space) and how to delete everything (delete documents in My Space, or clear this site's data in the browser).

### States

**Empty.** Not applicable. The text is always present.

**Loading.** Same as other screens: blank under the navigation bar until the script runs. No data is loaded.

**Error.** None specific to this screen. An unknown route shows the shared "Page not found" screen with a link to Opportunities.

**Full.** A single readable column with short headings: "What this is", "Where the listings come from", "Where your documents are kept", "What the assistant sends", and "Backing up and deleting your data". Links go to My Space for Export. No images, tracking, or third-party content (rule 16).

---

## Shared across all screens

- **Navigation bar:** Opportunities · Letter Assistant · My Space · About. The current screen is marked in bold with an underline and `aria-current`, not by color alone.
- **Page not found:** any unknown route shows "Page not found" and a link to Opportunities.
- **Keyboard and screen readers:** a "Skip to content" link, and focus moves to the main area when the screen changes (rule 20).
- **Widths:** designed at 375px first, with no horizontal scrolling (R22). Two columns for cards, and side by side for Improve, from about 768px.

## Field usage check

Every field in `data-model.md`, and where it appears:

| Field | Used on |
|---|---|
| `Opportunity.id` | S1 links, S2 route, S3 `for=`, Shortlist, `Document.opportunityId` |
| `Opportunity.title`, `provider`, `country`, `level`, `funding`, `deadline` | S1, S2, S4 shortlist |
| `Opportunity.fields` | S1 field filter, S2, S3 pre-fill |
| `Opportunity.summary` | S2, S1 keyword search |
| `Opportunity.requirements` | S2 |
| `Opportunity.eligibleNationalities`, `eligibilityNote` | S1 filter, S2 |
| `Opportunity.officialUrl` | S2 Apply button |
| `Opportunity.lastVerified` | S2 |
| `Opportunity.type` | **Not shown anywhere** (see Open question 3) |
| `Document.id` | S4 actions, import merge |
| `Document.title`, `kind`, `content`, `opportunityId`, `updatedAt` | S3 save, S4 |
| `Document.createdAt` | Stored only. Not shown |
| `Shortlist` | S1, S2, S4 |
| `Preferences.nationality` | S1, S2 |
| Backup file fields | S4 Export and Import |

## Open questions

These need a decision before the backlog is final. Nothing here has been designed around a guess.

1. **Letter inputs aren't in the data model.** S3's Draft inputs (target opportunity, field, key points) are sent to the function and thrown away. If the user leaves the page, they're lost. Should they stay unsaved (current design), or should `data-model.md` gain a field for them?
2. **Pre-filling "field" from an opportunity.** An opportunity can list several `fields`. S3 currently pre-fills the first one. Is that right, or should the field input be left for the user to fill?
3. **`Opportunity.type` is never shown.** `level` already covers Master's, PhD, Internship, and Training, so no screen uses `type`. Should it be removed from the data model, or used somewhere (for example, as the S1 filter in place of level)?
4. **How CV text and "Other" documents get created.** `Document.kind` allows `"cv-text"` and `"other"`, and R12 says users can save "other text documents". But no screen in `screens.md` has a "New document" button, so only motivation letters can be created. Should S4 get a "New document" action, or should `kind` be reduced to motivation letters only?