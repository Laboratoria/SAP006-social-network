// Firebase

// Criar usuário
export const setUserLocalStorage = (user) => {
  localStorage.setItem('uid', user.uid);
  localStorage.setItem('displayName', user.displayName);
  localStorage.setItem('email', user.email);
};

export const createUser = (name, email, password) => {
  const errorMsg = document.querySelector('#msgError');
  if (!name) {
    errorMsg.innerHTML = 'Insira um nome';
  } else {
    let user;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        user = userCredential.user;
        console.log(user);
        user.updateProfile({
          displayName: name,
        }).then(() => {
          const localUser = {
            displayName: name,
            email,
            uid: user.uid,
          };
          setUserLocalStorage(localUser);
          window.location.hash = '#login';
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Insira um e-mail válido';
          errorMsg.innerHTML = errorMessage;
        } else if (errorCode === 'auth/email-already-in-use') {
          errorMessage = 'E-mail já cadastrado';
          errorMsg.innerHTML = errorMessage;
        } else if (errorCode === 'auth/weak-password') {
          errorMessage = 'Crie uma senha';
          errorMsg.innerHTML = errorMessage;
        } else {
          errorMessage = 'Preencha todos os campos';
          errorMsg.innerHTML = errorMessage;
        }
        return error;
      });
  }
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

export const logOut = () => firebase.auth().signOut();

// Manter logado

export const stayConected = (callback) => firebase.auth().onAuthStateChanged(callback);

// User

export const userData = () => {
  const uid = localStorage.getItem('uid');
  const displayName = localStorage.getItem('displayName');
  const email = localStorage.getItem('email');
  if (!uid && !displayName && !email) {
    return null;
  }
  const user = {
    uid,
    displayName,
    email,
  };
  return user;
};

export const removeUserLocalStorage = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      localStorage.clear();
    }
  });
};

// Criar post

export const newPost = (postMsg) => {
  // const data = new Date();
  const postInf = firebase.firestore().collection('posts').add({
    name: userData().displayName,
    user: userData().uid,
    email: userData().email,
    message: postMsg,
    // date: (new Date()).toString().slice(4, 21),
    date: (new Date()).toLocaleString('pt-BR'),
    // date: data.toLocaleString('pt-BR', { timeStyle: 'short', dateStyle: 'short' }),
    like: [],
  });
  return postInf;
};

// Printar post

export const showPost = () => firebase.firestore().collection('posts').orderBy('date', 'desc').get();
