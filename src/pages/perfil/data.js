import { getTheRoad } from '../../lib/auth.js';
import { getError } from '../../lib/errors.js';

export const updateUserProfile = (name, url) => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name,
    photoURL: url,
  }).then(() => {
    console.log('Perfil atualizado');
  }).catch((error) => {
    getError(error);
  });
};

export const changeProfileImage = (photo, callback) => {
  const file = photo.files[0];
  const storageRef = firebase.storage().ref(`'imagens/' + ${file.name}`);
  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {
      callback(url);
    });
  });
};

export const showUserImage = (currentProfileImage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      currentProfileImage.src = user.photoURL;
    } else {
      currentProfileImage.src = '../../images/eye.png';
    }
  });
};

export const goBackToFeed = () => {
  getTheRoad('/feed');
};
