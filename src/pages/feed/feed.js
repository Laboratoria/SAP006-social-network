
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

const post = {
  text: text,
  user_id: firebase.auth().currentUser.email,
  likes: [],
  comments: [],
}
const postsCollection = firebase.firestore().collection("posts");
postsCollection.add(post).then(()=>{//o then é pra recarregar os posts assim que postar
  rootElement.querySelector("#postText").value= "";
  rootElement.querySelector('#postado').innerHTML = "";
  loadPosts();
  })
})

function addPost(post){
  const postTemplate = `
  <div id="${post.id}" class="div-postados">
  ${post.data().text}</br></br>
 <img src="./images/like.png">${post.data().likes}  ${post.data().comments} 
 <button id="deletar"> Deletar</button>
  </div>
  `
rootElement.querySelector("#postado").innerHTML += postTemplate

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
  const postsCollection=firebase.firestore().collection("posts")
  postsCollection.doc(postId).delete().then(() => {
    loadPosts();
  })
}

//const btnDeletarPost = rootElement.querySelector("#deletar")
//btnDeletarPost.addEventListener("click", deletePost);

return rootElement;

}
