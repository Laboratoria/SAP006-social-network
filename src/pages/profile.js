// import { outLogin } from '../../services/firebaseAuth.js';
// import { route } from '../../routes/navigator.js';
// import { getPosts, liked, deletePost } from '../../services/firebaseData.js';
// import { modal } from './modal.js';

// export const home = () => {
//   const rootElement = document.createElement('div');
//   rootElement.innerHTML = `
//   <nav class="menu-profile">
//   <a class="editar" href="">Editar</a>

//   <div class="goPost">

//   <a id="goPost" class="postar" href="" <img class="tomato" src="./img/tomato.svg"> postar</a>
//   </div>s
//   <button class='btn' id='btnLogout'>Sair</button>
// </nav>

//   <div class="containerHome">
//   <header>

//   </header>
//   <main>
//     <div class="posts-publicados" id='posts' data-post>
//     </div>

//   </main>
// </div>
// `;

// const btnLogout = rootElement.querySelector('#btnLogout');
// const btnGoPost = rootElement.querySelector('#goPost');
// botão sair para fazer logout
// btnLogout.addEventListener('click', (event) => {
//   event.preventDefault();
//   outLogin();
// });

//   btnGoPost.addEventListener('click', () => route('/posts'));
//   // carregar posts na tela
//   getPosts().then((collectionContent) => {
//     collectionContent.forEach((doc) => {
//       const div = document.createElement('div');
//       div.id = doc.id;
//       const timeline = rootElement.querySelector('#timeline');
//       div.innerHTML = `<div class="allPosts" data-id="${doc.id}">

//       <div class='fotoPerfil'>
//           <img src=${doc.data().image} class='imgUser'>
//           <p class="user"> ${doc.data().nome}</p>
//           </div>

//           <p class="data-locations"> • ${doc.data().data.toDate().toLocaleDateString()}</p>
//           </div>

//           <div class='botoes'>
//           <p class="tipo"> ${doc.data().tipo} </p>
//           <span class="price" id="price" data-preco>${doc.data().preco}</span>

//           </div>

//             <hr> `;

//       timeline.insertBefore(div, timeline.childNodes[0]);
//     });
//   });
//   return rootElement;
// };
