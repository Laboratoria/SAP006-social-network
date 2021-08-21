import { createAccount } from "../../services/authentication.js";
import { navigation } from '../../navigation.js';

export const signUp = () => {
  const rootElement = document.createElement('div');

  const container = `
    <div class="image-page">
      <img id="background" src="./pages/login/img/paleta3.jpg" alt="">

      <div class="banner">
          <h2>FORT</h2>
      </div>

      <form class="form-register">
        <div class="infos-user">
          <input class="value-register" type="email" name="adress-email" id="useremail" class="style-input" placeholder="E-mail">

          <input class="value-register" type="password" name="user-password" id="userpassword" class="style-input" placeholder="Senha">

          <input class="value-register" type="password" name="confirm-user-password" id="user-confirm-password" class="style-input" placeholder="Confirme a senha">
        </div>

        <div class="btn-form">
          <button id="btn-signup" class="btn">Cadastrar</button>
        </div>

        <div>
          <p class="go-link>Já tem uma conta? <span><a href="/login" class="go-link>Faça seu login aqui</a></span></p>
        </div>

      </form>

    </div>
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
