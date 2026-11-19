# 01. Project skeleton, and Netlify with staging

**Priority:** Must · **Requirements:** R19, R22, D3, D4, D16, D18 · **Depends on:** None · **Size:** M (about 3 h)

## Why

Nothing exists yet. Every later ticket needs a project to add to, a page that loads, and a `staging` URL to test on before merging (`workflow.md`). This is the boring one, and it comes first on purpose.

## Done when

- [ ] `npm run dev` starts the site locally with Vite, and `netlify dev` runs the site and functions together.
- [ ] The folders from `rules.md` (rule 5) exist: `/src`, `/data`, `/netlify/functions`, `/scripts`, `/tests`.
- [ ] The data file is named `data/opportunities.json` (lowercase `.json`), the name every document and the code use.
- [ ] A hash router shows three placeholder screens at `#/`, `#/assistant`, and `#/space`, each with its heading only (D16: Detail and About are not built for demo night).
- [ ] Every screen has the navigation bar with the name **Scholaroo** on the left and Opportunities · Letter Assistant · My Space (D18), and the current screen is marked with bold, an underline and `aria-current`, not by color alone.
- [ ] The page `<title>` is "Scholaroo".
- [ ] Any unknown route shows "Page not found" with a link to Opportunities.
- [ ] A "Skip to content" link exists, and focus moves to the main area when the screen changes.
- [ ] The repo is connected to Netlify, `main` deploys to the production URL, and opening a pull request creates a deploy preview (staging).
- [ ] `.env` is in `.gitignore`, and `GEMINI_API_KEY` is set in Netlify's environment variables with a different key from the local one.
- [ ] Vitest runs with `npm test` (one sample test passes).
- [ ] The production URL is added to `README.md`.
- [ ] No horizontal scrolling at 375px width.

## Touches

- `package.json`, `vite.config.js`, `netlify.toml`, `.gitignore`, `.env.example` (all new)
- `index.html` (new)
- `src/main.js`, `src/router.js`, `src/screens/placeholders.js`, `src/styles.css` (new)
- `data/opportunities.json` (renamed)
- `tests/sample.test.js` (new)
- `README.md`
- Netlify dashboard (no code)
