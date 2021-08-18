const loginEmailAndPassword = (email, password) => firebase
  .auth().signInWithEmailAndPassword(email, password);

const loginWithGmail = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;
      window.location.replace('/feed');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
};

const signUpWithEmailAndPassword = (email, password) => firebase
  .auth().createUserWithEmailAndPassword(email, password);

const keepMeLogged = (persistence) => {
  firebase
    .auth()
    .setPersistence(persistence)
    .then(() => {
      // eslint-disable-next-line new-cap
      const provider = new firebase.auth();
      return firebase.auth().signInWithRedirect(provider);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.replace('/');
    })
    .catch((error) => {
    });
};

const resetPassword = (email) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      // eslint-disable-next-line no-alert
      alert('E-mail enviado com sucesso! Confira sua caixa de entrada');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const currentUser = () => firebase.auth().currentUser;

const createPost = (post) => firebase.firestore().collection('post').add(post);

const getPost = () => firebase.firestore().collection('post').orderBy('date', 'desc').get();

const createHome = (user) => firebase.firestore().collection('home').doc(user.userId).set(user);

const getHome = (uid) => firebase.firestore().collection('home').where('userId', '==', uid).get()
  .then((snapshot) => snapshot);

const updateUserProfile = (name, url) => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name,
    photoURL: url,
  }).then(() => {
    console.log('Perfil atualizado');
  }).catch((error) => {
  });
};

const uploadImage = (photo, callback) => {
  const file = photo.files[0];
  const storageRef = firebase.storage().ref(`'images/' + ${file.name}`);
  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {
      callback(url);
    });
  });
};

const showUserPhoto = (currentProfilePhoto) => {
  firebase
    .auth()
    .onAuthStateChanged((user) => {
      if (user != null) {
        currentProfilePhoto.src = user.photoURL;
      } else {
        currentProfilePhoto.src = '../../img/avatar.png';
      }
    });
};

export {
  loginEmailAndPassword, loginWithGmail, signUpWithEmailAndPassword, keepMeLogged, resetPassword,
  signOut, createPost, getPost, currentUser, createHome, getHome, uploadImage,
  showUserPhoto, updateUserProfile,
};
