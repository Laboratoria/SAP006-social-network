export const createAccount = (email, password) => {
  firebase.auth()
  .createUserWithEmailAndPassword(email, password);
};

export const signInEmailPassword = (email, password) => {
  const signIn = firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return signIn;
};

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.history.pushState({}, null, '/login');
      const popStateEvent = new PopStateEvent('popstate', {});
      dispatchEvent(popStateEvent);
    });
};

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credentialError = error.credential;
      // ...
    });
};

export const keepLogged = () => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
};

export const resetPassword = (email) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert('Corre lá e muda sua senha, miga!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
