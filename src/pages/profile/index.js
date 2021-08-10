/* eslint-disable no-tabs */
// import { signOut } from '../../services/index.js';

export const Profile = () => {
  const root = document.createElement('div');
  root.innerHTML = `
	<header>
		<h3> A Bordo Perfil </h3>
	</header>
	<main class='profile-container row'>
		<section class='profile-form col-11'>
			<form>
        <fieldset class='fieldset-container'>
					<legend class='legend'> Seu Perfil </legend>
          <section class='profile-image-container col-4'>
            <label class='label-image'>
            <input type='file'>
            <figure class='profile-figure'>
              <img src='img/avatar.png' class='avatar-image' alt='avatar'>
              <figcaption class='avatar-figcaption'>
                <img src='img/camera-figcaption.png'    >
              </figcaption>
            </figure>
          </section>

					<div class='form-fields col-9 '>
						<p>Apelido:
							<input id='surname' type='name' class='input-profile'>
            </p>

            <p>Nome Completo:
              <input id='name' type='name' class='input-profile'>
            </p>

            <p>Localização:
              <input id='localization' type='localization' class='input-profile'>
            </p>

            <p>Nome e Modelo do Barco:
              <input id='boat' type='name' class='input-profile'>
            </p>

            <p>Email:
              <input id='email' type='name' class='input-profile'>
            </p>

            <div class='redefinition'>
              <a href='#' id='reset'>Redefinir senha</a>
            </div>
				  </div>
        </fieldset>
      </form>
    </section>
    
    <nav class='btn-profile-container'>
      <button type='submit' id='SaveBtn' class='btn-save' 'btn'>Salvar</button>
    </nav
  </main>
  `;

  /* const avatarPhoto = root.querySelector ('.avatar-image').value; */

  const saveButton = root.querySelector('.btn-save');

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const surname = root.querySelector('#surname').value;
    const name = root.querySelector('#name').value;
    const localization = root.querySelector('localization').value;
    const boat = root.querySelector('boat').value;
    const email = root.querySelector('email').value;
    
  });

  console.log(surname);

  return root;
};
