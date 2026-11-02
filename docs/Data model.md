# Data Model

Two places hold data:

1. **`data/opportunities.json`**: static, public, part of the repo. Edited by the developer only.
2. **Browser `localStorage`**: private to each user's browser. Holds documents and the shortlist.

Nothing is stored on a server.

## 1. Opportunity (static JSON)

| Field | Type | Required | Example / notes |
|---|---|---|---|
| `id` | string | yes | `"daad-epos-2027"`, unique and lowercase with hyphens |
| `title` | string | yes | `"DAAD EPOS Master's Scholarship"` |
| `provider` | string | yes | `"DAAD"` |
| `type` | enum | yes | `"scholarship"` \| `"internship"` \| `"training"` |
| `level` | enum | yes | `"masters"` \| `"phd"` \| `"internship"` \| `"training"` |
| `fields` | string[] | yes | `["ai", "computer-science", "data-science"]` |
| `funding` | enum | yes | `"full"` \| `"partial"` |
| `country` | string | yes | `"Germany"` |
| `deadline` | string (ISO date) | yes | `"2027-01-15"`. Use `null` only for rolling deadlines |
| `summary` | string | yes | 1 to 3 sentences, written in our own words |
| `requirements` | string[] | yes | `["Bachelor's degree", "IELTS 6.5"]` |
| `officialUrl` | string (URL) | yes | The funder's own page, not an aggregator |
| `lastVerified` | string (ISO date) | yes | Date the developer last checked the official page |

**Allowed `fields` values:** `ai`, `computer-science`, `data-science`, `software-engineering`, `cybersecurity`, `information-technology`. Keep this list fixed so filters stay predictable.

**Rule:** a check script (`npm run check-data`) fails if any required field is missing, a date is invalid, or an `id` is duplicated (R20).

## 2. Document (localStorage)

Key: `sof.v1.documents`. Value: a JSON array of documents.

| Field | Type | Notes |
|---|---|---|
| `id` | string | Generated with `crypto.randomUUID()` |
| `title` | string | Set by the user, max 100 characters |
| `kind` | enum | `"motivation-letter"` \| `"cv-text"` \| `"other"` |
| `content` | string | Plain text |
| `opportunityId` | string \| null | Links to an Opportunity if the letter was written for one |
| `createdAt` | string (ISO datetime) | |
| `updatedAt` | string (ISO datetime) | Used for "last edited" and import merging |

## 3. Shortlist (localStorage)

Key: `sof.v1.shortlist`. Value: a JSON array of opportunity `id` strings, for example `["daad-epos-2027", "mitacs-gri-2027"]`.

If an `id` no longer exists in `opportunities.json`, it is silently skipped when displayed.

## 4. Backup file (export/import)

```json
{
  "app": "scholarship-opportunity-finder",
  "schemaVersion": 1,
  "exportedAt": "2026-11-20T18:30:00Z",
  "documents": [ /* Document[] */ ],
  "shortlist": [ /* string[] */ ]
}
```

**Import rule:** documents are matched by `id`. If an `id` already exists, keep the version with the later `updatedAt`. Never create duplicates (R14).

## Limits

- `localStorage` holds about 5 MB per site. Plain-text letters are a few KB each, so hundreds fit.
- If a save fails because storage is full, show an error and prompt the user to export and delete old documents.
- The `v1` in the keys allows a future format change without breaking old data.