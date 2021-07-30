import { loginWithEmailAndPassword } from '../../lib/authentication.js';
import { onNavigate } from '../../navigate.js';

export const login = () => {
  const container = document.createElement('div');
  container.className = 'container';
  const template = `
    <p class="subtitle">Uma rede para tutores e amantes de animais</p>
    <form class="form">
      <input type="email" placeholder="Email" class="login" id="user-email" autocomplete="off" />
      <input type="password" placeholder="Senha" class="login" id="user-password" autocomplete="off" />
      <button class="button" id="login-btn">Entrar</button>
      <span>ou</span>
      <button class="button" id="google-btn">Continuar com o Google</button>
    </form>
    <p class="text">Ainda não é membro?</p>
    <button class="button" id="btn-signUp">Cadastrar</button>
`;
  container.innerHTML = template;

  container.querySelector('#login-btn')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const inputEmail = document.getElementById('user-email');
      const inputPassword = document.getElementById('user-password');
      loginWithEmailAndPassword(inputEmail.value, inputPassword.value);
    });

  container.querySelector('#google-btn')
    .addEventListener('click', (event) => {
      event.preventDefault();
      onNavigate('/home');
    });

  container.querySelector('#btn-signUp')
    .addEventListener('click', (event) => {
      event.preventDefault();
      onNavigate('/cadastrar');
    });

  return container;
};
