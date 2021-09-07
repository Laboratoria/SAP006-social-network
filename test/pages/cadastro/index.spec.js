/**
* @jest-environment jsdom
*/

import { cadastro } from '../../../src/pages/cadastro/index.js';
import * as auth from '../../../src/services/firebaseAuth.js';

jest.mock('../../../src/services/firebaseAuth.js');

describe('should render page register correctly', () => {
  test('should be true', () => {
    const divRegister = cadastro();
    expect(divRegister.tagName).toBe('DIV');
  });
});

describe('should register new user', () => {
  test('should be true', () => {
    auth.cadastrarComEmailSenha.mockResolvedValueOnce('deu bom');
    const divRegister = cadastro();
    divRegister.querySelector('#nameUser').value = 'aline';
    divRegister.querySelector('#emailUser').value = 'aline@gmail.com';
    divRegister.querySelector('#passwordRegister').value = '654321';
    divRegister.querySelector('#confPass').value = '654321';
    const enterButton = divRegister.querySelector('#enter');
    enterButton.dispatchEvent(new Event('click'));
    expect(auth.cadastrarComEmailSenha).toBeCalled();
    expect(auth.cadastrarComEmailSenha).toHaveBeenCalledWith('aline@gmail.com', '654321');
  });
});
