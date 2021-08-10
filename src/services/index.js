import { onNavigate } from '../navigate.js';

// export const loginPersistence = () => {
//   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
// };

const getNewUserData = (userData, userName) => {
  const usersCollection = firebase.firestore().collection('users');
  const user = {
    id: userData.user.uid,
    name: userName,
    email: userData.user.email,
  };
  usersCollection.add(user);
};

export const loginWithGoogleAccount = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider)
    .then(() => {
      (onNavigate('/home'));
    }).catch((error) => {
      const errorField = document.getElementById('error-message');
      let errorMessage = error.message;
      switch (errorMessage) {
        case 'The popup has been closed by the user before finalizing the operation.':
          errorMessage = 'Login com Google cancelado.';
          errorField.innerHTML = errorMessage;
          errorMessage = '';
          break;
        default:
          break;
      }
    });
};

export const loginWithEmailAndPassword = (userEmail, userPassword) => {
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then(() => {
      onNavigate('/home');
    })
    .catch((error) => {
      const errorField = document.getElementById('error-message');
      let errorMessage = error.message;
      switch (errorMessage) {
        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
          errorMessage = 'Usuário não encontrado, por favor, verifique seus dados.';
          errorField.innerHTML = errorMessage;
          errorMessage = '';
          break;
        case 'The email address is badly formatted.':
          errorMessage = 'Por favor, insira um email válido.';
          errorField.innerHTML = errorMessage;
          errorMessage = '';
          break;
        case 'The password is invalid or the user does not have a password.':
          errorMessage = 'Senha inválida.';
          errorField.innerHTML = errorMessage;
          errorMessage = '';
          break;
        default:
          break;
      }
    });
};

export const createAccountWithEmailAndPassword = (
  userName,
  userEmail,
  userPassword,
  confirmPassword,
) => {
  let errorField = document.getElementById('error-sign-up-message');
  if (!userName) {
    errorField.innerHTML = 'Por favor, digite o seu nome.';
  } else if (userPassword !== confirmPassword) {
    errorField.innerHTML = 'As senhas não estão iguais, tente novamente.';
  } else {
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: userName,
        });
      })
      .then((userData) => {
        getNewUserData(userData, userName);
      })
      .catch((error) => {
        errorField = document.getElementById('error-sign-up-message');
        let errorMessage = error.message;
        switch (errorMessage) {
          case 'The email address is badly formatted.':
            errorMessage = 'Por favor, insira um email válido.';
            errorField.innerHTML = errorMessage;
            break;
          case 'The password must be 6 characters long or more.':
            errorMessage = 'A senha deve ter 6 caracteres ou mais.';
            errorField.innerHTML = errorMessage;
            break;
          case 'Password should be at least 6 characters':
            errorMessage = 'A senha deve ter pelo menos 6 caracteres';
            errorField.innerHTML = errorMessage;
            break;
          case 'The email address is already in use by another account.':
            errorMessage = 'O email já está em uso por outra conta.';
            errorField.innerHTML = errorMessage;
            break;
          default:
            break;
        }
      });
  }
};

export const logOut = () => {
  firebase.auth().signOut();
  onNavigate('/');
};

export const loadPosts = () => {
  const postsCollection = firebase
    .firestore()
    .collection('posts');
  return postsCollection.orderBy('createdAt', 'desc').get();
};

export const createPost = (textPost) => {
  const date = new Date();
  const user = firebase.auth().currentUser;
  const post = {
    text: textPost,
    userId: user.uid,
    userName: user.displayName,
    userEmail: user.email,
    createdAt: date.toLocaleString('pt-BR'),
    likes: 0,
    comments: [],
  };

  const postsCollection = firebase
    .firestore()
    .collection('posts');
  return postsCollection.add(post);
};

export const currentUser = () => firebase.auth().currentUser;
