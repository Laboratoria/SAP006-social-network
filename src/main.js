// Este é o ponto de entrada da sua aplicação

import { signIn } from './lib/index.js';
import loginScreen from './pages/tela inicial/LogIn.js';
import routes from './routes.js';

const main = document.getElementById('root');

window.addEventListener('load', () => {
  main.appendChild(loginScreen());
  function signingIn() {
    // const inputEmail = document.getElementById('input-email').value;
    // const inputPassword = document.getElementById('input-password').value;
    // signIn(inputEmail, inputPassword);
    signIn();
  }

  const btnLogin = document.getElementById('enter-acc');
  btnLogin.addEventListener('click', signingIn);
  routes();
});
