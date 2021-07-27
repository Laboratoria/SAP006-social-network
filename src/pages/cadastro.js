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
  
    <button class="enter" type="submit" name="botao" id="entrar"><img src="./img/login.png" alt="Entrar - Página de Login"</button>
  </fieldset>`;

  return rootElement;
};
