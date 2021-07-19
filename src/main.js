import feed from './pages/feed/index.js'
import signin from './pages/signin/index.js'
import login from './pages/login/index.js'

// myFunction();

const mainLogin = document.getElementById("main")

window.addEventListener("load", () => {
  mainLogin.innerHTML = login()
  const signIn = document.getElementById("signIn")

  signIn.addEventListener("click", () => {
  mainLogin.innerHTML= signin()
  
  })
})





// firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ..
//   });




// firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     console.log("logou!")
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });