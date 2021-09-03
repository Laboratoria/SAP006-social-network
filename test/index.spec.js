/**
 * @jest-environment jsdom
 */

import loginScreen from '../src/pages/login/index.js';
import signUpScreen from '../src/pages/signUp/index.js';
import * as services from '../src/services/index.js';

jest.mock('../src/services/index.js');

describe('return sreen login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loginScreen', () => {
    // prepara mocks
    services.signIn.mockResolvedValueOnce((email, password) => {
      const userCredential = {
        user: {
          uid: 'sdsadsa',
          email,
          password,
        },
      };
      return userCredential;
    });
    // renderiza a tela
    const screenPage = loginScreen();
    // executa ações
    screenPage.querySelector('#input-email').value = 'sasori.com';
    screenPage.querySelector('#input-password').value = 'areiamarionete';
    screenPage.querySelector('#enter-acc').click();
    // valida teste;
    expect(services.signIn).toHaveBeenCalledTimes(1);
    expect(services.signIn).toHaveBeenCalledWith('sasori.com', 'areiamarionete');
  });
  it('test', async () => {
    services.signIn.mockResolvedValueOnce({
      user: {
        uid: 'sdsadsa',
      },
    });
    expect.assertions(1);
    await expect(services.signIn('email', 'password')).resolves.toEqual({ user: { uid: 'sdsadsa' } });
  });
  it('should not return loginScreen', () => {
    const screenPage = loginScreen();
    screenPage.querySelector('#input-email').value = '';
    screenPage.querySelector('#input-password').value = 'abacaxi';
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
    screenPage.querySelector('#input-email').value = 'sasori';
    screenPage.querySelector('#input-password').value = 'marionete';
    screenPage.querySelector('#enter-acc').click();
    expect(services.signIn).toHaveBeenCalledTimes(1);
  });
});

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

describe('should render page register correctly', () => {
  it('should be div', () => {
    const divSignUp = signUpScreen();
    expect(divSignUp.tagName).toBe('DIV');
  });
});

describe('should return page signUpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('', () => {
    services.signUp.mockResolvedValueOnce((email, password, signUpName) => {
      const userCredential = {
        user: {
          uid: 'abch1276',
          email,
          password,
          signUpName,
        },
      };
      return userCredential;
    });
    const screenSignUp = signUpScreen();
    screenSignUp.querySelector('#signUp-name').value = 'tobe';
    screenSignUp.querySelector('#signUp-email').value = 'tobe@hotmail.com';
    screenSignUp.querySelector('#signUp-password').value = '951357';
    screenSignUp.querySelector('#repeat-password').value = '951357';
    screenSignUp.querySelector('#btn-signUp').click();
    expect(services.signUp).toHaveBeenCalled();
    expect(services.signUp).toHaveBeenCalledWith('tobe@hotmail.com', '951357', 'tobe');
  });
  it('should not return loginScreen', () => {
    const screenSignUp = signUpScreen();
    screenSignUp.querySelector('#signUp-name').value = '';
    screenSignUp.querySelector('#signUp-email').value = '';
    screenSignUp.querySelector('#signUp-password').value = '';
    screenSignUp.querySelector('#repeat-password').value = '57';
    screenSignUp.querySelector('#btn-signUp').click();
    expect(services.signUp).not.toHaveBeenCalled();
  });
  it('dont return singUp', () => {
    services.signUp.mockRejectedValueOnce((email, password, signUpName) => {
      const test = {
        user: {
          email,
          password: '951375',
          signUpName,
        },
      };
      return test;
    });
    const screenSignUp = signUpScreen();
    screenSignUp.querySelector('#signUp-name').value = 'tobe';
    screenSignUp.querySelector('#signUp-email').value = 'tobe@hotmail.com';
    screenSignUp.querySelector('#signUp-password').value = '951375';
    screenSignUp.querySelector('#repeat-password').value = '951357';
    screenSignUp.querySelector('#btn-signUp').click();
    expect(services.signUp).not.toHaveBeenCalled();
  });
});
