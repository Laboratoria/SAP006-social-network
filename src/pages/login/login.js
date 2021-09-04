import {
  signInEmailPassword,
  signInGoogle,
  keepLogged,
} from '../../services/authentication.js';

import { navigation } from '../../navigation.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  const container = `
    <header class="esmaeceHeader logotipo-text">
      <section class="title">
        <h2>FORT</h2>
      </section>
    </header>
    <section class="mainSection-background-opacity">
      <div class="without-opacity">
        <h4 class="login-redirect-signup">Nova por aqui? <span><a href="/signup" id="signup" class="link-signup">Cadastre-se</a></span></h4>
        <h3 class="login-title-community">Encontre a sua comunidade!</h3>
        <div class="inputAndReset input-form">
          <input type="text" id="email" class="login-input-email" placeholder="Email">
          <input type="password" id="password" class="login-input-password" placeholder="Senha">
          <button class="reset-password" id="reset">Esqueceu a senha?</button><br>
          <div class='warning'></div>
        </div>
        <div class="google">
          <button id="btn-login" class="login btn">LOGIN</button>
          <img id="icon-google" class="btn-google" src="./pages/login/img/icon-google-white.png">
        </div>
      </div>
      <div class="logo-above-bg"></div>
    </section>
  `;
  rootElement.innerHTML = container;

  const warningPage = rootElement.querySelector('.warning');
  const btnLogin = rootElement.querySelector('.login');
  const btnGoogle = rootElement.querySelector('.btn-google');
  const signUpBtn = rootElement.querySelector('.link-signup');
  const resetLink = rootElement.querySelector('.reset-password');

  function validationLogin() {
    const email = rootElement.querySelector('.login-input-email').value;

    const password = rootElement.querySelector('#password').value;

    if (email === '' || password === '') {
      warningPage.innerHTML = '<p>Preencha todos os campos</p>';
    } else {
      signInEmailPassword(email, password)
        .then(() => {
          navigation('/feed');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          switch (errorCode) {
            case 'auth/invalid-email':
              warningPage.innerHTML = '<p>Usuário ou email inválido</p>';
              break;
            case 'auth/user-disabled':
              warningPage.innerHTML = '<p>Usuário desabilitado</p>';
              break;
            case 'auth/user-not-found':
              warningPage.innerHTML = '<p>Usuário não encontrado</p>';
              break;
            case 'auth/wrong-password':
              warningPage.innerHTML = '<p>Usuário ou senha inválidos</p>';
              break;
            default:
              warningPage.innerHTML = `<p>${errorMessage}</p>`;
              break;
          }
          throw new Error(errorMessage);
        });
    }
  }

  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    validationLogin();
  });

  function validationWithGoogle() {
    signInGoogle()
      .then(() => {
        navigation('/feed');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/credential-already-in-use':
            warningPage.innerHTML = '<p>Está credencial já está sendo utilizada</p>';
            break;
          default:
            warningPage.innerHTML = `<p>${errorMessage}</p>`;
        }
        throw new Error(errorMessage);
      });
  }

  btnGoogle.addEventListener('click', () => {
    validationWithGoogle();
    navigation('/feed');
    keepLogged();
  });

  signUpBtn.addEventListener('click', (event) => {
    event.preventDefault();
    navigation('/signup');
  });

  resetLink.addEventListener('click', (event) => {
    event.preventDefault();
    navigation('/reset');
  });

  return rootElement;
};
