import { registerLogin } from "../../services/index.js";
export default () => {
  const container = document.createElement("div");

  const template = `
    <div class="container">
    <div class="card">
      <h1>Cadastrar :</h1>
      <div class="label-float">
      <input type="text" id="nome" placeholder="">
      <label for="nome">Nome Completo</label>
    </div>
    <div class="label-float">
    <input type="text" id="email" placeholder="">
    <label for="email">E-mail</label>
  </div>
  <div class="label-float"></div>
  <input type="password" id="senha" placeholder="">
  <label for="senha">Senha</label>
  <div class="justify-center">
    <button type = "submit" class="btnCadastro" id="cadastrar">cadastrar</button>
  </div>
  `;

  container.innerHTML = template;

  const name = container.querySelector("#nome");
  const email = container.querySelector("#email");
  const password = container.querySelector("senha");
  const registerBtn = container.querySelector("#cadastrar");

  registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    registerLogin(email.value, password.value, name.value);
    // then(() => {
    //   window.location.hash = '#feed';
  });

  return container;
};
