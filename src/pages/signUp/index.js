import { signUp } from '../../services/index.js';

export default () => {
  const signUpScreenContainer = document.createElement('div');

  const signUpForm = `
  <img class="small-logo" src="image/Logotipo(1).png">
  
  <form id="signUp-form" class="form">
    <h4 class="title-createAcc">Criar nova conta</h4>
    
    <input type="text" class="signUp-input" id="signUp-name" placeholder="Nome do usuário" required>
    <input type="email" class="signUp-input" id="signUp-email" placeholder="E-mail" required>
    <input type="password" class="signUp-input" id="signUp-password" placeholder="Senha (mín 6 caracteres)" required>
    <input type="password" class="signUp-input" id="repeat-password" placeholder="Repita a senha" required>
    
    <button type="submit" id="btn-signUp" class="btn-login">Cadastrar</button>
    <div id="notice"> </div>
  
    <div class="divider">
      <hr>
      <span class="hr-label"> ou entre com </span>
      <button type="button" class="btn-google"> <span class="google-icon"></span> Google</button>
    </div>
  </form>
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

    if (signUpName === '') {
      notice.innerHTML = '<span class="material-icons">error</span>Escreva um nome de usuário';
    } else if (signUpPassword !== signUpRepeatPassword) {
      notice.innerHTML = '<span class="material-icons">error</span>As senhas são diferentes';
    } else {
      const error = (err) => {
        const errors = {
          'auth/weak-password': 'A senha deve ter no mínimo 6 caracteres',
          'auth/email-already-in-use': 'E-mail já cadastrado',
          'auth/invalid-email': 'Insira um e-mail válido',
        };

        if (errors[err] === undefined) {
          notice.innerHTML = `<span class="material-icons">error</span><p>Erro: ${err}</p>`;
        } else {
          notice.innerHTML = `<span class="material-icons">error</span><p>${errors[err]}</p>`;
        }
      };

      signUp(signUpEmail, signUpPassword, error, signUpName);
    }
  });
  return signUpScreenContainer;
};
