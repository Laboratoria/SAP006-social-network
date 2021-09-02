export default () => {
    const container = document.createElement("div");

    const template = `
    <div class="container">
    <div class="card"> 
      <h1>
        Ellas
      </h1>
      <div class="Login">Login</div>
    <div class="label-float">
      <input type="text" id="usuario" placeholder="E-mail">
    </div> 
     <div class="label-float">
      <input type="password" id="senha" placeholder="Senha">
    </div>
     <div class="justify-center">
       <button>Entrar</button>
     </div>
     <div>
       <hr>
     </div>
     <p>Não tem uma conta? <a href="/#cadastro">Cadastro</a></p>
  </div>
  </div> 
  `;

    container.innerHTML = template;

    return container;
}