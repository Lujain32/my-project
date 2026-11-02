# Architecture

A static web app with one small serverless function. No database and no user accounts.

```
┌──────────────────────── User's browser ────────────────────────┐
│                                                                 │
│   Static site (HTML / CSS / JavaScript)                         │
│     ├── Opportunities, Detail ──reads──▶ /data/opportunities.json│
│     ├── My Space ──reads/writes──▶ localStorage                  │
│     │                              (documents, shortlist)        │
│     └── Letter Assistant ──POST /api/letter──┐                   │
│                                              │                   │
└──────────────────────────────────────────────┼───────────────────┘
                                               ▼
                         ┌──────────────────────────────────────┐
                         │ Netlify Function: /api/letter        │
                         │  - holds the AI API key (env var)    │
                         │  - validates input length            │
                         │  - builds the prompt                 │
                         │  - returns the draft text only       │
                         └──────────────────┬───────────────────┘
                                            ▼
                               Gemini API (free tier)
```

## Components

| Component | Responsibility |
|---|---|
| **Static site** | All screens, filtering, search, and rendering. Runs entirely in the browser. |
| **`opportunities.json`** | The curated dataset, shipped with the site and fetched once on load. |
| **`storage.js`** | The only module that touches `localStorage`. Handles save, load, delete, export, and import. |
| **`api/letter` function** | Keeps the API key off the browser (R19). Accepts `{ mode, inputs }`, calls the AI, and returns `{ text }`. Logs nothing about the letter content. |
| **Gemini API** | Generates and improves letters. |

## Key flows

**Find an opportunity:** load the JSON, hide closed listings, apply filters and search in memory, and render the cards.

**Draft a letter:** the user fills in the inputs and clicks Generate. The browser sends a POST to `/api/letter`, the function calls Gemini, and the text comes back into the editor. Nothing is saved until the user clicks Save.

**Save a document:** `storage.js` writes the updated array to `sof.v1.documents`. No network call is made.

**Backup:** Export serializes documents and the shortlist into a `.json` download. Import reads the file, validates `app` and `schemaVersion`, and merges by `id`.

## Environments

| Environment | How |
|---|---|
| `dev` | `netlify dev` locally, which runs the site and function together, with a dev API key in `.env` |
| `staging` | Netlify deploy preview, created automatically for every pull request |
| `production` | Netlify production deploy from `main` |

## What this design gives up

- **No cross-device access.** Documents stay in one browser, and backup files are the workaround.
- **No usage data.** There is no analytics or server logging of content, so measuring success relies on student testing sessions.
- **One external dependency.** If the Gemini free quota runs out, the assistant pauses (R11), but the rest of the app keeps working.