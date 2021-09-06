/**
* @jest-environment jsdom
*/

import { login } from '../../../src/pages/login/index.js';
import * as auth from '../../../src/services/firebaseAuth.js';
// import * as error from '../../../src/services/error.js';

jest.mock('../../../src/services/firebaseAuth.js');
jest.mock('../../../src/services/error.js');

describe('should render page register correctly', () => {
  test('should be true', () => {
    const divLogin = login();
    expect(divLogin.tagName).toBe('DIV');
  });
});

describe('shoud enter with email and password', () => {
  test('should be true', () => {
    auth.SignIn.mockResolvedValueOnce('deu bom');
    const divLogin = login();
    divLogin.querySelector('#usuario').value = 'isis@gmail.com';
    divLogin.querySelector('#senha').value = '123456';
    const signIn = divLogin.querySelector('#entrar');
    signIn.dispatchEvent(new Event('click'));
    expect(auth.SignIn).toBeCalled();
    expect(auth.SignIn).toHaveBeenCalledWith('isis@gmail.com', '123456');
  });
  // test('signIn error', () => {
  //   // error.errorPassword.mockResolvedValueOnce('deu ruim');
  //   auth.SignIn.mockRejectedValueOnce('deu ruim');
  //   const divLogin = login();
  //   const signIn = divLogin.querySelector('#entrar');
  //   signIn.dispatchEvent(new Event('click'));
  //   expect(error.errorPassword).toBeCalled();
  // });
});

describe('should enter with Google Sign In', () => {
  test('should be true', () => {
    auth.googleLogin.mockResolvedValueOnce('deu bom');
    const divLogin = login();
    const signInGoogle = divLogin.querySelector('#google-login');
    signInGoogle.dispatchEvent(new Event('click'));
    expect(auth.googleLogin).toBeCalled();
  });
});
