import { loginWithEmail } from '../../services/index.js';

export default () => {
  const register = document.createElement('div');
  register.innerHTML = `
      <link rel="stylesheet" href="./pages/Register/style.css" />

      <main class="box">
          <div class="container">
            <div class="banner">
                <img src="assets/logo.png" alt="Logo">
                <div class="title-container">
                    <h1 class="title">SeriesDay</h1>
                    <h3 class="subtitle">review de séries</h3>
                </div>
            </div>
              
            <section>
                <form class="form">
                    <input class="input" id="name" type="name" autocomplete="on" placeholder="🗒  Nome Completo" required>
                    <input class="input" id="email" type="email autocomplete="on" placeholder="✉  E-mail" required>
                    <input class="input" id="password" type="password" autocomplete="on" placeholder="⚙  Senha" required>
                    <input class="input" id="password-confirm" type="password" autocomplete="on" placeholder="⚙  Confirmar Senha" required>
                    <p id="nonUser"></p>
                </form>
                <button id="signup-button-register" class="buttons register-button">Cadastrar-se</button>
                <button id="gobackButton" class="goback-button">
                    <img src="./assets/arrow.png" alt="Ícone de Seta"> 
                </button>
            </section>
          </div>
      </main>
      
    `;

  const profileName = register.querySelector('#name');
  const email = register.querySelector('#email');
  const password = register.querySelector('#password');
  const passwordConfirm = register.querySelector('#password-confirm');
  const newUser = register.querySelector('#nonUser');
  const signUpButtonRegister = register.querySelector('#signup-button-register');
  const gobackButton = register.querySelector('#gobackButton');

  // INPUTS PARA CADASTRO
  signUpButtonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithEmail(email.value, password.value, profileName.value)
  });

  // BOTÃO DE VOLTAR PARA PÁGINA DE LOGIN
  gobackButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '';
  });

  return register;
};
