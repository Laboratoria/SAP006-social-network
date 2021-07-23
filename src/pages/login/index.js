export const Login = () => {
  const root = document.createElement('div');

  //const login = document.createTextNode()
  root.innerHTML = `
    <section id="login">
    <form id="labelsForLogin">
      <label for="email">E-mail:</label>
      <input id="email" type="e-mail">

      <label for="password">Senha:</label>
      <input id="password" type="">

      Ainda não é cadastrado? <a href="click here">Clique Aqui</a>
      <button type="button" id="buttonLogin" class="btn">Enviar</button>
    </form>
  </section>
    `;

  //root.innerHTML = login
  //root.appendChild(login);
  const novaDiv = document.getElementById('.');
  document.body.insertBefore(root, novaDiv);

  const btnLogin = root.querySelector('#buttonLogin');
  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicou')
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log('deu certo', user)
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;

        console.log('deu ruim', errorCode, errorMessage)
      });
  });
};

Login()