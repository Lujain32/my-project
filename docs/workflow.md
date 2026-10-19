# Development Workflow

Rules for building the Scholarship & Training Opportunity Finder. One developer, 8 weeks, zero cost.

## 1. Branches

| Branch | Purpose | Created from | Merges into |
|---|---|---|---|
| `main` | Always deployable. Reflects what runs in production. | — | — |
| `feature/<short-name>` | New functionality, e.g. `feature/opportunity-filters`, `feature/letter-assistant` | `main` | `main` via pull request |
| `fix/<short-name>` | Bug fixes, e.g. `fix/filter-reset`, `fix/save-letter-error` | `main` | `main` via pull request |

**Rules**

- Never commit directly to `main`.
- Branch names are lowercase, use hyphens, and describe the work in 2 to 4 words.
- One branch = one feature or one fix. Keep branches small enough to merge within a few days.
- Delete a branch after it is merged.
- Before opening a pull request, update the branch with the latest `main` (`git pull origin main`) and resolve any conflicts.

## 2. Commit Messages

Format:

```
type: short description
```

| Type | Use for |
|---|---|
| `feat` | A new feature or user-visible behavior |
| `fix` | A bug fix |
| `docs` | Documentation only (README, brief, workflow) |
| `style` | Formatting or CSS that doesn't change behavior |
| `refactor` | Code restructuring with no behavior change |
| `test` | Adding or changing tests |
| `data` | Changes to the opportunity dataset (JSON) |
| `chore` | Tooling, dependencies, config |

**Rules**

- Description in lowercase, imperative mood, no full stop, under 72 characters.
  - Good: `feat: add field filter to opportunity list`
  - Bad: `Updated stuff.`
- One logical change per commit.
- Never commit secrets (API keys, passwords). They belong in `.env` files, which are listed in `.gitignore`.

## 3. Pull Requests

Every change reaches `main` through a pull request.

**Title:** same format as a commit message, e.g. `feat: save letters to personal space`.

**Description must include:**

1. **What** changed
2. **Why** (link to the brief or an issue if there is one)
3. **How it was tested**, including the steps to check it manually
4. **Screenshots** for any UI change

**Before merging, check:**

- [ ] Branch is up to date with `main`
- [ ] App runs locally without errors
- [ ] Change has been tested on `staging`
- [ ] No secrets, debug logs, or commented-out code left in

**Merge method:** squash and merge, so each pull request becomes one commit on `main` with the PR title as its message.

## 4. Environments

| Environment | Where | Deployed from | Data | Purpose |
|---|---|---|---|---|
| `dev` | Local machine | Any branch | Sample JSON and test documents | Day-to-day building |
| `staging` | Free-tier hosting preview | Pull request branch (preview deploy) | Sample data, test API key | Checking a change in a real hosted setup before merging |
| `production` | Free-tier hosting, public URL | `main` only | Real dataset, production API key | What users and the demo-night audience see |

**Rules**

- Each environment has its own `.env` values. The AI API key is never shared between `dev` and `production`.
- Nothing reaches `production` except through a merge into `main`.
- If `production` breaks, fix it on a `fix/*` branch and follow the normal pull request process. If it's urgent, revert the last merge on `main` first, then fix.
- From week 7, freeze `main` for the demo: bug fixes only, no new features.