# 08. Letter Assistant: Improve mode

**Priority:** Must (4th to cut) · **Requirements:** R9 · **Depends on:** 05 · **Size:** M (about 3 h)

## Why

Many students already have a draft. Improving it uses the same function and is the second half of the assistant. It's last in the cut order, so the demo survives without it.

## Done when

- [ ] S3 has **Draft** and **Improve** tabs, which can be reached by keyboard.
- [ ] In Improve, pasting a letter and pressing **Improve** returns a revised version.
- [ ] "Your version" and "Suggested version" appear side by side from 768px wide, and stacked below that.
- [ ] Each has **Use this version**, which puts that text in the editor. Nothing is saved until Save.
- [ ] The same loading and error behaviour as Draft (tickets 02 and 05).

## Touches

- `src/screens/assistant.js`
- `src/styles.css`

