//import { signOut } from "../../services/index.js";
import { headerMenu } from '../../components/header/index.js';

export const Profile = () => {
  headerMenu();
  const root = document.createElement('div');
  root.innerHTML = `
	<header>
		<h3> A Bordo Perfil </h3>
	</header>
	<main class='profile-container'>
		<section class='profile-image-container'>
			<label class='label-image'>
      <input type='file'>
      <figure class='profile-figure'>
        <img src='img/avatar.png' class='avatar-image' alt='avatar'>
        <figcaption class='avatar-figcaption'>
          <img src='img/camera-figcaption.png'    >
        </figcaption>
      </figure>
		</section>

		<section class='profile-form'>
			<form>
				<fieldset class='fieldset-container'>
					<legend> Seu Perfil </legend>
					<div class='form-fields'>
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
				  </div>
        </fieldset>
      </form>
    </section>
    
    <nav class='btn-profile-container'>
      <button type='button' id='SaveBtn' class='btn-save'>Salvar</button>

      <button type='button' id='buttonSignOut' class='btn-logout'>Sair</button>
    </nav
  </main>

  
  `;

  const avatarPhoto = root.querySelector('.avatar-image').value;
  const btnSignOut = root.querySelector('#buttonSignOut');

  btnSignOut.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });
  return root;
};