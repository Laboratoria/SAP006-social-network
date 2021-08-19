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

const updatePost = (idPost, post) => firebase.firestore().collection('post').doc(idPost).update(post);

const deletePostFeed = (idPost) => firebase.firestore().collection('post').doc(idPost).delete();

const getLikes = (idPost) => firebase.firestore().collection('post').doc(idPost).get();

const likePost = (idUser, idPost) => firebase.firestore().collection('post').doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayUnion(idUser) });

const dislikePost = (idUser, idPost) => firebase.firestore().collection('post').doc(idPost).update({ likes: firebase.firestore.FieldValue.arrayRemove(idUser) });

const createHome = (user) => firebase.firestore().collection('home').doc(user.userId).set(user);

const getHome = (uid) => firebase.firestore().collection('home').where('userId', '==', uid).get()
  .then((snapshot) => snapshot);

//const storageRef = firebase.storage().ref();
// Create a reference to 'mountains.jpg'
//const mountainsRef = storageRef.child('mountains.jpg');

// Create a reference to 'images/mountains.jpg'
//var mountainImagesRef = storageRef.child('images/mountains.jpg');

// While the file names are the same, the references point to different files
//mountainsRef.name === mountainImagesRef.name            // true
//mountainsRef.fullPath === mountainImagesRef.fullPath    // false

//export { deletePostFeed };

export {
  loginEmailAndPassword, loginWithGmail, signUpWithEmailAndPassword, keepMeLogged, resetPassword,
  signOut, createPost, getPost, updatePost, deletePostFeed, currentUser, createHome, getHome,
  likePost, getLikes, dislikePost,
};
