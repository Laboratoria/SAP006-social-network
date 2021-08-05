import { googleLogin } from '../../services/index.js';

export default () => {
  const login = document.createElement('div');
  login.innerHTML = `
    <link rel="stylesheet" href="./pages/Login/style.css" />
    
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
                <input class="input" id="email" type="email" autocomplete="on" placeholder="E-mail" required>
                <input class="input" id="password" type="password" autocomplete="on" placeholder="Senha" required>
                <p id= "nonUser"></p>
                </form>

                <div class="signin">
                <button id="signin-button" class="signin-button buttons">Entrar</button>
                <p> OU </p>
                </div>

            </section>

            <button id="google-button" class="google-button buttons">
                <img class="google-icon-btn" src="../../assets/google-icon.svg" alt="Ícone do Google"/>
                Entrar com Conta Google
            </button>

            <button id="signup-button" class="signup-button buttons"> Não possui cadastro? <span>Clique aqui</span> </button>

        </div>

    </main>
    
    `;

  // VARIAVEIS
  const email = login.querySelector('#email');
  const password = login.querySelector('#password');
  const newUser = login.querySelector('#nonUser');
  const signInButton = login.querySelector('#signin-button');
  const signUpButton = login.querySelector('#signup-button');

  // LOGIN DE USUARIOS EXISTENTES POR EMAIL E SENHA
  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`descobrir oq é ${user}`);
        window.location.hash = 'timeline'; // ir para o feed
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        newUser.innerHTML = ('Não há registro de usuário correspondente a este Email');
        console.log(`descobrir oq é ${errorCode} e ${errorMessage}`);
      });
  });

  // BOTÃO PARA MUDAR PARA A PAGINA DE CADASTRO APÓS O CARREGAMENTO DA PAGINA
  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'register'; // ir para pagina cadastro
  });

  //  AUTENTICAÇÃO COM CONTA GOOGLE
  const googleButton = login.querySelector('#google-button');

  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    googleLogin(provider);
  });
  return login;
};
