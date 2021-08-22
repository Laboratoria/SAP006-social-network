export default () => {
    const container = document.createElement("div");

    const template = `
    <div class="container">
    <div class="card">
      <h2>Fazer login :</h2>
      <div class="label-float"></div>
      <input type="text" id="usuário" placeholder="">
      <label for="usuário">Usuário</label>
    </div>
    <div class="label-float"></div>
    <input type="password" id="senha" placeholder="">
    <label for="senha">Senha</label>
    </div>
  <div class="justify-center">
    <button>Entrar</button>
  </div>
  `;

    container.innerHTML = template;

    return container;
}