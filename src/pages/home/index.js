import { outLogin } from '../../services/firebaseAuth.js';

export const home = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = ` 
  <div class='containerHome'>
 
    <img class='logoHome' src='img/VEG&TAL.png' alt='VEG&TAL - logo'>

    <hr>
    <h3> botões </h3>
    <hr>
    
<h1> deu certo home rotas!! </h1>

<button class='btn ' id='btnLogout'>Sair</button>
`;

  // botão sair para fazer logout
  const btnLogout = rootElement.querySelector('#btnLogout');
  btnLogout.addEventListener('click', (event) => {
    event.preventDefault();
    outLogin();
  });

  return rootElement;
};
