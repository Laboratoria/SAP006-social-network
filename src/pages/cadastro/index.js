import { cadastrarComEmailSenha, atualizarUsuario } from "..src\services\firebaseAuth.js";

export const cadastro = () => {
 const rootElement = document.createElement('div');
 rootElement.innerHTML = `<link rel="stylesheet" href="./css/styleCadastro.css"/>
 <fieldset>
 <legend>Cadastro</legend>

 <input type="text" id="nameUser" placeholder="Nome">
 <input type="email" id="emailUser" placeholder="seuemail@dominio.com">
 <input type="password" id="passwordRegister" placeholder="Senha: mín. 6 carac. alfanuméricos">
 <input type="password" id="confPass" placeholder="Confirme sua senha">
 <input type="submit" id="btnRegister" value="Cadastrar">

 <button type="submit" name="botao" id="enter">ENTRAR</button>   

 </fieldset>`;
    //funções para receber dos dados de cadastro//
  rootElement.querySelector('#enter').addEventListener('click', () => {
    let emailUser = rootElement.getElementById('emailUser').value;
    let passwordRegister = rootElement.getElementById('passwordRegister').value;
    let nomeUsuario = rootElement.getElementById('nameUser').value;
    cadastrarComEmailSenha(emailUser, passwordRegister)
    .then((userCredential) => {
        let user = userCredential.user;
        atualizarUsuario(nomeUsuario)
        .then(() => {
            // Update successful
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });  
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode errorMessage)
      });    
  });
  return rootElement;
};
