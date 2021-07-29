import { createWithEmailAndPassword } from '../../lib/authentication.js';


export default () => {
  const container = document.createElement('div');

  const template = `
    <div class="signUp-container">
    <h2>Crie sua conta</h2>
    <input type="text" placeholder="Nome" id="name">
    <input type="text" placeholder="Email" id="email">
    <input type="text" placeholder="Senha"id="new-password">
    <input type="text" placeholder="Confirmar Senha"id="password">
    <a class="button" id="login-btn" href="/homepage" data-link>Cadastrar</a>
    <span>ou</span>
    <a class="google-btn" id="google-btn" href="/googlelogin">Continuar com o Google</a>
    <p class="text">Já tem uma conta?</p>
    <a class="button" id="login" href="/" data-link>Entrar</a>
    </div>
    `;
  container.innerHTML = template;
  console.log('cadastro');

  container.querySelector('#login-btn');
  addEventListener('click', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('new-password').value;
    createWithEmailAndPassword(emailInput.value, passwordInput.value);
  });

  return container;
};