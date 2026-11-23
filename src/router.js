import {
  opportunitiesScreen,
  assistantScreen,
  spaceScreen,
  notFoundScreen,
} from './screens/placeholders.js';

const routes = {
  '/': opportunitiesScreen,
  '/assistant': assistantScreen,
  '/space': spaceScreen,
};

// "#/space" becomes "/space". An empty hash ("" or "#") means the home screen.
export function getPath(hash) {
  const path = hash.replace(/^#/, '');
  return path === '' ? '/' : path;
}

// Returns the screen for a path, or "Page not found" for any other path.
export function matchRoute(path) {
  return routes[path] ?? notFoundScreen;
}

// Marks the navigation link for the current screen with aria-current="page".
// The CSS uses that attribute for the bold text and underline.
function markCurrentLink(path) {
  for (const link of document.querySelectorAll('.nav__link')) {
    if (link.getAttribute('href') === '#' + path) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

// Draws the screen for the current hash. Focus moves to the main area only
// when the screen changes, not on the first load, so the skip link stays
// the first thing a keyboard user reaches.
function render(moveFocus) {
  const path = getPath(window.location.hash);
  const screen = matchRoute(path);
  const main = document.getElementById('main');
  main.innerHTML = screen();
  markCurrentLink(path);
  if (moveFocus) {
    main.focus();
  }
}

export function startRouter() {
  window.addEventListener('hashchange', () => render(true));
  render(false);
}
