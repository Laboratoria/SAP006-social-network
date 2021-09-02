/**
 * @jest-environment jsdom
 */

import loginScreen from '../src/pages/login/index.js';
import * as services from '../src/services/index.js';

jest.mock('../src/services/index.js');

describe('return sreen login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loginScreen', () => {
    // prepara mocks
    services.signIn.mockResolvedValueOnce(true);
    // renderiza a tela
    const screenPage = loginScreen();
    // executa ações
    screenPage.querySelector('#input-email').value = 'sasori.com';
    screenPage.querySelector('#input-password').value = 'areiamarionete';
    screenPage.querySelector('#enter-acc').click();
    // valida teste;
    expect(services.signIn).toHaveBeenCalledTimes(1);
  });
  it('should not return loginScreen', () => {
    const screenPage = loginScreen();
    screenPage.querySelector('#input-email').value = '';
    screenPage.querySelector('#input-password').value = '';
    screenPage.querySelector('#enter-acc').click();
    expect(services.signIn).not.toHaveBeenCalled();
  });
  it('should return an error', () => {
    services.signIn.mockRejectedValueOnce({
      error: {
        code: 'auth/invalid-email',
        message: 'Usuário ou email inválido',
      },
    });
    const screenPage = loginScreen();
    screenPage.querySelector('#input-email').value = 'sasori.com';
    screenPage.querySelector('#input-password').value = 'areiamarionete';
    screenPage.querySelector('#enter-acc').click();
    expect(services.signIn).toHaveBeenCalledTimes(1);
    // await expect(services.signIn).rejects.toEqual({
    //   error: {
    //     code: 'auth/invalid-email',
    //   },
    // });
  });
});

// it('the fetch fails with an error', () => {
//   expect.assertions(1);
//   return services.signIn().catch((e) => expect(e).toMatch('error'));
// });
// await services.signIn.mockRejectedValueOnce({
//   o que fazer aqui? error: tentativa:
//   await expect(Promise.resolve().then(() => {
//     window.location.hash = '#feed';
//   })).toBeDefined();
// });
describe('return second function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return function with Google', () => {
    services.signInWithGoogle.mockResolvedValueOnce(true);
    const screenPage = loginScreen();
    screenPage.querySelector('#btn-google').click();
    expect(services.signInWithGoogle).toHaveBeenCalledTimes(1);
  });
  it('dont should return login with Google', () => {
    services.signInWithGoogle.mockRejectedValueOnce({
      error: {
        code: 'auth/invalid-email',
      },
    });
    const screenPage = loginScreen();
    screenPage.querySelector('#btn-google').click();
    screenPage.querySelector('#sign-up').click();
    expect(services.signInWithGoogle).toHaveBeenCalledTimes(1);
  });
});

// describe('user out', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
//   it('should return user out the app', () => {
//     services.signInWithGoogle
//   });
// });
