import { back, user, perfilImage } from './data.js';
import { postImage } from '../../lib/auth.js';

export const profile = () => {
  const container = document.createElement('div');
  container.classList.add('div-profile');
  container.innerHTML = `
 
  <form method='post' class='profile-edit'>
  <figure><img src="./images/name-icon.png" class="img-logo-profile"></figure>
  <img src='' class='imgPerfil img-perfil' id='img-Perfil'>
  <img src='images/user.png' id='photo' class='photo'>

  <div class="change-photo">
  <input type='file' class='photo-perfil' id='photo' accept='image/png, image/jpeg, image/jpg'/>
  <p class='update-message' id='update-message'></p>
  </div>

  <div class="change-name">
  <input type='text' id='new-name' class='new-name' placeholder=" " autocomplete="off">
  <label for="new-name" class = "profile-input-label" id="profile-input-label"> Nome ou apelido</label>
 </div>

  <div class='btn-profile-edit'>
    <button id='save-profile' class='btn-profile'>Salvar</button>
    <button id='back-to-home' class='btn-profile'>Voltar</button>
  </div>
</form>

`;

  const saveProfile = container.querySelector('#save-profile');
  const inputName = container.querySelector('.new-name');
  const inputPhoto = container.querySelector('.photo-perfil');
  const imgPerfil = container.querySelector('.img-perfil');
  const backToHome = container.querySelector('#back-to-home');

  inputPhoto.addEventListener('change', (event) => {
    imgPerfil.src = '';
    const file = event.target.files[0];
    imgPerfil.src = URL.createObjectURL(file);
    perfilImage(inputPhoto, validarUrl);
  });

  const validarUrl = (url) => {
    imgPerfil.src = '';
    imgPerfil.src = url;
  };

  saveProfile.addEventListener('click', (event) => {
    event.preventDefault();
    user(inputName.value, imgPerfil.src);
  });


  

  backToHome.addEventListener('click', (event) => {
    event.preventDefault();
    back();
  });
  return container;
};