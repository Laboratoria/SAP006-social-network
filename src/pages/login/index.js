export default () => {
  const container = document.createElement("div");

  const template = `
  <section class="container">
        <h2>Login Pet Friend´s</h2>
        <form action="">
            <div class="input-field">
                <input type="text" name="username" id="username"
                    placeholder="Enter Your Username">
                <div class="underline"></div>
            </div>
            <div class="input-field">
                <input type="password" name="password" id="password"
                    placeholder="Enter Your Password">
                <div class="underline"></div>
            </div>

           

        <button type="submit" class="button" id="entrar">Entrar</button>
  </form>

  <div class="footer">
      <span>Or Connect With Social Media</span>
    
          <div class="social-field facebook">
              <a href="#">
                  <i class="fab fa-facebook-f"></i>
                  Sign in with Facebook
              </a>
          </div>
        <p class="p-sign-in">Não tem uma conta? <a href=""
   class="forget-password-link" id="signup-link">Cadastre-se</a></p>    
  </div>
  </div>
       </section>
        `;
  container.innerHTML = template;

  const entrar = container.querySelector("#entrar");
  entrar.addEventListener("click", () => {
    window.location.hash = "#cadastro";
  });

  return container;
};
