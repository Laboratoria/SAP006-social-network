
function fire () {

    const criarFirebaseconta = (email, senha, name) => {
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

        
      const criarConta = document.getElementById('send');
      criarConta.addEventListener('click', (event) => {
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('password').value;
      criarFirebaseconta(email, senha, name);
      });


}

fire ();
