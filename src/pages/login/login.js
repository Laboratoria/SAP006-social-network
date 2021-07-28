export const Login = () => {
  const rootElement = document.createElement('div');
  const container = `
    <div>
      <img id="background" src="./lib/login/img/paleta3.jpg" alt="">
      <h4>Nova por aqui? <span><a href="link-cadastro">Cadastre-se</a></span></h4>
      <input type="text" class="input" placeholder="Login">
      <input type="password" class="input" placeholder="Senha">
      <a href="">Esqueceu a senha?</a><br>
      <button id="btn-login" class="login btn">LOGIN</button>
      <div>
        <h4><a id="btn-google" href="" target="_blank">Login com o Google</a></h4>
      </div>
    </div> 
  `;
  rootElement.innerHTML = container;
  const botao = rootElement.querySelector('#btn-login');
  botao.addEventListener('click', () => {
    window.history.pushState({}, '', '/signup');
    const popstateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popstateEvent);
  });
  return rootElement;
};

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({
//   login_user: 'nome@email.com',
//   login_password: '123456'
// });

// firebase.auth()
//   .signInWithPopup(provider)
//   .then((result) => {
//     /** @type {firebase.auth.OAuthCredential} */
//     const credential = result.credential;

//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     const credentialError = error.credential;
//     // ...
//   });
