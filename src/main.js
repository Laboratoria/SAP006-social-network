// Este é o ponto de entrada da sua aplicação

// import { cadastro, signOut, signIn } from './lib/index.js';
import loginScreen from './pages/tela inicial/LogIn.js';

const main = document.getElementById('root');

window.addEventListener('load', () => {
  main.appendChild(loginScreen());
});
