import header from '../../components/header/index.js';
import footer from '../../components/footer/index.js';
import { getUserData } from '../../services/index.js';

export default () => {
  const perfilContainer = document.createElement('div');
  perfilContainer.setAttribute('class', 'screenContainer');

  perfilContainer.append(header());

  const perfilSection = document.createElement('section');
  perfilSection.classList.add('mainContent');

  const perfilContent = `
    <div class="profile-nav-bar">
      <div class="profileInfo">
        <img class="profilePicture" src="../../image/chef.png">
        <section>
          <p id="nameDisplayedOnScreen">${localStorage.getItem('displayName')}</p>
          <p id="levelDisplayedOnScreen">Nível: ${localStorage.getItem('level')}</p>
        </section>
      </div>
      <div id="profilePages">
        <ul>
          <a  class="recipes" href="#myRecipes"> <li class="profile-nav-bar-options">Minhas receitas</li> </a>
          <a  class="editProfile" href="#profileInfo"> <li class="profile-nav-bar-options">Editar perfil</li> </a>
        </ul>
      </div>
    </div>
  `;

  const welcomeProfileSection = document.createElement('section');
  welcomeProfileSection.setAttribute('class', 'welcomeProfile');
  welcomeProfileSection.innerHTML = `
    <div>Bem vinde ${getUserData().displayName}</div>
  `;

  perfilSection.innerHTML = perfilContent;

  perfilContainer.append(perfilSection);
  perfilContainer.append(welcomeProfileSection);

  if (window.location.hash === '#profile') {
    welcomeProfileSection.style.display = 'flex';
  }

  const body = document.querySelector('body');
  const footerTag = body.querySelector('footer');

  if (footerTag === null) {
    body.appendChild(footer());
  }

  return perfilContainer;
};
