import { cadastrarComEmailSenha, atualizarUsuario } from '../../services/firebaseAuth.js';

export const cadastro = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `<link rel="stylesheet" href="./css/styleCadastro.css"/>
 <fieldset class='box' name='dados'>
  <legend class="title"><img src="./img/cadastro.png" alt="Título: Cadastro">Cadastro</legend>
  <form class="forms">
    <input type="text" id="nameUser" placeholder="Nome">
    <p id="textErrorName"></p>
    <input type="email" id="emailUser" placeholder="seuemail@dominio.com">
    <p id="textErrorEmail"></p>
    <input type="password" id="passwordRegister" placeholder="Senha: mín. 6 carac. alfanuméricos">
     <p id="textErrorPassword"></p>
    <input type="password" id="confPass" placeholder="Confirme sua senha">
    <p id="textErrorConfPassword"></p>
  </form>
  <button type="button" name="botao" id="enter">CADASTRAR</button>   
</fieldset>`;
  // funções para receber dos dados de cadastro//
  rootElement.querySelector('#enter').addEventListener('click', (e) => {
    e.preventDefault();

    const nameUser = rootElement.querySelector('#nameUser').value;
    if (nameUser === '' || nameUser.length < 3) {
      const errorNameField = document.getElementById('textErrorName');
      errorNameField.innerHTML = 'Preencha campo NOME corretamente';
      nameUser.focus();
      return false;
    }

    const emailUser = rootElement.querySelector('#emailUser').value;
    if (emailUser === '' || emailUser.indexOf('@') === -1 || emailUser.indexOf('.') === -1) {
      const errorEmailField = document.getElementById('textErrorEmail');
      errorEmailField.innerHTML = 'Preencha campo EMAIL corretamente';
      emailUser.focus();
      return false;
    }
    const passwordRegister = rootElement.querySelector('#passwordRegister').value;
    const passwordConfirm = rootElement.querySelector('#confPass').value;
    if (passwordRegister.length < 6 || passwordRegister.match(/[0-9]/g) == null) {
      const errorPasswordField = document.getElementById('textErrorPassword');
      errorPasswordField.innerHTML = 'A senha precisa ter pelo menos 6 dígitos, com pelo menos um número';
    }
    if (passwordRegister !== passwordConfirm) {
      document.getElementById('textErrorConfPassword').innerHTML = 'Senha não confere';
    }

    cadastrarComEmailSenha(emailUser, passwordRegister)
      .then((userCredential) => {
        const user = userCredential.user;
        atualizarUsuario(nameUser)
          .then((result) => {
            window.history.pushState({}, '', '/home');
            const popstateEvent = new PopStateEvent('popstate', { state: {} });
            dispatchEvent(popstateEvent);
          }).catch((error) => {
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });
  return rootElement;
};
