// Este é o ponto de entrada da sua aplicação

// import { myFunction } from './lib/index.js';

// myFunction();

import home from './pages/home/index.js';
import register from './pages/register/index.js';
import login from './pages/login/index.js';
import feed from './pages/feed/index.js';

export const init = () => {
  const main = document.querySelector('#root');
  main.innerHTML = '';
  switch (window.location.hash) {
    case '#home':
      main.appendChild(home());
      break;
    case '#register':
      main.appendChild(register());
      break;
    case '#login':
      main.appendChild(login());
      break;
    case '#feed':
      main.appendChild(feed());
      break;
    default:
      main.appendChild(home());
  }
};

window.addEventListener('hashchange', init);
window.addEventListener('load', init);
