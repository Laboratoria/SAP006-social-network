// Firebase

// const email = 'bruna.belo@gmail.com';
// const password = '123456';

// Criar usuário

export const createUser = (name, email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log(user);
      window.location.hash = '#login';
      user.updateProfile({
        displayName: name,
      });
      console.log('deu bom', user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log('deu ruim', errorCode, errorMessage);
    });
};

// Login com email cadastrado

export const loginUser = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

// Login com google

export const signInWithGoogle = () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(googleProvider);
};

// Logout

export const logout = () => {
  firebase.auth().signOut()
    .then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log('Erro', error);
    });
};

// Manter logado

export const stayConected = (callback) => firebase.auth().onAuthStateChanged(callback);

// User

export const userData = () => {
  const uid = localStorage.getItem('uid');
  const displayName = localStorage.getItem('displayName');
  const email = localStorage.getItem('email');
  const user = {
    uid,
    displayName,
    email,
  };
  return user;
};

export const setUserLocalStorage = (user) => {
  localStorage.setItem('uid', user.uid);
  localStorage.setItem('displayName', user.displayName);
  localStorage.setItem('email', user.email);
};
// Post

export const newPost = (postMsg) => {
  // const userInf = firebase.auth().currentUser;
  const postInf = {
    name: userData().displayName,
    user: userData().uid,
    email: userData().email,
    message: postMsg,
    data: (new Date()).toString().slice(4, 21),
    like: [],
  };

  const postCollection = firebase
    .firestore()
    .collection('posts');
  return postCollection.add(postInf);
};
