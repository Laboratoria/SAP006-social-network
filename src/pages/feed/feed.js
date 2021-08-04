//import { changeProfileImage } from "../../lib/auth.js";
import { logOut } from "../../lib/auth.js";


export const Feed = () => {
  
  const rootElement = document.createElement("div");
  rootElement.className = "feed-container"
  rootElement.innerHTML = `

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

<div class="publishContent">
  <textarea id='postText' placeholder='O que você quer compartilhar?'></textarea>
  <button id='publicar' class='publicar'>  Publicar</button>
  </div>
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

const postData = () => {
  const data = new Date().toLocaleString('pt-BR')
 return data.toLocaleString('pt-BR');
};


const post = {
  text: text,
  user_id: firebase.auth().currentUser.email,
  data: postData(),
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
    <div class='text'>
            <textarea disabled class='edit-text-area' hidden>${post.text}</textarea>
    </div>

    </div>
    <section class="likes-comments-bar">
      <div class="icones" id="icone-like"><img src="./images/like.png"> ${post.data().likes}</div>
      <div class="icones" id="icone-comment"><img src="./images/comment.png">  ${post.data().comments} </div>
      <button id="deletar" class="delete-button" value="${post.id}"> Deletar</button>
    </section>
    <div class="data-post-id" data-postid="${post.id}">
    <button  type="submit" class="btn-edit">Editar</button>
    <button type="submit" class="btn-cancel-edit" hidden> Cancelar</button>
    <button  type"submit" class="btn-edit-save" hidden> Salvar </button>
    </div>
    
  </div>
  `

rootElement.querySelector("#postado").innerHTML += postTemplate;


//Pegando os valores dos botões para editar
const editSaveButton = rootElement.querySelectorAll(".btn-edit-save")
const editTextArea = rootElement.querySelectorAll(".edit-text-area")
const editCancelBtn = rootElement.querySelectorAll(".btn-cancel-edit")
const editBtn = rootElement.querySelectorAll(".btn-edit")


editSaveButton.forEach(button => {
  button.addEventListener("click", () => {
    const editTextAreaOk = editTextArea.forEach(textarea => {
      textarea.hidden = true;
      textarea.disabled = true;
    })
    const editCancelBtnOk = editCancelBtn.forEach(button => {
      button.hidden = true;
    })
    const editSaveOk = editSaveButton.forEach(button => {
      button.hidden = true;
    })
  })
})

editBtn.forEach(button => {
  button.addEventListener("click", () => {
    //const buttonNode = button.parentNode.dataset.postid
    const editSaveOk = editSaveButton.forEach(button => {
      button.hidden = false;
    })
  const editCancelBtnOk = editCancelBtn.forEach(button => {
  button.hidden = false;
  })
  const editTextAreaOk = editTextArea.forEach(textarea => {
    textarea.hidden = false;
    textarea.disabled = false;
  })
  })
})

editCancelBtn.forEach(button => {
  button.addEventListener("click", () => {

    const editSaveOk = editSaveButton.forEach(button => {
      button.hidden = true;
    })
    const editCancelBtnOk = editCancelBtn.forEach(button => {
      button.hidden = true;
    })
    const editTextAreaOk = editTextArea.forEach(textarea => {
      textarea.hidden = true;
    })
  })
})


};//aqui final da função


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

  })

}



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
     else if (quantityOfLikes !== 1)
       return `<p class="f-20 like-value" data-like-id="${buttonValue}"> ${quantityOfLikes} ❤️ Curtidas </p>`
     })(post.data().likes.length)}`
       })) 
     }) 
   })
 })



loadPosts();
return rootElement;

}



/*const editSaveButton = root.querySelectorAll(".btn-edit-save")
editSaveButton.forEach(button => {
  button.addEventListener("click", () => {
    const buttonNode = button.parentNode.dataset.postid
  })
})

/*const editButton = rootElement.querySelectorAll(".btn-edit")
editButton.forEach(button => {
  button.addEventListener("click", () => {
    const buttonNode = button.parentNode.dataset.postid
    console.log(buttonNode)
  })
})

const cancelEditButton = rootElement.querySelectorAll(".btn-cancel-edit")
cancelEditButton.forEach(button => {
  button.addEventListener("click", () => {
    const buttonNode = button.parentNode.dataset.postid
    console.log(buttonNode)
  })
})

const editTextArea = rootElement.querySelectorAll(".edit-text-area");
editButton.forEach(textarea => {
  textarea.addEventListener("click", () => {
    const textareaNode = textarea.parentNode.dataset.postid
    console.log(textareaNode)
  })
})

const editButton = rootElement.querySelectorAll(".btn-edit")
editButton.forEach(button => {
  button.addEventListener("click", () => {
    const buttonNode = button.parentNode.dataset.postid
    console.log(buttonNode)
  })
})

const cancelEditButton = rootElement.querySelectorAll(".btn-cancel-edit")
cancelEditButton.forEach(button => {
  button.addEventListener("click", () => {
    const buttonNode = button.parentNode.dataset.postid
    console.log(buttonNode)
  })
})

const editSaveButton = root.querySelectorAll(".btn-edit-save")
editSaveButton.forEach(button => {
  button.addEventListener("click", () => {
    const buttonNode = button.parentNode.datase.postid
    console.log(buttonNode)
  })
})*/
