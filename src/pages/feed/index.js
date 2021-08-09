export const Feed = () => {
  const rootElement = document.createElement('div');
  const container = `
    <header class="inputSearch">
      <input type="search" class="searchBar" name="searchPost" placeholder="Busque por um post">
      <button><span class="iconify" data-inline="false" data-icon="clarity:notification-outline-badged" style="color: #FFD2BF;"></span></button>
    </header> 

    <section class="post">
      <form action="" id="published-form">
      <input type="text" id="text-post" placeholder="Mana, o que você quer compatilhar?">
      <button class="btn" id="send-post">Enviar</button>
      </form>
    </section>

    <section class="get-post" id="postTemplate">
    </section>

    <nav class="navbar">
      <ul>
        <li><span class="iconify" data-inline="false" data-icon="akar-icons:home" style="color: #FFD2BF;"></span></li>
        <li><span class="iconify" data-inline="false" data-icon="clarity:plus-circle-line" style="color: #FFD2BF;"></span></li>
        <li><span class="iconify" data-inline="false" data-icon="akar-icons:comment" style="color: #FFD2BF;"></span></li>
        <li><span class="iconify" data-inline="false" data-icon="akar-icons:person" style="color: #FFD2BF;"></span></li>
      </ul>
    </nav>

    
  `;

  rootElement.innerHTML = container;

  rootElement.querySelector('#published-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = rootElement.querySelector('#text-post').value;
    const post = {
      text: text,
      user_id: firebase.auth().currentUser.uid,
      likes: 0,
      comments: [],
    };
    const collectionOfPosts = firebase.firestore().collection('posts');

    collectionOfPosts.add(post);
  });

  function addPost(post) {
    const postStructure = `
    <section>
      <p id='${post.id}'>${post.data().text} ❤️ ${post.data().likes}</p> 
      <button id="btnDelete" value="${post.id}">Excluir</button>
    </section>
    `;

    document.getElementById('postTemplate').innerHTML += postStructure;
  }

  function loadPosts() {
    const collectionOfPosts = firebase.firestore().collection('posts');
    collectionOfPosts.get().then(snap => {
      snap.forEach(post => {
        addPost(post);
      });
    });
  }

  // const posts = {
  //   text: text,
  //   user_id: firebase.auth().currentUser.uid,
  //   likes: 0,
  //   comments: [],
  // };

  // const inputSearch = document.querySelector('.searchBar');
  // inputSearch.addEventListener('keyup', (e) => {
  //   const searchString = e.target.value;
  //   const searchedPosts = posts.filter((post) => {
  //     return ( 
  //       post.text.toLowerCase().includes(searchString) ||
  //       post.text.toUpperCase().includes(searchString)
  //     );
  //   });
  //   loadPosts(searchedPosts);
  // });

  const navbarBottom = document.getElementsByClassName('navbar');
  const sticky = navbarBottom.offsetBottom;
  function stickyFilter() {
    if (window.pageYOffset >= sticky) {
      navbarBottom.classList.add('sticky');
    }
    // else {
    //   navbarBottom.classList.remove('sticky');
    // }
  }
  window.onscroll = stickyFilter();
  // const btnDelete = document.querySelector('#btnDelete').value;
  // function deletePost(postId) {
  //   const collectionOfPosts = firebase.firestore().collection('posts');
  //   collectionOfPosts.doc(postId).delete().then(doc => {
  //     loadPosts();
  //   });
  // } 
  // console.log(btnDelete);
  loadPosts();
  return rootElement;
};
