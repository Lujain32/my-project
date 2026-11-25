import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// A pretend localStorage that keeps values in an object.
function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
  };
}

// A localStorage that fails, like some private browsing modes.
const blockedStorage = {
  getItem: () => {
    throw new Error('blocked');
  },
  setItem: () => {
    throw new Error('blocked');
  },
};

// storage.js keeps a value in memory, so each test loads a fresh copy.
async function loadStorage() {
  vi.resetModules();
  return import('../src/storage.js');
}

beforeEach(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getPrefs and setPrefs', () => {
  it('defaults to Jordan when nothing is saved', async () => {
    vi.stubGlobal('localStorage', fakeStorage());
    const { getPrefs } = await loadStorage();
    expect(getPrefs().nationality).toBe('JO');
  });

  it('remembers the chosen nationality', async () => {
    vi.stubGlobal('localStorage', fakeStorage());
    const { getPrefs, setPrefs } = await loadStorage();
    expect(setPrefs({ nationality: 'EG' })).toBe(true);
    expect(getPrefs().nationality).toBe('EG');
  });

  it('falls back to Jordan for an unknown saved value', async () => {
    vi.stubGlobal('localStorage', fakeStorage({ 'sof.v1.prefs': '{"nationality":"XX"}' }));
    const { getPrefs } = await loadStorage();
    expect(getPrefs().nationality).toBe('JO');
  });

  it('falls back to Jordan when the saved text is broken', async () => {
    vi.stubGlobal('localStorage', fakeStorage({ 'sof.v1.prefs': 'not json' }));
    const { getPrefs } = await loadStorage();
    expect(getPrefs().nationality).toBe('JO');
  });

  it('still works for this visit when storage is blocked', async () => {
    vi.stubGlobal('localStorage', blockedStorage);
    const { getPrefs, setPrefs } = await loadStorage();
    expect(getPrefs().nationality).toBe('JO');
    expect(setPrefs({ nationality: 'MA' })).toBe(false);
    expect(getPrefs().nationality).toBe('MA');
  });
});
