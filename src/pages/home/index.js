import { outLogin } from '../../services/firebaseAuth.js';

export const home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
  <div class="containerHome">
  <header>
    <div class="menu">
      <a href="#login" class="active">Logo</a>
      <!-- Navigation links (hidden by default) -->
      <div id="myLinks">
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
      <!-- "Hamburger menu" / "Bar icon" to toggle the navigation links -->
      <a href="javascript:void(0);" class="icon" onclick="myFunction()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    <img src="img/govegGreen.png" />
  </header>
  <main>
    <ul>
      <li>Mercados</li>
      <li>Receitas</li>
      <li>Restaurantes</li>
    </ul>
    <div class="publish"></div>
  </main>
</div>
<button class='btn ' id='btnLogout'>Sair</button>
`;

  // botão sair para fazer logout
  const btnLogout = rootElement.querySelector('#btnLogout');
  btnLogout.addEventListener('click', (event) => {
    event.preventDefault();
    outLogin();
  });

  return rootElement;
};

// <!-- BUTAO MENU function myFunction() {
//     var x = document.getElementById("myLinks");
//     if (x.style.display === "block") {
//       x.style.display = "none";
//     } else {
//       x.style.display = "block";
//     }
//   } -->

//   return rootElement;
// };
