import { createWithEmailAndPassword } from '../../lib/authentication.js';
import { onNavigate } from '../../navigate.js';

export const signup = () => {
  const container = document.createElement('div');
  container.className = 'signUp-container';
  const template = `
      <h2>Crie sua conta</h2>
      <form class="form">
        <input type="text" placeholder="Nome" id="name">
        <input type="text" placeholder="Email" id="email">
        <input type="password" placeholder="Senha" class="new-register" id="new-password" autocomplete="off">
        <input type="password" placeholder="Confirmar Senha" class="register" id="password" autocomplete="off">
        <button id="sign-up-btn">Cadastrar</button>
      </form>
      <span>ou</span>
      <button class="google-btn" id="google-btn">Continuar com o Google</button>
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
      onNavigate('/home');
    });

  container.querySelector('#login-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate('/');
    });
  return container;
};
