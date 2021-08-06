import { logOut } from "../../lib/auth.js";
import { postImage } from "../../lib/auth.js";
import { getTheRoad } from "../../router.js";



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
  <div class='div-perfil'>
<img src='imagens/user.png' id='photo' class='photo'>
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


/*const setNewProfileImg = (newfile) => {
  rootElement.querySelector('#photo').src = newfile;
};
const sendNewProfileImg = (callbackToSetNewImage) => {
  rootElement.querySelector("#photo").addEventListener('click', () => {
    const inputFile = rootElement.querySelector('#input-file-profileImg');
    inputFile.style.opacity = 1;
    inputFile.onchange = (event) => {
      changeProfileImage(event.target.files[0], callbackToSetNewImage);
      inputFile.style.opacity = 0;
    };
    
  });
};
sendNewProfileImg(setNewProfileImg);

*/


const darkMode = () => {

  rootElement.querySelector("#button-dark").addEventListener('click', () => {
    const change = rootElement.querySelector("#all-container");
    change.style.background = "black";

  })
    
}
darkMode()

const postado = rootElement.querySelector(".posts-container");//AQUI LEDI


rootElement.querySelector('#postForm').addEventListener('submit', function(event){
event.preventDefault();
const text = rootElement.querySelector('#postText').value;

const postData = () => {
  const data = new Date();
  return data.toLocaleString('pt-BR');
};

const post = {
  text: text,
  user_id: firebase.auth().currentUser.email,
  data: postData(),
  likes: [],
  comments: [],
  image: [],
} 

const postsCollection = firebase.firestore().collection("posts");
postsCollection.add(post).then(()=>{//o then é pra recarregar os posts assim que postar
  rootElement.querySelector(".postText").value= "";
  rootElement.querySelector(".posts-container").innerHTML = "";
  loadPosts();
  })
})

function addPost(post) {
 const postElement = document.createElement("div");//aqui criou mais uma div e mandou para ela o que era a div-postados
  postElement.id = post.id;
  postElement.classList.add("div-postados")
  const postado = "";

  const postTemplate = `
    <p class="user-post">Postado por ${post.data().user_id} <br>${post.data().data} </p>
    ${post.data().text}</br></br>
    <section class="likes-comments-bar">
      <button id="curtir" value="${post.id}" class="icones like-button"> Curtir</button>
      ${(quantityOfLikes => { 
        if(quantityOfLikes === 1) 
                return `<p class="f-20 like-value" data-like-id="${post.id}""> ${quantityOfLikes} ❤️ Curtida </p>`
              else if (quantityOfLikes > 1)
                return  `<p class="f-20 like-value" data-like-id="${post.id}"> ${quantityOfLikes}  ❤️ Curtidas </p>`
              else
                return `<p class="f-20 like-value" data-like-id="${post.id}"> 0 ❤️ Curtidas </p>`
        
      })(post.data().likes.length)}
    <button id="comentar" value="${post.id}" class="icones comment-button"> Comentar </button>
    <input data-comment-input-id="${post.id}" placeholder='O que você quer comentar?'></input>
    <button id="deletar" value="${post.id}"  class="icones delete-button"> Deletar</button>
    </section>
    <div class="data-post-id" data-postid="${post.id}">
      <button  type="submit" class="btn-edit">Editar</button>
      <button type="submit" class="btn-cancel-edit" hidden> Cancelar</button>
      <button  type"submit" class="btn-edit-save" hidden> Salvar </button>
    </div>
    <div class='text'>
      <textarea disabled class='edit-text-area' hidden>${post.data().text}</textarea>
    </div>
  </div>
  <ul class="comentarios" id="comments" data-comment-post-id="${post.id}"> </ul> 
  
` 

postElement.innerHTML = postTemplate

//rootElement.querySelector("#postado").innerHTML += postElement;


//Pegando valores para edit
const editSaveButton = postElement.querySelector(".btn-edit-save")
const editTextArea = postElement.querySelector(".edit-text-area")
const editCancelBtn = postElement.querySelector(".btn-cancel-edit")
const editBtn = postElement.querySelector(".btn-edit")
 

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
   //rootElement.querySelector("#postado").innerHTML = "";
   //loadPosts()
 })


 rootElement.querySelector("#postado").appendChild(postElement)
 //rootElement.appendChild(postElement);//aqui Gabs

 
};//fim da função

function editUpdate(newText, postId){
  firebase.firestore().collection("posts").doc(postId).update({
    text: newText,
  })
  rootElement.querySelector("#postado").innerHTML = "";
  loadPosts()
}


function loadPosts() {
  const postsCollection = firebase.firestore().collection("posts");
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

        const amountOfLikes  = rootElement.querySelectorAll('[data-like-id="' + buttonValue + '"]')
        amountOfLikes.forEach(value => {
          firebase.firestore().collection("posts").doc(buttonValue).get().then(( post => {
            value.innerHTML = "";
            value.innerHTML = `${(quantityOfLikes => { 
              if(quantityOfLikes === 1) 
                return `<p class="f-20 like-value" data-like-id="${buttonValue}"> ${quantityOfLikes} ❤️ Curtida </p>`
              else if (quantityOfLikes > 1)
                return  `<p class="f-20 like-value" data-like-id="${buttonValue}"> ${quantityOfLikes} ❤️ Curtidas </p>`
              else
                return `<p class="f-20 like-value" data-like-id="${buttonValue}"> 0 ❤️ Curtidas </p>`
              
              })
              (post.data().likes.length)
            }`
          }))
        })
      })
    })

    const commentButton = rootElement.querySelectorAll(".comment-button")
    commentButton.forEach(button => {
      button.addEventListener("click", () => {
        const buttonValue = button.value
        
        commentPost(buttonValue)
      })
    })
  })
}

function deletePost(postId){
  const postsCollection = firebase.firestore().collection("posts")
  postsCollection.doc(postId).delete().then(() => {
   rootElement.querySelector(".posts-container").innerHTML = "";
    loadPosts();
  })
}

function likePost(postId) {
    firebase.firestore().collection("posts").doc(postId).get().then(( post => {
    const people = post.data().likes;
    if (people.length >= 1) {
      if (people.includes(firebase.auth().currentUser.email)) {
        firebase.firestore().collection("posts").doc(postId).update({ likes: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)})
      } else {
        firebase.firestore().collection("posts").doc(postId).update({ likes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)})
      }
    } else {
      firebase.firestore().collection("posts").doc(postId).update({ likes: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)})
    }
  }))
} 




function commentPost(postId) {
  const newComment  = rootElement.querySelectorAll('[data-comment-input-id="' + postId + '"]')
  newComment.forEach(comment => {
    firebase.firestore().collection("posts").doc(postId).get().then((post => {
 
      const newCommentText = comment.value
    
      firebase.firestore().collection("posts").doc(postId)
      .update({comments: firebase.firestore.FieldValue.arrayUnion({
        owner:firebase.auth().currentUser.email, 
        content:newCommentText,
        postOfOrigin:postId,
        likes:[],
      }),});
     
        const commentArea = rootElement.querySelector('[data-comment-post-id="' + postId + '"]');

        const comentarios = post.data().comments
        comentarios.forEach(comment => {
        const whoCommented = comment.owner;
        const whatWasCommented = comment.content;

        const newItem = document.createElement("li")
        newItem.setAttribute("class", "f-20")
        newItem.insertAdjacentHTML("beforeend", `<p> Comentários: <br> ${whoCommented} <br> ${whatWasCommented}</p>
        <button> Curtir </button> 
        <button> Deletar </button>`)
        commentArea.appendChild(newItem)
       console.log(comentarios)
      })
      console.log(commentArea)
    }))
  })
}


const btnSignOut = rootElement.querySelector("#button-signout")
btnSignOut.addEventListener("click", logOut);



loadPosts();
return rootElement;


}
