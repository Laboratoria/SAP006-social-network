import { route } from "../router.js";

export const cadastrarComEmailSenha = (emailUser, passwordRegister) => {
  return firebase.auth().createUserWithEmailAndPassword(emailUser, passwordRegister)

};

export const atualizarUsuario = (nome) =>
  firebase.auth().currentUser.updateProfile({
    displayName: nome,
    return: atualizarUsuario
  })

console.log(atualizarUsuario)

// ** SIGN IN E-MAIL AND PASSOWORD //
export const SignIn = (usuario, passwordLogin) => {
  return firebase
    .auth().
    signInWithEmailAndPassword(usuario, passwordLogin);
};

export const stayLogged = () => {
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
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

// ** SIGN IN GOOGLE //
export const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
  provider.addScope("https://www.googleapis.com/auth/user.emails.read");
  provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read");
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

  firebase
    .auth()
    .signInWithRedirect(provider)
    .then(
      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;
            const token = credential.accessToken;
          }
          const user = result.user;
          route("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const email = error.email;
          const credential = error.credential;
          if (
            errorCode === "auth/credential-already-in-use" ||
            errorCode === "auth/account-exists-with-different-credential" ||
            email === "auth/credential-already-in-use" ||
            email === "auth/email-already-in-use" ||
            credential === "auth/credential-already-in-use" ||
            credential === "auth/email-already-in-use"
          ) {
            alert("Você já é cadastrado em nossa plataforma!");
          }
        })
    );
};

//* SIGN OUT  */
firebase
  .auth()
  .signOut()
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });


// Envie um e-mail de verificação de endereço a um usuário 
// firebase.auth().currentUser.sendEmailVerification().then(() => {
//     // Email verification sent!
//   });

