import { createAccountWithEmailAndPassword, loginWithGoogleAccount } from '../../lib/authentication.js';
import { onNavigate } from '../../navigate.js';

export const signup = () => {
  const container = document.createElement('div');
  container.className = 'signUp-container';
  const template = `
    <div class ="header">
     <h1 class="logo">Logo</h1>
    </div>
    <form class="form-register">
      <p class="create-account">Crie sua conta</p>
      <span id="error-sign-up-message"></span>
      <input type="text" placeholder="Nome" class="input-field" id="user-name">
      <input type="text" placeholder="Email" class="input-field" id="user-email">
      <div class="show-password">
       <i id="eye-register" class="fa fa-eye" aria-hidden="true" class="hidden"></i>
      </div>
      <input type="password" placeholder="Senha" class="input-field" id="new-password" autocomplete="off">
      <div class="show-password">
       <i id="eye-show-register" class="fa fa-eye" aria-hidden="true" class="hidden"></i>
      </div>
      <input type="password" placeholder="Confirmar Senha" class="input-field" id="confirm-password" autocomplete="off">
      <button id="sign-up-btn">Cadastrar</button>
    </form>
      <span class="option">ou</span>
      <button class="google-btn" id="google-btn"><img class='icon-google' src='./img/google-icon.png'>Continuar com o Google</button>
      <p class="login-text">Já tem uma conta?</p>
      <button class="button" id="login-btn">Entrar</button
  `;
  container.innerHTML = template;
  container.querySelector('#sign-up-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      const userName = document.getElementById('user-name').value;
      const userEmail = document.getElementById('user-email').value;
      const userPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      createAccountWithEmailAndPassword(userName, userEmail, userPassword, confirmPassword);
    });

  container.querySelector('#google-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      loginWithGoogleAccount();
    });

  container.querySelector('#login-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/');
    });

  container.querySelector('#eye-register')
    .addEventListener('click', (e) => {
      e.preventDefault();
      const inputPassword = document.querySelector('#new-password')
      if (inputPassword.getAttribute('type') === 'password') {
        inputPassword.setAttribute('type', 'text');
      } else {
        inputPassword.setAttribute('type', 'password');
      }

    });

    container.querySelector('#eye-show-register')
    .addEventListener('click', (e) => {
      e.preventDefault();
      const inputConfirmPassword = document.querySelector('#confirm-password')
      if (inputConfirmPassword.getAttribute('type') === 'password') {
        inputConfirmPassword.setAttribute('type', 'text');
      } else {
        inputConfirmPassword.setAttribute('type', 'password');
      }

    });



  return container;
};

