import { route } from "../router.js";

const email = "isisbeatriz@gmail.com";
const password = "123456";

// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log('deu bom', user);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log('deu ruim', errorCode, errorMessage);
//     // ..
//   });

firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("logou!");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("não logou.");
  });

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
