# Requirements

Scope: 8 weeks, one developer, zero cost. Documents are stored locally in the browser, with no login (see `decisions.md`, D1).

Priority: **Must** = required for demo night. **Should** = build if time allows; first to cut.

> **Demo-night scope (D16, 19 Nov 2026).** Some requirements are deferred until after demo night: R5 (Detail screen; the official link and "Last verified" date move onto the card), R6, R7, R9, R10, R13 (open only; edit, rename and delete deferred), R15, and R12 for document types other than motivation letters. R1 is reduced from 20 to 10 listings. Each deferred requirement is marked below. The full list stays here so nothing is lost after the demo.

## A. Finding opportunities

### R1. Show a curated list of opportunities (Must)
The home screen lists funded scholarships, internships, and training opportunities relevant to IT and AI students, loaded from a static JSON dataset.

**Done when:** at least 10 real opportunities load from `opportunities.json` (reduced from 20 by D16) and each card shows title, provider, country, level, funding type, and deadline.

### R2. Filter by field, level, funding type, and country (Must)
Users can narrow the list using filters that can be combined.

**Done when:** selecting any combination of the four filters updates the list immediately without reloading, and a "Clear filters" button restores the full list.

### R3. Search by keyword (Must)
Users can type a keyword that matches the title, provider, or summary.

**Done when:** typing "machine learning" returns only listings containing that phrase, and an empty result shows a "No opportunities match" message instead of a blank page.

### R4. Hide or mark closed opportunities (Must)
Opportunities whose deadline has passed are not presented as open.

**Done when:** a listing with a deadline before today's date is hidden by default, and a "Show closed" toggle displays it labelled "Closed".

### R5. Show opportunity details with the official link (Must)
_Deferred after demo night (D16)._
Each opportunity has a detail view with requirements and a link to the funder's official page.

**Done when:** clicking a card opens its detail screen showing summary, requirements, deadline, the official application link (opening in a new tab), and a "Last verified" date.

### R5a. Show only opportunities the user can apply to (Must)
Users pick their nationality from the 22 Arab League countries, and the list shows only opportunities open to that nationality (D11).

**Done when:** a "My nationality" selector on the Opportunities screen lists the 22 Arab League countries with Jordan selected by default; choosing a nationality hides every listing whose `eligibleNationalities` is neither `["ALL"]` nor includes that code; the choice is still selected after reloading the page; and the detail screen shows a "Who can apply" line, with "Not open to <nationality> applicants" when the chosen nationality isn't eligible.

### R6. Sort by deadline (Should)
_Deferred after demo night (D16)._
**Done when:** a sort control orders listings by nearest deadline first, and the order is correct for all 20+ listings.

### R7. Save opportunities to a shortlist (Should)
_Deferred after demo night (D16)._
**Done when:** a "Save" button on a card or detail screen adds it to the shortlist in My Space, and the shortlist survives a page reload.

## B. Motivation letter assistant

### R8. Draft a letter with AI (Must)
Users can ask the assistant to draft a motivation letter from a few inputs: target opportunity, field, and key points about themselves.

**Done when:** filling the inputs and clicking "Generate" returns an editable draft within 20 seconds, and the user can edit it freely in the editor.

### R9. Improve an existing letter (Must)
_Deferred after demo night (D16)._
Users can paste a letter and ask the assistant to improve it.

**Done when:** pasting a letter and clicking "Improve" returns a revised version alongside the original, and the user chooses which one to keep.

### R10. Start a letter from an opportunity (Should)
_Deferred after demo night (D16)._
**Done when:** a "Write letter for this" button on the detail screen opens the assistant with that opportunity's title and provider already filled in.

### R11. Handle AI failures gracefully (Must)
**Done when:** if the AI service is unavailable or the free quota is used up, the user sees a clear message ("The assistant is busy, try again in a few minutes"), and any text already in the editor is not lost.

## C. Personal document space (local)

### R12. Save documents in the browser (Must)
_Demo night: motivation letters only. Other types come with New document after the demo (D16, D17)._
Users can save letters and other text documents with a title. They are stored in the browser's local storage.

**Done when:** a saved document is still there after closing and reopening the browser on the same device.

### R13. View, edit, rename, and delete documents (Must)
_Demo night: view only. Edit, rename and delete are deferred (D16)._
**Done when:** My Space lists all saved documents with title and last-edited date, and each can be opened, edited, renamed, and deleted (with a confirmation step before deleting).

### R14. Export and import a backup (Must)
Because local storage can be lost, users can download all their documents as one file and restore it.

**Done when:** "Export" downloads a single `.json` file containing every document, the shortlist, and the chosen nationality. "Import" on another browser restores them all without creating duplicates.

### R15. Download a single letter (Should)
_Deferred after demo night (D16)._
**Done when:** any document can be downloaded as a `.txt` file named after its title.

## D. Must never

### R16. Never require an account or collect personal details (Must)
**Done when:** every feature works without sign-up, and no form asks for an email, phone number, or password.

### R17. Never store documents on a server (Must)
**Done when:** the only time document text leaves the browser is when the user clicks Generate or Improve, and network inspection confirms no other request contains it.

### R18. Never send text to the AI without telling the user (Must)
The free-tier AI provider may use submitted text to improve its products (see `decisions.md`, D5).

**Done when:** the assistant screen shows a visible notice before first use stating that text sent to the assistant goes to a third-party AI service, and advising the user not to include ID numbers, phone numbers, or addresses.

### R19. Never expose the AI API key in the browser (Must)
**Done when:** the key exists only as a server-side environment variable, and searching the deployed site's source finds no key.

### R20. Never present an opportunity without a source (Must)
**Done when:** every entry in `opportunities.json` has an official URL and a "last verified" date, and a check script fails if any entry is missing either.

### R21. Never charge users or show ads (Must)
**Done when:** no payment, subscription, or ad component exists in the code.

## E. Quality

### R22. Works on mobile and desktop (Must)
**Done when:** all screens are usable without horizontal scrolling at 375px width and on a standard laptop screen.

### R23. Data is lost only by user choice (Must)
**Done when:** My Space shows a visible reminder that documents live only in this browser, with a link to Export.
