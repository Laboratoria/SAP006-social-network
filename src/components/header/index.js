import { removeUserData, signOut } from '../../services/index.js';

export default () => {
  const headerContainer = document.createElement('div');

  const headerContent = `
  <header id="header">
    <button id="btn-mobile">
      <span id="hamburger"></span>
    </button>
    <h1>FoodLovers</h1>
    <nav id="nav">
      <ul id="menu">
        <li><a href="#feed">Home</a></li>
        <li><a href="#profile">Perfil</a><li>  
        <li><a href="#postRecipe">Adicionar receita</a><li>
        <li id="signOut"><a href="#"><i class="fas fa-sign-out-alt"></i></a><li>
      </ul>
    </nav>
    <!----
      <div class="icons-header">
        <i class="fas fa-search"><input id="search"/></i>
        <i class="fas fa-sign-out-alt"></i>
      </div>
      
    --->

    <div id="noticeHeader" class='popup'>
    <p class="notice-header-p">Desculpe, não foi possível deslogar. Por favor, tente novamente.</p>
    <button id="btnOk" class="btnOk">Ok</button>
    </div>
    <div id="overlay"></div>
  </header>
   `;
  headerContainer.innerHTML += headerContent;

  const btnHamburger = headerContainer.querySelector('#btn-mobile');
  const nav = headerContainer.querySelector('#nav');
  const btnSignOut = headerContainer.querySelector('#signOut');
  const btnOk = headerContainer.querySelector('#btnOk');
  const toggle = headerContainer.querySelectorAll('#overlay, #noticeHeader');

  function toggleMenu() {
    nav.classList.toggle('active');
  }

  function toggleSignOutnotice() {
    toggle.forEach((elem) => elem.classList.toggle('active'));
  }

  function signinOutDom() {
    signOut().then(() => {
      removeUserData();
    }).catch(() => {
      toggleSignOutnotice();
    });
  }

  btnHamburger.addEventListener('click', toggleMenu);

  btnSignOut.addEventListener('click', signinOutDom);

  btnOk.addEventListener('click', toggleSignOutnotice);

  return headerContainer;
};
