export const register = () => {
  const div = document.createElement('div');
  const content = `
    <div class="main-register">
      <img class="logo" src="../../images/flightrip.png"/>
      <div class="register">
        <form class="register-input">
          <input class="register-input" id="register-userID" type="text" placeholder="Username">
          </input>
          <input class="register-input" id="register-email" type="text" placeholder="Your e-mail">
          </input>
          <p id="email-error" class="error-message font-work"></p>
          <input class="register-input" id="register-pass" type="password" minlength="8" required placeholder="Create a password">
          </input>
          <p id="doesntMatch"></p>
          <button class="register-input" id="btn-register-confirm" type="submit">Register</button>
        </form>
      </div>
    </div>
  `;

  div.innerHTML = content;
  const registerBtn = div.querySelector('#btn-register-confirm');
  // const registerUser = div.querySelector('#register-userID');
  const registerEmail = div.querySelector('#register-email');
  const registerPass = div.querySelector('#register-pass');
  // const emailError = register.querySelector('#email-error');

  registerBtn.addEventListener('click', (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registerEmail.value,
        registerPass.value,
      )
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });
  return div;
};
