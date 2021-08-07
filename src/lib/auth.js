
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


const updateProfileName = (name) => {
  firebase
  .auth()
  .currentUser.updateProfile({displayName: name,})    
};


export const criarFirebaseconta = (email, senha, name) => {
  firebase.auth().createUserWithEmailAndPassword(email, senha)
  .then(() => {
    updateProfileName(name);
  
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

 export const resetPassword = (email) => {
   firebase.auth().sendPasswordResetEmail(email)
   .then(()=>{
     window.alert('Link enviado para o email')
   })
   .catch((error)=> {
     getError(error)
   })
 }

 export const loginWithEmailAndPassword = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(email, pass) 
  .then(() => {
    getTheRoad("/feed");
  }).catch((error) => {
 getError(error)
  });
}

export const user = (nome, url) => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: nome,
    photoURL: url,
  }).then(() => {
    console.log('funfou')
  }).catch((error) => {
    console.log(error);
  });
};

export const postImage = (photo, callback) => {
  const file = photo.files[0];
  const storageRef = firebase.storage().ref('imagens/' + file.name);

  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {
      console.log(url);
      callback(url);
    });
  });
};

