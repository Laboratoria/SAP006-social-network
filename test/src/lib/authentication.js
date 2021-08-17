 import { onNavigate } from '../navigate.js'

 //// funções de login para criar conta chamar onnavigate
 firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then((userCredential) => {
         // Signed in
         const user = userCredential.user;
         console.log('logou!')
         // ...
     })
     .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log('não logou')
     });