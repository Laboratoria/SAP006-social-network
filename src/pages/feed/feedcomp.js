// import { postContainer } from '../feed/index.js'

//   export default () => {
//     const post = postContainer.createElement('div')
//     post.innerHTML = `
//     <div class="post-container">
//     <h3>O que você quer publicar?</h3>
//     <form action="submit">
//       <input type="text" class="post-area" name="mensagem" id="mensagem">
//       <button type="submit" class="post-btn" id="btn-postar">postar</button>
//     </form>
//   </div>
//       <!--<div class="post" id="">
//       <p class="post-user-name justify-center">User</p>
//       <img class="post-user-img justify-center"src="" alt="user image">
//       <textarea class="post-text justify-center"name="" id="" cols="30" rows="10" placeholder="Seu post aqui"></textarea>
//       <span id="">4</span>
//       <button class="post-btn-publish" data-func="post">post</button>
//       <button class="post-btn-like" data-func="like">like</button>
//       <button class="post-btn-del" data-func="delete">delete</button>
//     </div>-->
//       `;

//   const btn = post.querySelector('btn-postar');

  





//       return post;
  //   let liked = false

  //   post.addEventListener('click', (event) => {
  //     const dataSetTarget = event.target.dataset.func
  //     if (dataSetTarget === "like") {

  //       const addLike = () => {
  //         const targetSpan = event.target.previousElementSibling
  //         const likeValue = Number(targetSpan.innerText)
  //         targetSpan.innerText = likeValue + 1
  //         liked = true
  //       }

  //       const removeLike = () => {
  //         const targetSpan = event.target.previousElementSibling
  //         const likeValue = Number(targetSpan.innerText)
  //         targetSpan.innerText = likeValue - 1
  //         liked = false
  //       }

  //       if (liked) {
  //         removeLike()
  //       } else {
  //         addLike()
  //       }
  //     }
  //     if (dataSetTarget === "delete") {
  //     }
  //   })
  //   const likeCounter = new Promise((resolve, reject) => {
  //     return resolve(4)
  //   })
  //   const postContainer = feed.querySelector('#posts-container')
  
