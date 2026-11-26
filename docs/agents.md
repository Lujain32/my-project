# Agents

Which AI model does which kind of work on this project, and how its work is checked. Set during Task 05 (26 Nov 2026).

## The loop for every ticket

1. **Branch** off `main`: `feature/<nn>-<short-name>`.
2. **Context:** give the model four things only: `plan.md`, the ticket, `rules.md` and `workflow.md`, and the files the ticket touches. Nothing else.
3. **Plan first:** the model lists every file it will change, what goes in each, and what's unclear in the ticket. No code until the plan is approved.
4. **Answer in writing:** every unclear point is answered in the ticket itself, under "Answers to questions raised while planning".
5. **Build, then read** in three passes: shape (do the changed files match Touches?), logic (can I explain every line?), edges (no data, bad input, network down, which line breaks first?).
6. **Pull request** with the `workflow.md` template, then a **review in a fresh chat**, then squash and merge.

## Which model for which ticket

| Kind of ticket | Model | Why |
|---|---|---|
| Server code, storage, anything with secrets or user data (letter function, `storage.js`, backup) | Claude Opus | Mistakes here leak data or lose documents, so it gets the strongest model |
| Screens, CSS, wiring a screen into the router | Claude Opus or Sonnet | Lower risk; a faster model is fine, and the reading pass catches layout problems |
| Data curation (`opportunities.json`) | Any model to draft the entry, **me** to copy every value from the official page | Rule 8 and 11a: values must come from the funder's page, not from a model's memory |
| Docs (tickets, decisions, progress) | Any | I check every line against what actually happened |
| **Review** | **A fresh chat**, never the one that wrote the code | See the rule below |

## The review rule

**The chat that wrote the code never reviews it.** A chat that wrote the code defends the code. Every pull request is reviewed in a new chat that gets only the diff, the ticket and `rules.md`, and is asked to say "approve" or "request changes".

This rule earned its place in week 5. The fresh-chat reviews caught two things the building chat missed or overstated:
- Ticket 01: the PR description claimed the skip-link problem was fixed, but the error still happened.
- Ticket 02: `styles.css` had grown to 376 lines, breaking rule 6.

## The AI inside the product

Gemini (`gemini-3.1-flash-lite`, free tier) writes letters for users through `netlify/functions/letter.js`. It's part of the product, not a helper for building it, and its rules are in `rules.md` (rules 12 to 15) and D5.
