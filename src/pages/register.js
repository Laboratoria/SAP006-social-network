/* firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  }); */

export const register = () => {
  const div = document.createElement('div');
  const content = `
    <h1> Sign Up </h1>

    
  `;

  div.innerHTML = content;
  return div;
};
