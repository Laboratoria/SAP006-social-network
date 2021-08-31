import { outLogin } from '../../services/firebaseAuth.js';
import { route } from '../../routes/navigator.js';
import {
  getPosts, liked, deletePost, editPosts,
} from '../../services/firebaseData.js';
import { modal } from './modal.js';
// <img src=${doc.data().image class='imgPost'>
export const home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
  <div class="containerHome">
  <header>
  <nav class="menu">
     <ul class="nav" id="nav">
     <li class="links" ><a href=""></a>Buscar</li>
     <li class="links" ><a href=""></a>Perfil</li>
     </ul>
     </nav>

    <div class="goPost">
    <img class="tomato" src="./img/tomato.svg">
    <a id="goPost" href="">postar</a>

    </div>

    <button class='btn' id='btnLogout'>Sair</button>

    <img src="./img/govegGreen.png" />

    </nav>
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
    <div class="publish" id="timeline" data-post> </div>
  </main>
</div>
`;

  const btnLogout = rootElement.querySelector('#btnLogout');
  const btnGoPost = rootElement.querySelector('#goPost');
  // botão sair para fazer logout
  btnLogout.addEventListener('click', (event) => {
    event.preventDefault();
    outLogin();
  });

  btnGoPost.addEventListener('click', () => route('/posts'));
  // carregar posts na tela
  getPosts().then((collectionContent) => {
    collectionContent.forEach((doc) => {
      const div = document.createElement('div');
      const timeline = rootElement.querySelector('#timeline');
      div.innerHTML = `<div class="allPosts" data-id="${doc.id}">
          <img src=${doc.data().image} class='imgUser'> 
          <p class="user"> ${doc.data().nome}</p>
          <p class="local" contentEditable="false" data-title="${doc.id}" >${doc.data().nomeLocalReceita}</p> 
          <p class="data"> ${doc.data().data.toDate().toLocaleDateString()}</p>
    
          ${firebase.auth().currentUser.uid === doc.data().user_id
    ? `<div class="delete-edit">
                       <button type="button" class="delete-button" data-delete="${doc.id}">Deletar</button>
                    <button type="submit" data-editPostButton="${doc.id}" class="edit-button">Editar</button>
                  </div>`
    : ''}
            
          <p class="descr" contentEditable="false" data-text="${doc.id}">${doc.data().descricao}</p> 
          <p class="hashs" contentEditable="false" data-hashs="${doc.id}">${doc.data().hashTags}</p>
        <div class='botoes'> 
          <p class="tipo" contentEditable="false" data-tag="${doc.id}"> ${doc.data().tipo} </p>
          <button type="button" class="like"> <img id="like" data-like="${doc.id}" class="likeImg"  src="./img/coracao.svg"> </button>
          <p class="beforLike" id="numberLikes" data-numLike="${doc.id}">${doc.data().curtidas.length || 0}</p>
          <button type="button" class="price" id="price" contentEditable="false" data-preco="${doc.id}">${doc.data().preco}></button>
          <div class="coments" id="coments">
          <p class="addComent" id="addComent" placeholder="Comentários">${doc.data().comentarios}</p>
          <button class="more" id="more">ver mais</button>
          <button class="goComent" id="goComent"> <img class="addCom" src="./img/addCom.svg"> adicionar comentário</button>
          </div> </div>
          <hr> `;

      timeline.insertBefore(div, timeline.childNodes[0]);
    
    const dataPost = rootElement.querySelector('[data-post]');
    dataPost.addEventListener('click', (e) => {
      const { target } = e;
      const likeId = target.dataset.like;
      const deleteId = target.dataset.delete;
      const editId = target.dataset.edit;
      if (likeId) {
        const numberLikes = rootElement.querySelector(`[data-numLike="${likeId}"]`);
        const beforLike = numberLikes.classList.contains('beforLike');
        const number = Number(numberLikes.textContent);
        const heart = rootElement.querySelector(`[data-like="${likeId}"]`);
        if (beforLike === true) {
          numberLikes.classList.replace('beforLike', 'afterLike');
          numberLikes.innerHTML = number + 1;
          heart.src = './img/coracaoFull.svg';
          liked(likeId);
        } else {
          numberLikes.classList.replace('afterLike', 'beforLike');
          numberLikes.innerHTML = number - 1;
          heart.src = './img/coracao.svg';
          liked(likeId);
        }
      }
      if (deleteId) {
        modal.confirm('Essa postagem será excluída, deseja continuar?', () => {
          const postDiv = rootElement.querySelector(`[data-id="${deleteId}"]`);
          deletePost(deleteId).then(postDiv.remove());
        });
      }
      if (editId) {
        modal.confirm('Deseja editar sua postagem?', () => {
          const editBtn = rootElement.querySelector(`[data-edit="${editId}"]`);
          editBtn.textContent = 'Salvar';
          const editElements = rootElement.querySelectorAll('[contenteditable=false]');
          for (let i = 0; i < editElements.length; i + 1) editElements[i].setAttribute('contenteditable', true);
          const title = rootElement.querySelector(`[data-title="${editId}"]`);
          const text = rootElement.querySelector(`[data-text="${editId}"]`);
          const priceTag = rootElement.querySelector(`[data-preco="${editId}"]`);
          const hashtags = rootElement.querySelector(`[data-hashs="${editId}"]`);
          const tagType = rootElement.querySelector(`[data-tag="${editId}"]`);
          editPosts(tagType, title, hashtags, priceTag,
            text, editId);
        })}
 })     
  return rootElement;
};
