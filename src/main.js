// Este é o ponto de entrada da sua aplicação

import loginScreen from './pages/login/index.js';
import { signInWithGoogle } from './services/index.js';


  const main = document.getElementById('root');
  main.appendChild(loginScreen());

  const btnGoogle = document.getElementById('btn-google')
  btnGoogle.addEventListener('click', signInWithGoogle)

  






