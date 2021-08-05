export const postar = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
    <div class="containerPost">
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
       <li><a class="links" href="">Busca</a></li>
       <li><a class="links" href="">Perfil</a></li>
      <li><a class="links" href="">Página Inicial - feed</a></li>
     </ul>
     </nav>
     </header>
     <main>
     <input class="addImg" id="addImg" type="image" src="./img/add.svg" alt="Adicionar imagem"/>
     <div class="local">
     <p>Local:</p>
     <input type="text" id="addLocal" name="localização" placeholder="Av. Celso Garcia, 1400, São Paulo - BR"/>
     </div>
     <div class="addfilter">
      <button class="market" id="market">Mercados</button>
      <button class="recipes" id="recipe">Receitas</button>
      <button class="rest" id="rest">Restaurantes</button>
     </div>
     <input type:"text" id="hashtags" class="hashtags" name="hashtags" placeholder="#pizza #sp #vegano"/>>
     <div class="addPrice">
      <input type="checkbox" name="valo" value="baixo/barato"/>
      <input type="checkbox" name="valor" value="médio"/>
      <input type="checkbox" name="valor" value="alto/caro"/>
     </div>
     <hr>
     <textarea class="addText" id="addText" placeholder="Conte sua experiência aos amigos!" style="resize:none"></textarea>
     <hr>
     <button class="sendPost" id="sendPost">Publicar</button>
     </main>
    </div>
  `;
  return rootElement;
};
