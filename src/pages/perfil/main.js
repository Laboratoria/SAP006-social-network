import {
  showUserImage, changeProfileImage, updateUserProfile, goBackToFeed,
} from './data.js';

export const Profile = () => {
  const container = document.createElement('div');
  container.classList.add('div-profile');
  container.innerHTML = `
    <form method="post" class="profile-edit">
      <figure><img src="./images/name-icon.png" class="img-logo-profile"></figure>
        <div class="profile-photo-change">
        <img src="images/user.png" class="img-perfil" id="current-profile-img">
      </div>
      <div class="change-photo">
        <input type="file" class="photo-perfil" id="input-profile-new-img" accept="image/, image/jpeg, image/jpg"/>
        <p class="update-message" id="update-message"></p>
      </div>
      <div class="change-name">
        <input type="text" id="input-profile-new-name" class="new-name" placeholder=" " autocomplete="off">
        <label for="new-name" class = "profile-input-label" id="profile-input-label"> Nome ou apelido</label>
      </div>
      <div class="btn-profile-edit">
        <button id="btn-save-profile" class="btn-profile">Salvar</button>
        <button id="btn-back-to-feed" class="btn-profile">Voltar</button>
      </div>
      <p class="p-save-changes" id="p-save-changes" hidden>Alterações salvas com sucesso!</p>
    </form>
`;

  const currentProfileImage = container.querySelector('#current-profile-img');
  const inputPhoto = container.querySelector('#input-profile-new-img');
  const inputName = container.querySelector('#input-profile-new-name');
  const confirmMessage = container.querySelector('#p-save-changes');
  const btnSaveProfile = container.querySelector('#btn-save-profile');
  const btnGoBackToFeed = container.querySelector('#btn-back-to-feed');

  showUserImage(currentProfileImage);

  inputPhoto.addEventListener('change', (event) => {
    currentProfileImage.src = '';
    const file = event.target.files[0];
    currentProfileImage.src = URL.createObjectURL(file);

    const turnAnUrlValid = (url) => {
      currentProfileImage.src = '';
      currentProfileImage.src = url;
    };

    changeProfileImage(inputPhoto, turnAnUrlValid);
  });

  btnSaveProfile.addEventListener('click', (event) => {
    event.preventDefault();
    updateUserProfile(inputName.value, currentProfileImage.src);
    confirmMessage.hidden = false;
  });

  btnGoBackToFeed.addEventListener('click', (event) => {
    event.preventDefault();
    goBackToFeed();
  });

  return container;
};
