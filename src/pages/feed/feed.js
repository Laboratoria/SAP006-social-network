import { logOut, user } from "../../lib/auth.js";
import { postImage } from "../../lib/auth.js";
import { getTheRoad } from "../../router.js";
//import {user} from "../../lib/auth/auth.js";



export const Feed = () => {
  const rootElement = document.createElement("div");
  rootElement.className = "feed-container"
  rootElement.innerHTML = `
  
  <main class="all-container" id="all-container">
  <div class="wrap">
    <div class="container-carousel">
    <div>
    <img class="pictures" src="./images/one.png"></img>
    <img class="pictures" src="./images/one.png"></img>
    <img class="pictures" src="./images/one.png"></img>
    <img class="pictures" src="./images/one.png"></img>
    <img class="pictures" src="./images/one.png"></img>
    <img class="pictures" src="./images/one.png"></img>
    <img class="pictures" src="./images/one.png"></img>
   
  </div>
      <span id="previous"><i data-feather="chevron-left"></i></span>
      <span id="next"><i data-feather="chevron-right"></i></span>
      <div id="slider" class="slider"></div>
    </div>
  </div>
  <aside>  

  <img src="./images/name-icon.png">

 <section class='profile-area'>
   <div class='div-perfil'>

   <img src='images/user.png' id='photo' class='photo'>
   <p>Bem vinda </p>
   <p class='name-user' id="name-user"></p> 
</div>
 </section>

      <div class="icons">
      
      <img src="./images/home-icon.png" alt="">
  
      <button class="text-icon" id=""> Inicio </button>
      <img src="./images/config-icon.png" alt="">
  
      <button class="perfil-icon" id="perfil-icon"> Perfil </button>
      
      <img src="./images/dark-icon.png" alt="">
  
      <button class="text-icon" id="button-dark"> Modo Escuro </button>
      <img src="./images/out-icon.png" alt="">
  
      <button class="text-icon" id="button-signout"> Sair </button>
      </div>
  
  
  </aside>
<form action = "" id="postForm">
  <textarea id='postText' class="postText" placeholder='O que você quer compartilhar?'></textarea>
  <div class='div-photo' id="div-photo">
  <img src='' width='100%' class='imgPreview'>
</div>
  <label for='photo' class='label-camera icon-post'>📷
  <input type='file' class='photo-um' id='photo-um' accept='image/png, image/jpeg, image/jpg'/> 
  <button id='publicar-foto' class='publicar-foto' >Publicar foto</button> 
</label>
  <button id='publicar'>Publicar</button>
</form>

  </main>
  <section id='postado' class='posts-container'>
`

const photo = rootElement.querySelector('.photo-um');
const preview = rootElement.querySelector('.imgPreview');
const btnsend = rootElement.querySelector(".publicar-foto")
photo.addEventListener('change', (event) => {
  const file = event.target.files[0];
  preview.src = URL.createObjectURL(file);
  postImage(photo, validarUrl);
});

const validarUrl = (url) => {
  preview.src = '';
  preview.src = url;
};

btnsend.addEventListener('click', (event) => {
  event.preventDefault();
  createPost(preview.src);
  preview.src = '';

  readPosts()
});


const perfil = rootElement.querySelector('.perfil-icon')
perfil.addEventListener('click', (event) => {
  event.preventDefault();
  getTheRoad("/profile");
});


const photoPerfil = rootElement.querySelector('.photo');
const nomeP = rootElement.querySelector('.name-user');
firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    nomeP.innerHTML = user.displayName;
    photoPerfil.src = user.photoURL;
  } else {
    nomeP.innerHTML = user.email;
    photoPerfil.src = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
    
  }
});

const darkMode = () => {

  rootElement.querySelector("#button-dark").addEventListener('click', () => {
    const change = rootElement.querySelector("#all-container");
    change.style.background = "black";
  })  
}
darkMode();

const postsCollection = firebase.firestore().collection("posts");

//função para adicionar os posts e printar no firebase e printar na tela
rootElement.querySelector('#postForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const text = rootElement.querySelector('#postText').value;
  const postData = () => {
    const data = new Date();
    return data.toLocaleString("pt-BR");
  };

  const post = {
    text: text,
    user_id: firebase.auth().currentUser.email,
    data: postData(),
    likes: [],
    comments: [],
    image: [],
  }; 
  postsCollection.add(post).then(() => {
    rootElement.querySelector("#postText").value= "";
    rootElement.querySelector("#postado").innerHTML = "";
    loadPosts()
  });
});


// Printa todos os posts existentes na tela:
function loadPosts() {
  postsCollection.orderBy('data', 'desc').get().then(snap => {
    snap.forEach(post => {
  const postElement = document.createElement("div");//aqui criou mais uma div e mandou para ela o que era a div-postados
  postElement.id = post.id;
  postElement.classList.add("div-postados")
 
      const postTemplate = `
      
        <p class="user-post">Postado por ${post.data().user_id} <br>${post.data().data} </p>
        <p class="txt"> ${post.data().text} </p> 
        <div class='text'>
        <textarea disabled class='edit-text-area' hidden>${post.data().text}</textarea>
      </div>
        <section class="likes-comments-bar">
          <button data-likePost = "${post.id}"> Curtir</button>
          ${(quantityOfLikes => { 
            if(quantityOfLikes === 1) 
              return `<p class="f-20 like-value" data-likes-id="${post.id}"> <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> <span data-like-text-to-be-changed="${post.id}"> ❤️ Curtida </span> </p>`
            else if (quantityOfLikes > 1)
              return  `<p class="f-20 like-value" data-likes-id="${post.id}"> <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> <span data-like-text-to-be-changed="${post.id}"> ❤️ Curtidas </span> </p>`
            else
              return `<p class="f-20 like-value" data-likes-id="${post.id}"> <span data-like-value-to-be-changed="${post.id}"> ${0} </span> <span data-like-text-to-be-changed="${post.id}"> ❤️ Curtidas </span> </p>` 
          }) (post.data().likes.length)}
          <button data-commentPost="${post.id}"> Comentar </button>
          <input  data-comment-input-id="${post.id}" placeholder='O que você quer comentar?'></input>
        </section>
        <div class="data-post-id" data-postid="${post.id}">
        <button type="submit" data-deletePost="${post.id}" class="delete-button"> Deletar</button>
        <button  type="submit" class="btn-edit">Editar</button>
        <button type="submit" class="btn-cancel-edit" hidden> Cancelar</button>
        <button  type"submit" class="btn-edit-save" hidden> Salvar </button>
      </div>
      

        <div class="comments">
          <ul data-comment-post-id="${post.id}"> </ul> 
        </div>
      </div>
    `; 
   
    postElement.innerHTML = postTemplate

//Pegando valores para edit
const editSaveButton = postElement.querySelector(".btn-edit-save")
const editTextArea = postElement.querySelector(".edit-text-area")
const editCancelBtn = postElement.querySelector(".btn-cancel-edit")
const editBtn = postElement.querySelector(".btn-edit")
const deleteBtn = postElement.querySelector(".delete-button")
 
function canEdit() {
  if(firebase.auth().currentUser.email == `${post.data().user_id}`){
    editBtn.hidden = false;
    deleteBtn.hidden = false;
  }else{
  editBtn.hidden = true;
  deleteBtn.hidden = true;
  }
}
canEdit()

 editBtn.addEventListener("click", () => {
  editSaveButton.hidden = false;
  editCancelBtn.hidden = false;
  editTextArea.hidden = false;
  editTextArea.disabled = false;
  editBtn.hidden = true;
 })

 editCancelBtn.addEventListener("click", () => {
   editSaveButton.hidden = true;
   editCancelBtn.hidden = true;
   editBtn.hidden = false;
   editTextArea.hidden = true;
   editTextArea.hidden = true;
 })

 editSaveButton.addEventListener("click", () => {
   editSaveButton.hidden = true;
   editCancelBtn.hidden = true;
   editBtn.hidden = false;
   editTextArea.hidden = true;
   editTextArea.hidden = true;
   editUpdate(editTextArea.value, post.id);
 })

 rootElement.querySelector("#postado").appendChild(postElement)
    });
  });

  //editPost: Lais, aqui não consegui deixar ela pra fora.
function editUpdate(newText, postId){
  firebase.firestore().collection("posts").doc(postId).update({
    text: newText,
  })
  rootElement.querySelector("#postado").innerHTML = "";
  loadPosts()
}

};//fim função loadPosts



// Adição dos eventos dos botões:
const postsContainer = rootElement.querySelector(".posts-container");
postsContainer.addEventListener("click", (e) => {
const {target} = e;
const postID = target.parentNode.parentNode.id;

// Delete Post:
const deleteButton = target.dataset.deletepost;
if (deleteButton) {
  const deleteConfirmation = confirm("Você realmente gostaria de deletar este post?");
  if (deleteConfirmation)
    deletePost(postID);
  else
    return false;
};

function canDelete(){
  if(firebase.auth().currentUser.email == `${post.data().user_id}`){
    deleteButton.hidden = false;
  } else{
    deleteButton.hidden = true;
  }
}
canDelete();

// Like Post:
const likeButton = target.dataset.likepost;
if (likeButton) {
  async function updateLikes () {
    likePost(postID);
    const resultado = await likePost(postID);
    const valueToBeChanged = rootElement.querySelector('[data-like-value-to-be-changed="' + postID + '"]');
    const textToBeChanged  = rootElement.querySelector('[data-like-text-to-be-changed="' + postID + '"]');
    let amountOfLikes  = parseInt(valueToBeChanged.textContent,10);

    if (resultado === "like") {
      const newAmountOflikes = amountOfLikes + 1;
      valueToBeChanged.innerHTML = `${newAmountOflikes}`;
      if (newAmountOflikes === 1) {
        textToBeChanged.innerHTML = `❤️ Curtida`;
      } else {
        textToBeChanged.innerHTML = `❤️ Curtidas`;
      };
    } else {
      const newAmountOflikes = amountOfLikes -1;
      valueToBeChanged.innerHTML = `${newAmountOflikes}`;
      if (newAmountOflikes === 1) {
        textToBeChanged.innerHTML = `❤️ Curtida`;
      } else {
        textToBeChanged.innerHTML = `❤️ Curtidas`;
      };
    };
  };
  updateLikes ();
};

// Comment Post:
const commentButton = target.dataset.commentpost;
  if (commentButton){
    commentPost(postID);
  };
});


// Funções (delete, like, comment and logout):
function deletePost(postId) {
  postsCollection.doc(postId).delete().then(() => {
    rootElement.querySelector("#postado").innerHTML = "";
    loadPosts();
  });
};

function likePost(postId) {
  const likesPostId = firebase.firestore().collection("posts").doc(postId);
  const promiseResult = likesPostId.get().then((post => {
    const people = post.data().likes;
    if (people.length >= 1) {
      if (people.includes(firebase.auth().currentUser.email)) {
        likesPostId
        .update({ likes: firebase.firestore.FieldValue
        .arrayRemove(firebase
        .auth().currentUser.email)});
        return "deslike";
      } else {
        likesPostId
        .update({ likes: firebase.firestore.FieldValue
        .arrayUnion(firebase
        .auth().currentUser.email)});
        return "like";
      }
    } else {
      likesPostId
      .update({ likes: firebase.firestore.FieldValue
      .arrayUnion(firebase
      .auth().currentUser.email)});
      return "like";
    };
  })).catch(error => {
    getError(error);
  });
  return promiseResult
};

//Quando autenticar o usuário, voce chama cham localStorage.set item e manda um objeto
//Esse 217 a gente pode tirar acessando o current user email atraves do localstorage
//Snapshot é um instantaneo do banco e ai a gente consegue retirar do banco

function commentPost(postId) {
  const newComment  = rootElement.querySelectorAll('[data-comment-input-id="' + postId + '"]');
  newComment.forEach(comment => {
    firebase.firestore().collection("posts").doc(postId).get().then((post => {
      const newCommentText = comment.value;
      firebase.firestore().collection("posts").doc(postId).update({comments: firebase.firestore.FieldValue
        .arrayUnion({
        owner:firebase.auth().currentUser.email, 
        content:newCommentText,
        postOfOrigin:postId,
        commentLikes:[],
        id: postId + post.data().data,
        })
      ,});
      const commentArea = rootElement.querySelector('[data-comment-post-id="' + postId + '"]');
      const comentarios = post.data().comments;
      comentarios.forEach(comment => {
        const whoCommented = comment.owner;
        const whatWasCommented = comment.content;
        const commentId = comment.id;
        const newItem = document.createElement("li");
        newItem.setAttribute("class", "f-20");
        newItem.insertAdjacentHTML("beforeend", `
          <p> Comentários: <br> ${whoCommented} <br> ${whatWasCommented}</p>;
          <button> Curtir </button> ;
          <button data-delete-comment-button-id="${comment.id}"> Deletar </button>
        `);
        commentArea.appendChild(newItem);
        const deleteCommentButton = rootElement.querySelector('[data-delete-comment-button-id="' + commentId + '"]');
        deleteCommentButton.addEventListener("click", () => {
          console.log("ajustar o delete post");
        });
      });
    }));
  });
};

const btnSignOut = rootElement.querySelector("#button-signout");
btnSignOut.addEventListener("click", logOut);


loadPosts();
return rootElement;


}


