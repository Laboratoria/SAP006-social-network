import { loginWithEmail } from '../../services/index.js';

export default () => {
    const template = document.getElementById("container").innerHTML =`
      <link rel="stylesheet" href="./pages/Register/style.css" />
      <main id="box">
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

    const profileName = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const newUser = document.getElementById('nonUser');
    const signUpButtonRegister = document.getElementById('signup-button-register');
    const gobackButton = document.getElementById('gobackButton');

    // INPUTS PARA CADASTRO
  signUpButtonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('funcionou');
    loginWithEmail(email.value, password.value, profileName.value)
  });

  // BOTÃO DE VOLTAR PARA PÁGINA DE LOGIN
  gobackButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('funcionou button img');
    window.location.hash = '';
  });

    return template;
};