// import { onNavigate } from '../navigate.js';

export const auth = firebase.auth();

// funções de login para criar conta chamar onnavigate
export const loginWithEmailAndPassword = (email, password) =>
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('logou!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('não logou');
        });
