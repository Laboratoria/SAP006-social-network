export const registerLogin = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.hash = "#login";
      console.log("deu bom", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("deu ruim", errorCode, errorMessage);
    });
};
export const buttonEntrar = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const loginWithGoogle = () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(googleProvider);
};

export const logOut = () => firebase.auth().signOut();

const db = firebase.firestore();

export const postarMensagem = (postagem) => {
  return db.collection("postagens").add(postagem);
};
export const receberUsuario = () => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    return { displayName: user.displayName, uid: user.uid };
  }
};

export const deletarPostagem = (postId) => {
  return firebase.firestore().collection("postagens").doc(postId).delete();
};

export const adicionarLike = (uid, postId) => {
  return db
    .collection("postagens")
    .doc(postId)
    .update({ array_likes: firebase.firestore.FieldValue.arrayUnion(uid) });
};

export const retirarLike = (uid, postId) => {
  return db
    .collection("postagens")
    .doc(postId)
    .update({ array_likes: firebase.firestore.FieldValue.arrayRemove(uid) });
};
