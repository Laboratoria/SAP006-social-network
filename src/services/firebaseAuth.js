/* eslint-disable arrow-body-style */
import { route } from '../routes/navigator.js';
import { handleError } from './error.js';

firebase.auth().useDeviceLanguage();



export const cadastrarComEmailSenha = (emailUser, passwordRegister) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(emailUser, passwordRegister);
};
export const atualizarUsuario = (nome, photoProfile) => firebase.auth().currentUser.updateProfile({
  displayName: nome,
  photoURL: photoProfile,
  return: atualizarUsuario,
});

// ** SIGN IN E-MAIL AND PASSOWORD //
export const SignIn = (usuario, passwordLogin) => {
  return firebase.auth().signInWithEmailAndPassword(usuario, passwordLogin).then((result) => {
    route('/home');
    localStorage.setItem('displayName', result.user.displayName);
    localStorage.setItem('email', result.user.email);
  })
    .catch(handleError);
};

// export const stayLogged = () => {
//   return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
// };

// ** SIGN IN GOOGLE //
export const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider).then((result) => {
      route('/home');
      localStorage.setItem('displayName', result.user.displayName);
      localStorage.setItem('email', result.user.email);
    })
    .catch(handleError);
};

//* SIGN OUT  */
export const outLogin = () => {
  firebase.auth().signOut().then(() => {
    route('/login');
    localStorage.clear();
  })
    .catch((handleError()));
};

export const resetPass = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
    .then((result) => {
      localStorage.setItem('displayName', result.user.displayName);
      localStorage.setItem('email', result.user.email);
    })
    .catch(handleError);
};

// firebase.auth().onAuthStateChanged((user) => {
//   if (!user) {
//     route('/login');
//   }
// });
