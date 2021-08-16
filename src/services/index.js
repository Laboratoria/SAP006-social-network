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

const createPost = ((postText) => {
  const user = currentUser();
  const data = new Date();
  console.log(data);
  const post = {
    text: postText,
    userId: user.uid,
    date: data,
  };
  firebase.firestore().collection('post').add(post);
});

const getPost = () => firebase.firestore().collection('post').get();

const createUser = (user) => firebase.firestore().collection('user').add(user);

const getUser = () => firebase.firestore().collection('user').get();

export {
  loginEmailAndPassword, loginWithGmail, signUpWithEmailAndPassword, keepMeLogged, resetPassword,
  signOut, createPost, getPost, currentUser, createUser, getUser,
};
