# Data Model

Two places hold data:

1. **`data/opportunities.json`**: static, public, part of the repo. Edited by the developer only.
2. **Browser `localStorage`**: private to each user's browser. Holds documents, the shortlist, and the chosen nationality.

Nothing is stored on a server.

## 1. Opportunity (static JSON)

| Field | Type | Required | Example / notes |
|---|---|---|---|
| `id` | string | yes | `"daad-epos-2027"`, unique and lowercase with hyphens |
| `title` | string | yes | `"DAAD EPOS Master's Scholarship"` |
| `provider` | string | yes | `"DAAD"` |
| `level` | enum | yes | `"masters"` \| `"phd"` \| `"internship"` \| `"training"` |
| `fields` | string[] | yes | `["ai", "computer-science", "data-science"]` |
| `funding` | enum | yes | `"full"` \| `"partial"` |
| `country` | string | yes | `"Germany"` |
| `deadline` | string (ISO date) | yes | `"2027-01-15"`. Use `null` only for rolling deadlines |
| `summary` | string | yes | 1 to 3 sentences, written in our own words |
| `requirements` | string[] | yes | `["Bachelor's degree", "IELTS 6.5"]` |
| `officialUrl` | string (URL) | yes | The funder's own page, not an aggregator |
| `lastVerified` | string (ISO date) | yes | Date the developer last checked the official page |
| `eligibleNationalities` | string[] | yes | `["ALL"]` if open to every nationality, otherwise Arab League country codes, e.g. `["JO", "EG", "PS"]`. Copied from the official page (D11) |
| `eligibilityNote` | string \| null | no | Extra eligibility condition from the official page, e.g. `"Graduated within the last 5 years"`. `null` when there is none |

`level` is the only field that says what kind of opportunity it is. There is no separate `type` field (D13).

**Allowed `fields` values:** `ai`, `computer-science`, `data-science`, `software-engineering`, `cybersecurity`, `information-technology`. Keep this list fixed so filters stay predictable.

**Allowed nationality codes** (ISO 3166-1 alpha-2, the 22 Arab League members): `DZ` Algeria, `BH` Bahrain, `KM` Comoros, `DJ` Djibouti, `EG` Egypt, `IQ` Iraq, `JO` Jordan, `KW` Kuwait, `LB` Lebanon, `LY` Libya, `MR` Mauritania, `MA` Morocco, `OM` Oman, `PS` Palestine, `QA` Qatar, `SA` Saudi Arabia, `SO` Somalia, `SD` Sudan, `SY` Syria, `TN` Tunisia, `AE` United Arab Emirates, `YE` Yemen.

`eligibleNationalities` is either exactly `["ALL"]` or a non-empty list of codes from this list. If an official page also allows non-Arab nationalities, only the Arab ones are recorded, because the selector offers only these 22 (D11). The code-to-name list lives in the code (`src/nationalities.js`), not in the data.

**Example entry** (the shape only; the values are illustrative, and real values must come from the official page):

```json
{
  "id": "daad-epos-2027",
  "title": "DAAD EPOS Master's Scholarship",
  "provider": "DAAD",
  "level": "masters",
  "fields": ["computer-science", "ai"],
  "funding": "full",
  "country": "Germany",
  "deadline": "2027-01-15",
  "summary": "Fully funded postgraduate scholarships for professionals from developing countries.",
  "requirements": ["Bachelor's degree", "Two years of work experience", "IELTS 6.5"],
  "officialUrl": "https://www.daad.de/",
  "lastVerified": "2026-10-19",
  "eligibleNationalities": ["JO", "EG", "PS", "LB", "SY", "IQ", "YE", "SD", "MA", "TN", "DZ", "MR"],
  "eligibilityNote": "Applicants must have at least two years of professional experience."
}
```

**Rule:** a check script (`npm run check-data`) fails if any required field is missing, a date is invalid, an `id` is duplicated (R20), `eligibleNationalities` is empty, mixes `"ALL"` with codes, or contains a code not in the list above.

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

## 4. Preferences (localStorage)

Key: `sof.v1.prefs`. Value: a JSON object.

| Field | Type | Notes |
|---|---|---|
| `nationality` | string | One of the 22 codes above. Default `"JO"` when nothing is saved |
| `assistantNoticeDismissed` | boolean | `true` once the user presses **Got it** on the assistant's privacy notice (R18). Default `false` |

- Written when the user changes the nationality selector on S1 (R5a).
- If the saved value isn't one of the 22 codes (old or edited data), the app silently uses `"JO"`.
- If browser storage is blocked, the choice works for the current visit only.

## 5. Backup file (export/import)

```json
{
  "app": "scholarship-opportunity-finder",
  "schemaVersion": 1,
  "exportedAt": "2026-11-20T18:30:00Z",
  "documents": [ /* Document[] */ ],
  "shortlist": [ /* string[] */ ],
  "prefs": { "nationality": "JO", "assistantNoticeDismissed": true }
}
```

**Import rules:**

- Documents are matched by `id`. If an `id` already exists, keep the version with the later `updatedAt`. Never create duplicates (R14).
- Shortlist `id`s are merged. An `id` already in the list is not added twice.
- If the file has `prefs`, each valid value in it replaces the current one. A file without `prefs` (an older backup) leaves the current nationality unchanged, so `schemaVersion` stays `1`.

## Limits

- `localStorage` holds about 5 MB per site. Plain-text letters are a few KB each, so hundreds fit.
- If a save fails because storage is full, show an error and prompt the user to export and delete old documents.
- The `v1` in the keys allows a future format change without breaking old data.
