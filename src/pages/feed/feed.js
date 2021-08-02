
export const Feed = () => {
  const rootElement = document.createElement("div");
  rootElement.className = "feed-container"
  rootElement.innerHTML = `
<form action = "" id="postForm">
  <textarea id='postText' placeholder='O que você quer compartilhar?'></textarea>
  <button id='publicar'>Publicar</button>
</form>
<section id='postado' class='posts-container'>

`
rootElement.querySelector('#postForm').addEventListener('submit', function(event){
event.preventDefault();
const text = rootElement.querySelector('#postText').value;

const postData = () => {
  const data = new Date();
  return data.toLocaleString();
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
  const postTemplate = `
  <div id="${post.id}" class="div-postados">
    <p class="user-post">Postado por ${post.data().user_id} </br>
    ${post.data().data} </p>
    <p class="txt-post">${post.data().text}</p>
    <section class="likes-comments-bar">
      <div class="icones" id="icone-like"><img src="./images/like.png"> ${post.data().likes}</div>
      <div class="icones" id="icone-comment"><img src="./images/comment.png">  ${post.data().comments} </div>
      <button id="deletar" class="deletar"> Deletar</button>
    </section>
    
  </div>
  `

rootElement.querySelector("#postado").innerHTML += postTemplate;



const btnDeletarPost = rootElement.querySelector("#deletar")
btnDeletarPost.addEventListener("click", () => {
  //const postId = `${post.id}`;
  const postsCollection = firebase.firestore().collection("posts")
  postsCollection.doc(post.id).delete().then(() => {
    rootElement.querySelector("#postado").innerHTML = "";
    loadPosts();
  })
})

}

function loadPosts() {
  const postsCollection = firebase.firestore().collection("posts")
  postsCollection.get().then(snap => {
    snap.forEach(post => {
      addPost(post);
    })
  })
}
loadPosts();




/*function deletePost(postId){
  const postsCollection = firebase.firestore().collection("posts")
  postsCollection.doc(postId).delete().then(() => {
    loadPosts();
  })
}*/

//const btnDeletarPost = rootElement.querySelector("#deletar")
//btnDeletarPost.addEventListener("click", deletePost);


  return rootElement;

}




