import { describe, it, expect } from 'vitest';
import {
  daysUntil,
  deadlineText,
  isClosed,
  isClosingSoon,
  canApply,
  visibleOpportunities,
} from '../src/lib/opportunities.js';

// A fixed "today", so the tests give the same answer on any day.
const TODAY = new Date(2026, 10, 26); // 26 Nov 2026 (months start at 0)

function listing(deadline, eligibleNationalities = ['ALL']) {
  return { deadline, eligibleNationalities };
}

describe('deadline text', () => {
  it('describes each kind of deadline', () => {
    expect(deadlineText(listing(null), TODAY)).toBe('Rolling deadline');
    expect(deadlineText(listing('2026-11-25'), TODAY)).toBe('Closed');
    expect(deadlineText(listing('2026-11-26'), TODAY)).toBe('Closes today');
    expect(deadlineText(listing('2026-11-27'), TODAY)).toBe('Closes tomorrow');
    expect(deadlineText(listing('2026-12-04'), TODAY)).toBe('Closes in 8 days');
  });

  it('counts days across a month end', () => {
    expect(daysUntil('2026-12-01', TODAY)).toBe(5);
  });
});

describe('closed check', () => {
  it('is closed only after the deadline day', () => {
    expect(isClosed(listing('2026-11-25'), TODAY)).toBe(true);
    expect(isClosed(listing('2026-11-26'), TODAY)).toBe(false);
    expect(isClosed(listing(null), TODAY)).toBe(false);
  });
});

describe('closing soon (D18)', () => {
  it('includes 0 and 10 days away, and not 11', () => {
    expect(isClosingSoon(listing('2026-11-26'), TODAY)).toBe(true); // 0 days
    expect(isClosingSoon(listing('2026-12-06'), TODAY)).toBe(true); // 10 days
    expect(isClosingSoon(listing('2026-12-07'), TODAY)).toBe(false); // 11 days
  });

  it('is never true for closed or rolling deadlines', () => {
    expect(isClosingSoon(listing('2026-11-25'), TODAY)).toBe(false);
    expect(isClosingSoon(listing(null), TODAY)).toBe(false);
  });
});

describe('nationality filter', () => {
  it('lets anyone apply to ["ALL"]', () => {
    expect(canApply(listing(null, ['ALL']), 'MR')).toBe(true);
  });

  it('checks the code against the list', () => {
    expect(canApply(listing(null, ['JO', 'EG']), 'JO')).toBe(true);
    expect(canApply(listing(null, ['JO', 'EG']), 'SA')).toBe(false);
  });

  it('hides closed listings unless Show closed is on', () => {
    const list = [listing('2027-01-15', ['JO']), listing('2026-11-01', ['JO']), listing(null, ['SA'])];
    expect(visibleOpportunities(list, { nationality: 'JO', showClosed: false, today: TODAY })).toHaveLength(1);
    expect(visibleOpportunities(list, { nationality: 'JO', showClosed: true, today: TODAY })).toHaveLength(2);
  });
});
