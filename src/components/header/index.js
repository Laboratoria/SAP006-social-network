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
        <li><a href="#">Sair</a><li>
      </ul>
    </nav>
    <div class="icons-header">
      <i class="fas fa-search"><input id="search"/></i>
      <i class="fas fa-sign-out-alt"></i>
    </div>
  </header>
   `;
  headerContainer.innerHTML += headerContent;

  const btnHamburger = headerContainer.querySelector('#btn-mobile');
  const nav = headerContainer.querySelector('#nav');

  function toggleMenu() {
    nav.classList.toggle('active');
  }

  btnHamburger.addEventListener('click', toggleMenu);

  return headerContainer;
};
