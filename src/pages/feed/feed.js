
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
/*const postData = () => { laís, aqui estou tentando pegar a data e horário do post pra exibir por ordem de lançamento, vou mexer mais ainda.
  const datapost = new Date();
  return datapost.toLocaleString();
}*/


const post = {
  text: text,
  user_id: firebase.auth().currentUser.email,
  data: [],
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

    <p class="user-post">Postado por ${firebase.auth().currentUser.email}</p>
    ${post.data().text}</br></br>
    <section class="likes-comments-bar">
      <div class="icones" id="icone-like"><img src="./images/like.png"> ${post.data().likes}</div>
      <div class="icones" id="icone-comment"><img src="./images/comment.png">  ${post.data().comments} </div>
      <button id="deletar"> Deletar</button>
    </section>
    

  </div>
  `
  
rootElement.querySelector("#postado").innerHTML += postTemplate;

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


function deletePost(postId){
  const postsCollection = firebase.firestore().collection("posts")
  postsCollection.doc(postId).delete().then(() => {
    loadPosts();
  })
}

//const btnDeletarPost = rootElement.querySelector("#deletar")
//btnDeletarPost.addEventListener("click", deletePost);

return rootElement;

}
