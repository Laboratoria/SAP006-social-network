 export default () => {
    const container = document.createElement("div");

    const template = `
    <div class="container">
    <div class="card">
      <h2>Cadastrar-se :</h2>
      <div class="label-float"></div>
      <input type="text" id="nome completo" placeholder="">
      <label for="Nome completo"></label>
    </div>
    <div class="label-float"></div>
    <input type="text" id="email" placeholder="">
    <label for="E-mail"></label>
  </div>
  <div class="label-float"></div>
  <input type="password" id="senha" placeholder="">
  <label for="Senha"></label>
  </div>
  <div class="justufy-center">
    <button>Cadastrar</button>
  </div>
  `;

    container.innerHTML = template;

    return container;
}