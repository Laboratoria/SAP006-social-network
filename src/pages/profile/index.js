import header from '../../components/header/index.js';
import footer from '../../components/footer/index.js';

export default () => {
  const perfilContainer = document.createElement('div');
  perfilContainer.classList.add('div-profile');
  perfilContainer.append(header());

  const perfilSection = document.createElement('section');
  perfilSection.classList.add('profile-nav-bar');

  const perfilContent = `
      <div class="profileInfo">
        <img class="profilePicture" src="../../image/chef.png">
        <section>
          <p>Thais Fernandes</p>
          <p>Nível: Queima-panela</p>
        </section>
      </div>
      <div id="pofilePages">
        <ul>
            <a  class="recipes" href="#myRecipes"> <li class="profile-nav-bar-options">Minhas receitas</li> </a>
            <a  class="editProfile" href="#profileInfo"> <li class="profile-nav-bar-options">Editar perfil</li> </a>
        </ul>
      </div>
  `;
  perfilSection.innerHTML = perfilContent;
  perfilContainer.append(perfilSection);
  perfilContainer.append(footer());

  return perfilContainer;
};
