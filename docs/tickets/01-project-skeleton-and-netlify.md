# 01. Project skeleton, and Netlify with staging

**Priority:** Must · **Requirements:** R19, R22, D3, D4, D16, D18, D21 · **Depends on:** None · **Size:** M (about 3 h)

## Why

Nothing exists yet. Every later ticket needs a project to add to, a page that loads, and a `staging` URL to test on before merging (`workflow.md`). This is the boring one, and it comes first on purpose.

## Done when

- [ ] `npm run dev` starts the site locally with Vite, and `netlify dev` runs the site through Netlify's local server (no functions exist yet; ticket 03 adds the first one).
- [ ] The folders from `rules.md` (rule 5) exist: `/src`, `/data`, `/netlify/functions`, `/scripts`, `/tests`. Empty folders hold a `.gitkeep` file so git keeps them.
- [ ] The data file is named `data/opportunities.json` (lowercase `.json`). _Already true before this ticket; nothing to change._
- [ ] A hash router shows three placeholder screens at `#/`, `#/assistant`, and `#/space`, each with its heading only (D16: Detail and About are not built for demo night).
- [ ] Every screen has the navigation bar with the Scholaroo logo (`public/logo.png`, `alt="Scholaroo"`) on the left and Opportunities · Letter Assistant · My Space (D18), and the current screen is marked with bold, an underline and `aria-current`, not by color alone.
- [ ] The page `<title>` is "Scholaroo".
- [ ] Any unknown route shows "Page not found" with a link to Opportunities.
- [ ] A "Skip to content" link exists, and focus moves to the main area when the screen changes.
- [ ] Nothing is loaded from another site: no web fonts, scripts or images from outside the project (rule 16). Text uses the fonts already on the device.
- [ ] The repo is connected to Netlify, `main` deploys to the production URL, and opening a pull request creates a deploy preview (staging).
- [ ] `.env` is in `.gitignore`, and `GEMINI_API_KEY` is set in Netlify's environment variables with a different key from the local one.
- [ ] Vitest runs with `npm test` (one sample test passes).
- [ ] The production URL is added to `README.md`.
- [ ] No horizontal scrolling at 375px width.

## Touches

- `package.json`, `package-lock.json`, `netlify.toml`, `.gitignore`, `.env.example` (all new)
- `index.html` (new)
- `public/logo.png` (new)
- `src/main.js`, `src/router.js`, `src/screens/placeholders.js`, `src/styles.css` (new)
- `scripts/.gitkeep`, `netlify/functions/.gitkeep` (new, empty)
- `tests/sample.test.js` (new)
- `README.md`
- `docs/decisions.md` (D21)
- Netlify dashboard (no code)

## Answers to questions raised while planning (23 Nov 2026)

- **No `vite.config.js`.** Vite works without one, so the file was removed from Touches.
- **`.gitkeep` files** were added, because git doesn't keep empty folders.
- **The logo is part of this ticket**, as `public/logo.png`, since the design now uses it (D18 named the platform).
- **No web fonts.** The design system names Inter from Google Fonts, but rule 16 forbids third-party content, so text uses the device's own fonts.
- **`netlify-cli` is installed on the developer's computer only** (`npm install -g netlify-cli`), not inside the project (D21).
- **`package-lock.json`** is added: `npm install` creates it, and it records the exact package versions.
