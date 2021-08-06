

export const Feed = () => {
  const rootElement = document.createElement("div");
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
    <input type="text" id="post-ready">
    </section>
  `;

  rootElement.innerHTML = container;

  rootElement.querySelector('#published-form').addEventListener('submit', event => {
    event.preventDefault();
    const text = rootElement.querySelector('#text-post').value;

    const post = {
      text: text,
      user_id:'bruna.ppp8@gmail.com',
      likes: [],
      comments: [],
    }

    const collectionOfPosts = firebase.firestore().collection('posts');

    collectionOfPosts.add(post).then(() => {
      rootElement.querySelector('#text-post').value = "";
      rootElement.querySelector('#post-ready').innerHTML = "";
    })
  })


  return rootElement
}
