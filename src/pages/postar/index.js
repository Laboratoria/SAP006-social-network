import { route } from '../../routes/navigator.js';
import { addPost } from '../../services/firebaseData.js';
// const storage = firebase.storage();
// const storageRef = storage.ref();
// const imagesRef = storageRef.child('images');
// const spaceRef = storageRef.child('./img/tomato.svg');
export const postar = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
    <div class="containerPost">
    <header>
     <nav class="menu">
     <ul class="nav" id="nav">
       <li><a class="links" href="">Busca</a></li>
       <li><a class="links" href="">Perfil</a></li>
      <li><a class="links" href="">Página Inicial</a></li>
     </ul>
     </nav>
    </header>
     <main>
     <input class="addImg" id="addImg" type="image" src="./img/add.svg" alt="Adicionar imagem"/>
     <div class="local">
     <p id='tittlePost'>Local:</p>
     <input type="text" id="addLocal" name="localização" placeholder="Av. Celso Garcia, 1400, São Paulo - BR"/>
     <p id="errorLocal"></p>
     </div>
     <div class="addfilter">
      <button class="market" id="market">Mercados</button>
      <button class="recipes" id="recipe">Receitas</button>
      <button class="rest" id="rest">Restaurantes</button>
     </div>
     <input type:"text" id="hashtags" class="hashtags" name="hashtags" placeholder="#pizza #sp #vegano"/>>
     <p id='errorHashtags'></p>
     <div class="addPrice">
      <input type="radio" name="valor" value="$"/>
      <input type="radio" name="valor" checked value="$$"/>
      <input type="radio" name="valor" value="$$$"/>
     </div>
     <hr>
     <textarea class="addText" id="addText" placeholder="Conte sua experiência aos amigos!" style="resize:none"></textarea>
     <p id='errorDesc'></p>
     <hr>
     <button class="sendPost" id="sendPost">Publicar</button>
     </main>
    </div>
  `;

  let postType = 'resturante';
  const restBtn = () => {
    rootElement.querySelector('#tittlePost').innerHTML = 'Restaurante';
    postType = 'restaurante';
  };
  const marketBtn = () => {
    rootElement.querySelector('#tittlePost').innerHTML = 'Mercado';
    postType = 'mercado';
  };
  const recipeBtn = () => {
    rootElement.querySelector('#tittlePost').innerHTML = 'Receita';
    postType = 'receita';
  };
  rootElement.querySelector('#rest').addEventListener('click', restBtn);
  rootElement.querySelector('#market').addEventListener('click', marketBtn);
  rootElement.querySelector('#recipe').addEventListener('click', recipeBtn);

  rootElement.querySelector('#sendPost').addEventListener('click', () => {
    // pegando e validando as infos //
    const localPost = rootElement.querySelector('#addLocal').value;
    if (localPost === '' || localPost.length < 3) {
      const errorTittleField = document.getElementById('tittlePost');
      errorTittleField.innerHTML = 'Preencha com o nome do Restaurante, Mercado ou Receita';
      localPost.focus();
      return false;
    }
    const hashtagsPost = rootElement.querySelector('#hashtags').value;
    if (hashtagsPost === '' || hashtagsPost.length < 3 || hashtagsPost.indexOf('#') === -1) {
      const errorHashtagsField = document.getElementById('errorHashtags');
      errorHashtagsField.innerHTML = 'Preencha com ao menos uma #';
      errorHashtagsField.focus();
      return false;
    }
    // aqui não sei como validar o radio, acho que nem precisa //
    const pricePost = rootElement.querySelector('input[name=valor]:checked').value;

    const descPost = rootElement.querySelector('#addText').value;
    if (descPost === '' || descPost.length < 3) {
      const errorDescField = document.getElementById('errorDesc');
      errorDescField.innerHTML = 'Preencha com ao menos uma #';
      errorDescField.focus();
      return false;
    }
    const post = {
      data: new Date(),
      // nome: firebase.auth().currentUser.displayName,
      user_id: firebase.auth().currentUser.uid,
      image: './img/tomato.svg',
      nomeLocalReceita: localPost, // inputs do post, como nome do lugar //
      tipo: postType,
      hashTags: hashtagsPost, // se é restaurante, mercado ou receita //
      preco: pricePost, // hashtags //
      descricao: descPost, // descricao do lugar ou receita //

    };

    addPost(post);
    route('/home');
  });
  return rootElement;
};
