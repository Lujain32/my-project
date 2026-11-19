# 10. My Space: open, edit, rename, delete, and New document

**Priority:** Must · **Requirements:** R12, R13, D17 · **Depends on:** 07 · **Size:** M (about 4 h)

## Why

Students need to fix and organise what they saved, and to paste their CV text alongside letters (D17). This finishes the document side of the product.

## Done when

- [ ] **New document** opens a form with Title, Type (CV text, Motivation letter, Other), and a text box. **Save** is disabled until title and text are filled in.
- [ ] Leaving the form with unsaved text asks "Leave without saving?"
- [ ] Each document can be opened and edited in an editor with **Save** and **Back to My Space**.
- [ ] **Rename** changes the title (max 100 characters, not empty).
- [ ] **Delete** asks "Delete '<title>'? This can't be undone." and needs a second press to confirm.
- [ ] Every change updates "Edited <date>" and survives a reload.

## Touches

- `src/screens/space.js`
- `src/styles.css`

