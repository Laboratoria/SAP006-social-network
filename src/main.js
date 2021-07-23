// Este é o ponto de entrada da sua aplicação
import login from './lib/login/login';
//import cadastro from './lib/...';
//import home from './lib/...';
import { myFunction } from './lib/index.js';

myFunction();

const div = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    switch (window.location.hash) {
      default:
        div.appendChild(login());
        break;
      case ' ':
        div.appendChild(login());
    }
  });
};

window.addEventListener('load', () => {
  div.appendChild(login());
  init();
});
