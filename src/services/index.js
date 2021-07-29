const loginEmailAndPassword = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      //console.log('deu certo', user)
      window.location.replace('/feed');

    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      //console.log('deu ruim', errorCode, errorMessage)
    });
}

const loginWithGmail = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;
      window.location.replace('/feed');
      //console.log('funcionaaaaa', credential, token, user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
}

const signUpWithGoogle = () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.replace('/');
    }).catch((error) => {
      // An error happened.
    });
}

export { loginEmailAndPassword, loginWithGmail, signUpWithGoogle, signOut }