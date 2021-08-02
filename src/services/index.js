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

export const signIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      console.log('logou!!');
      window.location.hash = '#feed';
      // window.history.pushState('./lib/index2.html');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (email === '' || password === '') {
        alert('Preencha todos os campos');
      } else if (errorCode === 'auth/invalid-email') {
        alert('email inválido');
      } else if (errorCode === 'auth/user-disabled') {
        alert('Usuário desabilitado');
      } else if (errorCode === 'auth/user-not-found') {
        alert('Usuário inválido');
      } else if (errorCode === 'auth/wrong-password') {
        alert('Senha incorreta');
      } else {
        alert(errorMessage);
      }
    });
};

// export const signIn = () => {
//   console.log("heyyy");
//   window.location.hash = '#feed';
// };

// firebase.auth().signOut().then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });

// export default cadastro();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credentials = {
        credecial: result.credential,
        token: result.credential.accessToken,
        user: result.user,
      };
      window.location.hash = '#feed';
      return credentials;
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/credential-already-in-use') {
        alert('Opa, está credencial já está em uso');
      } else {
        alert(error.message);
      }
    });
};
