
import { logOut } from "../../lib/auth.js";
import { sendImageToDatabase } from "../../lib/auth.js";
import { getTheRoad } from "../../router.js";

export const Feed = () => {
  const rootElement = document.createElement("div");
  rootElement.className = "feed-container";
  rootElement.innerHTML = `
  <main class="all-container" id="all-container">
    <div class="feed-left-section">
      <aside>  
        <section class='profile-area'>
          <div class='div-perfil'>
            <img src='imagens/user.png' id='photo' class='photo feed-user-photo'>
            <div class = "feed-welcome-user">
              <p> Bem vinda </p>
              <p class='name-user' id="name-user"></p> 
            </div>
          </div>
        </section>
        <div class="feed-settings-container">
          <div class="feed-settings">
            <img src="./images/home-icon.png" alt="">
            <button class="text-icon" id=""> Início </button>
          </div>
          <div class="feed-settings">
            <img src="./images/config-icon.png" alt="">
            <button class="perfil-icon text-icon" id="perfil-icon"> Perfil </button>
          </div>
          <div class="feed-settings">
            <img src="./images/dark-icon.png" alt="">
            <button class="text-icon" id="button-dark"> Modo Escuro </button>
          </div>
          <div class="feed-settings">
            <img src="./images/out-icon.png" alt="">
            <button class="text-icon" id="button-signout"> Sair </button>
          </div>
        </div>
      </aside>
    </div>
    <div class="feed-right-section">
      <form>
        <input class="feed-search-input" placeholder="Busca"> </input>
      </form>
      <div class="wrap">
  
      <div class="container-carousel">
      
        <span id="previous"><i data-feather="chevron-left"> < </i></span>
        <span id="next"><i data-feather="chevron-right">  > </i></span>
        <div id="slider" class="slider">
        <a href="https://blog.bonitour.com.br/confira-os-4-melhores-lugares-para-praticar-mergulho-no-brasil/" target="_blank"> <img class="pictures" src="./images/stories/1.png"></img></a>
        <a href="https://soultrip.com.br/dicas-trilhasiniciantes/" target="_blank"><img class="pictures" src="./images/stories/2.png"></img></a>
        <img class="pictures" src="./images/stories/3.png"></img>
        <a href="https://freesider.com.br/esportes-radicais/melhores-dicas-de-surf/" target="_blank"><img class="pictures" src="./images/stories/4.png"></img></a>
        <a href="https://apuamarafting.com.br/tudo-sobre-rapel-e-dica-de-roteiro/" target="_blank"><img class="pictures" src="./images/stories/5.png"></img></a>
        <a href="https://www.bluhome.com.br/blog/dicas/dicas-para-organizar-uma-viagem-de-motorhome" target="_blank"><img class="pictures" src="./images/stories/6.png"></img></a>
        <img class="pictures" src="./images/stories/7.png"></img>
        <a href="https://blog.caffeinearmy.com.br/mente/yoga-para-iniciantes-o-que-e-beneficios-e-dicas-para-comecar-hoje/" target="_blank"><img class="pictures" src="./images/stories/8.png"></img></a>
        <a href="https://medium.com/@itau/17-dicas-que-v%C3%A3o-facilitar-a-vida-de-qualquer-ciclista-iniciante-708428d4e079" target="_blank"><img class="pictures" src="./images/stories/9.png"></img></a>
        <a href="https://www.thule.com/pt-br/articles/tips/kayaking-for-beginners" target="_blank"><img class="pictures" src="./images/stories/10.png"></img>
        <a href="https://www.atletasdobem.com.br/melhores-dicas-paraquedistas-iniciantes/" target="_blank"><img class="pictures" src="./images/stories/11.png"></img></a>
        </div>
      </div>
  
    </div>
        <form action = "" id="postForm" class="publication-form">
          <textarea class="feed-text-area" id='postText' placeholder='O que você quer compartilhar?'></textarea>
          <input class="feed-hide-url" id="hide-url"> </input>
          <div class='share-area-buttons'>
          <button id='publish-img-btn' class='circle violet'>📷</button>
          <div class='publish-img-form-box transparency'>
            <form method="post">
              <input type="file" id="image_uploads" class='share-area-img-btn' accept=".jpg, .jpeg, .png">
             </form>
          </div>
          <button id='publicar'>Publicar</button>
        </form>
      </div>
      <section id='postado' class='posts-container'> </section>
    </div>
  </main>
  `;


  const showUrlOfImagesToPublish = (urlFile) => {
    rootElement.querySelector('#hide-url').value = `${urlFile}`;
    rootElement.querySelector('#postText').placeholder = 'O que você quer compartilhar?';
  };
  
  const uploadImage = () => {
    rootElement.querySelector('.publish-img-form-box').style.opacity = 1;
    rootElement.querySelector('#image_uploads').onchange = (event) => {
    sendImageToDatabase(event.target.files[0], showUrlOfImagesToPublish);
    rootElement.querySelector('.publish-img-form-box').style.opacity = 0;
    rootElement.querySelector('#postText').placeholder = 'Imagem carregada';
    };
  };
  
  const imageToUpload = rootElement.querySelector("#image_uploads");

  const getUpLoadImgClick = () => {
    rootElement.querySelector("#publish-img-btn").addEventListener('click', () => {
     uploadImage()
     imageToUpload.style.opacity= 1;
     
    
    });    
  };
  getUpLoadImgClick()

  const perfil = rootElement.querySelector('.perfil-icon');
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
    };
  });

  const darkMode = () => { 
    rootElement.querySelector("#button-dark").addEventListener('click', () => { 
      const change = rootElement.querySelector("#all-container"); 
      const changeAside = rootElement.querySelector("aside"); 
      const changeFeed = rootElement.querySelector(".feed-left-section"); 
      change.style.background = "rgb(30, 35, 41)"; 
      changeAside.style.background = "rgb(19, 22, 26)" 
      changeFeed.style.background ="rgb(19, 22, 26)" 
    }); 
  }; 
  darkMode(); 




const postsCollection = firebase.firestore().collection("posts");

//Função para adicionar os posts no firebase e printar na tela:
  rootElement.querySelector('#postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const text = rootElement.querySelector('#postText').value;
    const url = rootElement.querySelector('#hide-url').value;
    const postData = () => {
      const data = new Date();
      return data.toLocaleString("pt-BR");
    };
    const post = {
      text: text,
      url:url,
      user_id: currentUserEmail,
      data: postData(),
      likes: [],
      comments: []
    }; 
    if(postText.value === ""){
      return
    }else{   
    postsCollection.add(post).then(() => {
      rootElement.querySelector("#postText").value= "";
      rootElement.querySelector("#postado").innerHTML = "";
      loadPosts();
    })};
  });

  // Printa todos os posts existentes na tela:
  function loadPosts() {
    postsCollection.orderBy('data', 'desc').get().then(snap => {
      snap.forEach(post => {
    const postElement = document.createElement("div");//aqui criou mais uma div e mandou para ela o que era a div-postados
    postElement.id = post.id;
    postElement.classList.add("div-postados")
    rootElement.querySelector('#hide-url').value = "";
        const postTemplate = 
     
        `
          <p class="user-post"> ${post.data().user_id} <br>${post.data().data} </p>

          <div class="data-post-id" data-postid="${post.id}">
          <button type="submit" data-deletePostButton="${post.id}" data-item="deletepost" class="delete-button"> </button>
          <button  type="submit" class="btn-edit"></button>
          <button type="submit" class="btn-cancel-edit" hidden> Cancelar</button>
          <button  type"submit" class="btn-edit-save" hidden> Salvar </button>

          <div class="confirm-delete">
          <div class="modal-delete">
          <div class="h1-modal">Você tem certeza que quer excluir esse post?</div>
          <button class="delete-buttons-modal" id="confirm-delete-modal">Confirmar</button>
          <button class="delete-butons-modal" id="cancel-delete-modal"> Cancelar </button>
          </div>
          </div>
        </div>

       
        <p class="txt"> ${post.data().text} </p>
        <textarea disabled class='edit-text-area' hidden>${post.data().text}</textarea>
          ${(url => { 
            if (url !== "") 
              return `<img class="img-po" src="${post.data().url}"> </img>`
            else `<img id="hide-img" src="${post.data().url}"> </img>`
              return 
          }) (post.data().url)
        }
       
          <section class="likes-comments-bar">
          
          <section class="anim-like"id="anim-like" >
          </section> 
          <button class="like-btn" id="like-btn" data-likePostButton = "${post.id}"></button> 
            ${(quantityOfLikes => {
              if(quantityOfLikes === 1)
                return `<p class="f-20 like-value" data-likes-id="${post.id}"> <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> <span data-like-text-to-be-changed="${post.id}"> Curtida </span> </p>`
              else if (quantityOfLikes > 1)
                return  `<p class="f-20 like-value" data-likes-id="${post.id}"> <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> <span data-like-text-to-be-changed="${post.id}"> Curtidas </span> </p>`
              else
                return `<p class="f-20 like-value" data-likes-id="${post.id}"> <span data-like-value-to-be-changed="${post.id}"> ${0} </span> <span data-like-text-to-be-changed="${post.id}"> Curtidas </span> </p>`
            }) (post.data().likes.length)}
           
          </section>
          
          <div class="comments">
          <input required data-commentPostInput="${post.id}" placeholder='O que você quer comentar?'></input>
          <button class="comment-button" data-commentPostButton="${post.id}"> Comentar </button> 
          <button class="show-comments-button" data-showComments = ${post.id}> Mostrar Comentarios </button>
          <ul data-commentPostUl="${post.id}"> </ul>
        </div>
    
    
          <div class="comments">
            <ul data-comment-post-id="${post.id}"> </ul>
          </div>
        </div>
      `
      postElement.innerHTML = postTemplate
      const showheat = postElement.querySelector("#like-btn").addEventListener("click", () => { 
        const element = postElement.querySelector(".anim-like"); element.style.opacity = 1;
       }); 
       
       showheat; 
    
      
    
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
     if(editTextArea.value == "")return
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
    
    //editPost: aqui não consegui deixar ela pra fora.
   function editUpdate(newText, postId){
    firebase.firestore().collection("posts").doc(postId).update({
      text: newText,
    })
    rootElement.querySelector("#postado").innerHTML = " ";
    loadPosts()
   }
   
  }; //aqui final da função loadPosts()



  // Adição dos eventos dos botões:
  const currentUserEmail = firebase.auth().currentUser.email;
  const postsContainer = rootElement.querySelector(".posts-container");
  postsContainer.addEventListener("click", (e) => {
    const {target} = e;
    const postID = target.parentNode.parentNode.id;
    const postIDForComments = target.parentNode.parentNode.parentNode.parentNode.id;

//delete com modal
    if(target.dataset.item == "deletepost"){
      const divConfirmDelete = target.parentNode.parentNode.children[1].children[4]
      const divConfirmDeleteModal = target.parentNode.parentNode.children[1].children[4].children[0].children[1]
      const divCancelDeleteModal = target.parentNode.parentNode.children[1].children[4].children[0].children[2]

      divConfirmDelete.style.display ="block";
      divConfirmDeleteModal.addEventListener("click", () => {
        deletePost(postID)
        .then(()=>{
          divConfirmDelete.style.display="none";
        })
      })

      divCancelDeleteModal.addEventListener("click", () => {
        divConfirmDelete.style.display="none"
      })
    }

    // Delete Post:
   // const deleteButton = target.dataset.deletepostbutton;
    //if (deleteButton) {
      //const deleteConfirmation = confirm("Você realmente gostaria de deletar este post?");
      //if (deleteConfirmation)
        //deletePost(postID);
      //else
       // return false;
    //};

    // Like Post:
    const likeButton = target.dataset.likepostbutton;
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
            textToBeChanged.innerHTML = ` Curtida`;
          } else {
            textToBeChanged.innerHTML = ` Curtidas`;
          };
        } else {
          const newAmountOflikes = amountOfLikes -1;
          valueToBeChanged.innerHTML = `${newAmountOflikes}`;
          if (newAmountOflikes === 1) {
            textToBeChanged.innerHTML = ` Curtida`;
          } else {
            textToBeChanged.innerHTML = ` Curtidas`;
          };
        };
      };
      updateLikes ();
    };

    const printComments = (commentsToPrint, parentID) => {
      const commentArea = rootElement.querySelector('[data-commentPostUl="' + parentID + '"]');
      commentArea.innerHTML = "";
      commentsToPrint.forEach(comment => {
        const newItem = 
          `<li class="comment-f-20" id="${comment.id}">
            <p class="comment-owner"> ${comment.owner} </p> 
            <p class="comment-content">${comment.content}</p>
          <button class="delete-comment-btn" data-deleteCommentButton="${comment.id}"> </button>
            <button class="like-comment-btn" data-likeCommentButton="${comment.id}"> </button> 
            
            
            ${(quantityOfLikes => { 
              if(quantityOfLikes === 1) 
                return `<p class="f-20 like-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${quantityOfLikes} </span> <span data-comment-likes-text-to-be-changed="${comment.id}">  Curtida </span> </p>`
              else if (quantityOfLikes > 1)
                return  `<p class="f-20 like-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${quantityOfLikes} </span> <span data-comment-likes-text-to-be-changed="${comment.id}">  Curtidas </span> </p>`
              else
                return `<p class="f-20 like-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${0} </span> <span data-comment-likes-text-to-be-changed="${comment.id}">  Curtidas </span> </p>` 
            }) (comment.commentLikes.length)}
         
            `;


        commentArea.innerHTML += newItem
      });

    };


     //Show Post Comments:
    const showCommentsButton = target.dataset.showcomments;
    if(showCommentsButton){
      async function getComments () {
        const currentComments = await showComments(postID);
        printComments (currentComments, postID);
      };
      getComments();
    };

    // Comment Post:
    const commentButton = target.dataset.commentpostbutton;
    if (commentButton){
      async function getCurrentComments () {
        commentPost(postID);
        const currentComments = await commentPost(postID);
        printComments (currentComments, postID);
      };
      getCurrentComments ();
    };

    //Like Post Comment:
    const likeCommentButton = target.dataset.likecommentbutton;
    if(likeCommentButton) {
      const commentID = target.dataset.likecommentbutton;
      async function getCurrentCommentLikes () {
        likePostComment(postIDForComments, commentID);
        const likeOrDeslike = await likePostComment (postIDForComments, commentID);
        const valueToBeChanged = rootElement.querySelector('[data-comment-likes-value-to-be-changed="' + commentID + '"]');
        const textToBeChanged = rootElement.querySelector('[data-comment-likes-text-to-be-changed="' + commentID + '"]');
        let amountOfLikes  = parseInt(valueToBeChanged.textContent,10);
        if (likeOrDeslike === "like") {
          const newAmountOflikes = amountOfLikes + 1
          valueToBeChanged.innerHTML = `${newAmountOflikes}`;
          if (newAmountOflikes === 1) {
            textToBeChanged.innerHTML = ` Curtida`;
          } else {
            textToBeChanged.innerHTML = ` Curtidas`;
          };
        } else {
          const newAmountOflikes = amountOfLikes - 1
          valueToBeChanged.innerHTML = `${newAmountOflikes}`;
          if (newAmountOflikes === 1) {
            textToBeChanged.innerHTML = ` Curtida`;
          } else {
            textToBeChanged.innerHTML = ` Curtidas`;
          };
        };
      };
      getCurrentCommentLikes ();
    };
    
  //Delete Post Comment:
    const deleteCommentButton = target.dataset.deletecommentbutton;
    if (deleteCommentButton) {
      const commentID = target.dataset.deletecommentbutton;
      const deleteConfirmation = confirm("Você realmente gostaria de deletar este Comentário?");
      if (deleteConfirmation) {
        async function getCurrentComments () {
          deletePostComment(postIDForComments, commentID);
          const currentComments = await deletePostComment (postIDForComments, commentID);
          printComments (currentComments, postIDForComments);
        };
        getCurrentComments ()
      } else {
      return false;
      }
    };
  });

// Funções (delete, like, comment and logout):
  function deletePost(postID) {
    postsCollection.doc(postID).delete().then(() => {
      rootElement.querySelector("#postado").innerHTML = "";
      loadPosts();
    });
  };

  function likePost(postID) {
    const likesPostId = postsCollection.doc(postID);
    const promiseResult = likesPostId.get().then((post => {
      const people = post.data().likes;
      if (people.length >= 1) {
        if (people.includes(currentUserEmail)) {
          likesPostId
          .update({ likes: firebase.firestore.FieldValue
          .arrayRemove(currentUserEmail)});
          return "deslike";
        } else {
          likesPostId
          .update({ likes: firebase.firestore.FieldValue
          .arrayUnion(currentUserEmail)});
          return "like";
        }
      } else {
        likesPostId
        .update({ likes: firebase.firestore.FieldValue
        .arrayUnion(currentUserEmail)});
        return "like";
      };
    })).catch(error => {
      console.log(error)
    });
    return promiseResult
  };
  
  function showComments(postID) {
    const commentPostId = postsCollection.doc(postID);
    const promiseResult = commentPostId.get().then((post => {
      const comments = (post.data().comments);
      return comments 
    }));
    return promiseResult
  }

  function showComments(postID) {
    const commentPostId = postsCollection.doc(postID);
    const promiseResult = commentPostId.get().then((post => {
      const comments = (post.data().comments);
      return comments 
    }));
    return promiseResult
  }
  
  function commentPost(postID) {
    const commentPostId = postsCollection.doc(postID);
      const promiseResult = commentPostId.get().then((post) => {
      const newCommentInput  = rootElement.querySelector('[data-commentPostInput="' + postID + '"]');
      const newCommentText  = newCommentInput.value;
      const comments = post.data().comments;
      if (newCommentText !== "") {
        const newComment = 
          {owner:currentUserEmail, 
          content:newCommentText,
          postOfOrigin:postID,
          commentLikes:[],
          id: postID + new Date().toLocaleString("pt-BR")
          }
        commentPostId
        .update({comments: firebase.firestore.FieldValue
        .arrayUnion(newComment),});
        const currentComments = comments.concat(newComment)
        return currentComments
      } else {
        return comments;
      }
    });
    return promiseResult;
  };

  function likePostComment(postID, commentID) {
    const commentPostId = postsCollection.doc(postID);
    const promiseResult = commentPostId.get().then((post => {
      const comments = (post.data().comments);
      const commentToLikeOrDislike = comments.filter(comment => comment.id === commentID);
      const commentsNotChanged = comments.filter(comment => comment.id !== commentID);
      let action = "";

      if (commentToLikeOrDislike[0].commentLikes.length >= 1) {
        if(commentToLikeOrDislike[0].commentLikes.includes(currentUserEmail)){
          const index = commentToLikeOrDislike[0].commentLikes.indexOf(currentUserEmail);
          if (index > -1) {
            commentToLikeOrDislike[0].commentLikes.splice(index, 1);
          }
          action = "deslike";
        } else {
          commentToLikeOrDislike[0].commentLikes.push(currentUserEmail);
          action = "like";
        };
      } else {
        commentToLikeOrDislike[0].commentLikes.push(currentUserEmail);
        action = "like";
      };
      const newContent = commentToLikeOrDislike.concat(commentsNotChanged);
      commentPostId.update({comments:newContent})
      return action
      
    }));
    return promiseResult;
  };

  function deletePostComment(postID, commentID) {
    const commentPostId = postsCollection.doc(postID);
    const promiseResult = commentPostId.get().then((post => {
      const comments = (post.data().comments);
      const commentsToKeep = comments.filter(comment => comment.id !== commentID);
      commentPostId.update({comments:commentsToKeep})
      return commentsToKeep;
    }));
    return promiseResult
  }; 

  const btnSignOut = rootElement.querySelector("#button-signout");
  btnSignOut.addEventListener("click", logOut);


const nextEl = rootElement.querySelector('#next');
const previousEl = rootElement.querySelector('#previous');
const sliderEl = rootElement.querySelector('#slider')



function onNextClick() {

  const imgWidth = sliderEl.offsetWidth;
  sliderEl.scrollLeft += imgWidth;
}

function onPreviousClick() {
  const imgWidth = sliderEl.offsetWidth;
  sliderEl.scrollLeft -= imgWidth;
}

nextEl.addEventListener('click', onNextClick);
previousEl.addEventListener('click', onPreviousClick);


  loadPosts();
  return rootElement;

}; 



/*
import { getTheRoad, logOut, sendImageToDatabase } from '../../lib/auth.js';
import { editPost, getPosts, deletePost } from './services.js';
import {
  updateLikes, getComments, getCurrentCommentsToComment, getCurrentCommentLikes,
  getCurrentCommentsToDelete,
} from './data.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.className = 'feed-container';
  rootElement.innerHTML = `
  <main class="all-container" id="all-container">
    <div class="feed-left-section">
      <aside>  
        <section class='profile-area'>
          <div class='div-perfil'>
            <img src='imagens/user.png' id='photo' class='photo feed-user-photo'>
            <div class = "feed-welcome-user">
              <p> Bem vinda </p>
              <p class='name-user' id="name-user"></p> 
            </div>
          </div>
        </section>
        <div class="feed-settings-container">
          <div class="feed-settings">
            <img src="./images/home-icon.png" alt="">
            <button class="text-icon" id=""> Início </button>
          </div>
          <div class="feed-settings">
            <img src="./images/config-icon.png" alt="">
            <button class="perfil-icon text-icon" id="perfil-icon"> Perfil </button>
          </div>
          <div class="feed-settings">
            <img src="./images/dark-icon.png" alt="">
            <button class="text-icon" id="button-dark"> Modo Escuro </button>
          </div>
          <div class="feed-settings">
            <img src="./images/out-icon.png" alt="">
            <button class="text-icon" id="button-signout"> Sair </button>
          </div>
        </div>
      </aside>
    </div>
    <div class="feed-right-section">
      <form>
        <input class="feed-search-input" placeholder="Busca"> </input>
      </form>
      <div class="wrap">
  
      <div class="container-carousel">
      
        <span id="previous"><i data-feather="chevron-left"> < </i></span>
        <span id="next"><i data-feather="chevron-right">  > </i></span>
        <div id="slider" class="slider">
        <a href="https://blog.bonitour.com.br/confira-os-4-melhores-lugares-para-praticar-mergulho-no-brasil/"> <img class="pictures" src="./images/stories/1.png"></img></a>
        <img class="pictures" src="./images/stories/2.png"></img>
        <img class="pictures" src="./images/stories/3.png"></img>
        <img class="pictures" src="./images/stories/4.png"></img>
        <img class="pictures" src="./images/stories/5.png"></img>
        <img class="pictures" src="./images/stories/6.png"></img>
        <img class="pictures" src="./images/stories/7.png"></img>
        <img class="pictures" src="./images/stories/8.png"></img>
        <img class="pictures" src="./images/stories/9.png"></img>
        <img class="pictures" src="./images/stories/10.png"></img>
        <img class="pictures" src="./images/stories/11.png"></img>
        </div>
      </div>
  
    </div>
        <form action = "" id="postForm" class="publication-form">
          <textarea class="feed-text-area" id='postText' placeholder='O que você quer compartilhar?'></textarea>
          <input class="feed-hide-url" id="hide-url"> </input>
          <div class='share-area-buttons'>
          <button id='publish-img-btn' class='circle violet'>📷</button>
          <div class='publish-img-form-box transparency'>
            <form method="post">
              <input type="file" id="image_uploads" class='share-area-img-btn' accept=".jpg, .jpeg, .png">
             </form>
          </div>
          <button id='publicar'>Publicar</button>
        </form>
      </div>
      <section id='postado' class='posts-container'> </section>
    </div>
  </main>
  `;

  const showUrlOfImagesToPublish = (urlFile) => {
    rootElement.querySelector('#hide-url').value = `${urlFile}`;
    rootElement.querySelector('#postText').placeholder = 'O que você quer compartilhar?';
  };

  const uploadImage = () => {
    rootElement.querySelector('.publish-img-form-box').style.opacity = 1;
    rootElement.querySelector('#image_uploads').onchange = (event) => {
      sendImageToDatabase(event.target.files[0], showUrlOfImagesToPublish);
      rootElement.querySelector('.publish-img-form-box').style.opacity = 0;
      rootElement.querySelector('#postText').placeholder = 'Imagem carregada';
    };
  };

  const imageToUpload = rootElement.querySelector('#image_uploads');

  const getUpLoadImgClick = () => {
    rootElement.querySelector('#publish-img-btn').addEventListener('click', () => {
      uploadImage();
      imageToUpload.style.opacity = 1;
    });
  };
  getUpLoadImgClick();

  const perfil = rootElement.querySelector('.perfil-icon');
  perfil.addEventListener('click', (event) => {
    event.preventDefault();
    getTheRoad('/profile');
  });

  const photoPerfil = rootElement.querySelector('.photo');
  const nomeP = rootElement.querySelector('.name-user');
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      nomeP.innerHTML = user.displayName;
      photoPerfil.src = user.photoURL;
    } else {
      nomeP.innerHTML = user.email;
      photoPerfil.src = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
    }
  });

  const darkMode = () => {
    rootElement.querySelector('#button-dark').addEventListener('click', () => {
      const change = rootElement.querySelector('#all-container');
      const changeAside = rootElement.querySelector('aside');
      const changeFeed = rootElement.querySelector('.feed-left-section');
      change.style.background = 'rgb(30, 35, 41)';
      changeAside.style.background = 'rgb(19, 22, 26)';
      changeFeed.style.background = 'rgb(19, 22, 26)';
    });
  };
  darkMode();

  const postsCollection = firebase.firestore().collection('posts');
  const currentUserEmail = firebase.auth().currentUser.email;
  //  Função para adicionar os posts no firebase e printar na tela:
  rootElement.querySelector('#postForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const postText = rootElement.querySelector('#postText');
    const text = rootElement.querySelector('#postText').value;
    const url = rootElement.querySelector('#hide-url').value;
    const postData = () => {
      const data = new Date();
      return data.toLocaleString('pt-BR');
    };

    const post = {
      text: text,
      url:url,
      user_id: currentUserEmail,
      data: postData(),
      likes: [],
      comments: [],
    };

    if (postText.value === '') {
      return;
    }
    postsCollection.add(post).then(() => {
      rootElement.querySelector('#postText').value = '';
      rootElement.querySelector('#postado').innerHTML = '';
      loadPosts();
    });
  });

  // Printa todos os posts existentes na tela:
  function createPostTemplate(post) {
    const postTemplate = `
          <p class="user-post"> ${post.data().user_id} <br>${post.data().data} </p>
          <div class="data-post-id" data-postid="${post.id}" data-postOwner="${post.data().user_id}">
          ${((user) => {
    if (user === currentUserEmail) {
      return `<button type="submit" data-editPostButton="${post.id}" class="btn-edit">Editar</button>`;
    } return `<button type="submit" data-editPostButton="${post.id}" class="btn-edit" hidden>Editar</button>`;
  })(post.data().user_id)}
            <button type="submit" data-cancelEditionPostButton="${post.id}" class="btn-cancel-edit" hidden> Cancelar</button>
            <button type="submit" data-saveEditionPostButton="${post.id}" class="btn-edit-save" hidden> Salvar </button>
          </div>
          <p class="txt"> ${post.data().text} </p>
          <textarea class='edit-text-area' data-edit-text-area='${post.id}' hidden>${post.data().text}</textarea>
          ${((url) => {
    if (url !== '') {
      return `<img class="img-po" src="${post.data().url}"> </img>`;
    } return `<img id="hide-img" src="${post.data().url}"> </img>`;
  })(post.data().url)}
          <section class="likes-comments-bar">
          ${((user) => {
    if (user === currentUserEmail) {
      return `<button type="submit" data-deletePostButton="${post.id}" class="delete-button"> Deletar</button>`;
    } return `<button type="submit" data-deletePostButton="${post.id}" class="delete-button" hidden> Deletar</button>`;
  })(post.data().user_id)}
          <section class="anim-like"id="anim-like" >
          </section> 
          <button class="like-btn" id="like-btn" data-likePostButton = "${post.id}"> </button> 
            ${((quantityOfLikes) => {
    if (quantityOfLikes === 1) {
      return `<p class="f-20 like-value" data-likes-id="${post.id}"> 
                <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> 
                <span data-like-text-to-be-changed="${post.id}"> ❤️ Curtida </span> 
              </p>`;
    } if (quantityOfLikes > 1) {
      return `<p class="f-20 like-value" data-likes-id="${post.id}">
                <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> 
                <span data-like-text-to-be-changed="${post.id}"> ❤️ Curtidas </span> 
              </p>`;
    } return `<p class="f-20 like-value" data-likes-id="${post.id}"> 
                <span data-like-value-to-be-changed="${post.id}"> ${0} </span>
                <span data-like-text-to-be-changed="${post.id}"> ❤️ Curtidas </span> 
              </p>`;
  })(post.data().likes.length)}
          </section>
          <div class="comments">
            <input required data-commentPostInput="${post.id}" placeholder='O que você quer comentar?'></input>
            <button data-commentPostButton="${post.id}"> Comentar </button> 
            <button data-showComments = ${post.id}> Mostrar Comentarios </button>
            <ul data-commentPostUl="${post.id}"> </ul>
        </div>
        <div class="comments">
          <ul data-comment-post-id="${post.id}"> </ul>
        </div>
      </div>
      `;

    return postTemplate;
  }

  function createAndPrintAllPosts(post) {
    const postElement = document.createElement('div');
    postElement.id = post.id;
    postElement.classList.add('div-postados');
    rootElement.querySelector('#hide-url').value = '';
    const postTemplate = createPostTemplate(post);
    postElement.innerHTML = postTemplate;
    const showheat = postElement.querySelector('#like-btn');
    showheat.addEventListener('click', () => {
      const element = postElement.querySelector('.anim-like'); element.style.opacity = 1;
    });
    rootElement.querySelector('#postado').appendChild(postElement);
  }

  function loadPosts() {
    getPosts(createAndPrintAllPosts);
  }

  // Adição dos eventos dos botões:
  const postsContainer = rootElement.querySelector('.posts-container');
  // eslint-disable-next-line consistent-return
  postsContainer.addEventListener('click', (e) => {
    const { target } = e;
    const postID = target.parentNode.parentNode.id;
    const postIDForComments = target.parentNode.parentNode.parentNode.parentNode.id;
    const printComments = (commentsToPrint, parentID) => {
      const commentArea = rootElement.querySelector(`[data-commentPostUl="${parentID}"]`);
      commentArea.innerHTML = '';
      commentsToPrint.forEach((comment) => {
        const newItem = `
            <li class="comment-f-20" id="${comment.id}">
              <p> Comentários: <br> ${comment.owner} <br> ${comment.content}</p>;
              <button data-likeCommentButton="${comment.id}"> Curtir </button> ;
              ${((user) => {
    if (user === currentUserEmail) {
      return `<button data-deleteCommentButton="${comment.id}"> Deletar </button>`;
    } return `<button data-deleteCommentButton="${comment.id}" hidden> Deletar </button>`;
  })(comment.owner)}
            ${((quantityOfLikes) => {
    if (quantityOfLikes === 1) {
      return `<p class="f-20 like-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${quantityOfLikes} </span> <span data-comment-likes-text-to-be-changed="${comment.id}"> ❤️ Curtida </span> </p>`
    } if (quantityOfLikes > 1) {
      return `<p class="f-20 like-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${quantityOfLikes} </span> <span data-comment-likes-text-to-be-changed="${comment.id}"> ❤️ Curtidas </span> </p>`
    }
    return `<p class="f-20 like-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${0} </span> <span data-comment-likes-text-to-be-changed="${comment.id}"> ❤️ Curtidas </span> </p>` 
  })(comment.commentLikes.length)}
            `;
        commentArea.innerHTML += newItem;
      });
    };

    //  Edit Post:
    const editButton = target.dataset.editpostbutton;
    if (editButton) {
      rootElement.querySelector(`[data-editPostButton="${postID}"]`).hidden = true;
      rootElement.querySelector(`[data-cancelEditionPostButton="${postID}"]`).hidden = false;
      rootElement.querySelector(`[data-saveEditionPostButton="${postID}"]`).hidden = false;
      rootElement.querySelector(`[data-edit-text-area="${postID}"]`).hidden = false;
    }

    const cancelEditionButton = target.dataset.canceleditionpostbutton;
    if (cancelEditionButton) {
      rootElement.querySelector(`[data-editPostButton="${postID}"]`).hidden = false;
      rootElement.querySelector(`[data-cancelEditionPostButton="${postID}"]`).hidden = true;
      rootElement.querySelector(`[data-saveEditionPostButton="${postID}"]`).hidden = true;
      rootElement.querySelector(`[data-edit-text-area="${postID}"]`).hidden = true;
    }

    const saveEditionButton = target.dataset.saveeditionpostbutton;
    if (saveEditionButton) {
      const newText = rootElement.querySelector(`[data-edit-text-area="${postID}"]`).value;
      editPost(newText, postID);
      rootElement.querySelector('#postado').innerHTML = '';
      loadPosts();
    }

    // Delete Post:
    const deleteButton = target.dataset.deletepostbutton;
    if (deleteButton) {
      const deleteConfirmation = confirm('Você realmente gostaria de deletar este post?');
      if (deleteConfirmation) {
        rootElement.querySelector('#postado').innerHTML = '';
        deletePost(postID, loadPosts);
      } else {
        return false;
      }
    }

    // Like Post:
    const likeButton = target.dataset.likepostbutton;
    if (likeButton) {
      const valueToBeChanged = rootElement.querySelector(`[data-like-value-to-be-changed="${postID}"]`);
      const textToBeChanged = rootElement.querySelector(`[data-like-text-to-be-changed="${postID}"]`);
      const amountOfLikes = parseInt(valueToBeChanged.textContent, 10);
      updateLikes(postID, currentUserEmail, valueToBeChanged, textToBeChanged, amountOfLikes);
    }

    //  Show Post Comments:
    const showCommentsButton = target.dataset.showcomments;
    if (showCommentsButton) {
      getComments(postID, printComments);
    }

    // Comment Post:
    const commentButton = target.dataset.commentpostbutton;
    if (commentButton) {
      const newCommentInput = rootElement.querySelector(`[data-commentPostInput="${postID}"]`);
      const newCommentText = newCommentInput.value;
      getCurrentCommentsToComment(postID, newCommentText,
        currentUserEmail, printComments);
    }

    // Like Post Comment:
    const likeCommentButton = target.dataset.likecommentbutton;
    if (likeCommentButton) {
      const commentID = target.dataset.likecommentbutton;
      const valueToBeChanged = rootElement.querySelector(`[data-comment-likes-value-to-be-changed="${commentID}"]`);
      const textToBeChanged = rootElement.querySelector(`[data-comment-likes-text-to-be-changed="${commentID}"]`);
      const amountOfLikes = parseInt(valueToBeChanged.textContent, 10);
      getCurrentCommentLikes(postIDForComments, currentUserEmail, commentID,
        valueToBeChanged, textToBeChanged, amountOfLikes);
    }

    // Delete Post Comment:
    const deleteCommentButton = target.dataset.deletecommentbutton;
    if (deleteCommentButton) {
      const commentID = target.dataset.deletecommentbutton;
      const deleteConfirmation = confirm('Você realmente gostaria de deletar este Comentário?');
      if (deleteConfirmation) {
        getCurrentCommentsToDelete(postIDForComments, commentID, printComments);
      } else {
        return false;
      }
    }
  });

  // Sign Out
  const btnSignOut = rootElement.querySelector('#button-signout');
  btnSignOut.addEventListener('click', logOut);

  // Slider Bolinhas
  const nextEl = rootElement.querySelector('#next');
  const previousEl = rootElement.querySelector('#previous');
  const sliderEl = rootElement.querySelector('#slider');

  function onNextClick() {
    const imgWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft += imgWidth;
  }

  function onPreviousClick() {
    const imgWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft -= imgWidth;
  }

  nextEl.addEventListener('click', onNextClick);
  previousEl.addEventListener('click', onPreviousClick);

  loadPosts();
  return rootElement;
};*/
