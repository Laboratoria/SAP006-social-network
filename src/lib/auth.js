export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
    .then(() => {
      console.log("login");
    }).catch(error => {
      console.error(error);
    });
};
        

export const criarFirebaseconta = (email, senha, name) => {
  firebase.auth().createUserWithEmailAndPassword(email, senha)
  .then((userReturn) => {
  
    const user = userReturn.user;
})
        .catch((error) => {
          const errorMessage = error.message;
          const errorCode = error.code;
          window.alert("Error : " + errorMessage);
        });


      };


export const loginWithEmailAndPassword = (email, pass) => {
  firebase.auth().signInWithEmailAndPassword(email, pass) 
  .then(() => {
  alert('tudo ok!')
    window.location.replace('home.html')
  }).catch((error) => {
  const errorMessage = error.message;
  const errorCode = error.code;
  window.alert("Error : " + errorMessage);
  });


};

  
  