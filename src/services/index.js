const db = firebase.firestore();

export const signUp = (email, password, errorMessage, name) => {
  db.collection('users').doc().set({
    name,
    email,
  })
    .then(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          window.location.hash = '#profile';
        })
        .catch((error) => {
          const errorCode = error.code;
          return errorMessage(errorCode);
        });
    })
    .catch((error) => {
      errorMessage('Error writing document: ', error);
    });
};

export const signIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      window.location.hash = '#feed';
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

export const signOut = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
