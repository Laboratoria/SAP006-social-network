// importamos a função que vamos testar
import { googleLogin } from '../../services/firebaseAuth';
// import { cadastro } from '../src/pages/cadastro/index';

describe('login with Google', () => {
  it('should be a function', () => {
    expect(typeof googleLogin).toBe('function');
  });
});
// describe(cadastro, () => {
//   it('should return "false" for "" ', () => {
//     //expect(nameUser('Ali')).toBe('false');
//   });
// });

// describe('login usuário', function() {
//   // crítico

//   it('garanta que os endereços de email válidos irão passar da validação', function() {});
//   it('garanta que o formulário de submissão modifique o caminho padrão', function() { });

//   // é bom ter...
//   it('garanta que o helper client-side helper seja exibido para campos vazios', function() { });
//   it('garanta que ao pressionar enter no campo de senha envie o formulário', function() { });
// });

// import loginScreen from '../src/pages/login/index.js';

// describe('myFunction', () => {
//   it('should return loginScreen', () => {
//     const screnPage = loginScreen();
//     expect(screnPage).toBeTruthy();
//   });
