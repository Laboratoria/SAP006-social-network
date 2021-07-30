import { route } from "../../router.js";

export const cadastro = () => {
  const rootElement = document.createElement("div");
  rootElement.innerHTML = `<fieldset class="box">
    <legend class="title"><img src="./img/cadastro.png" alt="Título: Cadastro"></legend>
    <form class="forms">
      <input type="text" id="name" placeholder="Maria da Silva Santos" />
  
      <input type="email" id="username" placeholder="@mariass" />
  
      <input type="email" id="email" placeholder="seuemail@dominio.com" />
  
      <input type="text" id="tel" placeholder="( XX ) X XXXX - XXXX" />
      <input
        type="password"
        id="password"
        placeholder="Senha: mín. 6 carac. alfanuméricos"
      />
  
      <input type="password" id="confPass" placeholder="Confirme sua senha" />
  
      <input class="register" type="submit" id="btnRegister" value="Cadastrar" />
    </form>
  
    <a id="buttonLogin" href="#"> <img src="./img/login.png" alt="Entrar - Página de Login" </a>
  </fieldset>`;

  const pageLogin = rootElement.querySelector("#buttonLogin");

  pageLogin.addEventListener("click", (e) => {
   e.preventDefault();
   route("/login");
  });
  return rootElement;
};
