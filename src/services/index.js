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

export const removeUserLocalStorage = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      localStorage.clear();
    }
  });
};

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

// Criar post

export const newPost = (postMsg) => {
  const post = {
    name: userData().displayName,
    user: userData().uid,
    email: userData().email,
    message: postMsg,
    date: (new Date()).toLocaleString('pt-BR'),
    like: [],
  };
  const postInf = firebase.firestore().collection('posts').add(post)
    .then((doc) => {
      const addedPost = {
        ...post,
        id: doc.id,
      };
      return addedPost;
    });
  return postInf;
};

// Printar post

export const showPostCollection = () => firebase.firestore().collection('posts').orderBy('date', 'desc').get();

// Like

export const likedPost = (uid, postId) => firebase.firestore().collection('posts').doc(postId).update({ like: firebase.firestore.FieldValue.arrayUnion(uid) });

export const unLikedPost = (uid, postId) => firebase.firestore().collection('posts').doc(postId).update({ like: firebase.firestore.FieldValue.arrayRemove(uid) });

// Deletar post

export const deletePost = (postId) => firebase.firestore().collection('posts').doc(postId).delete();

// Editar post

export const editPost = (postMsg, postId) => firebase.firestore().collection('posts').doc(postId).update({ message: postMsg });
