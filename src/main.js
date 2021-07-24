
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



   //julli crate account 


   
   

    const criarFirebaseconta = (email, senha, userName) => {
        firebase.auth().createUserWithEmailAndPassword(email, senha).then((userReturn) => {
          userReturn.user.updateProfile({
            displayName: userName,
          }).then(() => {
          }, (error) => {
            alert('Lamento, algo deu errado!', error);
          });
        });
      };
    
const criarConta = document.getElementById('send');
criarConta.addEventListener('click', (event) => {
   event.preventDefault();

   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const senha = document.getElementById('password').value;
   criarFirebaseconta(email, senha, name);
   if (name === '' || email === '' || senha === '') {
     alert('Por favor preencha todos os campos');
   } else {
     alert('Sua conta foi criada com sucesso ');
     window.history.pushState(null, null, '/');
  
   }
 });




  














import {
    myFunction,
} from "./lib/index.js";


myFunction()

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

// Sign in with Google:
const btnLoginWithGoogle = document.getElementById("button-login-with-google");

const googleProvider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle(event) {
  event.preventDefault();
  firebase.auth().signInWithPopup(googleProvider)
    .then((result) => {
     window.location.replace("home.html")
            return result
        }).catch(error => {
            console.error(error);
        })
};

btnLoginWithGoogle.addEventListener("click", signInWithGoogle)





