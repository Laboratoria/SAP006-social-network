// Este é o ponto de entrada da sua aplicação
import loginScreen from './pages/login/index.js';
import signUpScreen from './pages/signUp/index.js';
import profileScreen from './pages/profile/index.js';

const main = document.getElementById('root');

const render = () => {
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
        main.appendChild(profileScreen());
        break;
      default:
        main.appendChild(loginScreen());
        break;
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(loginScreen());
  render();
});
