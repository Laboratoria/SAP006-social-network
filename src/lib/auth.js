import { getTheRoad } from "../../router.js";
import { getError } from "./errors.js";


export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
    .then(() => {
    getTheRoad("/feed");
    }).catch(error => {
      getError(error);
    });
};

export const criarFirebaseconta = (email, senha, name) => {
  firebase.auth().createUserWithEmailAndPassword(email, senha)
  .then((userReturn) => {
    getTheRoad("/feed");
})
        .catch((error) => {
          getError(error);
        });

      };

 export const logOut = () => {
        firebase.auth().signOut()
        .then(() => {
          getTheRoad("/");
        }).catch((error) => {
          getError(error);
        });
      };
      

firebase.auth().languageCode = 'PT_br';     
export const loginWithEmailAndPassword = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(email, pass) 
  .then(() => {
    getTheRoad("/feed");
  }).catch((error) => {
 getError(error)
  });


};
 export const resetPassword = (email) => {
   firebase.auth().sendPasswordResetEmail(email)
   .then(()=>{
     window.alert('Link enviado para o email')
   })
   .catch((error)=> {
     getError(error)
   })
 }

 export const changeProfileImage = (file, callbackToSetNewImage) => {
  const ref = firebase.storage().ref("perfil-pic/img")
  ref.child(file.name).put(file)
    .then(() => {
      ref.child(file.name).getDownloadURL()
        .then((url) => {
          callbackToSetNewImage(url);
          firebase.auth().currentUser
            .updateProfile({
              photoURL: url,
            });
        });
    });
};

