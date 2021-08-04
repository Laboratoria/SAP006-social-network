//import { changeProfileImage } from "../../lib/auth.js";
import { logOut } from "../../lib/auth.js";


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
  <section class='profile-area'>
  <figure class='profile-area-photo-box'>
    <img class = "photo" id = "photo">
    <input required type="file" id="input-file-profileImg" class='input-file-profileImg transparency'
      accept=".jpg, .jpeg, .png">
      </section>
      <div class="icons">
      
      <img src="./images/home-icon.png" alt="">
  
      <button class="text-icon" id=""> Inicio </button>
      <img src="./images/config-icon.png" alt="">
  
      <button class="text-icon" id=""> Perfil </button>
      
      <img src="./images/dark-icon.png" alt="">
  
      <button class="text-icon" id="button-dark"> Modo Escuro </button>
      <img src="./images/out-icon.png" alt="">
  
      <button class="text-icon" id="button-signout"> Sair </button>
      </div>
  
  
  </aside>


<form action = "" id="postForm">
  <textarea id='postText' placeholder='O que você quer compartilhar?'></textarea>
  <button id='publicar' class='publicar'>Publicar</button>
</form>
<section id='postado' class='posts-container'></section>


`

const darkMode = () => {

  rootElement.querySelector("#button-dark").addEventListener('click', () => {
    const change = rootElement.querySelector("#all-container");
    change.style.background = "black";

  })
    
}
darkMode()


rootElement.querySelector('#postForm').addEventListener('submit', function(event){
event.preventDefault();
const text = rootElement.querySelector('#postText').value;

//const postData = () => {
  const data = new Date().toLocaleString('pt-BR')
 //return data.toLocaleString('pt-BR');
//};


const post = {
  text: text,
  user_id: firebase.auth().currentUser.email,
  data: data,//postData(),
  likes: [],
  comments: [],
} 

const postsCollection = firebase.firestore().collection("posts");
postsCollection.add(post).then(()=>{//o then é pra recarregar os posts assim que postar
  rootElement.querySelector("#postText").value= "";
  rootElement.querySelector("#postado").innerHTML = "";
  loadPosts();
  })
})

function addPost(post){
  const postTemplate = 
  `
  <div id="${post.id}" class="div-postados">
    <p class="user-post">Postado por ${post.data().user_id} </br>
    ${post.data().data} </p>
    <p class="txt-post">${post.data().text} </p>
    </div>

    <div class='text'>
            <textarea disabled id='edit-text-area' hidden>${post.text}</textarea>
    </div>

    <section class="likes-comments-bar">
      <div class="icones" id="icone-like"><img src="./images/like.png"> ${post.data().likes}</div>
      <div class="icones" id="icone-comment"><img src="./images/comment.png">  ${post.data().comments} </div>
      <button id="deletar" class="delete-button" value="${post.id}"> Deletar</button>
    </section>
    <div class="post-edit">
    <button  id="btnEdit" value="${post.id}">Editar</button>
    <button id="btn-cancel-edit" value="${post.id}" hidden> Cancelar</button>
    <button  id="btn-edit-save" value="${post.id}" hidden> Salvar </button>
    </div>
  </div>
  `

rootElement.querySelector("#postado").innerHTML += postTemplate;

};


function loadPosts() {
  const postsCollection = firebase.firestore().collection("posts").orderBy('data', 'desc')
  postsCollection.get().then(snap => {
    snap.forEach(post => {
      addPost(post);
    })

    const deleteButtons = rootElement.querySelectorAll(".delete-button")
    deleteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const buttonValue = button.value;
        const deleteConfirmation = confirm("Você realmente gostaria de deletar este post?");
        if (deleteConfirmation)
          deletePost(buttonValue);
        else
          return false;
      })
    })



    const likeButtons = rootElement.querySelectorAll(".like-button")
    likeButtons.forEach(button => {
      button.addEventListener("click", () => {
        const buttonValue = button.value;
        likePost(buttonValue)
        console.log(buttonValue)
        
      })
    })
  })
}

const editBotoes = rootElement.querySelectorAll(".post-edit")
editBotoes.forEach((btnEdit) => {
  btnEdit.addEventListener("click", () => {
    const btnEditValue = btnEdit.value;
    window.alert(btnEditValue)
  })
})

/*const editBtn = rootElement.querySelectorAll(".btn-edit");
editBtn.forEach(button => {
  button.addEventListener("click", () => {
    const buttonValue = button.value;
    console.log(buttonValue)
  })
})*/


 /*const editBtn = rootElement.querySelectorAll("btn-edit");
 const cancelEditBtn =rootElement.querySelectorAll(".btn-cancel-edit");
 const btnEditSave = rootElement.querySelectorAll(".btn-edit-save");


 editBtn.addEventListener("click", ()=> {
   editBtn.hidden = true;
   cancelEditBtn.hidden = false;
   saveEditBtn.hidden = false;
   editBtn.textArea.disabled = false;
 })*/



function deletePost(postId){//aqui mudar para auth e exportar
  const postsCollection = firebase.firestore().collection("posts")
  postsCollection.doc(postId).delete().then(() => {
    rootElement.querySelector("#postado").innerHTML = "";
    loadPosts();
  })
}



function likePost(postId) {//aqui mudar para auth e exportar
  const increment = firebase.firestore.FieldValue.increment(1);
  const postsCollection = firebase.firestore().collection("posts").doc(postId)
  postsCollection.update({likes:increment})
  rootElement.querySelector("#postado").innerHTML = "";
  loadPosts();

} 

loadPosts();
return rootElement;

}



