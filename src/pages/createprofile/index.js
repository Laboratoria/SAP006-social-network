export default () => {

  const sectionElement = document.createElement("section")
  sectionElement.setAttribute("id","create-profile")
  sectionElement.setAttribute("class","form-container")


  const createProfileTemplate = `
<<<<<<< HEAD
    <div id="form-create-profile">
      <fieldset class="fieldset-create-profile fieldset">
        <form class="form-create-profile" action="">
          <input type="text" placeholder="Foto de perfil" id="input-profile-image">
          <input type="text" placeholder="Nome de usuário" id="input-username">
          <button type="button"id="send-profile">Enviar</button>
        </form>
      </fieldset>
    </div>


=======
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
>>>>>>> 454e523f74fefb3a0ee416653c1d629fbf4206e8
  `
  return createProfileTemplate
}