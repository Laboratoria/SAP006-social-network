import header from '../../components/header/index.js';

export default () => {
  const perfilContainer = document.createElement('div');
  perfilContainer.setAttribute('class', 'profile-container');
  perfilContainer.append(header());
  const perfilContent = `
        <section class="mainContent">
        <div class="profile-nav-bar">
          <div class="profileInfo">
           <img class="profilePicture" src="../../image/chef.png">
            <section>
              <p id="nameDisplayedOnScreen">${localStorage.getItem('displayName')}</p>
              <p>nível</p>
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
        </section>
        `;
  perfilContainer.innerHTML += perfilContent;
  return perfilContainer;
};
