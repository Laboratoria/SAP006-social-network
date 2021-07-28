export const loginEmailAndPassword = (email, password) => {
firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    let user = userCredential.user;
    console.log('deu certo', user)
    window.location.replace('/feed')     
    
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log('deu ruim', errorCode, errorMessage)
  });

}