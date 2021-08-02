import { cadastrarComEmailSenha, atualizarUsuario } from '../../services/firebaseAuth.js';
// import { route } from "../../router.js";

export const cadastro = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `<fieldset class='box' name='dados'>
 <legend class="title"><img src="./img/cadastro.png" alt="Título: Cadastro"></legend>
 <form class="forms">
 <input type="text" id="nameUser" placeholder="Nome">
 <input type="email" id="emailUser" placeholder="seuemail@dominio.com">
 <input type="password" id="passwordRegister" placeholder="Senha: mín. 6 carac. alfanuméricos">
 <input type="password" id="confPass" placeholder="Confirme sua senha">

  <input class="register" type="submit" id="btnRegister" value="Cadastrar" />
 </form>

 <button type="submit" name="botao" id="enter">ENTRAR</button>   

 </fieldset>`;

  // funções para receber dos dados de cadastro//
  rootElement.querySelector('#enter').addEventListener('click', (e) => {
    e.preventDefault();
    const emailUser = rootElement.querySelector('#emailUser').value;
    const passwordRegister = rootElement.querySelector('#passwordRegister').value;
    const nomeUsuario = rootElement.querySelector('#nameUser').value;
    cadastrarComEmailSenha(emailUser, passwordRegister)
      .then((userCredential) => {
        const user = userCredential.user;
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
        console.log(errorCode, errorMessage);
      });
  });
  return rootElement;
};

// const pageLogin = rootElement.querySelector("#buttonLogin");

// pageLogin.addEventListener("click", (e) => {
//  e.preventDefault();
//  route("/login");
// });
// return rootElement;
// };
