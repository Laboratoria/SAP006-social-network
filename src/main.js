import loginScreen from './pages/login/index.js';
import feed from './pages/feed/feed.js';
import perfil from './pages/perfil/perfil.js';

// Este é o ponto de entrada da sua aplicação

const main = document.getElementById('root');

const routes = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '':
        main.appendChild(loginScreen());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      case '#perfil':
        main.appendChild(perfil());
        break;
      default:
        break;
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(loginScreen());
  routes();
});
