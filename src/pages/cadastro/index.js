import { registerLogin } from "../../services/index.js";
export default () => {
  const container = document.createElement("div");

  const template = `
  <div class="container">
  <div class="card">
     <h1 class="titulo">Cadastra-se</h1>
  

   <form>
    <label for="name">
      <span>Nome</span>
        <input type="text" id="name" name="name">
  </label>

  <label for="email">
    <span>E-mail</span>
     <input type="email" id="email" name="emailG">
  </label>

<label for="password">
  <span>Senha</span>
    <input type="password" id="senha" name="passwordP">
 </label>
 <input type="submit" value="cadastrar" id="cadastrar">
 </form>
    
  </div>
</div> 
  `;

  container.innerHTML = template;
  const name = container.querySelector("#nome");
  const email = container.querySelector("#email");
  const password = container.querySelector("#senha");
  const registerBtn = container.querySelector("#cadastrar");

  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    registerLogin(email.value, password.value, name.value);
    // then(() => {
    //   window.location.hash = '#feed';
  });
  
  return container;
};
