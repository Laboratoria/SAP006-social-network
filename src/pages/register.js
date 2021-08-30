/* firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  }); */

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
          <input class="register-input" id="register-pass" type="password" minlength="8" required placeholder="Create a passwaord">
          </input>
          <p id="doesntMatch"></p>
          <button class="register-input" id="btn-register-confirm" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  `;

  div.innerHTML = content;
  const registerBtn = div.querySelector('#btn-register-confirm');
  // const registerUser = div.querySelector('#register-userID');
  const registerEmail = div.querySelector('#register-email');
  const registerPass = div.querySelector('#register-pass');

  registerBtn.addEventListener('click', (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        // registerUser.value,
        registerEmail.value,
        registerPass.value,
      )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
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
