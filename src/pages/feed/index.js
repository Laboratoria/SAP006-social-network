import { dbFirebase } from '../../config/firebaseConfig.js';

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
  `;

  rootElement.innerHTML = container;

  rootElement
    .querySelector('#published-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const text = rootElement.querySelector('#text-post').value;
      console.log(text);
    });

  rootElement.querySelector('send-post');

  dbFirebase.collection('users')
    .add({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });

  // Add a second document with a generated ID.
  dbFirebase.collection('users').add({
    email: userEmail.value,
    idUser: idUser.value,
    born: 1912,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });

  return rootElement;
};
