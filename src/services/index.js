export const registerLogin = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.hash = "#login";
      console.log("deu bom", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log("deu ruim", errorCode, errorMessage);
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
  return db.collection("postagens").add(postagem);
};

// Consumir DB

export function pegarPosts() {
  let data = [];
  db.collection("postagens")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({ data: doc.data(), id: doc.id });
      });
    });
  return data;
}
// Usuário

export const usuarioData = () => {
  const uid = localStorage.getItem("uid");
  const displayName = localStorage.getItem("displayName");
  const email = localStorage.getItem("email");
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