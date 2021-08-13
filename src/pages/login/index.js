import { loginGoogle } from '../../services/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <img src="" alt="" class="logo">
    <h2 class="title">Login</h2>
      <form class="form-login" action="">
        <label for="get-email" class="label-login">Email</label><br>
        <input type="text" name="email" id="email-user" class="input-login"><br>
        <label for="get-password" class="label-login">Senha</label><br>
        <input type="text" name="password" id="password-user">
      </form> 
      <div class="button">
        <button id="google-button" class="google-button" ><img src="img/google-logo.png" alt=""></button>
        <a href="/#feed">
          <button id="login-button" class="login-button">Login</button>  
        </a>
      </div>
  `;

  container.innerHTML = template;

  // <input type='image' id="login-google" src='img/google-logo.png'><br>

  const googleButton = container.querySelector('#google-button');
  // const emailUser = container.querySelector('#email-user');
  // const passwordUser = container.querySelector('#password-user');
  googleButton.addEventListener('click', loginGoogle());
};
