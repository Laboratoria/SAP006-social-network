import { googleLogin, SignIn, resetPass, stayLogged } from '../../services/firebaseAuth.js';
import { handleError } from '../../services/error.js';
import { route } from '../../routes/navigator.js';

export const login = () => {
  const rootElement = document.createElement('div');
  rootElement.setAttribute('class', 'page');
  rootElement.innerHTML = `<div class="container">
  <header>
  <img class="logo" src="img/logo.png" alt="GO VEG - logo">
  </header>
  <main>
      <div class="label-float">
        <input class="login" name="usuario" type="text" id="usuario" placeholder="E-mail">
      </div>
      <div id="inputPass">
        <input class="password" type="password" id="senha" placeholder="Senha">
        <img id="eye" src="./img/eyesOpen.svg">
      </div>
      <div class="justify-enter">
        <button type="button" name="botao" id="entrar">ENTRAR</button>
      </div>
      <button class="forgetPass" id="forgetPass"> Esqueci a senha! </button>
      <div class="justify-google">
        <button type="button" name="botao" id="google-login"> <img src="./img/google.png" class="google-logo" />Sign in
          with Google</button>
      </div>
      <div class="line">
        <hr>
      </div>
      <div class="justify-register">
        <a id="cadastro" href="#">Cadastre-se</a>
      </div> 
    <main>
    </div>`;

  const botaoCadastro = rootElement.querySelector('#cadastro');
  const botaoGoogle = rootElement.querySelector('#google-login');
  const usuario = rootElement.querySelector('#usuario');
  const divPass = rootElement.querySelector('#inputPass');
  const passwordLogin = rootElement.querySelector('#senha');
  const eye = rootElement.querySelector('#eye');
  const signInButton = rootElement.querySelector('#entrar');
  const forgetPass = rootElement.querySelector('#forgetPass');

  eye.addEventListener('click', () => {
    divPass.classList.toggle('visible');
    if (divPass.classList.contains('visible')) {
      eye.src = './img/eyesClose.svg';
      passwordLogin.type = 'text';
    } else {
      eye.src = './img/eyesOpen.svg';
      passwordLogin.type = 'password';
    }
  });

  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    SignIn(usuario.value, passwordLogin.value)
      .then(() => {
        route('/home');
      })
      .catch((handleError()));
  });

  forgetPass.addEventListener('click', () => {
    const email = usuario.value;
    if (email === null || email === '') {
      document.getElementsByName('usuario')[0].placeholder = 'Informe seu email';
      document.getElementsByName('usuario')[0].style.border = '2px solid red';
    }
    resetPass(email);
  });

  botaoCadastro.addEventListener('click', (e) => {
    e.preventDefault();
    route('/cadastro');
  });

  botaoGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    googleLogin();
  });
  return rootElement;
};
