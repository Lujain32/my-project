# 12. About & Privacy screen

**Priority:** Must · **Requirements:** R16, R17, R18, R21 · **Depends on:** None · **Size:** S (about 1.5 h)

## Why

Students are trusting the site with their letters. This explains in plain words what's stored, where, and what goes to the AI.

## Done when

- [ ] `#/about` has five short sections: What this is, Where the listings come from, Where your documents are kept, What the assistant sends, and Backing up and deleting your data (design.md, S5).
- [ ] The text matches how the code behaves: browser-only storage, no accounts, only Generate and Improve send text, and the Gemini free-tier note.
- [ ] It links to My Space for Export.
- [ ] No images, tracking, or third-party content.
- [ ] R17 check: with the browser's network tab open, go through save, edit, export and import. No request contains document text. Only Generate and Improve send text, to `/api/letter`.

## Touches

- `src/screens/about.js` (new)
- `src/main.js`
- `src/screens/placeholders.js`

