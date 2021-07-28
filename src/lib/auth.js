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

export const criarFirebaseconta = (email, senha, name) => {
  firebase.auth().createUserWithEmailAndPassword(email, senha)
  .then((userReturn) => {
    getTheRoad("/feed");
})
        .catch((error) => {
          const errorMessage = error.message;
          const errorCode = error.code;
          window.alert("Error : " + errorMessage);
        });
      };


export const loginWithEmailAndPassword = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(email, pass) 
  .then(() => {
    getTheRoad("/feed");
  }).catch((error) => {
  const errorMessage = error.message;
  const errorCode = error.code;
  window.alert("Error : " + errorMessage);
  });


};

  
  
