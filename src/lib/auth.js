<<<<<<< HEAD

=======
import { getTheRoad } from "../../router.js";
>>>>>>> 08ef583c5e7d77853bba0aa281137c164799bcb5

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
<<<<<<< HEAD
firebase.auth().signInWithEmailAndPassword(email, pass)
.then(() => {
window.history.pushState({}, "", "/register")
const popstateEvent = new PopStateEvent("popstate", {state:{}})
dispatchEvent(popstateEvent)
})
.catch(() => {
 window.alert("não logooou!")
});
}
=======
  firebase.auth().signInWithEmailAndPassword(email, pass) 
  .then(() => {
    getTheRoad("/feed");
  }).catch((error) => {
  const errorMessage = error.message;
  const errorCode = error.code;
  window.alert("Error : " + errorMessage);
  });


};

  
  
>>>>>>> 08ef583c5e7d77853bba0aa281137c164799bcb5
