import { createAccount } from "../../services/authentication.js";
import { navigation } from '../../navigation.js';


export const signUp = () => {
  const rootElement = document.createElement('div');

  const container = `
  <header class="esmaeceHeader logotipo-text">
    <section class="title">
      <h2>FORT</h2>
    </section>
  </header>
  <section class="content-signup">
    <div class="form-register inputAndReset">
      <div class="infos-user input-form">
        <input class="value-register signup-input-email" type="email" name="adress-email" id="useremail" class="style-input"
          placeholder="E-mail">
        <input class="value-register signup-input-password" type="password" name="user-password" id="userpassword" class="style-input"
          placeholder="Senha">
        <input class="value-register signup-input-password" type="password" name="confirm-user-password" id="user-confirm-password"
          class="style-input" placeholder="Confirme a senha">
      </div>

      <div class="btn-form">
        <button id="btn-signup" class="btn">Cadastrar</button>
      </div>

      <div>
        <p class="go-link">Já tem uma conta? <span><a href="/login">Faça seu login aqui</a></span></p>
      </div>

    </div>
  </section>
  `;

  rootElement.innerHTML = container;

  const userEmail = rootElement.querySelector('#useremail');
  const userPassword = rootElement.querySelector('#userpassword');
  const userConfirmPassword = rootElement.querySelector('#user-confirm-password');
  const signUpBtn = rootElement.querySelector('#btn-signup');

  signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();
    createAccount(userEmail.value, userPassword.value, userConfirmPassword.value);
    navigation('/feed');
  });

  return rootElement;
};
