import { renderPage } from './routes.js';
// import { loginPersistence } from './lib/authentication.js';

window.addEventListener('popstate', renderPage);
window.addEventListener('load', renderPage);
