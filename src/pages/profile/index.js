/* eslint-disable no-tabs */
import { currentUser, createUser } from '../../services/index.js';
import { headerMenu } from '../../components/header/index.js';

export const Profile = () => {
  headerMenu();
  const loggedUser = currentUser();
  const root = document.createElement('div');
  root.innerHTML = `
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
              <input id='email' type='name' class='input-profile' value='${loggedUser.email}'>
            </p>

            <div class='redefinition'>
              <a href='#' id='reset'>Redefinir senha</a>
            </div>
				  </div>
        </fieldset>
      </form>
    </section>
    
    <nav class='btn-profile-container'>
      <button type='submit' id='SaveBtn' class='btn-save' 'btn'>Atualizar</button>
    </nav>
  </main>
  `;

  /* const avatarPhoto = root.querySelector ('.avatar-image').value; */

  const saveButton = root.querySelector('.btn-save');
  const surname = root.querySelector('#surname');
  const name = root.querySelector('#name');
  const localization = root.querySelector('#localization');
  const boat = root.querySelector('#boat');
  const email = root.querySelector('#email');

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const infoUser = {
      surname: surname.value,
      name: name.value,
      localization: localization.value,
      boat: boat.value,
      email: email.value,
      userId: firebase.auth().currentUser.uid, //seria possível trocar por 'loggedUser.uid'
    };
    createUser(infoUser);
  });

  return root;
};
