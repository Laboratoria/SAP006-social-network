import { onNavigate } from '../navigate.js';
//import { createPost } from '../views/homepage/index.js';

export const loginPersistence = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
};

export async function loginWithGoogleAccount() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider)
    .then(() => {
      (onNavigate('/home'));
    }).catch((error) => {
      const message = error.message;
      alert(message);
    });
}

export const loginWithEmailAndPassword = (userEmail, userPassword) => {
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(() => {
      onNavigate('/home');
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const createWithEmailAndPassword = (emailInput, passwordInput) => {
  firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput)
    .then((userData) => {
      getNewUserData(userData);
      alert('Cadastro realizado com sucesso');
      onNavigate('/');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert('Falha ao cadastrar');
    })
};

export const getNewUserData = (userData) => {
  const usersCollection = firebase.firestore().collection('users');
  const user = {
    id: userData.user.uid,
    name: userData.user.displayName,
    email: userData.user.email,
  }
  usersCollection.add(user);
}

export const verifyUser = async () => {
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("usuário logado")
    } else {
      console.log("usuário não logado")
    } 
  })
};
