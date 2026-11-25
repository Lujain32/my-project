// Small functions about opportunities. None of them touch the page,
// so they can be tested on their own. Every date check takes "today"
// as an input, so tests can pass a fixed date.

const DAY_MS = 24 * 60 * 60 * 1000;

// "2027-01-15" becomes midnight on that day, in the user's own time zone.
export function parseDate(text) {
  const [year, month, day] = text.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Whole days from today to the deadline. Negative once it has passed.
// null for a rolling deadline.
export function daysUntil(deadline, today) {
  if (deadline === null) {
    return null;
  }
  return Math.round((parseDate(deadline) - startOfDay(today)) / DAY_MS);
}

export function isClosed(opportunity, today) {
  const days = daysUntil(opportunity.deadline, today);
  return days !== null && days < 0;
}

// 0 to 10 days away (D18).
export function isClosingSoon(opportunity, today) {
  const days = daysUntil(opportunity.deadline, today);
  return days !== null && days >= 0 && days <= 10;
}

export function deadlineText(opportunity, today) {
  const days = daysUntil(opportunity.deadline, today);
  if (days === null) return 'Rolling deadline';
  if (days < 0) return 'Closed';
  if (days === 0) return 'Closes today';
  if (days === 1) return 'Closes tomorrow';
  return `Closes in ${days} days`;
}

// ["ALL"] means anyone can apply. Otherwise the list holds country codes.
export function canApply(opportunity, nationality) {
  const allowed = opportunity.eligibleNationalities;
  return allowed.includes('ALL') || allowed.includes(nationality);
}

// The listings to show: ones this nationality can apply to,
// and closed ones only when showClosed is true.
export function visibleOpportunities(opportunities, { nationality, showClosed, today }) {
  return opportunities.filter(
    (opportunity) =>
      canApply(opportunity, nationality) && (showClosed || !isClosed(opportunity, today)),
  );
}

// Only https:// links are shown. A value like "javascript:..." would
// run code when clicked, so it never becomes a link.
export function isSafeUrl(url) {
  return typeof url === 'string' && url.startsWith('https://');
}

// "2026-10-19" becomes "19 Oct 2026".
export function formatDate(text) {
  return parseDate(text).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
