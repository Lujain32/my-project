# Tools

What an AI model working on this project may do on its own, what it must ask about first, and what it must never do. Set during Task 05 (26 Nov 2026).

## Allowed without asking

- Read any file in the repository.
- Run `npm test`, `npm run build`, `npm run dev` and `netlify dev`.
- Run read-only git commands: `git status`, `git diff`, `git log`, `git branch`.
- Create or edit the files listed in the current ticket's **Touches**.
- Write tests for the code the ticket changes.

## Ask first

- **Add, remove or upgrade a package.** Every package I approve goes in `decisions.md`, dated (rule 4).
- **Touch any file not in the ticket's Touches.** If the plan needs it, the ticket is updated in writing first.
- **Change anything in `docs/`**: rules, decisions, requirements, design, the ticket itself.
- **Change `netlify.toml`, `.gitignore` or `package.json` scripts.**
- **Change `data/opportunities.json`.** Values must come from the official page (rules 8 and 11a).
- **Delete a file.**
- **Commit or push.** I make every commit myself, after reading the change.

## Never

- **Push or commit to `main`.** Every change reaches `main` through a pull request that I review and merge (`workflow.md`).
- **Merge a pull request.** Merging is mine, after the fresh-chat review.
- **Put a secret anywhere in the code, a commit, a chat or a log.** The Gemini key lives only in `.env` (local, ignored by git) and Netlify's environment variables (rule 3, R19).
- **Log or store letter content** on a server or in the browser console (rule 15).
- **Skip, delete or weaken a test to make it pass.**
- **Deploy to production by hand** (`netlify deploy --prod`). Production updates only from `main` (D22).
- **Add a paid service, ads or tracking** (R21, rule 16).
- **Force-push or rewrite git history.**
- **Load anything from another site** in the page: fonts, scripts or images (rule 16).
