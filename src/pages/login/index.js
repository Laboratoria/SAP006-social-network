import {
  signIn,
  // signInWithGoogle, setUserData, getUserData,
  // getUserLevel,
  // updateUserLevel,
} from '../../services/index.js';

export default () => {
  const loginScreenContainer = document.createElement('div');
  loginScreenContainer.setAttribute('class', 'screenContainer');

  const loginScreenButtons = `
  <div class = "div-width90">
    <img class="logo" src="image/logotipo.png">
    
    <form class="initialForm">
      <h1 class="title"> Entrar </h1>
      <input type="email" id="input-email" class="signUp-input" placeholder="E-mail">
      <input type="password" id="input-password" class="signUp-input" placeholder="Senha">
      <div id="notice"> </div>

      <button type="button" id="enter-acc"  class="btn-login">Entrar</button>
      <button type="button" id="btn-google" class="btn-login"> <span class="google-icon"></span>Entrar com Google</button>
      <button type="button" id="sign-up"  class="btn-login">Criar conta</button>
      
    </form>
  </div>
  `;

  loginScreenContainer.innerHTML = loginScreenButtons;

  const btnLogin = loginScreenContainer.querySelector('#enter-acc');
  // const btnGoogle = loginScreenContainer.querySelector('#btn-google');
  const notice = loginScreenContainer.querySelector('#notice');
  const btnSignUp = loginScreenContainer.querySelector('#sign-up');

  function signInDom() {
    const inputEmail = loginScreenContainer.querySelector('#input-email').value;
    const inputPassword = loginScreenContainer.querySelector('#input-password').value;
    if (inputEmail === '' || inputPassword === '') {
      notice.innerHTML = '<p> Preencha todos os campos </p>';
    } else {
      signIn(inputEmail, inputPassword)
        .then(() => {
          window.location.hash = '#feed';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          switch (errorCode) {
            case 'auth/invalid-email':
              notice.innerHTML = '<p>Usuário ou email inválido</p>';
              break;
            case 'auth/user-disabled':
              notice.innerHTML = '<p>Usuário desabilitado</p>';
              break;
            case 'auth/user-not-found':
              notice.innerHTML = '<p>Usuário não encontrado</p>';
              break;
            case 'auth/wrong-password':
              notice.innerHTML = '<p>Usuário ou email inválido</p>';
              break;
            default:
              notice.innerHTML = `<p> ${errorMessage} </p>`;
              break;
          }
          throw new Error(errorMessage);
        });
    }
  }

  btnLogin.addEventListener('click', () => {
    signInDom();
  });

  // function signInWithGoogleDom() {
  //   signInWithGoogle()
  //     .then((user) => user.user.uid)
  //     .then((uid) => getUserLevel(uid))
  //     .then((userCollectionlevel) => {
  //       // console.log(userCollectionlevel.data().level);
  //       if (!userCollectionlevel.data().level) {
  //         console.log('Entrou aqui no if');
  //         updateUserLevel('nível não selecionado', user.user.uid)
  //           .then(() => localStorage.setItem('level', 'nível não selecionado'))
  //           .then(setUserData())
  //           .then(window.location.hash = '#feed');
  //       }
  //     })

  // setUserData()
  //   .then(updateUserLevel('Nível não selecionado', 'yWiSAd9a5wa9deCCzAWmojG7xGp2'));
  //   // console.log('level');
  //   localStorage.setItem('level', level);
  // })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       switch (errorCode) {
  //         case 'auth/credential-already-in-use':
  //           notice.innerHTML = '<p> Opa, está credencial já está em uso </p>';
  //           break;
  //         default:
  //           notice.innerHTML = `<p> ${errorMessage} </p>`;
  //       }
  //       throw new Error(errorMessage);
  //     });
  // }

  // btnGoogle.addEventListener('click', () => {
  //   signInWithGoogleDom();
  // });

  btnSignUp.addEventListener('click', () => {
    window.location.hash = '#signUp';
  });
  return loginScreenContainer;
};
