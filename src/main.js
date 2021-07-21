// Este é o ponto de entrada da sua aplicação

/* import { myFunction } from './lib/index.js';

myFunction(); 
 */
//Login de novos usuários


//const email = 'lediane141@gmail.com';//aqui só exemplo, pegar do input
//const password = '123456';

/*firebase
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

 
  //Deslogar conta do google
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  }); */


  //Ledi
  /* Vou precisar:
   <input placeholder="Email"  class="login-placeholder-input" id="input-email">
   <input placeholder="Password"  class="login-placeholder-input" id="input-password"> 

    <button class="login-button" id="button-login">ENTRAR</button>  
   */



    function authentication() {

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log('Success')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Failure')
      });

    }

    const inputEmail = document.getElementById('input-email');
    const email = inputEmail.value;
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;
    const btnLogin = document.getElementById('button-login');
    btnLogin.addEventListener('click', authentication);