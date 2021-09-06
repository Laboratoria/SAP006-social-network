/**
* @jest-environment jsdom
*/

import { postar } from '../../../src/pages/postar/index.js';
// import * as add from '../../../src/services/firebaseData.js';

jest.mock('../../../src/services/firebaseData.js');

// export const addPost = (postar) => db.collection('posts').add(postar);

describe('should render page register correctly', () => {
  test('should be true', () => {
    const divPosts = postar();
    expect(divPosts.tagName).toBe('DIV');
  });
});

// describe('add post', () => {
//   test('should be true', () => {
//     add.addPost.mockResolvedValueOnce('deu bom');
//     const divPosts = postar();
//     const localPost = rootElement.querySelector('#typePost');
//     const hashtagsPost = rootElement.querySelector('#hashtags').value;
//     const pricePost = rootElement.querySelector('input[name=valor]:checked').value;
//     const descPost = rootElement.querySelector('#addText').value;
//     const signIn = divPosts.querySelector('#entrar');
//     signIn.dispatchEvent(new Event('click'));
//     expect(auth.SignIn).toBeCalled();
//     expect(auth.SignIn).toHaveBeenCalledWith('isis@gmail.com', '123456');
//   });
// });

// data: new Date(),
// nome: firebase.auth().currentUser.displayName,
// email: firebase.auth().currentUser.email,
// user_id: firebase.auth().currentUser.uid,
// image: firebase.auth().currentUser.photoURL,
// nomeLocalReceita: localPost.value, // inputs do post, como nome do lugar //
// tipo: postType,
// hashTags: hashtagsPost, // se é restaurante, mercado ou receita //
// preco: pricePost, // hashtags //
// descricao: descPost, // descricao do lugar ou receita //
// curtidas: [],
// comentarios: [],
