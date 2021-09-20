import { postarMensagem, receberUsuario } from '../../services/index.js';
import { postTemplate } from '../../componentes/index.js';

export default () => {
  const container = document.createElement('div');

  const template = `
    <textarea name="post-input" id="post-text" placeholder="Escreva sobre seu pet..."></textarea>
    <div class="buttons">
    <button class="button-post" type="button" id="button-publicar">Publicar</button>
    </div>
    <section id="feed">
    <div id="lista-feed" class="lista-feed"></div>
    </section>
   
    `;
  container.innerHTML = template;

  loadPosts();
  const userInfo = receberUsuario();

  //CRIAR POSTAGENS
  const btn = container.querySelector('#button-publicar');
  btn.addEventListener('click', () => {
    console.log('clicou aqui!');
    const text = container.querySelector('#post-text').value;
    const postagem = {
      text: text,
      user_id: userInfo.uid,
      username: userInfo.displayName,
      likes: 0,
      array_likes: [],
    };

    postarMensagem(postagem)
      .then(() => {
        console.log('Document successfully written!');
        loadPosts();
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  });
  return container;

  // MOSTRAR POSTAGEM NA TELA

  function loadPosts() {
    const postsCollection = firebase.firestore().collection("postagens");
    container.querySelector('#lista-feed').innerHTML = 'Carregando...';
    postsCollection.get().then((querySnapshot) => {
      container.querySelector('#lista-feed').innerHTML = '';
      querySnapshot.forEach((doc) => {
        const post = { id: doc.id, data: doc.data() };
        const componente = postTemplate(post);
        container.querySelector('#lista-feed').appendChild(componente);
      });
    });
  }
};
