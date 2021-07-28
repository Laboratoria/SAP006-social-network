import { getTheRoad } from "../../router.js";

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
    .then(() => {
    getTheRoad("/feed");
    }).catch(error => {
      console.error(error);
    });
};
        
export const criarFirebaseconta = (email, senha) => {
  firebase.auth().createUserWithEmailAndPassword(email, senha)
  .then(() => {
    getTheRoad("/feed");
    }).catch((error) => {
      console.error(error);
    });
};

export const loginWithEmailAndPassword = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(email, pass)
  .then(() => {
    getTheRoad("/feed");
  }).catch((error) => {
    console.error(error);
  });
};