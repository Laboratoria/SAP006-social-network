import header from '../../components/header/index.js';

export default () => {
  const perfilContainer = document.createElement('div');
  // perfilContainer.setAttribute('class', 'profile-container');
  perfilContainer.append(header());

  const perfilSection = document.createElement('section');
  perfilSection.classList.add('mainContent');

  const perfilContent = `
        <div class="profile-nav-bar">
          <div class="profileInfo">
           <img class="profilePicture" src="../../image/chef.png">
            <section>
              <p id="nameDisplayedOnScreen">${localStorage.getItem('displayName')}</p>
              <p id="levelDisplayedOnScreen">${localStorage.getItem('level')}</p>
            </section>
          </div>
          <div id="pofilePages">
            <ul>
               <a  class="recipes" href="#myRecipes"> <li class="profile-nav-bar-options">Minhas receitas</li> </a>
               <a  class="editProfile" href="#profileInfo"> <li class="profile-nav-bar-options">Editar perfil</li> </a>
            </ul>
          </div>
          <!--- <button data-teste-btn>Teste!</button> --->
        </div>
        `;
  // perfilContainer.innerHTML = perfilContent;
  perfilSection.innerHTML = perfilContent;
  perfilContainer.append(perfilSection);

  return perfilContainer;
};
