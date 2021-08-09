import { outLogin } from '../../services/firebaseAuth.js';

export const home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
  <div class="containerHome">
  <header>
    <div class="menu">
    <input type="checkbox" id="checkbox-menu">
    <label for="checkbox-menu">
    <span></span>
    <span></span>
    <span></span>
    </label>
  </div>
  <nav class="navBar">
     <ul class="nav" id="nav">
      <a class="links" href="">Buscar</a>
      </ul>
  </nav>
  <div class="addPost">
  <img class="tomato" src="./img/tomato.svg">
  <a id="addPost" class="postar" href="">postar</a>
 
  </div>
  <button class='btn' id='btnLogout'>Sair</button>
  <img src="./img/govegGreen.png" />


  <div class="lines">
  <hr>
  </div>

    <div class="filters">
    <button id="receitas" class="receitas"> Receitas</button>
    <button id="restaurantes" class="restaurantes" type="submit"> Restaurantes</button>
    <button id="mercados" class="mercados"> Mercados</button>
    </div>
    
  <div class="lines">
  <hr>
  </div>

</header>
<main>
  <div class="publish">
    <h2 class="nameUser" id="nameUser"></h2>
    <img class="imgPost" id="imgPost" src="">
    <textarea class="textPost" id="textPost" name="story" style="resize: none">
    </textarea>
    <a class="hashtag" id="hashtag"></a>
    <p class="tag" id="tag"></p>
    <button class="like" id="like"><img class="likePrice" src="./img/coracao.svg"></button>
    <button class="price" id="price"><img class="likePrice"  src="./img/dinAmarelo.svg"> <img class="likePrice" src="./img/dinCinza.svg"></button>
    <div class="coments" id="coments">
    <p>comentario</p> 
    <button class="more" id="more">ver mais</button>
    </div>
    <button class="addComent" id="addComent"> <img class="addCom" src="./img/addCom.svg"> adicionar comentário</button>
  </div>
    <hr> 
</main>
</div>
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
