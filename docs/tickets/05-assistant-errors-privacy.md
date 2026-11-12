# 05. Assistant error messages and privacy notice

**Priority:** Must · **Requirements:** R11, R18, rule 18 · **Depends on:** 02 · **Size:** S (about 2 h)

## Why

The free tier can be busy or slow, and the 10-second limit means timeouts will happen. Users must never lose their text when that happens. The privacy notice is required before anyone sends text to Google (D5).

## Done when

- [ ] Before first use, the full privacy notice shows with a **Got it** button. After dismissing it, a short version stays visible on S3. Dismissal is remembered via `storage.js`.
- [ ] Each failure shows its message from design.md (S3 Error): busy, timeout, too long, missing input, offline.
- [ ] After any error, the inputs and any editor text are unchanged.
- [ ] The browser gives up after 12 seconds even if the function hasn't answered, and shows the timeout message.
- [ ] Errors are announced to screen readers (`aria-live`).
- [ ] Unit tests in `tests/letter-client.test.js` cover how each HTTP status maps to its message.

## Touches

- `src/screens/assistant.js`
- `src/lib/letter-client.js`
- `src/storage.js` (one pref for the dismissed notice)
- `tests/letter-client.test.js` (new)

