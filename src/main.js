import feed from './pages/feed/index.js'
import signin from './pages/signin/index.js'

// myFunction();

const signIn = document.getElementById("signIn")
const mainLogin = document.getElementById("main")

signIn.addEventListener("click", () => {
  
  mainLogin.innerHTML= signin()
  
})



// const email = 'karenfcorrea@gmail.com'
// const password = '12345678'

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