// Este é o ponto de entrada da sua aplicação

/* import { myFunction } from './lib/index.js';

myFunction(); 
 */
//Login de novos usuários
const email = 'lediane141@gmail.com';//aqui só exemplo, pegar do input
const password = '123456';

firebase
.auth()
.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('deu bom', user)
    // ...
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log('não logou', errorCode, errorMessage)
  });

  //Login de novos usuários
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    console.log('logou!')
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('não logou =(')
  });

  //Deslogar conta do google
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });