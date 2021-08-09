

export function headerMenu() {
    const body = document.querySelector('#root')

    const header = document.createElement('header');
    header.classList.add('menu-header');
    header.innerHTML = `
        <a class="logo" href="">LOGO</a>
        <nav class="menu-nav">
            <button class="btn-mobile">
                <span class="hamburguer"></span>
            </button>
            <ul class="menu">
                <li><a class="menu-a" href="/">Perfil</a></li>
                <li><a class="menu-a"" href="/">Idiomas</a></li>
                <li><a class="menu-a" href="/">Sair</a></li>
            </ul>
        </nav>
        `;

    body.appendChild(header)

    // const style = document.querySelector('head')
    // style.innerHTML += `<link rel="stylesheet" href="./src/componentes/header/style.css"/>` 

    const style = document.querySelector('head')
    style.innerHTML += `
      body, .menu {
        margin: 0px;
        padding: 0px;  
        font-family: 'Montserrat', sans-serif;
      }
      @font-face { 
        font-family: Montserrat;
        src: url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: bold;
      }
      
      .menu-header {
        box-sizing: border-box;
        height: 70px;
        padding: 1rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #e7e7e7;
      }
      
      .menu {
        display: block;
        list-style: none;
        gap: .5rem;
        position: absolute;
        width: 50%;
        top: 70px;
        right: 0px;
        background: #e7e7e7;
        height: 0px;
        transition: .6s;
        z-index: 1000; /*colocar o maior valor possível*/
        overflow-y: auto;
        visibility: hidden;
        overflow-y: hidden;
        
      }
      
      .menu.active {
        height: calc(100vh - 70px);
        visibility: visible;
        overflow-y: auto;
      }
      
      .menu a {
        display: block;
        padding: 1rem 0;
        margin: 0 1rem;
        border-bottom: 2px solid rgba(0, 0,0, .05)
      }
      
      .menu-a {
        color: black;
        text-decoration: none;
        text-transform:uppercase;
        font-weight: bold;
      }
      
      .menu-a:hover {
        background: rgba (0, 0, 0, .05);
      }
      
      .btn-mobile {
          display: flex;
          padding: .5rem 1rem;
          font-size: 1rem;
          border: none;
          background: none;
          cursor: pointer;
          gap: .5rem; /*devo estudar gap*/
      }
        
      .hamburguer {
        display: block;
        border-top: 2px solid;
        width: 20px;
      }
      .hamburguer::after, .hamburguer::before{
        content: '';
        display: block;
        width:20px;
        height: 2px;
        background: currentColor;
        margin-top: 5px;
        transition: .3s;
        position: relative;
      }
      
      .hamburguer.active {
        border-top-color: transparent;
      }
      
      .hamburguer.active::before {
        transform: rotate(135deg);
      }
      
      .hamburguer.active::after {
        transform: rotate(-135deg);
        top: -7px;
      }
      `
    document.getElementsByTagName('head')[0].appendChild(style)


    //document.getElementsByTagName('head')[0].appendChild(style);

    const btnMobile = document.querySelector('.btn-mobile')

    function toggleMenu() {

        const menu = document.querySelector('.menu')
        const btnMenu = document.querySelector('.hamburguer')

        menu.classList.toggle('active')
        btnMenu.classList.toggle('active')
    }

    btnMobile.addEventListener('click', toggleMenu)
    btnMobile.addEventListener('touchstart', toggleMenu)

    return header;
}

