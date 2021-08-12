
import { getTheRoad } from "../../router.js";
import { getError } from "./errors.js";



export const loginWithEmailAndPassword = (email, pass, checkbox) => {
  if (checkbox.checked === true) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return  firebase.auth().signInWithEmailAndPassword(email, pass) 
      .then(() => {
        getTheRoad("/feed");
      }).catch((error) => {
        getError(error)
      });
    });
  } else {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(() => {
      return  firebase.auth().signInWithEmailAndPassword(email, pass) 
      .then(() => {
        getTheRoad("/feed");
      }).catch((error) => {
        getError(error)
      });
    });
  };
}
    
export const loginWithGoogle = (checkbox) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  if (checkbox.checked === true) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return  firebase.auth().signInWithPopup(googleProvider)
      .then(() => {
        getTheRoad("/feed");
      }).catch((error) => {
        getError(error)
      });
    });
  } else {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(() => {
      return  firebase.auth().signInWithPopup(googleProvider)
      .then(() => {
        getTheRoad("/feed");
      }).catch((error) => {
        getError(error)
      });
    });
  };
};

const updateProfileName = (name) => {
  firebase
  .auth().currentUser
  .updateProfile({displayName: name,})    
};

export const criarFirebaseconta = (email, senha, name, checkbox) => {
  if (checkbox.checked === true) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then(() => {
        updateProfileName(name);
        getTheRoad("/feed");
      })
      .catch((error) => {
        getError(error);
      });
    });
  } else {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(() => {
      firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then(() => {
        updateProfileName(name);
        getTheRoad("/feed");
      })
      .catch((error) => {
        getError(error);
      });
    });
  };
};

export const logOut = () => {
  firebase.auth().signOut()
  .then(() => {
    getTheRoad("/");
  }).catch((error) => {
    getError(error);
  });
};
      
export const resetPassword = (email) => {
   firebase.auth().sendPasswordResetEmail(email)
   .then(() => {
     window.alert('Link enviado para o email')
   })
   .catch((error)=> {
     getError(error)
   });
 };

export const sendImageToDatabase = (file, showUrlOfImagesToPubish) => {
  const ref = firebase.storage().ref('images/');
  ref.child(file.name).put(file)
  .then(() => {
    ref.child(file.name).getDownloadURL()
    .then(url => showUrlOfImagesToPubish(url));
  });
};

firebase.auth().languageCode = 'PT_br';  