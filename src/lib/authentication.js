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
