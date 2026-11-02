# Plan

Weeks 1 to 3 covered problem framing, research, rules, and planning documents. Weeks 4 to 8 are for building, testing, and the demo.

Per `workflow.md`, `main` is frozen for features from week 7. All Must features need to be merged by the end of week 6.

## Week 4: Foundations and the opportunity list

- [ ] Set up Vite, Netlify, and the folder structure from `rules.md`
- [ ] Connect GitHub to Netlify and confirm deploy previews work (staging)
- [ ] Add the first 20 verified opportunities to `opportunities.json`
- [ ] Write `scripts/check-data.js` (R20)
- [ ] Build S1: list, cards, hide closed listings (R1, R4)
- [ ] Talk to 2 or 3 students and time one baseline search session

**End-of-week check:** the production URL shows 20 real opportunities, with no closed ones visible.

## Week 5: Filters, detail, and My Space

- [ ] Filters, search, and clear filters (R2, R3)
- [ ] S2 Opportunity Detail (R5)
- [ ] `storage.js` with unit tests
- [ ] S4 My Space: save, list, edit, rename, delete (R12, R13)
- [ ] Export and import backup (R14), plus the storage reminder (R23)

**End-of-week check:** a document saved in one browser can be exported and restored in another.

## Week 6: Letter assistant

- [ ] Netlify function `letter.js` with input limits and no content logging (R19, rules 12 and 15)
- [ ] S3 Draft mode (R8) and Improve mode (R9)
- [ ] Privacy notice (R18) and error handling (R11)
- [ ] Save from the assistant to My Space
- [ ] S5 About & Privacy

**End-of-week check:** all Must requirements are merged into `main`.

## Week 7: Feature freeze, testing with students

- [ ] Test sessions with at least 5 IT/AI students: time their search, watch them draft and save a letter
- [ ] Check every "done when" line in `requirements.md` and mark each pass or fail
- [ ] Fix bugs only (`fix/*` branches)
- [ ] Recheck every opportunity's deadline and official link

## Week 8: Polish and demo night

- [ ] Fix the remaining bugs from testing
- [ ] Mobile check at 375px (R22) and keyboard-only check
- [ ] Prepare the demo script: filter, open detail, write a letter, save, export
- [ ] Tag the demo version `v1.0`
- [ ] Update `progress.md` and `README.md` (status: complete)

## Should features

Build R6 (sort), R7 (shortlist), R10 (letter from opportunity), and R15 (download .txt) only when the week's Must items are done.

## Proposed cut order if behind schedule

Cut from the top first:

1. R15 Download a single letter
2. R10 Start a letter from an opportunity
3. R7 Shortlist
4. R6 Sort by deadline
5. R9 Improve mode (keep Draft mode only)

The core demo flow (R1 to R5, R8, R11 to R14, and the Must-nevers) is never cut.

_This order is proposed. Confirm it and record it in `brief.md`, risk 7._