
export default () => {
  const container = document.createElement("div");

  const template = `
    <div class="container">
    <div class="card">
    <h3>CRIAR UMA NOVA CONTA</h3>
    <form method='post'>
      <input required="required" autocomplete="off" type="text" placeholder="Insira seu nome" id="username"
        class='login-area'>
      <input required="required" autocomplete="off" type="email" placeholder="example@example.com" id="register-email"
        class="login-area">
      <input required="required" autocomplete="off" type="password" placeholder="Insira uma senha (Min. 6 digítos)"
        id="register-password" class="login-area">
      <div></div>
      <button class="btn button-area" id="button-register">Cadastre-se</button>
    </form>
  </div>
  
  `;


  container.innerHTML = template;

  return container;
}
