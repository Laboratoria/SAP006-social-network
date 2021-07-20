export default () => {
  const createProfileTemplate = `
  <form action="">
    <input type="text" placeholder="Foto de perfil" id="input-profile-image">
    <br><br>
    <input type="text" placeholder="Nome de usuário" id="input-username">
    <br>
    

    <button id="send-profile">Enviar</button>
    <br>
    <br>

  </form>
  `

  return createProfileTemplate
}