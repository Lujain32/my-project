# 03. Letter Assistant: the letter function and Draft mode

**Priority:** Must · **Requirements:** R8, R19, D5, D10, D12, D14, D19, rules 2, 12, 13, 15 · **Depends on:** 01 · **Size:** L (about 5 h)

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

- [ ] `#/assistant` shows a tab bar with one **Draft** tab, and three labelled inputs, each with a one-line hint: target opportunity (required), field (optional), and key points about you (required) (D19).
- [ ] The key points hint includes "Don't include ID numbers, phone numbers, or addresses." (D19).
- [ ] Sending without a field works, and the letter is still generated.
- [ ] **Generate** is disabled until target opportunity and key points are filled in.
- [ ] While waiting, the button reads "Writing…", the status line reads "The assistant is writing your letter. This can take up to 10 seconds.", and the inputs keep their text (`design.md`, S3 Loading).
- [ ] The reply appears in an editable text area within 10 seconds on staging.
- [ ] The inputs are not written to `localStorage` (D14).
- [ ] **Copy** copies the editor text, and stays disabled while the editor is empty. _(Save to My Space comes with ticket 04, so there is no Save button yet.)_
- [ ] If anything fails, one plain message shows above the editor: "Something went wrong. Your text is safe. Please try again." The inputs and editor keep their text. _(Ticket 07 splits it into the separate messages in `design.md`.)_
- [ ] Works with keyboard only, and at 375px width.

## Touches

- `netlify/functions/letter.js` (new)
- `src/screens/assistant.js` (new, replaces the placeholder)
- `src/lib/letter-client.js` (new: `fetch` to `/api/letter`)
- `src/main.js`, `src/screens/placeholders.js`, `src/styles.css` (three color tokens)
- `src/styles/assistant.css` (new: this screen's styles, rule 6)
- `src/router.js`, `tests/sample.test.js` (one import line each)
- `tests/letter.test.js` (new)
- Netlify environment variables (check only)

## Answers to questions raised while planning (26 Nov 2026)

- **No Save button yet.** Saving is ticket 04. A button that looks ready but does nothing would be unfinished work presented as finished.
- **One general error message for now.** The five specific messages are ticket 07, but the screen must not fail silently, so any failure shows one plain message and keeps the user's text.
- **No first-use privacy notice yet.** That's ticket 07. This ticket has the personal-details warning under Key points (D19).
- **`/api/letter` is set inside `letter.js`** (`export const config = { path: '/api/letter' }`), so `netlify.toml` doesn't change.
- **Model: `gemini-3.1-flash-lite`.** Google's model list includes it and the pricing page lists it as free. Check in AI Studio that the project's key can use it.
- **Tests were added** (`tests/letter.test.js`): 400 for missing input, 413 above 4,000 characters, no Gemini call when input is missing, and the reply passed back.
- **Extra status codes:** besides D12's 400, 413, 429 and 504, the function returns 405 for a request that isn't POST, 500 when the key is missing, and 502 when Gemini answers with any other error.

## Changes after testing (26 Nov 2026)

- **The first real letter broke rule 13.** Given only "CIS graduate, GPA 88%, multiple AI projects", it added skills and tasks the student never mentioned ("machine learning algorithms, data analysis", "optimize model performance", "proven experience"). The cause was the prompt's 250-word minimum: with few facts, the model filled the length by inventing. The minimum was removed and the "never invent" list now names skills, tools, tasks and results. This reduces invention but can't guarantee none, so the letter stays an editable draft (rule 14).
- **Lowering temperature to 0.4 caused timeouts (504).** Google's Gemini 3 guide recommends keeping the default of 1.0 and warns lower values can make the model loop. Temperature is back to the default; thinking is set to `minimal` and output is capped at 800 tokens so replies fit inside 9 seconds.

