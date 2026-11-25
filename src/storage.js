import { DEFAULT_NATIONALITY, isKnownNationality } from './nationalities.js';

// Rule 1: this is the only file that touches localStorage.
const PREFS_KEY = 'sof.v1.prefs';

// When the browser blocks storage, the latest choice is kept here instead,
// so it still works for the current visit.
let memoryPrefs = null;

// Only a plain object counts as saved preferences. Anything else
// (a number, a string, a list) is ignored.
function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readSavedPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFS_KEY));
    return isPlainObject(saved) ? saved : {};
  } catch {
    // Storage is blocked, or the saved text isn't valid JSON.
    return {};
  }
}

// Returns the saved preferences. An unknown or missing nationality
// becomes Jordan, with no message (design.md, S1 Error).
export function getPrefs() {
  const saved = memoryPrefs ?? readSavedPrefs();
  const nationality = isKnownNationality(saved.nationality)
    ? saved.nationality
    : DEFAULT_NATIONALITY;
  return { ...saved, nationality };
}

// Saves the preferences. Returns false when the browser blocks storage.
export function setPrefs(prefs) {
  memoryPrefs = prefs;
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    return true;
  } catch {
    return false;
  }
}
