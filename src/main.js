//Este é o ponto de entrada da sua aplicação

/*import { myFunction } from './lib/index.js';

myFunction();*/

const email = "mari@email.com";
const password = "123456";

/*firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('deu bom', user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log('deu ruim', errorCode, errorMessage);
  });*/

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('logou');
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('nao logou');
  });

