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
                <li><a class="menu-a" id="perfil" href="/profile">Perfil</a></li>
                <li><a class="menu-a"" id="idiomas" href="/">Idiomas</a></li>
                <li><a class="menu-a" id="sair" href="/">Sair</a></li>
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

  menu.addEventListener("click", (event) => {
    const optionMenu = event.target.textContent
    console.log(optionMenu)
    optionMenuRoutes(optionMenu)
  })

}

//Pop-up idiomas  
// const optionMenuRoutes = (string) => {  
       
// }






  // header.querySelector('#sair')
  //   .addEventListener('click', () => {
  //     signOut();
  //   });


    


