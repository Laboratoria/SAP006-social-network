import {
  newPost, showPost,
  logOut, removeUserLocalStorage, userData, unLiked, liked,
  // getPost,
} from '../../services/index.js';

export default () => {
  const user = userData().uid;
  // console.log(user);
  if (!user) {
    window.location.hash = '#home';
  }
  const container = document.createElement('div');
  const template = `
  <header>
    <nav class="menu">
    </nav> 
      <a href="/#feed">
      </a>
      <button id="sign-out" class="button">Sair</div>
  </header>
  
    <div class= "container">
      <div class= "card-post">
        <p id="error-message"></p>
        <form>
          <h2>Post</h2>
            <textarea type="text" name="post-feed" id="post-message" class="post-text" cols="30" rows="5" maxlength="500" placeholder="Escreva sua experiência aqui"></textarea>
            <button type="button" id="post-button" class="button">Publicar</button>
        </form>
      </div> 
      <div class= "feed-container"> 
      <h2 class="title">Feed</h2><br>
      <div id="add-new-post" class="new-post"></div>
      </div>
      
    </div> 
    `;

  container.innerHTML += template;

  const postButton = container.querySelector('#post-button');
  const postMessage = container.querySelector('#post-message');
  const errorMsg = container.querySelector('#error-message');
  const signOut = container.querySelector('#sign-out');
  const addNewPost = container.querySelector('#add-new-post');

  const showNewPost = (data) => {
    // console.log(data.id);
    const likesPost = data.data().like;
    const post = document.createElement('div');
    const postTemplate = `
        <div class="post-feed">
          <div class="header-post">
            <h3>${data.data().name}</h3>
            <h5>${data.data().date}</h5>
          </div>
          <p>${data.data().message}</p>
          <p>${likesPost.length}</p>
          <button data-like="${data.id}" class="btn-like">Like</button>
          <button class="btn-edit"> Editar </button>
          <button class="btn-bin"> Excluir </button>
        </div>
      `;
    post.innerHTML += postTemplate;

    const likeButton = post.querySelector('.btn-like');
    likeButton.addEventListener('click', (event) => {
      const { target } = event;
      const btnLike = target.dataset.like;
      console.log(btnLike);
      // liked(user, data.id);
      // unLiked(user, data.id);
      if (!likesPost.includes(user, data.id)) {
        liked(user, data.id);
        // .then(() => {
        //   likesPost.push(data.id);
        // });
      } else {
        unLiked(user, data.id);
      }
      // let likes = getPost(postId).like;
      // getPost(postId)
      // if (!likesPost.includes(user)) {
      //   likesPost = data.like.filter(() => data.id !== user);
      // } else {
      //   likes.push(uid);
      // }
      // getPost(postId).like = likes;
    });

    addNewPost.appendChild(post);
  };

  showPost().then((item) => {
    item.forEach((post) => {
      showNewPost(post);
    });
  });

  postButton.addEventListener('click', () => {
    const postMsg = postMessage.value;
    if (postMsg === '') {
      errorMsg.innerHTML = 'O post está vazio, não foi possivel publicar. Tente novamente';
    } else {
      newPost(postMsg).then(() => {
        postMessage.value = '';
        errorMsg.innerHTML = '';
      });
    }
  });

  signOut.addEventListener('click', (event) => {
    console.log(signOut);
    event.preventDefault();
    logOut()
      .then(() => {
        removeUserLocalStorage();
        window.location.hash = '#home';
      });
  });

  return container;
};

/* const database = {
  'abc123': {
      likes: []
  },
  'bcd234': {
      arrlikes:[]
  }
}

const firstUser = 'uid456'

const like = (uid, postId) => {
  let likes = database[postId].arrlikes;
  if (likes.includes(uid)) {
  likes = arrlikes.filter((id) => uid !== id)
  } else {
      arrlikes.push(uid)
  }
  database[postId].arrlikes = likes
}

like(firstUser, 'abc123')

console.log(database)

like(firstUser, 'bcd234')
console.log(database)

like(firstUser, 'abc123')
console.log(database) */
