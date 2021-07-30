import { onNavigate } from '../navigate.js';

export const loginPersistence = () =>{
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export async function loginWithGoogleAccount(){
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider)
  .then((result) => {
    const user = result.user;
    console.log(user.displayName)
    (onNavigate('/home'));
  })
};

export const loginWithEmailAndPassword = (userEmail, userPassword) => {
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(() => {
      onNavigate('/home');
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const createWithEmailAndPassword = (emailInput, passwordInput) => {
  firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      alert('Cadastro realizado com sucesso');
      onNavigate('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert('Falha ao cadastrar')
    });
};