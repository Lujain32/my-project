import '../styles/opportunities.css';
import opportunities from '../../data/opportunities.json';
import { NATIONALITIES } from '../nationalities.js';
import { getPrefs, setPrefs } from '../storage.js';
import {
  visibleOpportunities,
  deadlineText,
  isClosed,
  isClosingSoon,
  formatDate,
  isSafeUrl,
} from '../lib/opportunities.js';

const LEVEL_LABELS = {
  masters: "Master's",
  phd: 'PhD',
  internship: 'Internship',
  training: 'Training',
};

// Not saved: Show closed starts unticked on every visit.
let showClosed = false;

// Text from the data file goes into HTML, so characters like < and "
// are escaped first. Otherwise a title with "<" could break the page.
function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function cardHtml(opportunity, today) {
  const closed = isClosed(opportunity, today);
  const soon = isClosingSoon(opportunity, today);
  const fullyFunded = opportunity.funding === 'full';

  return `
    <article class="card${closed ? ' card--closed' : ''}">
      <div class="card__badges">
        <span class="badge">${LEVEL_LABELS[opportunity.level] ?? escapeHtml(opportunity.level)}</span>
        <span class="badge${fullyFunded ? ' badge--success' : ''}">${fullyFunded ? 'Fully funded' : 'Partially funded'}</span>
        ${soon ? '<span class="badge badge--warning">Closing soon</span>' : ''}
        ${closed ? '<span class="badge badge--closed">Closed</span>' : ''}
      </div>
      <div>
        <h2 class="card__title">${escapeHtml(opportunity.title)}</h2>
        <p class="card__meta">${escapeHtml(opportunity.provider)} · ${escapeHtml(opportunity.country)}</p>
      </div>
      <p class="card__deadline${soon ? ' card__deadline--soon' : ''}">${deadlineText(opportunity, today)}</p>
      <div class="card__foot">
        ${
          isSafeUrl(opportunity.officialUrl)
            ? `<a class="card__link" href="${escapeHtml(opportunity.officialUrl)}" target="_blank" rel="noopener">
          Apply on official site <span aria-hidden="true">↗</span><span class="visually-hidden">(opens in a new tab)</span>
        </a>`
            : ''
        }
        <span class="card__verified">Last verified ${formatDate(opportunity.lastVerified)}</span>
      </div>
    </article>
  `;
}

function countText(count) {
  return count === 1 ? '1 opportunity' : `${count} opportunities`;
}

// The empty-state message, or '' when there are listings to show (design.md, S1 Empty).
function emptyMessage(visibleCount, nationality, today) {
  if (opportunities.length === 0) {
    return 'No opportunities have been added yet.';
  }
  if (visibleCount > 0) {
    return '';
  }
  const closedWouldMatch =
    !showClosed &&
    visibleOpportunities(opportunities, { nationality, showClosed: true, today }).length > 0;
  return closedWouldMatch
    ? 'No opportunities match. Try clearing a filter, or show closed ones.'
    : 'No opportunities match. Try clearing a filter.';
}

function resultsHtml(nationality, today) {
  const visible = visibleOpportunities(opportunities, { nationality, showClosed, today });
  const message = emptyMessage(visible.length, nationality, today);
  if (message) {
    return { count: visible.length, html: `<p class="empty">${message}</p>` };
  }
  return {
    count: visible.length,
    html: `<div class="card-grid">${visible.map((o) => cardHtml(o, today)).join('')}</div>`,
  };
}

// Redraws only the count and the cards, not the controls, so keyboard
// focus stays on the control the user just changed.
function updateResults() {
  const countElement = document.getElementById('result-count');
  const resultsElement = document.getElementById('results');
  if (!countElement || !resultsElement) {
    return;
  }
  const { count, html } = resultsHtml(getPrefs().nationality, new Date());
  countElement.textContent = countText(count);
  resultsElement.innerHTML = html;
}

export function opportunitiesScreen() {
  showClosed = false;
  const { nationality } = getPrefs();
  const { count, html } = resultsHtml(nationality, new Date());

  const options = NATIONALITIES.map(
    (n) => `<option value="${n.code}"${n.code === nationality ? ' selected' : ''}>${n.name}</option>`,
  ).join('');

  return `
    <h1 class="page-title">Opportunities</h1>
    <div class="controls">
      <div class="field">
        <label class="field__label" for="nationality">My nationality</label>
        <select class="field__select" id="nationality">${options}</select>
      </div>
      <label class="check"><input type="checkbox" id="show-closed"> Show closed</label>
    </div>
    <p class="result-count" id="result-count" aria-live="polite">${countText(count)}</p>
    <div id="results">${html}</div>
  `;
}

// Called once from main.js. One listener on the whole page handles the
// two controls, because the screen's HTML is replaced on every visit.
export function setupOpportunities() {
  document.addEventListener('change', (event) => {
    if (event.target.id === 'nationality') {
      setPrefs({ ...getPrefs(), nationality: event.target.value });
      updateResults();
    } else if (event.target.id === 'show-closed') {
      showClosed = event.target.checked;
      updateResults();
    }
  });
}
