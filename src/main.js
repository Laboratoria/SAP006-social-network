import feed from './src/pages/feed/index.js'

// myFunction();

const email = 'karenfcorrea@gmail.com'
const password = '12345678'

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("logou!")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });