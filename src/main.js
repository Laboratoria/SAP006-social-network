import loginScreen from './pages/login/index.js';
import feed from './pages/feed/index.js';
import profile from './pages/profile/index.js';
import signUpScreen from './pages/signUp/index.js';

const main = document.getElementById('root');

const routes = () => {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '#signUp':
      main.appendChild(signUpScreen());
      break;
    case '#profile':
      main.appendChild(profile());
      break;
    case '#feed':
      main.appendChild(feed());
      break;
    default:
      main.appendChild(loginScreen());
  }
};

window.addEventListener('load', routes);

window.addEventListener('hashchange', routes);
