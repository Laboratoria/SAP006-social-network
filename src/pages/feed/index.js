export const Feed = () => {
  const rootElement = document.createElement('div');
  const container = `
    <img id="background" src="./pages/login/img/paleta3.jpg" alt="">
    <div class="esmaeceHeader logotipo-text">
      <section>
      <h2>FORT FEED</h2>
    </div> 

    <section class="post">
      <form action="" id="published-form">
      <input type="text" id="text-post" placeholder="Mana, o que você quer compatilhar?">
      <button id="send-post">Enviar</button>
      </form>
    </section>

    <section class="get-post">
    </section>
  `;

  rootElement.innerHTML = container;

  rootElement.querySelector('#published-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = rootElement.querySelector('#text-post').value;
    console.log(text);
  });

  // Objetos com propriedades utilizadas nos posts

  const post = {
    text: 'text',
    user_id: currentUser.uid,
  };

  // Criar a collection:

  const collectionOfPosts = firebase.firestore().collection('posts');

  collectionOfPosts.add(post).then(() => {
    rootElement.querySelector('#text-post').value = '';
    rootElement.querySelector('#get-post').innerHTML = '';
    loadPosts();
  });

  // function addPost(post){
  //   const postTemplate = `
  //   <div id="${post.id}" class="div-postados">
  //     <p class="user-post">Postado por ${post.data().user_id} </br>
  //     ${post.data().data} </p>
  //     <p class="txt-post">${post.data().text}</p>
  //     <section class="likes-comments-bar">
  //       <div class="icones" id="icone-like"><img src="./images/like.png"> ${post.data().likes}</div>
  //       <div class="icones" id="icone-comment"><img src="./images/comment.png">  ${post.data().comments} </div>
  //       <button id="deletar" class="delete-button" value="${post.id}"> Deletar</button>
  //     </section>
      
  //   </div>
  //   `
  
  // rootElement.querySelector("#postado").innerHTML += postTemplate;
  
  // };

  function loadPosts() {
    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.get().then(print => {
      print.forEach(post => {
        addPost(post);
      })
    })}

  return rootElement;
}
