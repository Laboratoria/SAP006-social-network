import { loginWithEmailAndPassword } from '../../lib/authentication.js';
import { signup } from '../signup/index.js';

export const login = () => {
  const container = document.createElement('div');
  const template = `
  <div class="container">
  <p class="subtitle">Uma rede para tutores e amantes de animais</p>
  <form class="form">
  <input type="email" placeholder="Email" value="" class="login" id="user-email" autocomplete="off"/>
  <input type="password" placeholder="Senha" value="" class="login" id="user-password" autocomplete="off"/>
  <a class="button" id="login-btn" href="/home">Entrar</a>
  <span>ou</span>
  <a class="button" id="google-btn" href="/googlelogin">Continuar com o Google</a>
  </form>
  <p class="text">Ainda não é membro?</p>
  <a class="button" id="btn-signUp" href="/cadastrar">Cadastrar</a>
  </div>
`;
  container.innerHTML = template;

  container.querySelector('#login-btn')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const inputEmail = document.getElementById('user-email');
      const inputPassword = document.getElementById('user-password');
      loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
      console.log('clicou');
    });

  container.querySelector('#btn-signUp')
    .addEventListener('click', (event) => {
      event.preventDefault();
      container.innerHTML = '';
      container.innerHTML = signup;
    });

  return container;
};
