export default () => {
  const headerContainer = document.createElement('div');

  const headerContent = `
  <header>
    <nav>
      <input id="nav-hurguer" type="checkbox"/>
      <label class="label" for="nav-hurguer">
        <div class="nav">
         <span class="hamburguer"></span>
        </div>
      </label>
      <ul id="menu">
        <li>Home<li>
        <li>Favoritos<li>
        <li>Minhas Receitas<li>
        <li>Sair<li>
      </ul>
    </nav>
  </header>
   `;
  headerContainer.innerHTML = headerContent;

  // const btnHamburger = headerContainer.querySelector('#nav');
  // function toggleMenu(e) {
  //   e.preventDefault();
  //   if (e.type === 'touchstart');
  //   const nav = headerContainer.querySelector('#btn-hamburguer');
  //   nav.classList.toggle('active');
  //   const active = nav.classList.contains('active');
  //   e.currentTarget.setAttribute('aria-expanded', active);
  //   if (active) {
  //     e.currentTarget.setAttribute('aria-label', 'Fechar Menu');
  //   } else {
  //     e.currentTarget.setAttribute('aria-label', 'Abrir Menu');
  //   }
  // }
  // btnHamburger.addEventListener('click', toggleMenu);
  // btnHamburger.addEventListener('touchstart', toggleMenu);

  return headerContainer;
};

/* <i class="fas fa-search"></i>
<i class="fas fa-user-circle"></i> */
