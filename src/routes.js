import feed from './pages/feed/index.js';
import perfil from './pages/profile/index';
import loginScreen from './pages/login/index.js';

const main = document.getElementById('root');

export default () => {
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
