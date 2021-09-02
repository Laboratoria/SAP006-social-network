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
  it('should return an error', async () => {
    await services.signIn.mockRejectedValueOnce({
      // o que fazer aqui? error: tentativa:
      // await expect(Promise.resolve().then(() => {
      //   window.location.hash = '#feed';
      // })).toBeDefined();
    });
    const screenPage = loginScreen();
    screenPage.querySelector('#input-email').value = 'sasori.com';
    screenPage.querySelector('#input-password').value = 'areiamarionete';
    screenPage.querySelector('#enter-acc').click();
    expect(services.signIn).toHaveBeenCalledTimes(1);
  });
  it('should not return loginScreen', () => {
    const screenPage = loginScreen();
    screenPage.querySelector('#input-email').value = '';
    screenPage.querySelector('#input-password').value = '';
    screenPage.querySelector('#enter-acc').click();
    expect(services.signIn).not.toHaveBeenCalled();
  });
});
