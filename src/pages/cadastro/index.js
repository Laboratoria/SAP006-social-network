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
    <button onclick = "cadastrar()">Cadastrar</button>
  </div>
  `;

  container.innerHTML = template;
  const name = container.querySelector("email");
  return container;
};
