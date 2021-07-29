import { onNavigate } from '../../navigate.js';

export const signup = () => {
  const container = document.createElement('div');
  container.className = 'signUp-container';
  const template = `
      <h2>Crie sua conta</h2>
      <form class="form">
        <input type="text" placeholder="Nome" id="name">
        <input type="text" placeholder="Email" id="email">
        <input type="text" placeholder="Senha" id="new-password">
        <input type="text" placeholder="Confirmar Senha" id="password">
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
      onNavigate('/home');
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
