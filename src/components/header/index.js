import { removeUserData, signOut } from '../../services/index.js';

export default () => {
  const headerContainer = document.createElement('div');
  headerContainer.setAttribute('id', 'headerContainer');

  const headerContent = `
    <header id="header">
      <button id="btn-mobile">
        <span id="hamburger"></span>
      </button>

      <h1 class="titleFoodLovers">FoodLovers</h1>
       
      <span class="searchbox-icon header-icon"> <i class="fas fa-search"></i> </span>
    
      <nav id="nav">
        <ul id="menu">
          <li><a href="#feed">Home</a></li>
          <li><a href="#profile">Perfil</a><li>  
          <li><a href="#postRecipe">Adicionar receita</a><li>
          <li id="signOut"><a href="#"> Sair <i class="fas fa-sign-out-alt"></i></a><li>
        </ul>
      </nav>
      
      <div id="noticeHeader" class='popup'>
      <p class="notice-header-p">Desculpe, não foi possível deslogar. Por favor, tente novamente.</p>
      <button id="btnOk" class="btnOk">Ok</button>
      </div>
      <div class="overlay"></div>
    </header>
  `;

  headerContainer.innerHTML += headerContent;

  const btnHamburger = headerContainer.querySelector('#btn-mobile');
  const nav = headerContainer.querySelector('#nav');
  const btnSignOut = headerContainer.querySelector('#signOut');
  const btnOk = headerContainer.querySelector('#btnOk');
  const toggle = headerContainer.querySelectorAll('.overlay, #noticeHeader');

  function toggleMenu() {
    nav.classList.toggle('active');
  }

  function toggleSignOutnotice() {
    toggle.forEach((elem) => elem.classList.toggle('active'));
  }

  function signinOutDom() {
    signOut().then(() => {
      removeUserData();

      const body = document.querySelector('body');
      const footerTag = body.querySelector('footer');
      footerTag.remove();
    }).catch(() => {
      toggleSignOutnotice();
    });
  }

  btnHamburger.addEventListener('click', toggleMenu);

  btnSignOut.addEventListener('click', signinOutDom);

  btnOk.addEventListener('click', toggleSignOutnotice);

  const iconSearch = headerContainer.querySelector('.searchbox-icon');

  iconSearch.addEventListener('click', () => {
    window.location.hash = '#search';
  });

  return headerContainer;
};
