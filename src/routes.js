import feed from './pages/feed/feed.js';
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
      default:
        break;
    }
  });
};
