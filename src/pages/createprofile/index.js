export default () => {
  const createProfileTemplate = `
  <section id="create-profile">
    <div id="form-create-profile">
        <fieldset class="fieldset-create-profile">
          <form class="form-create-profile" action="">
            <input type="text" placeholder="Foto de perfil" id="input-profile-image">
            <input type="text" placeholder="Nome de usuário" id="input-username">
            <button type="button"id="send-profile">Enviar</button>
          </form>
        </fieldset>
    </div>
  </section>
  `
  return createProfileTemplate
}