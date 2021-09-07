import { resetPassword } from '../../services/authentication.js';

export const Reset = () => {
  const rootElement = document.createElement('div');
  const container = `
    <header class="reset-header-container">
      <section class="resetSection-header-title">
        <h2 class="reset-header-title">FORT</h2>
      </section>
    </header>
    <section class="resetSection-background-opacity">
      <h4 class="reset-text">Insira seu e-mail abaixo para receber o link de redefinição de senha</h4>
      <div class="reset-input">
        <input type="email" id="email" class="reset-input-layout" placeholder="Email">
      </div>
      <div class="container-btn-login">
        <button id="btn-reset" class="btn-reset login btn">Enviar</button>
      </div>
    </section>
    `;

  rootElement.innerHTML = container;

  const btnReset = rootElement.querySelector('#btn-reset');

  btnReset.addEventListener('click', () => {
    const email = rootElement.querySelector('#email');
    resetPassword(email.value);
  });

  return rootElement;
};
