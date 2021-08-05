<<<<<<< HEAD
import { createAccountWithEmailAndPassword, loginWithGoogleAccount } from '../../lib/authentication.js';

=======
import { createWithEmailAndPassword, loginWithGoogleAccount } from '../../lib/authentication.js';
>>>>>>> e4a4387e13c85416bbbca28c309eb974bb89c9a0
import { onNavigate } from '../../navigate.js';

export const signup = () => {
  const container = document.createElement('div');
  container.className = 'signUp-container';
  const template = `
      <div class ="header">
        <h1 class="logo">Logo</h1>
      </div>
        <h2>Crie sua conta</h2>
      <form class="form">
<<<<<<< HEAD
        <span id="error-sign-up-message"></span>
        <input type="text" placeholder="Nome" id="user-name">
        <input type="text" placeholder="Email" id="user-email">
        <input type="password" placeholder="Senha" class="new-register" id="new-password" autocomplete="off">
        <input type="password" placeholder="Confirmar Senha" class="register" id="confirm-password" autocomplete="off">
        <button id="sign-up-btn" class="button">Cadastrar</button>
      </form>
      <span>ou</span>
      <button class=button" id="google-btn">Continuar com o Google</button>
      <p class="text">Já tem uma conta?</p>
      <button class="button" id="login-btn">Entrar</button
=======
        <input type="text" placeholder="Nome" id="name">
        <input type="text" placeholder="Email" id="email">
      <div class="input-signUp ">
          <i class="fa fa-eye" aria-hidden="true" id="eye-one" class="hidden"></i>
      </div>
        <input type="password" placeholder="Senha" class="new-register" id="new-password" autocomplete="off">
      <div class="input-signUp">
          <i class="fa fa-eye" aria-hidden="true" id="eye-two" class="hidden"></i>
      </div>
        <input type="password" placeholder="Confirmar Senha" class="register" id="password" autocomplete="off">
        <button id="sign-up-btn">Cadastrar</button>
      </form>
      <span>ou</span>
        <button class="google-btn" id="google-btn"><img class='icon-google' src='./img/google-icon.png'>Continuar com o Google</button>
        <p class="text">Já tem uma conta?</p>
        <button class="button" id="login-btn">Entrar</button
>>>>>>> e4a4387e13c85416bbbca28c309eb974bb89c9a0
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


  ////// LOGOUT ///////
  container.querySelector('#login-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/');
    });

  /////// MOSTRAR SENHA //////
  container.querySelector('.fa-eye')
    .addEventListener('click', (e) => {
      e.preventDefault();
      const inputSenha = document.querySelector('#new-password')
      if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
      } else {
        inputSenha.setAttribute('type', 'password')
      }

    });


  return container;
};

