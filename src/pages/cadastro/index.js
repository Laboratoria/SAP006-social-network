import { cadastrarComEmailSenha, atualizarUsuario } from '../../services/firebaseAuth.js';
import { route } from '../../router.js';

export const cadastro = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `<fieldset class="box">
    <legend class="title"><img src="./img/cadastro.png" alt="Título: Cadastro"></legend>
    <form class="forms">
      
    <input type="text" id="nameUser" placeholder="Nome">
    <input type="email" id="emailUser" placeholder="seuemail@dominio.com">
    <input type="password" id="passwordRegister" placeholder="Senha: mín. 6 carac. alfanuméricos">
    <input type="password" id="confPass" placeholder="Confirme sua senha">
 
    <button class="register" type="button" name="botao" id="enter">ENTRAR</button> 
  
    <a id="buttonLogin" href="#"> <img src="./img/login.png" alt="Entrar - Página de Login" </a>
  </fieldset>`;

  const pageLogin = rootElement.querySelector('#buttonLogin');
  const enterButton = rootElement.querySelector('#enter');

  enterButton.addEventListener('click', (e) => {
    e.preventDefault();
    const emailUser = rootElement.querySelector('#emailUser').value;
    const passwordRegister = rootElement.querySelector('#passwordRegister').value;
    const nomeUsuario = rootElement.querySelector('#nameUser').value;
    cadastrarComEmailSenha(emailUser, passwordRegister)
      .then((userCredential) => {
        let user = userCredential.user;
        atualizarUsuario(nomeUsuario)
          .then((result) => {
            // Update successful
          }).catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });

  pageLogin.addEventListener('click', (e) => {
    e.preventDefault();
    route('/login');
  });
  return rootElement;
};
