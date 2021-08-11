// import { deletePost } from '../../components/feed.js';
import { addPosts, loadPosts, deletePost } from '../../services/database.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  const container = `
    <header class="searchBell">
      <input type="search" class="searchBar" name="searchPost" placeholder="Pesquise no Fort">
      <button><span id="bell" class="iconify" data-inline="false" data-icon="clarity:notification-outline-badged" style="color: #F78563;"></span></button>
    </header> 
    <hr class="line"></hr>
    <h4>POSTAGENS RECENTES</h4>
    <section class="post">
      <form action="" id="published-form">
      <input type="text" id="text-post" placeholder="Mana, o que você quer compatilhar?">
      <button class="btn" id="send-post">Enviar</button>
      </form>
    </section>

    <section class="get-post" id="postTemplate">
    </section>

    <nav class="navbar mobile-list">
      <ul>
        <li><span class="iconify" data-inline="false" data-icon="akar-icons:home" style="color: #FFD2BF;"></span></li>
        <li><span class="iconify" id="new-post-btn" data-inline="false" data-icon="clarity:plus-circle-line" style="color: #FFD2BF;"></span></li>
        <li><span class="iconify" data-inline="false" data-icon="akar-icons:comment" style="color: #FFD2BF;"></span></li>
        <li><span class="iconify" data-inline="false" data-icon="akar-icons:person" style="color: #FFD2BF;"></span></li>
      </ul>
    </nav>    
  `;

  rootElement.innerHTML = container;

  const submitButton = rootElement.querySelector('#published-form');
  submitButton.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = rootElement.querySelector('#text-post').value;
    const post = {
      text: text,
      user_id: firebase.auth().currentUser.uid,
      likes: 0,
      comments: [],
    };
    addPosts(post);
  });

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

  // slider post
  // const newPostBtn = document.querySelector('#new-post-btn');
  // newPostBtn.addEventListener('click', () => {
  //   container.classList.add("sign-up-mode");
  // });


  // function deletePost(postId) {
  //   const collectionOfPosts = firebase.firestore().collection('posts');
  //   collectionOfPosts.doc(postId).delete()
  //   .then(doc => {
  //     loadPosts()
  // });

  const deleteButton = document.querySelector('.delete-button');
  console.dir(deleteButton);

  loadPosts();

  return rootElement;
};

/* o original
<h4>POSTAGENS RECENTES</h4>
    <section class="post">
      <form action="" id="published-form">
      <input type="text" id="text-post" placeholder="Mana, o que você quer compatilhar?">
      <button class="btn" id="send-post">Enviar</button>
      </form>
    </section>
*/

// tentativa de slider
// <div class="container">
//   <section class="post">
//     <h3>E aí, o que você quer fazer desta vez?</h3>
//     <div class="">
//       <form action="" id="published-form">
//         <input type="text" id="text-post" placeholder="O que você está pensando, mana?">
//          <div class="btn-inside">
//           <button class="btn-actions"><span class="iconify" data-inline="false" data-icon='ri:image-add-fill'></span></button>
//           <button class="btn-actions"><span class="iconify" data-inline="false" data-icon="mdi:send-circle"></span></button>
//         </div>
//       </form>
//     </div>        
//   </section>
// </div> 