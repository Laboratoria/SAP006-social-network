import { renderPage } from './routes.js';

window.addEventListener('popstate', renderPage);
window.addEventListener('load', renderPage);
