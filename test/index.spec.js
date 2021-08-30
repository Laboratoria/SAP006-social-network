// importamos a função que vamos testar
import { signIn } from '../src/services/index.js';

describe('myFunction', () => {
  const mockUser = [
    { name: 'Danila', password: '7startup20' },
    { name: 'Nadir', password: 'naruto' },
    { name: 'Iris', password: 'starttrek' },
  ];
  it('should be a function', () => {
    expect(typeof signIn).toBe('function');
  });
  it('auth with firebase', () => {
    expect(mockUser).tobeCalled(signIn(mockUser.name));
  });
});
