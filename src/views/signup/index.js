import { createAccountWithEmailAndPassword, loginWithGoogleAccount } from '../../lib/authentication.js';

import { onNavigate } from '../../navigate.js';

export const signup = () => {
  const container = document.createElement('div');
  container.className = 'signUp-container';
  const template = `
      <h2>Crie sua conta</h2>
      <form class="form">
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
  return container;
};
