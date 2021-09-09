import home from './pages/home/index.js';
import register from './pages/register/index.js';
import login from './pages/login/index.js';
import feed from './pages/feed/index.js';
import notFound from './pages/not-found/index.js';

const init = () => {
  const page = document.querySelector('#root');
  page.innerHTML = '';
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      switch (window.location.hash) {
        case '':
          page.appendChild(home());
          break;
        case '#home':
          page.appendChild(home());
          break;
        case '#register':
          page.appendChild(register());
          break;
        case '#login':
          page.appendChild(login());
          break;
        default:
          page.appendChild(notFound());
      }
    } else {
      switch (window.location.hash) {
        case '#feed':
          page.appendChild(feed());
          break;
        case '#home':
          page.appendChild(feed());
          break;
        case '#register':
          page.appendChild(feed());
          break;
        case '#login':
          page.appendChild(feed());
          break;
        default:
          page.appendChild(notFound());
      }
    }
  });
};

window.addEventListener('hashchange', init);
window.addEventListener('load', init);
