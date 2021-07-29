export const signInWithEmail = () => {
  const signUp = firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  return signUp;
} 

