import { signUp } from '../../services/index.js';

export default () => {
  const signUpScreenContainer = document.createElement('div');

  const signUpForm = `
  <img class="small-logo" src="image/Logotipo(1).png">
  
  <form id="signUp-form">
    <h4 class="title-createAcc">Criar nova conta</h4>
    
    <input type="text" class="signUp-input" id="signUp-name" placeholder="Nome do usuário" required>
    <input type="email" class="signUp-input" id="signUp-email" placeholder="E-mail" required>
    <input type="password" class="signUp-input" id="signUp-password" placeholder="Senha (mín 6 caracteres)" required>
    <input type="password" class="signUp-input" id="repeat-password" placeholder="Repita a senha" required>
    
    <button type="submit" class="btn-login" id="btn-signUp" onclick="signUpButton">Cadastrar</button>
    <p id="notice"></p>
  </form>

  <span class="divider"> ou entre com </span>
  <button type="button" class="btn-google"> <span class="google-icon"></span> Google</button>
  `;

  signUpScreenContainer.innerHTML = signUpForm;
  // const main = document.getElementById('root');
  // main.appendChild(signUpScreenContainer);

  // document.getElementById('btn-signUp').addEventListener('click', 
   function signUpButton(event) {
    event.preventDefault();

    // const signUpName = document.getElementById('signUp-name').value;
    const signUpEmail = document.getElementById('signUp-email').value;
    const signUpPassword = document.getElementById('signUp-password').value;
    // const signUpRepeatPassword = document.getElementById('repeat-password').value;
    const notice = document.getElementById('notice');

    function error(err) {
      //   const errors = {
      //     'auth/weak-password': 'A senha deve ter no mínimo 6 caracteres',
      //     'auth/email-already-exists': 'E-mail já cadastrado',
      //     'auth/invalid-email': 'Insira um e-mail válido',
      //   };

      if (err === 'auth/weak-password') {
        notice.innerHTML = 'A senha deve ter no mínimo 6 caracteres';
      }
    }

    function access() {
      console.log('pushStateProfile');
      window.history.pushState({ page_id: 3 }, null, '/profile');
    }

    signUp(signUpEmail, signUpPassword, error, access);
  }

  return signUpScreenContainer;
};
