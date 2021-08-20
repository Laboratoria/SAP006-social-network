// import { onNavigate } from '../navigate.js';

 const auth = firebase.auth();

// funções de login para criar conta chamar onnavigate
export const loginWithEmailAndPassword = (email, password) => auth
    .signInWithEmailAndPassword(email, password)
    

// FUNÇÃO DE LOGIN COM GOOGLE
export const signInWithGloogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return auth.signInWithPopup(googleProvider) 
    
};

export const cadastrarsenha = (email, password) => auth.createUserWithEmailAndPassword(email, password)
 
