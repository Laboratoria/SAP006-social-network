const db = firebase.firestore();
// const user = firebase.auth().currentUser;

export const signUp = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

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
      console.log(credentials);
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

export const userData = (name, email, uid) => db.collection('users').doc(uid).set({
  name,
  email,
});

export const postRecipe = (recipe) => db.collection('recipes').add({
  likes: 0,
  comments: 0,
  user_id: firebase.auth().currentUser.uid,
  ...recipe,
});
