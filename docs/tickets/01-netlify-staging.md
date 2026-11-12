# 01. Connect Netlify and set up staging

**Priority:** Must · **Requirements:** R19, D4 · **Depends on:** None · **Size:** S (about 1 h)

## Why

Every later ticket is checked on `staging` before merging (`workflow.md`), and the letter assistant can't run anywhere except locally until the Netlify function has its API key. This unblocks tickets 02 to 08.

## Done when

- [ ] The repo is connected to a Netlify site, and `main` deploys to the production URL.
- [ ] Opening a pull request creates a deploy preview (staging) automatically.
- [ ] `GEMINI_API_KEY` is set in Netlify's environment variables, and it's a different key from the one in your local `.env`.
- [ ] `curl -X POST <preview-url>/api/letter -d '{"mode":"draft","inputs":{"opportunity":"Test","keyPoints":"Test"}}'` returns JSON with `text`.
- [ ] Searching the deployed site's JavaScript for the key finds nothing (R19).
- [ ] The production URL is added to `README.md`.

## Touches

- `netlify.toml` (only if a setting needs fixing)
- `README.md`
- Netlify dashboard (no code)

