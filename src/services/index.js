// export {firebase.auth().createUserWithEmailAndPassword(email, password)}

export const signUp = (email, password, errorMessage) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.hash = '#profile';
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      return errorMessage(errorCode);
    });
};

export const signIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('userCredential');
      window.location.hash = '#feed';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const signOut = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.log("saiii");
    // An error happened.
  });
};
