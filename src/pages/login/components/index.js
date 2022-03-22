import {
  deletarPostagem,
  receberUsuario,
  editarPostagem,
} from "../services/index.js";

export function postTemplate(post) {
  const userInfo = receberUsuario();
  const componente = document.createElement("div");
  const conteudo = `
<div id="${post.id}">
  <div class="usuario-card">
    <h3>${post.data?.username}</h3>
  </div>
  <div class="id-filme-card">
    <h2>${post.data?.film_name}</h2>
    <section>${post.data?.film_img}</section>
  </div>
  <div class="texto-card">
  <p>${post.data?.text}</p>
  </div>
  <button class="like">${post.data?.likes}Curtir</button>
  <div class="none">
    <button class="editar">Editar</button>
    <button class="deletar">Deletar</button>
  </div>
  
</div>
`;
  componente.innerHTML = conteudo;

  //DELETAR
  const btnDeletar = componente.querySelector(".deletar");
  if (post.data.user_id === userInfo.uid) {
    const divClassNone = componente.querySelector(".none");
    divClassNone.style.display = "flex";
  }
  btnDeletar.addEventListener("click", () => {
    deletarPostagem(post.id).then(() => {
      const btnsIntera = btnDeletar.parentNode;
      const divPost = btnsIntera.parentNode;
      divPost.remove();
      // console.log(btnsIntera);
    });
  });
  return componente;

  // //EDITAR

  // const btnEditar = componente.querySelector(".editar");
  // btnEditar.addEventListener("click", (text, postId) => {
  //   editarPostagem(post.id)
  // });
  // return componente;

  // // função editar post
  // postsListContainer.addEventListener('click', async (e) => {
  //   const { target } = e;
  //   const editPostButton = target.dataset.edit;
  //   const cancelEditionButton = target.dataset.cancel;
  //   const saveEditionButton = target.dataset.save;
  //   const deleteButton = target.dataset.delete;
  //   const likeButton = target.dataset.like;
  //   const confirmDelete = target.dataset.confirmdelete;
  //   const closeModal = target.dataset.closemodal;

  //   // Open edit
  //   if (editPostButton) {
  //     const editPostContainer = target.parentNode.parentNode.parentNode.querySelector('.edit-container');
  //     const userPost = target.parentNode.parentNode.parentNode.querySelector('.user-post');

  //     editPostContainer.classList.toggle('display-none');
  //     userPost.classList.toggle('display-none');
  //   }
  //   // cancel edit
  //   if (cancelEditionButton) {
  //     const liElement = target.parentNode.parentNode.parentNode.parentNode;
  //     const userPost = liElement.querySelector('.user-post');
  //     const editcontainer = liElement.querySelector('.edit-container');

  //     editcontainer.classList.toggle('display-none');
  //     userPost.classList.toggle('display-none');
  //   }
  //   // save edit
  //   if (saveEditionButton) {
  //     const liElement = target.parentNode.parentNode.parentNode.parentNode;
  //     const textArea = liElement.querySelector('.edit-post-textarea');
  //     const newText = textArea.value;
  //     const postId = textArea.dataset.text;

  //     await firebase.editPost(newText, postId);
  //     const posts = await firebase.loadPosts();
  //     await insertPostList(posts);
  //   }

  const btnCurtir = componente.querySelector(".like");
  btnLike.addEventListener("click", (uid, postId) => {
    like: firebase.firestore.FieldValue.arrayUnion(uid);
  });
  return componente;
}
