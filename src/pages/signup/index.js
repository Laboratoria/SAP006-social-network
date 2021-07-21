export default () => { 
    const signUpTemplate = `
    <p id="back-sign-in">← Voltar</p>
    <section id="sign-up">
    <div id="form-sign-up">
      <h1 class="h1-signup">CADASTRE-SE</h1>
      <fieldset class="fieldset-sign-up">
      <form class="form-sign-up" action="">
      <p class="user-already-in-use" id="user-error-code">Esse e-mail já é cadastrado</p>
      <p id="email-error-code"></p>
        <input type="email" placeholder="Email" id="register-email">
      <p id="password-error-code"></p>
        <input type="password" placeholder="Senha" id="register-password">
        <button type="submit" id="register-btn">Enviar</button>
      </form>
      </fieldset>
    </div>
    </section>
    `
    return signUpTemplate
}