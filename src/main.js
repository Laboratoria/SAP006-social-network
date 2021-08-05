import { renderPage } from './routes.js';
<<<<<<< HEAD
import { loginPersistence } from './lib/authentication.js';

window.addEventListener('load', loginPersistence());
=======
//import { loginPersistence, verifyUser } from './lib/authentication.js';

//window.addEventListener('load', verifyUser());
//window.addEventListener('load', loginPersistence());
>>>>>>> e4a4387e13c85416bbbca28c309eb974bb89c9a0
window.addEventListener('popstate', renderPage);
window.addEventListener('load', renderPage);
