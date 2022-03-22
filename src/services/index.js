export const registerLogin = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
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

//ATUALIZAR O NOME
export const atualizarPerfil = (displayName, photoURL) => {
  firebase.auth().currentUser;

  let userInfo = {
    ...(displayName && { displayName }),
    ...(photoURL && { photoURL }),
  };

  user
    .updateProfile(userInfo)
    .then(() => {
      // Update successful
      // ...
      console.log("Perfil atualizado");
    })
    .catch((error) => {
      // An error occurred
      // ...
      console.log(error);
    });
};

// Login

export const signIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

// Login com google

export const loginWithGoogle = () => {
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(googleProvider);
};
// Logout

export const logOut = () => {
  firebase.auth().signOut();
  window.sessionStorage.setItem("logged", false);
  window.location.hash = "#login";
};

const db = firebase.firestore();

// Enviar Post para Firestore

export const postarMensagem = (postagem) => {
  return db.collection("postagens").add(postagem);
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



// EDITAR POSTAGEM
export const editarPostagem = (text, postId) => {
  return firebase
    .firestore()
    .collection("postagens")
    .doc(postId)
    .update({ text: text });
};

// CURTIR POSTAGEM/DESCURTIR

export const curtirPostagem = (uid, postId) => {
  return firebase
    .firestore()
    .collection("postagens")
    .doc(postId)
    .update({ like: firebase.firestore.FieldValue.arrayUnion(uid) });
};

export const descurtirPostagem = (uid, postId) => {
  return firebase
    .firestore()
    .collection("postagens")
    .doc(postId)
    .update({ like: firebase.firestore.FieldValue.arrayRemove(uid) });
};
