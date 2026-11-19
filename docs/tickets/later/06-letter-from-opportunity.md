# 06. "Write a letter for this" from the detail screen

**Priority:** Must · **Requirements:** R10, D10, D15 · **Depends on:** 02, 03 · **Size:** S (about 1.5 h)

## Why

This ties a letter to a specific opportunity, which is the positioning (D9). It's the step that makes the demo flow from finding to applying.

## Done when

- [ ] S2 has a **Write a letter for this** button that opens `#/assistant?for=<id>`.
- [ ] S3 pre-fills target opportunity as "<title> (<provider>)" and field as the first value in `fields` (D15). Both stay editable.
- [ ] A line above the inputs reads "Writing for: <title> (<provider>)".
- [ ] An unknown `for=` id opens an empty Draft with the note "We couldn't find that opportunity, so nothing was pre-filled."
- [ ] The opportunity id is kept so ticket 07 can save it as `opportunityId`.

## Touches

- `src/screens/detail.js`
- `src/screens/assistant.js`

