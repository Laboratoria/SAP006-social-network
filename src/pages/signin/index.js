export default () => {
  const signInTemplate = `
  <section id="sign-in">
  <div id="formSignIn">
  <h1 class="h1-login">Login</h1>
  <fieldset class="fieldsetSignIn">
  <form class="formSignIn" action="">
    <input type="email" placeholder="Email" id="loginEmail"/>
    <input type="password" placeholder="Senha" id="loginPassword"/>
    <p class="forgetpassword">Esqueceu sua senha?</p>
    <button type="button" id="enter">Entrar</button>
    <p class="p-signIn">Não é cadastrado? <a href="index.html" id="signUp">Cadastre-se</a></p>
    <button type="button" id="gmail"><p class="signInGoogle"><img src="./img/logogoogle.png" class="logo-google"/>Entrar com o Google</p></button>
    </form>
    </fieldset>
    </div>
    </section>
  `;
  return signInTemplate;
}