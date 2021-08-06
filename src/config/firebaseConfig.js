const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDrtGULVHgv-mosHuxyVxCLRVYUMlpNLII',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###',
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrtGULVHgv-mosHuxyVxCLRVYUMlpNLII",
  authDomain: "sap006-social-network.firebaseapp.com",
  projectId: "sap006-social-network",
  storageBucket: "sap006-social-network.appspot.com",
  messagingSenderId: "481484218104",
  appId: "1:481484218104:web:52e01c843e49a9af40650d",
  measurementId: "G-G783060WM9"
};

export const dbFirebase = firebase.firestore();
