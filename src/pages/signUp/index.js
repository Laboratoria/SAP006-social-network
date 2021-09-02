import { signUp } from '../../services/index.js';

export default () => {
  const signUpScreenContainer = document.createElement('div');
  signUpScreenContainer.setAttribute('class', 'screenContainerBody');

  const signUpForm = `
  <div class="div-width90 flexRowReverse">
    <img class="logo" src="image/logotipo.png">
    
    <form id="signUp-form" class="initialForm">
      <h1 class="title">Criar conta</h1>
      
      <input type="text" class="signUp-input" id="signUp-name" placeholder="Nome do usuário" required>
      
      <input type="email" class="signUp-input" id="signUp-email" placeholder="E-mail" required>
    
      <input type="password" class="signUp-input" id="signUp-password" minlength="6" placeholder="Senha (mín 6 caracteres)" required>
    
      <input type="password" class="signUp-input" id="repeat-password" placeholder="Repita sua senha" required>
      <div id="notice" class="notice"> </div>
      
      <button type="button" id="btn-signUp" class="btn-login">Cadastrar</button>
      
      <p id="loginAcc"> Já tem uma conta? <a href="#" class="ancor"> Entre </a> </p> 
    </form>
  </div>
  `;

  signUpScreenContainer.innerHTML = signUpForm;

  function SignUpDom() {
    const signUpName = signUpScreenContainer.querySelector('#signUp-name').value;
    const signUpEmail = signUpScreenContainer.querySelector('#signUp-email').value;
    const signUpPassword = signUpScreenContainer.querySelector('#signUp-password').value;
    const signUpRepeatPassword = signUpScreenContainer.querySelector('#repeat-password').value;
    const notice = signUpScreenContainer.querySelector('#notice');

    const mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (signUpName === '') {
      notice.innerHTML = '<span class="material-icons">error</span><p>Escreva um nome de usuário</p>';
    } else if (signUpEmail === '' || mailFormat.test(signUpEmail) === false) {
      notice.innerHTML = '<span class="material-icons">error</span><p>Escreva um email válido</p>';
    } else if (signUpPassword === '' || signUpPassword.length < 6) {
      notice.innerHTML = '<span class="material-icons">error</span><p>A senha deve ter no mínimo 6 dígitos</p>';
    } else if (signUpPassword !== signUpRepeatPassword) {
      notice.innerHTML = '<span class="material-icons">error</span><p>As senhas não conferem</p>';
    } else {
      signUp(signUpEmail, signUpPassword, signUpName)
        .then(() => {
          window.location.hash = '#profile';
        })
        .catch((error) => {
          const errorCode = error.code;
          function errorNotice(errorMessage) {
            const errorsCode = {
              'auth/weak-password': 'A senha deve ter no mínimo 6 caracteres',
              'auth/email-already-in-use': 'E-mail já cadastrado',
              'auth/invalid-email': 'Insira um e-mail válido',
            };

            if (errorsCode[errorMessage] === undefined) {
              notice.innerHTML = `<span class="material-icons">error</span><p>Erro: ${errorMessage}</p>`;
            } else {
              notice.innerHTML = `<span class="material-icons">error</span><p>${errorsCode[errorMessage]}</p>`;
            }
          }
          errorNotice(errorCode);
        });
    }
  }

  const btnSignUp = signUpScreenContainer.querySelector('#btn-signUp');
  btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    SignUpDom();
  });
  return signUpScreenContainer;
};
