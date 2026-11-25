import './styles.css';
import { startRouter } from './router.js';
import { setupOpportunities } from './screens/opportunities.js';
import { setupAssistant } from './screens/assistant.js';

// Start the router first, so the screens still work
// even if something below fails.
startRouter();
setupOpportunities();
setupAssistant();

// The skip link's href is "#main". Letting the browser follow it would change
// the hash, and the router would show "Page not found". So we stop that and
// move focus to the main area ourselves.
// The ?. means: only add the listener if the skip link exists.
const skipLink = document.querySelector('.skip-link');
skipLink?.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('main').focus();
});
