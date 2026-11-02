# Stack

Every choice is free and fits a JavaScript mentorship track.

| Layer | Choice | Why | Cost |
|---|---|---|---|
| Language | JavaScript (ES modules) | Required by the track, and runs in the browser and in Netlify Functions | Free |
| UI | Plain HTML, CSS, and JavaScript (no framework) | Five screens don't need React. Fewer tools to learn in 8 weeks | Free |
| Build / dev server | Vite | Fast local server and a simple production build | Free |
| Styling | Plain CSS with custom properties | No dependency. Mobile-first layout | Free |
| Data | Static `opportunities.json` in the repo | No database to run or pay for (D2) | Free |
| Browser storage | `localStorage`, accessed only via `storage.js` | Simple key-value storage, enough for text documents (D1) | Free |
| Hosting | Netlify (free plan) | Static hosting, deploy previews for staging, and serverless functions in one place (D4) | Free |
| Server code | Netlify Functions (Node.js) | Keeps the AI API key secret (R19) | Free within plan limits |
| AI | Google Gemini API, free tier (a Flash model) | A standing free tier with no expiry (D5) | Free, but see the data note |
| Version control | Git and GitHub (`Lujain32/my-project`) | Required, and follows `workflow.md` | Free |
| Data check | Small Node script (`npm run check-data`) | Validates the dataset (R20) | Free |
| Testing | Manual test checklist plus a few unit tests with Vitest for `storage.js` and filtering | Covers the logic most likely to break | Free |

## Data note on the AI tier

Google states that content sent to the Gemini API **free tier** may be used to improve its products and may be read by human reviewers. This applies outside the EEA, Switzerland, and the UK. Paid-tier content is not used this way. That's why R18 requires a visible notice and advises users not to include personal identifiers.

## Things to verify before week 4 ends

- [ ] Current Gemini free-tier rate limits for the chosen model (Google doesn't publish them prominently, so check AI Studio)
- [ ] Netlify free-plan limits for function invocations and build minutes
- [ ] That Netlify deploy previews work on the free plan for this repo