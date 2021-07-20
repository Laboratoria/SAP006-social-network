export default () => {
  const loginTemplate = `
  <form action="">
    <input type="email" placeholder="email" id="emailLogin">
    <br><br>
    <input type="password" placeholder="senha" id="passwordLogin">
    <br>
    <p>Não é cadastrado? </p><button id="signup-btn">Cadastre-se!</button>
    <br>

    <button id="sendLogin">Enviar</button>
    <br>
    <br>

    <button>Entre com sua conta Gmail</button>
  </form>
  `

  return loginTemplate
}