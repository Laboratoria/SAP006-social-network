// aqui você exportará as funções que precisa

const email = 'isisbeatriz@gmail.com';
const password = '123456';

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

  // ** Sign-in with Google
function googleProvider() {
  // [START auth_google_provider_create]
  const provider = new firebase.auth.GoogleAuthProvider();
  // [START auth_google_provider_scopes]
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  // [START auth_google_provider_params]
  provider.setCustomParameters({
    user: "@nickname",
  });
}
function googleSignInRedirectResult() {
  // [START auth_google_signin_redirect_result]
  firebase
    .auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        let credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = credential.accessToken;
      }
      // The signed-in user info.
      let user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
    });
}
// Start a sign in process for an unauthenticated user.
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");
firebase.auth().signInWithRedirect(provider);


