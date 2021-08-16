import { signOut } from '../../services/index.js';

export function headerMenu() {
  const rootMain = document.querySelector('.root');
  rootMain.innerHTML = '';
  const header = document.createElement('header');
  header.classList.add('menu-header');
  header.innerHTML = `
        <figure>
          <img src='./img/logo-header.png' alt='A bordo' class='logo-header' id='feed'/>
        </figure>
        <nav class='menu-nav'>
            <button class='btn-mobile'>
                <span class='hamburguer'></span>
            </button>
            <ul class='menu'>
                <li class='menu-a' id='profile'>PERFIL</li>
                <li class='menu-a' id='languages'>IDIOMAS</li>
                <li class='menu-a' id='logout'>SAIR</li>
            </ul>
        </nav>
        `;

  rootMain.prepend(header);

  const menu = document.querySelector('.menu');
  const btnMobile = document.querySelector('.btn-mobile');
  const nav = document.querySelector('.menu-nav');

  function toggleMenu(event) {
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    nav.classList.toggle('active');
  }

  btnMobile.addEventListener('click', toggleMenu);
  btnMobile.addEventListener('touchstart', toggleMenu);

  header.addEventListener('click', (event) => {
    const optionMenu = event.target.id;
    switch (optionMenu) {
      case 'profile':
        window.history.pushState('nulo', 'nulo', '/profile');
        const popStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popStateEvent);
        break;

      case 'languages':
        exibeModal();
        break;

      case 'logout':
        signOut();
        break;

      case 'feed':
        window.history.pushState('nulo', 'nulo', '/feed');
        const popSStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popSStateEvent);
        break;
      default:
        return //ele precisa retornar algo que mantenha o usuário na tela atual
    }
    nav.classList.remove('active');
  });

  const popupLang = document.createElement('div');
  popupLang.innerHTML = `  
    <div class='popup-wrapper'>
        <div class='popup'>
          <div class='popup-close'> x </div>
          <div class='popup-content'></div>      
        </div>
      </div>
  `;
  rootMain.appendChild(popupLang);

  const popup = popupLang.querySelector('.popup-wrapper');
  const popUpContent = popupLang.querySelector('.popup-content');

  function exibeModal() {
    popup.style.display = 'block';

    popUpContent.innerHTML = 'IDIOMAS';
  }

  popup.addEventListener('click', (event) => {
    const classNameOfClickedElement = event.target.classList[0];
    const classNames = ['popup-close', 'popup-wrapper'];
    const shoudlClosePopUp = classNames.some(
      (classNames) => classNames === classNameOfClickedElement,
    );
    if (shoudlClosePopUp) {
      popup.style.display = 'none';
    }
  });
  return header;
}