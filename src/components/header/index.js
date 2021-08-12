//import { signOut } from "../../services/index.js";

export function headerMenu() {
  const header = document.querySelector('.menu-header')

  // const header = document.createElement('header');
  // header.classList.add('menu-header');
  header.innerHTML = `
        <a class="logo" href="">LOGO</a>
        <nav class="menu-nav">
            <button class="btn-mobile">
                <span class="hamburguer"></span>
            </button>
            <ul class="menu">
                <li class="menu-a" id="perfil" >Perfil</li>
                <li class="menu-a"" id="idiomas" >Idiomas</li>
                <li class="menu-a" id="sair">Sair</li>
            </ul>
        </nav>
        `;

  //body.appendChild(header)


  const btnMobile = document.querySelector('.btn-mobile')
  const menu = document.querySelector('.menu')
  const btnMenu = document.querySelector('.hamburguer')


  function toggleMenu() {
    menu.classList.toggle('active')
    btnMenu.classList.toggle('active')
  }

  btnMobile.addEventListener('click', toggleMenu)
  btnMobile.addEventListener('touchstart', toggleMenu)

  menu.addEventListener('click', (event) => {
    const optionMenu = event.target.textContent;
    console.log(optionMenu);
    if (optionMenu === 'Perfil') {
      window.history.pushState('nulo', 'nulo', '/profile');
      const popStateEvent = new PopStateEvent('popstate', { });
      dispatchEvent(popStateEvent);
    }
  });
}