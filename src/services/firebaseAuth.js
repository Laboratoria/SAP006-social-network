export const cadastrarComEmailSenha = (emailUser, passwordRegister) => 
 firebase.auth().createUserWithEmailAndPassword(emailUser, passwordRegister);

export const atualizarUsuario = (nome) => 
 firebase.auth().currentUser.updateProfile({
        displayName: nome,
     return: atualizarUsuario})

console.log(atualizarUsuario)





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

// firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log('logou!')
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log('não logou.')
//     });

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






