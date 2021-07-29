// export {firebase.auth().createUserWithEmailAndPassword(email, password)}

export const signUp = (email, password, errorMessage, access) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return access();
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
