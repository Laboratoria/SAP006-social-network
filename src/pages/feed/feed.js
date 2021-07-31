
export const Feed = () => {
  const rootElement = document.createElement("div");
  rootElement.className = "feed-container"
  rootElement.innerHTML = `
<form action = "" id="postForm">
  <textarea id='postText' placeholder='O que você quer compartilhar?'></textarea>
  <button type="submit" id='publicar' class='btn btn-small publish-btn purple'>Publicar</button>
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
  comments: []
}
const postsCollection = firebase.firestore().collection("posts");
postsCollection.add(post);
})

function addPost(post){
  const postTemplate = `
  <div id="${post.id}" class="div-postados">
  ${post.data().text}
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

return rootElement;
 }





