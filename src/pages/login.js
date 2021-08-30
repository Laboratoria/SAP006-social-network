export const login = () => {
  const div = document.createElement('div');
  const content = `
  <div class="main-login">
    <div class="login-images">
      <img class="image-desktop" src="images/hint-green.png"/>
    </div>
    
    <div class="login-data">
      <div class="mail-login">
        <form class="login-input">
          <input class="login-input" id="email-login" type="text" placeholder="E-mail ou nome do usuário">
          </input>
          <input class="login-input" id="password-login" type="password" placeholder="Insira sua senha">
          </input>
          <a> <button class="login-input" id="lgn-btn" type="submit">Login</button> </a>
        </form>
      </div>
      <h4>OU</h4>
      <div class="google-login">
        <button class="login-google" type="submit">Entrar com Google</button>

      </div>
      <div class="new-register">
        <p class="without-register">Ainda não tem uma conta?</p>
        <a href="#register" class="register" id="btn-register">Cadastre-se aqui!</a>
      </div>
    </div>
  </div>

  `;

  div.innerHTML = content;
  const loginBtn = div.querySelector('#lgn-btn');
  const getEmail = div.querySelector('#email-login');
  const getPass = div.querySelector('#password-login');
  const googleBtn = div.querySelector('.login-google');

  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(getEmail.value, getPass.value)
      .then((userCredential) => {
        window.location.hash = '#feed';
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch(() => {
        alert('Tente novamente');
      });
  });

  googleBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        alert('Erro. Tente novamente.');
      });
  });
  return div;
};
