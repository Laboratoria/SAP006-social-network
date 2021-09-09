// métodos que fazem conexão com o firebase

<<<<<<< HEAD
// Cadastrar Usuário
=======
// Criar usuário
>>>>>>> 9002f4153b9cf8b05fcfefa761c6bc64110c7c86

export const createUser = (name, email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
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
      let errorMessage = error.message;
      const errorMsg = document.querySelector('#msgError');
      if (errorCode === 'auth/invalid-email') {
        errorMessage = 'Insira um e-mail válido';
        errorMsg.innerHTML = errorMessage;
      } else if (errorCode === 'auth/weak-password') {
        errorMessage = 'Insira um nome de usuário';
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
  const user = {
    uid,
    displayName,
    email,
  };
  return user;
};

// manter usuário logado

export const setUserLocalStorage = (user) => {
  localStorage.setItem('uid', user.uid);
  localStorage.setItem('displayName', user.displayName);
  localStorage.setItem('email', user.email);
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
<<<<<<< HEAD
  // const userInf = firebase.auth().currentUser;
  const postInf = {
=======
  // const data = new Date();
  const postInf = firebase.firestore().collection('posts').add({
>>>>>>> 9002f4153b9cf8b05fcfefa761c6bc64110c7c86
    name: userData().displayName,
    user: userData().uid,
    email: userData().email,
    message: postMsg,
    // date: (new Date()).toString().slice(4, 21),
    date: (new Date()).toLocaleString('pt-BR'),
    // date: data.toLocaleString('pt-BR', { timeStyle: 'short', dateStyle: 'short' }),
    like: [],
  };

  const postCollection = firebase
    .firestore()
    .collection('posts');
  return postCollection.add(postInf);
};

// Printar post

export const showPost = () => firebase.firestore().collection('posts').orderBy('date', 'desc').get();
