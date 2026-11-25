// Placeholder screens. Each returns the HTML for the main area.
// Later tickets replace these with the real screens.

export function assistantScreen() {
  return '<h1 class="page-title">Letter Assistant</h1>';
}

export function spaceScreen() {
  return '<h1 class="page-title">My Space</h1>';
}

export function notFoundScreen() {
  return `
    <h1 class="page-title">Page not found</h1>
    <p><a class="button" href="#/">Go to Opportunities</a></p>
  `;
}
