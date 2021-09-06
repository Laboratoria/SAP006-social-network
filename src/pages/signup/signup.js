import { createAccount } from '../../services/authentication.js';
import { navigation } from '../../navigation.js';

export const signUp = () => {
  const rootElement = document.createElement('div');

  const container = `
  <header class="esmaeceHeader-signup logotipo-text-signup">
    <section class="title">
      <h2>FORT</h2>
    </section>
  </header>
  <section class="content-signup">
    <div class="form-register form-register-responsive">
      <div class="infos-user input-form">
        <input class="value-register signup-input-email" type="email" name="adress-email" id="useremail" class="style-input"
          placeholder="E-mail">
        <input class="value-register signup-input-password" type="password" name="user-password" id="userpassword" class="style-input"
          placeholder="Senha">
        <input class="value-register signup-input-password" type="password" name="confirm-user-password" id="user-confirm-password"
          class="style-input" placeholder="Confirme a senha">
          <div id='warning-signup' class='warning'></div>
          <div class="btn-form">
          <button id="btn-signup" class="btn-Signup">Cadastrar</button>
        </div>
        <div>
        <p class="go-link">Já tem uma conta? <span><a href="/login">Faça seu login aqui</a></span></p>
      </div>
      </div>
    </div>
    <div class="logo-above-bg-signup"></div>
  </section>
  `;

  rootElement.innerHTML = container;

  function signUpDom() {
    const userEmail = rootElement.querySelector('#useremail').value;
    const userPassword = rootElement.querySelector('#userpassword').value;
    const userConfirmPassword = rootElement.querySelector('#user-confirm-password').value;
    const validationSignup = rootElement.querySelector('#warning-signup');

    if (userEmail === '') {
      validationSignup.innerHTML = '<p>Digite um e-mail</p>';
    } else if (userPassword === '') {
      validationSignup.innerHTML = '<p>Digite uma senha</p>';
    } else if (userConfirmPassword === '') {
      validationSignup.innerHTML = '<p>Confirme a senha</p>';
    } else if (userPassword !== userConfirmPassword) {
      validationSignup.innerHTML = '<p>As senhas não conferem</p>';
    } else {
      createAccount(userEmail, userPassword)
        .then(() => {
          navigation('/feed');
        })
        .catch((error) => {
          const errorCode = error.code;
          function errorWarning(errorMessage) {
            const errorsCode = {
              'auth/weak-password': 'A senha deve ter no mínimo 6 caracteres',
              'auth/email-already-in-use': 'E-mail já cadastrado',
              'auth/invalid-email': 'Insira um e-mail válido',
            };

            if (errorsCode[errorMessage] === undefined) {
              validationSignup.innerHTML = `<span class="material-icons">error</span><p>${errorsCode[errorMessage]}</p>`;
            } else {
              validationSignup.innerHTML = `<span class="material-icons">error</span><p>${errorsCode[errorMessage]}</p>`;
            }
          }
          errorWarning(errorCode);
        });
    }
  }

  const signUpBtn = rootElement.querySelector('.btn-Signup');

  signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signUpDom();
  });

  return rootElement;
};
