import login from './pages/login/index.js';
import signUp from './pages/signup/index.js';
import feed from './pages/feed/index.js';

const main = document.querySelector('#root');

const render = () => {
  main.innerHTML = '';

  switch (window.location.hash) {
    case '#login':
      main.appendChild(login());
      break;
    case '#signUp':
      main.appendChild(signUp());
      break;
    case '#feed':
      main.appendChild(feed());
      break;
    // case '#logout':
    //   main.appendChild(login());
    //   break;
    default:
      main.appendChild(login());
      break;
  }
};

window.addEventListener('load', render);
window.addEventListener('hashchange', render);






