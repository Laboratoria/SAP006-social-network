import { onNavigate } from '../navigate.js';

export const loginWithGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  window.history.pushState(null, null, '#homepage');
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
