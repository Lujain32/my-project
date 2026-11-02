# Project Rules

Git, commit, pull request, and environment rules live in `workflow.md`. This file covers code, data, AI, and privacy rules.

## Code

1. Only `storage.js` reads from or writes to `localStorage`. Every other module calls its functions.
2. Only `netlify/functions/letter.js` calls the AI API. The browser never calls Gemini directly.
3. No secrets in the repo. API keys go in `.env` (local) and Netlify environment variables (deployed). `.env` is in `.gitignore`.
4. No new dependency without a reason written in the pull request description.
5. Folder structure:
   ```
   /docs          project documents
   /data          opportunities.json
   /src           screens, components, storage.js, styles
   /netlify/functions   letter.js
   /scripts       check-data.js
   ```
6. Functions do one thing. Files stay under about 200 lines; split them when they grow.
7. Every user-facing error has a plain-English message. No raw error objects on screen.

## Data

8. Every opportunity comes from the funder's **official page**, not from an aggregator or a Telegram post.
9. Summaries are written in our own words. Never copy paragraphs from the source site.
10. Update `lastVerified` every time an entry is checked. Recheck all entries at least once every 2 weeks.
11. `npm run check-data` must pass before any `data:` commit is merged.

## AI assistant

12. The function rejects input over 4,000 characters.
13. The prompt tells the model to write in the user's voice, use only the facts the user provided, and never invent achievements, grades, or experience.
14. AI output is always shown as an editable draft, never saved automatically.
15. Letter content is never logged, on the server or in the browser console.

## Privacy

16. No analytics, tracking pixels, or third-party scripts.
17. No account, email, or phone collection (R16).
18. The privacy notice (R18) stays on the assistant screen and can't be removed by a code change without updating `decisions.md`.

## Accessibility

19. Every input has a label, buttons have text (not only icons), and color is never the only signal (for example, the "Closed" status also has text).
20. All screens work with keyboard only.