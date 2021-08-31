import { loginUser, signInWithGloogle } from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <div class= "container">
    <img src="" alt="" class="logo">
    <div class= "card">
      <h2 class="title">Login</h2>
        <form class="form-login" action="">
          <p id="error-message" class="error-message"></p>
          <label for="get-email" class="label-login">Email</label><br>
          <input type="text" name="email" id="email-user" class="input-login"><br>
          <label for="get-password" class="label-login">Senha</label><br>
          <input type="password" name="password" id="password-user">
          <i class="fa fa-eye" aria-hidden="true"></i><br>
        </form> 
        <div class="button">
          <button id="login-button" class="login-button">Login</button>  <br>
          <button id="google-button" class="google-button" ><img src="img/google-logo.png" alt=""></button>
        </div>
        <div> 
          <hr> 
        </div>
        <p> Não tem uma conta? 
        <a href=""> Cadastre-se </a>
        </p>
    </div>
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
    loginUser(email.value, password.value);
  });

  // Login Google

  googleButton.addEventListener('click', (event) => {
    event.preventDefault();
    signInWithGloogle();
  });

  return container;
};
