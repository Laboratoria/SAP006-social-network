/* eslint-disable arrow-body-style */
import { cadastrarComEmailSenha, atualizarUsuario } from '../../services/firebaseAuth.js';
import { handleError } from '../../services/error.js';
import { route } from '../../routes/navigator.js';

export const cadastro = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `<fieldset class="box">
    <legend class="title"><img src="./img/cadastro.png" alt="Título: Cadastro"></legend>
    <form class="forms">
      
    <input type="text" id="nameUser" placeholder="Nome">
    <p id="textErrorName"></p>
    <input type="email" id="emailUser" placeholder="seuemail@dominio.com">
    <p id="textErrorEmail"></p>
    <input type="password" id="passwordRegister" placeholder="Senha: mín. 6 carac. alfanuméricos">
    <i id ='seePass' class="fa fa-eye" aria-hidden="true"></i>
    <p id="textErrorPassword"></p>
    <input type="password" id="confPass" placeholder="Confirme sua senha">
    <i id ='seeConfPass' class="fa fa-eye" aria-hidden="true"></i>
    <p id="textErrorConfPassword"></p>
    </form>
    
    <button class="register" type="button" name="botao" id="enter">ENTRAR</button> 
  
    <a id="buttonLogin" href="#"> <img src="./img/login.png" alt="Entrar - Página de Login" </a>
  </fieldset>`;
  // olho para mostrar/ocultar senha
  const btnEye = rootElement.querySelector('#seePass');
  const btnConfirmEye = rootElement.querySelector('#seeConfPass');

  btnEye.addEventListener('click', () => {
    const inputSenha = rootElement.querySelector('#passwordRegister');

    if (inputSenha.getAttribute('type') === 'password') {
      inputSenha.setAttribute('type', 'text');
    } else {
      inputSenha.setAttribute('type', 'password');
    }
  });

  btnConfirmEye.addEventListener('click', () => {
    const inputConfirmSenha = rootElement.querySelector('#confPass');

    if (inputConfirmSenha.getAttribute('type') === 'password') {
      inputConfirmSenha.setAttribute('type', 'text');
    } else {
      inputConfirmSenha.setAttribute('type', 'password');
    }
  });

  const pageLogin = rootElement.querySelector('#buttonLogin');
  const enterButton = rootElement.querySelector('#enter');

  // funções para receber dos dados de cadastro//

  enterButton.addEventListener('click', (e) => {
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
      .then(() => {
        // const user = userCredential.user;
        atualizarUsuario(nameUser)
          .then(() => {
            route('/home');
          });
      })
      .catch((handleError()));
    return false;
  });
  pageLogin.addEventListener('click', (e) => {
    e.preventDefault();
    route('/login');
  });
  return rootElement;
};
