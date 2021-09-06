import {
  updateUserDisplayName, updateUserLevel, updateUserAuthEmail, getUserData, updateRecipeLevel,
}
  from '../../services/index.js';
import profile from './index.js';

export default () => {
  const profileInfoContainer = document.createElement('div');
  profileInfoContainer.setAttribute('class', 'padding-bottom25');
  profileInfoContainer.append(profile());

  const profileSection = document.createElement('section');
  profileSection.setAttribute('class', 'profileSection');

  const profileInfoContent = `
    <aside class="editProfileForm">
      <div class="profileChangesDiv">
        <form id="profileChanges">
          <input id="name" class="inputProfile" placeholder="Nome"></input>
          <input id="email" class="inputProfile" placeholder="email"></input>
          <select id="userLevel" class="inputProfile" name="level"> 
          <option value="" selected disabled;>Nível de Cozinha:</option>
          <option value="<i class='fas fa-fire-extinguisher'></i>&nbspQueima-panela">Queima-panela</option>
          <option value="<i class='fas fa-cookie'></i>&nbspCotidiano">Cotidiano</option>
          <option value="<i class='fas fa-cocktail'></i>&nbspAmador(a)">Amador(a)</option>
          <option value="<i class='fas fa-bread-slice'></i>&nbspProfissional/Chef">Profissional/Chef</option>
          <option value="<i class='fas fa-mitten'></i>&nbspMaster/Nível vovó">Master/Nível vovó</option>
          </select>
          <div id="notice"></div>
          <button id="saveChanges" class="saveChanges">Salvar alterações</button>
        </form>
      </div>
    <aside>
  `;

  profileSection.innerHTML = profileInfoContent;
  profileInfoContainer.append(profileSection);

  const inputName = profileInfoContainer.querySelector('#name');
  const inputEmail = profileInfoContainer.querySelector('#email');
  const userLevel = profileInfoContainer.querySelector('#userLevel');
  const notice = profileInfoContainer.querySelector('#notice');
  const btnSaveChanges = profileInfoContainer.querySelector('#saveChanges');
  const userUid = getUserData().uid;
  const form = profileInfoContainer.querySelector('#profileChanges');
  const nameDisplayedOnScreen = profileInfoContainer.querySelector('#nameDisplayedOnScreen');
  const levelDisplayedOnScreen = profileInfoContainer.querySelector('#levelDisplayedOnScreen');
  const mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function EditProfileDom() {
    if (inputName.value) {
      updateUserDisplayName(inputName.value)
        .then(localStorage.setItem('displayName', inputName.value))
        .then(nameDisplayedOnScreen.innerHTML = `${getUserData().displayName}`)
        .catch(() => {
          notice.innerHTML = '<p>Não foi possível atualizar o nome</p>';
        });
    }

    if (inputEmail.value) {
      if (mailFormat.test(inputEmail.value) === false) {
        notice.innerHTML = '<p>Digite um email válido</p>';
      } else {
        updateUserAuthEmail(inputEmail.value)
          .catch(() => {
            notice.innerHTML = '<p>Não foi possível atualizar o email, por favor, entre novamente</p>';
          });
      }
    }

    if (userLevel.value) {
      updateUserLevel(userLevel.value, userUid)
        .then(localStorage.setItem('level', userLevel.value))
        .then(levelDisplayedOnScreen.innerHTML = `${getUserData().level}`)
        .then(updateRecipeLevel(userLevel.value))
        .catch(() => {
          notice.innerHTML = '<p>Não foi possível atualizar o nível de cozinha</p>';
        });
    }
    form.reset();
  }

  btnSaveChanges.addEventListener('click', (e) => {
    e.preventDefault();
    EditProfileDom();
  });

  return profileInfoContainer;
};
