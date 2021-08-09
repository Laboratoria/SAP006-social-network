/* eslint-disable arrow-body-style */
export const cadastrarComEmailSenha = (emailUser, passwordRegister) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(emailUser, passwordRegister);
};

export const atualizarUsuario = (nome) => firebase.auth().currentUser.updateProfile({
  displayName: nome,
  return: atualizarUsuario,
});

// ** SIGN IN E-MAIL AND PASSOWORD //
export const SignIn = (usuario, passwordLogin) => {
  return firebase.auth().signInWithEmailAndPassword(usuario, passwordLogin);
};

export const stayLogged = () => {
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
};

// ** SIGN IN GOOGLE //
export const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider);
};

//* SIGN OUT  */
export const outLogin = () => {
  firebase.auth().signOut();
};

//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       var uid = user.uid;
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
