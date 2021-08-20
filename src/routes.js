import login from './pages/login/index.js';
import signUp from './pages/signup/index.js';
import feed from './pages/feed/index.js';

const page = document.querySelector('#root');

const render = () => {
  page.innerHTML = '';

  switch (window.location.hash) {
    case '#login':
      page.appendChild(login());
      break;
    case '#signUp':
      page.appendChild(signUp());
      break;
    case '#feed':
      page.appendChild(feed());
      break;
    case '#logout':
      page.appendChild(login());
      break;
    default:
      page.appendChild(login());
      break;
  }
};

window.addEventListener('load', render);
window.addEventListener('hashchange', render);
// window.addEventListener('click', render);





