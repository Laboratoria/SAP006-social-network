/* eslint-disable no-tabs */
import { createHome, currentUser, getHome } from '../../services/index.js';
import { headerMenu } from '../../components/header/index.js';

export const Profile = () => {
  headerMenu();
  const loggedUser = currentUser();
  const root = document.createElement('div');
  root.classList.add('root-profile');
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
                <img src='img/camera-figcaption.png'>
              </figcaption>
            </figure>
          </section>

					<div class='form-fields col-9 '>
            <p>Nome Completo:
              <input id='name' type='name' class='input-item' value='${loggedUser.displayName}'>
            </p>

            <p>Localização:
              <input id='localization' type='localization' class='input-item' value='${null}'>
            </p>

            <p>Nome e Modelo do Barco:
              <input id='boat' type='name' class='input-item' value='${null}'>
            </p>

            <p>Email:
              <input id='email' type='name' class='input-item' value='${loggedUser.email}' disabled>
            </p>

            <div class='redefinition'>
              <a href='#' id='reset'>Redefinir senha</a>
            </div>

            <nav class='btn-profile-container'>
              <button type='submit' id='saveBtn' class='saveBtn'>Atualizar</button>
            </nav>
				  </div>
        </fieldset>
      </form>
    </section>
  </main>
  `;

  /* const avatarPhoto = root.querySelector ('.avatar-image').value; */

  const saveButton = root.querySelector('#saveBtn');
  const name = root.querySelector('#name');
  const localization = root.querySelector('#localization');
  const boat = root.querySelector('#boat');
  const reset = root.querySelector('#reset');

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const infoUser = {
      localization: localization.value,
      boat: boat.value,
      userId: loggedUser.uid,
    };

    loggedUser.updateProfile({
      displayName: name.value,
    });
    createHome(infoUser);
  });

  function getInfo() {
    getHome(loggedUser.uid).then((infoUser) => {
      infoUser.docs.forEach((doc) => {
        const boatInfo = root.querySelector('#boat');
        const localizationInfo = root.querySelector('#localization');
        boatInfo.value = `${doc.data().boat}`;
        localizationInfo.value = `${doc.data().localization}`;
      });
    });
  }

  reset.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.replace('/reset');
  });

  getInfo();
  return root;
};
