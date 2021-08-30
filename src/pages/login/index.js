import { loginUser, signInWithGoogle } from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <img src="" alt="" class="logo">
    <p id="error-message" class="error-message"></p>
    <h2 class="title">Login</h2>
      <form class="form-login" action="">
        <label for="get-email" class="label-login">Email</label><br>
        <input type="text" name="email" id="email-user" class="input-login"><br>
        <label for="get-password" class="label-login">Senha</label><br>
        <input type="password" name="password" id="password-user">
        <i class="fa fa-eye" aria-hidden="true"></i><br>
      </form> 
      <div class="button">
        <button id="google-button" class="google-button"><img src="img/google-logo.png" alt=""></button>
        <button id="login-button" class="button">Login</button>  
      </div>
  `;

  container.innerHTML = template;

  // Login

  const btnLogin = container.querySelector('#login-button');
  const email = container.querySelector('#email-user');
  const password = container.querySelector('#password-user');
  const googleButton = container.querySelector('#google-button');

  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    loginUser(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.hash = '#feed';
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        const errorMsg = document.querySelector('#error-message');
        if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Email inválido. Tente novamente, ou cadastre-se';
          errorMsg.innerHTML = errorMessage;
        } else if (errorCode === 'auth/wrong-password') {
          errorMessage = 'Seu email ou senha está incorreto. Tente novamente';
          errorMsg.innerHTML = errorMessage;
        } else {
          errorMessage = 'Usuário não cadastrado';
          errorMsg.innerHTML = errorMessage;
        }
        return error;
      });
  });

  // Login Google

  googleButton.addEventListener('click', (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then(() => {
        window.location.hash = '#feed';
      })
      // eslint-disable-next-line arrow-parens
      .catch(() => {
        window.location.hash = '#not-found';
      });
  });

  return container;
};
