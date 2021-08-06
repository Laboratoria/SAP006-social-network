// // Este é o ponto de entrada da sua aplicação

import { routeRender } from './pages/routes.js';


// import { loginPersistence } from './lib/authentication.js';

// window.addEventListener('load', loginPersistence());


window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender);