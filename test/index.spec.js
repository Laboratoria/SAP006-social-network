// importamos a função que vamos testar

import { loginWithEmailAndPassword } from '../src/services/index.js';

const mockloginWithEmailAndPassword = jest.fn();
jest.mock('../src/services/firebase.js', () => ({
  getFirebase: jest.fn(() => ({
    firestore: jest.fn(() => ({
      collection: jest.fn(),
    })),
    auth: jest.fn(() => ({
      signInWithEmailAndPassword: mockloginWithEmailAndPassword,
    })),
  })),
}));

describe('loginWithEmailAndPassword', () => {
  it('should be called once', () => {
    loginWithEmailAndPassword();
    expect(mockloginWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

/* describe('myFunction', () => {
  it('should be a function', () => {
    expect(typeof loginWithEmailAndPassword).toEqual('function');
  });
  it('should call firebase', () => {
    loginWithEmailAndPassword('provider');
    expect(firebase.auth).toHaveBeenCalled();
  });
});

describe('loginWithGoogleAccount', () => {
  it('should be a function', () => {
    expect(typeof loginWithGoogleAccount).toEqual('function');
  });
  it('should call firebase', () => {
    loginWithGoogleAccount('provider');
    expect(firebase.auth).toHaveBeenCalled();
  });
});

describe('saveUserIdOnLocalStorage', () => {
  it('should be a function', () => {
    expect(typeof saveUserIdOnLocalStorage).toEqual('function');
  });
  it('should call firebase', () => {
    saveUserIdOnLocalStorage('provider');
    expect(firebase.auth).toHaveBeenCalled();
  });
});

/* const immediate = jest.requireActual('timers').setImmediate;
const flushPromises = () => new Promise(immediate) */

/* import { loadDatabase } from '../file.js';

export const getUserByUid = async (uid) => {
  const data = await loadDatabase();
  const user = data.find(usr => usr.uid === uid);

  if (!user) {
    throw new Error('Não existe usuário com uid informado.');
  }

  return user;
};

export const getUserByUsernameAndPassword = async (username, password) => {
  const data = await loadDatabase();
  const user = data.find(usr => usr.userName === username && usr.password === password);

  if (!user) {
    throw new Error('Credenciais incorretas ou usuário inexistente.');
  }

  return user;
}; */
