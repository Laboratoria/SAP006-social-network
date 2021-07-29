// export {firebase.auth().createUserWithEmailAndPassword(email, password)}

export const cadastro = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      console.log('Cadastroooo!!');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Deu errado', errorCode, errorMessage);
      // ..
    });
};

// export const signIn = (email, password) => {
//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       console.log('logou!!');
//       window.location.hash = '#feed';
//       //window.history.pushState('./lib/index2.html');
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// };

export const signIn = () => {
  console.log("heyyy");
  window.location.hash = '#feed';
};

// firebase.auth().signOut().then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });

// export default cadastro();
