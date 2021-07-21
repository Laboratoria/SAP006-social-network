export default () => {
  const signInTemplate = `
  <section id="sign-in">
  <div id="form-sign-in">
  <h1 class="h1-login">Login</h1>
  <fieldset class="fieldset-sign-in">
  <form class="form-sign-in" action="">
    <p class="user-not-found" id="user-error">Usuário não encontrado</p>
    <p id="email-error"></p>
    <input type="email" placeholder="Email" id="login-email"/>
    <p id="password-error"></p>
    <input type="password" placeholder="Senha" id="login-password"/>
    <p class="forget-password"><a href = "index.html">Esqueceu sua senha?</a></p>
    <button type="button" id="enter">Entrar</button>
    <p class="p-sign-in">Não é cadastrado? <a href="" id="signup-link">Cadastre-se</a></p>    
    <p class="or">OU</p>
    <button type="button" id="gmail-btn"><p class="sign-google"><img src="./img/logogoogle.png" class="logo-google"/>Entrar com o Google</p></button>
    </form>
    </fieldset>
    </div>
    </section>
  `;
  return signInTemplate;
}