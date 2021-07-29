import { home } from '../views/homepage/index.js';

export const loginWithGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  window.history.pushState(null, null, '#homepage');
};

export const loginWithEmailAndPassword = (userEmail, userPassword) => {
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(() => {
      const main = document.getElementById('root');
      window.history.pushState(null, null, '/home');
      main.innerHTML = '';
      main.innerHTML = home;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};
