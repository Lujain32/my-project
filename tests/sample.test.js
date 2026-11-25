import { describe, it, expect } from 'vitest';
import { getPath, matchRoute } from '../src/router.js';
import { opportunitiesScreen } from '../src/screens/opportunities.js';
import { assistantScreen, spaceScreen, notFoundScreen } from '../src/screens/placeholders.js';

describe('getPath', () => {
  it('treats an empty hash as the home screen', () => {
    expect(getPath('')).toBe('/');
    expect(getPath('#')).toBe('/');
  });

  it('removes the # from the start of the hash', () => {
    expect(getPath('#/space')).toBe('/space');
  });
});

describe('matchRoute', () => {
  it('finds each of the three screens', () => {
    expect(matchRoute('/')).toBe(opportunitiesScreen);
    expect(matchRoute('/assistant')).toBe(assistantScreen);
    expect(matchRoute('/space')).toBe(spaceScreen);
  });

  it('shows Page not found for an unknown path', () => {
    expect(matchRoute('/nothing-here')).toBe(notFoundScreen);
    expect(matchRoute('/space/')).toBe(notFoundScreen);
  });
});
