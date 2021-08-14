/* eslint-disable arrow-body-style */
import { route } from '../routes/navigator.js';
import { handleError } from './error.js';

firebase.auth().useDeviceLanguage();
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
  firebase.auth().signOut().then(() => {
    route('/login');
  })
    .catch((handleError()));
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
// //   });
export const resetPass = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      console.log('E-mail enviado com sucesso!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    route('/login');
  }
});

// export const firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     var uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
