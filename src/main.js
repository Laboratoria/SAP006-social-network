import  { myFunction }  from  "./lib/index.js";

myFunction()

    function authentication() {

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log('Success')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Failure')
      });

    }

    const inputEmail = document.getElementById('input-email');
    const email = inputEmail.value;
    const inputPassword = document.getElementById('input-password');
    const password = inputPassword.value;
    const btnLogin = document.getElementById('button-login');
    btnLogin.addEventListener('click', authentication);


    // Sign in with Google:
    const btnLoginWithGoogle = document.getElementById("button-login-with-google");
    
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    function signInWithGoogle (event) {
      event.preventDefault();
      firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        window.location.href = "home.html"
        return result
      }).catch(error =>{
        console.error(error);
      })
    };

    btnLoginWithGoogle.addEventListener("click", signInWithGoogle)
    

