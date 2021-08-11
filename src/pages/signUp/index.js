import { signUp, userData } from '../../services/index.js';

export default () => {
  const signUpScreenContainer = document.createElement('div');
  signUpScreenContainer.setAttribute('class', 'screenContainer');

  const signUpForm = `
  <div class="div-width85 verticalCenter">
    <img class="logo" src="image/logotipo.png">
    
    <form id="signUp-form" class="initialForm">
      <h1 class="title">Criar conta</h1>
      
      <input type="text" class="signUp-input" id="signUp-name" placeholder="Nome do usuário" data-required-message-error:"Escreva um nome de usuário" required>
      
      <input type="email" class="signUp-input" id="signUp-email" placeholder="E-mail" minlength="6" data-required-message-error:"Escreva um email válido" required>
    
      <input type="password" class="signUp-input" id="signUp-password" placeholder="Senha (mín 6 caracteres)" required>
    
      <input type="password" class="signUp-input" id="repeat-password" placeholder="Repita sua senha" required>
      <div id="notice" class="notice"> </div>

      <button type="button" id="btn-signUp" class="btn-login">Cadastrar</button>
      
    </form>
  </div>
  `;

  signUpScreenContainer.innerHTML = signUpForm;

  const btnSignUp = signUpScreenContainer.querySelector('#btn-signUp');
  btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();

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
      signUp(signUpEmail, signUpPassword)
        .then((data) => {
          const uid = data.user.uid;
          userData(signUpName, signUpEmail, uid);
        })
        .then(window.location.hash = '#profile')

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
  });
  return signUpScreenContainer;
};
