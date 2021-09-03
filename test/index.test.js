/**
* @jest-environment jsdom
*/

import { cadastro } from '../src/pages/cadastro/index.js';

// describe('myFunction', () => {
//   it('should return loginScreen', () => {
//     const screnPage = loginScreen();
//     expect(screnPage).toBeTruthy();
//   });
// });

describe('should render page register correctly', () => {
  test('should be true', () => {
    const divRegister = cadastro();
    expect(divRegister.tagName).toBe('DIV');
  });
});

describe('should upload img when btn clickled', () => {
// cadastro().dispateEvent('click', )
});

describe('should fail with invalid name', () => {

});

describe('should fail with password less than six', () => {

});

describe('should fail with password without number', () => {

});

describe('should fail with password that dont match', () => {

});

describe('should route to home when register is valid', () => {

});
// valida os dados
// manda pro firebase
// direciona pra home
