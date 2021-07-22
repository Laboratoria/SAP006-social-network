
  function fire () {
    const criarFirebaseconta = (email, senha, userName) => {
        firebase.auth().createUserWithEmailAndPassword(email, senha).then((userReturn) => {
          userReturn.user.updateProfile({
            displayName: userName,
          }).then(() => {
          }, (error) => {
            alert('Lamento, algo deu errado!', error);
          });
        });
      };
    
const criarConta = document.getElementById('send');
criarConta.addEventListener('click', (event) => {
   event.preventDefault();

   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const senha = document.getElementById('password').value;
   criarFirebaseconta(email, senha, name);
   if (name === '' || email === '' || senha === '') {
     alert('Por favor preencha todos os campos');
   } else {
     alert('Sua conta foi criada com sucesso ');
     window.history.pushState(null, null, '/');
  
   }
 });


  }

  fire();
  

