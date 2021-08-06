
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



/*
export const updateProfile = (name) => {
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .update({
      userName: name,
    })
    .then(() => {
      updateProfileName(name);
      console.log("Edited user successfully!");
    })
    .catch(() => {
      console.error("You cannot cancel this edit");
    });
};
*/

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
export const loginWithEmailAndPassword = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(email, pass) 
  .then(() => {
    getTheRoad("/feed");
  }).catch((error) => {
 getError(error)
  });
}

 export const resetPassword = (email) => {
   firebase.auth().sendPasswordResetEmail(email)
   .then(()=>{
     window.alert('Link enviado para o email')
   })
   .catch((error)=> {
     getError(error)
   })
 }


/*
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
*/


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
