import { renderPage } from './routes.js';
//import { loginPersistence, verifyUser } from './lib/authentication.js';

//window.addEventListener('load', verifyUser());
//window.addEventListener('load', loginPersistence());
window.addEventListener('popstate', renderPage);
window.addEventListener('load', renderPage);
