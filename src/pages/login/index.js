export default () => {
  const container = document.createElement("div");

  const template = `
   <div class= "container_login">
   <div class="container_form">
   <h2 class="titulo"> Login</h2>
   <form>
   <div class="input-field">
   <input type="text" name="username" id="username"
       placeholder="Digite seu Email">
   <div class="underline"></div>
  </div>
  <div class="input-field">
  <input type="password" name="password" id="password"
      placeholder="Senha">
  <div class="underline"></div>
  </div>
  <button type="submit" class="button" id="entrar">Entrar</button>
   </form>
   <div class="footer">
              <span>Ou Conecte-se com seu email</span>
              <div class="rede_social">
              <button type="submit" class="btn" id="entrar">Gmail</button>
  </div>
  <p class="p-sign-in">Não tem uma conta? <a href=""
  class="forget-password-link" id="signup-link">Cadastre-se</a></p>    
   </div>
   </div>
    `;
  container.innerHTML = template;

  const entrar = container.querySelector(".button");
  entrar.addEventListener("click", () => {
    window.location.hash = "#feed";
  });

  return container;
};
