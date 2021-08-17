import { getError } from './errors.js';

export const getTheRoad = (state) => {
  window.history.pushState({}, '', state);
  const popstateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popstateEvent);
};

export const loginWithEmailAndPassword = (email, pass, checkbox) => {
  if (checkbox.checked === true) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
        getTheRoad('/feed');
      }).catch((error) => {
        getError(error);
      });
    });
  } else {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
      firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
        getTheRoad('/feed');
      }).catch((error) => {
        getError(error);
      });
    });
  }
};

export const loginWithGoogle = (checkbox) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  if (checkbox.checked === true) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      firebase.auth().signInWithPopup(googleProvider).then(() => {
        getTheRoad('/feed');
      }).catch((error) => {
        getError(error);
      });
    });
  } else {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
      firebase.auth().signInWithPopup(googleProvider).then(() => {
        getTheRoad('/feed');
      }).catch((error) => {
        getError(error);
      });
    });
  }
};

const updateProfileName = (name) => {
  firebase.auth().currentUser.updateProfile({ displayName: name });
};

export const registerAccount = (email, password, name, checkbox) => {
  if (checkbox.checked === true) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        updateProfileName(name);
        getTheRoad('/feed');
      }).catch((error) => {
        getError(error);
      });
    });
  } else {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        updateProfileName(name);
        getTheRoad('/feed');
      }).catch((error) => {
        getError(error);
      });
    });
  }
};

export const logOut = () => {
  firebase.auth().signOut().then(() => {
    getTheRoad('/');
  }).catch((error) => {
    getError(error);
  });
};

export const resetPassword = (email) => {
  firebase.auth().sendPasswordResetEmail(email).then(() => {
  }).catch((error) => {
    getError(error);
  });
};

export const sendImageToDatabase = (file, showUrlOfImagesToPubish) => {
  const ref = firebase.storage().ref('images/');
  ref.child(file.name).put(file).then(() => {
    ref.child(file.name).getDownloadURL().then((url) => {
      showUrlOfImagesToPubish(url);
    });
  });
};

firebase.auth().languageCode = 'PT_br';
