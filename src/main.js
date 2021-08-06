import loginScreen from './pages/login/index.js';
import feed from './pages/feed/index.js';
import profile from './pages/profile/index.js';
import signUpScreen from './pages/signUp/index.js';
import addRecipe from './pages/AddRecipe/index.js';

const main = document.getElementById('root');

const routes = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '':
        main.appendChild(loginScreen());
        break;
      case '#signUp':
        main.appendChild(signUpScreen());
        break;
      case '#profile':
        main.appendChild(profile());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      case '#postRecipe':
        main.appendChild(addRecipe());
        break;
      default:
        main.appendChild(loginScreen());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(loginScreen());
  routes();
});
