
// Este é o ponto de entrada da sua aplicação

/* import { myFunction } from './lib/index.js';

myFunction(); 
 */
//Login de novos usuários


  //Ledi login usuário já cadastrado

const txtEmail = document.getElementById('input-email');
const txtPassword = document.getElementById('input-password');
const btnLogin = document.getElementById('button-login');

btnLogin.addEventListener('click', error => {
  const email = txtEmail.value;
  const pass= txtPassword.value;
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email, pass) 
promise.then(()=>{
  alert('tudo ok!')
  window.location.replace('home.html')
  
  //window.history.pushState(null, null, '/home');//aqui colocar caminho para próxima página
  //window.location.hash('#nomedapágina');
  //return result;
})
  promise.catch(error => alert(error.message));
});




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

/*
import home from "./pages/home/index.js";

const main = document.querySelector('#root');
window.addEventListener('load', () => {
  main.appendChild(home());
} )
*/