import loginScreen from './pages/login/index.js';
import feed from './pages/feed/index.js';
import profile from './pages/profile/index.js';
import signUpScreen from './pages/signUp/index.js';
import profileInfo from './pages/profile/profileInfo.js';
import myRecipes from './pages/profile/myRecipes.js';
import addRecipe from './pages/AddRecipe/index.js';
import resetPassword from './pages/resetPassword/index.js';
import searchPage from './pages/search/index.js';

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
    case '#profileInfo':
      main.appendChild(profileInfo());
      break;
    case '#myRecipes':
      main.appendChild(myRecipes());
      break;
    case '#postRecipe':
      main.appendChild(addRecipe());
      break;
    case '#recuperarSenha':
      main.appendChild(resetPassword());
      break;
    case '#search':
      main.appendChild(searchPage());
      break;
    default:
      main.appendChild(loginScreen());
  }
};

window.addEventListener('load', routes);

window.addEventListener('hashchange', routes);
