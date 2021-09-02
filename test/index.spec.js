// importamos a função que vamos testar
import { createAccountWithEmailAndPassword } from '../src/services/index';

describe('myFunction', () => {
  it('should be a function', () => {
    expect(typeof createAccountWithEmailAndPassword).toBe('function');
  });
});
