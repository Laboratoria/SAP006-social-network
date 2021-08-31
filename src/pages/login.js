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
          <input class="login-input" id="email-login" type="text" placeholder="Enter your e-mail adress">
          </input>
          <input class="login-input" id="password-login" type="password" placeholder="Password">
          </input>
          <a> <button class="login-input" id="lgn-btn" type="submit">Sign In</button> </a>
          <p id="loginError"></p>
        </form>
      </div>
      <h4>OU</h4>
      <div class="google-login">
        <button class="login-google" type="submit">Login with Google</button>
      </div>
      <div class="new-register">
        <p class="without-register">Not a user?</p>
        <a href="#register" class="register" id="btn-register">Register here!</a>
      </div>
    </div>
  </div>
  `;

  div.innerHTML = content;
  const loginBtn = div.querySelector('#lgn-btn');
  const getEmail = div.querySelector('#email-login');
  const getPass = div.querySelector('#password-login');
  const googleBtn = div.querySelector('.login-google');
  const loginError = div.querySelector('#loginError');

  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(getEmail.value, getPass.value)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          loginError.style.color = 'red';
          loginError.innerHTML = 'Invalid e-mail';
        } else if (errorCode === 'auth/wrong-password') {
          loginError.style.color = 'red';
          loginError.innerHTML = 'Invalid e-mail or password';
        }
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
      });
  });
  return div;
};
