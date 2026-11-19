# 03. Letter Assistant: the letter function and Draft mode

**Priority:** Must · **Requirements:** R8, R19, D5, D10, D12, D14, rules 2, 12, 13, 15 · **Depends on:** 01 · **Size:** L (about 5 h)

## Why

Drafting a letter is the core of the product (D9, D10). Nothing works without the server function that holds the API key, so this ticket builds the function and the Draft tab together, so the main flow can be demoed early.

## Done when

**The function**

- [ ] `netlify/functions/letter.js` answers `POST /api/letter` with `{ "mode": "draft", "inputs": { "opportunity", "field", "keyPoints" } }` and returns `{ "text": "..." }`.
- [ ] It reads the key from `GEMINI_API_KEY` only. Searching the deployed site's JavaScript for the key finds nothing (R19).
- [ ] Input over 4,000 characters in total returns status 413, and a missing `opportunity` or `keyPoints` returns 400 (rule 12).
- [ ] The prompt tells the model to write in the user's voice, use only the facts given, and never invent achievements, grades or experience (rule 13).
- [ ] Letter content is never logged, on the server or in the browser console (rule 15).
- [ ] `curl -X POST <preview-url>/api/letter` with test input returns JSON with `text` on staging.

**The Draft tab**

- [ ] `#/assistant` shows the Draft tab with three labelled inputs: target opportunity, field, and key points about you.
- [ ] **Generate** is disabled until target opportunity and key points are filled in.
- [ ] While waiting, the button reads "Writing…", the status line reads "The assistant is writing your letter. This can take up to 10 seconds.", and the inputs keep their text (`Design.md`, S3 Loading).
- [ ] The reply appears in an editable text area within 10 seconds on staging.
- [ ] The inputs are not written to `localStorage` (D14).
- [ ] **Copy** copies the editor text. Copy and Save stay disabled while the editor is empty.
- [ ] Works with keyboard only, and at 375px width.

## Touches

- `netlify/functions/letter.js` (new)
- `src/screens/assistant.js` (new, replaces the placeholder)
- `src/lib/letter-client.js` (new: `fetch` to `/api/letter`)
- `src/main.js`, `src/screens/placeholders.js`, `src/styles.css`
- Netlify environment variables (check only)
