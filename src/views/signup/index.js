import { createWithEmailAndPassword, loginWithGoogleAccount } from '../../lib/authentication.js';
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
  `;
  container.innerHTML = template;
  container.querySelector('#sign-up-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('new-password');
      createWithEmailAndPassword(emailInput.value, passwordInput.value);
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

