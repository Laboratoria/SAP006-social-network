import { registerAccount } from '../src/lib/auth.js';

describe('Register', () => {
  it('should be a function', () => {
    expect(typeof registerAccount).toBe('function');
  });
  it('shold call firebase', () => {
    registerAccount();
    expect(firebase.auth().createUserWithEmailAndPassword()).toBeCalled();
  });
});
