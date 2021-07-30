import feed from './pages/feed/feed.js';
import perfil from './pages/perfil';
import loginScreen from './pages/tela inicial/LogIn.js';

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
