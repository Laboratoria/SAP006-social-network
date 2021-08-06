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

export const signIn = (email, password) => firebase
  .auth().signInWithEmailAndPassword(email, password);

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

export const signOut = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
