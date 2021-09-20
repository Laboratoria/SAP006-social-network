export const registerLogin = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.hash = '#login';
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

// Login do cadastro

export const buttonEntrar = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

// Login com a conta google

export const loginWithGoogle = () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(googleProvider);
};
// Logout

export const logOut = () => firebase.auth().signOut();

const db = firebase.firestore();

// Enviar Post para Firestore

export const postarMensagem = (postagem) => {
  return db.collection('postagens').add(postagem);
};

// Usuário

export const receberUsuario = () => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    
    return { displayName: user.displayName, uid: user.uid };
  }
};

//DELETAR POST

export const deletarPostagem = (postId) => {
  return firebase.firestore().collection("postagens").doc(postId).delete();
  
};

export const likesPost = (postId) => {
  getFirebase()
    .firestore()
    .collection('posts').doc(postId)
    .get()
    .then((post) => {
      const arrayLikes = post.data().likes;
      const likesInPost = getFirebase()
        .firestore()
        .collection('posts').doc(postId);
      if (getUserIdOnLocalStorage()) {
        likesInPost.update({

          likes: getFirebase().firestore.FieldValue.arrayUnion(getUserIdOnLocalStorage()),
        });
      }
      if (arrayLikes.includes(getUserIdOnLocalStorage())) {
        likesInPost.update({
          likes: getFirebase().firestore.FieldValue.arrayRemove(getUserIdOnLocalStorage()),
        });
      }
    });
};

// //like curtida 
// export const curtirPostagem = (uid, postId) => {
//   return firebase
//     .firestore()
//     .collection("postagens")
//     .doc(postId)
//     .update({ like: firebase.firestore.FieldValue.arrayUnion(uid) });
// };