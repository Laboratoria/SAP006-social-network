import { signOut } from "../../services/index.js";

export const Feed = () => {
  const root = document.createElement('div');
  root.innerHTML = `
  <p>Ola! Seja bem vindo.</p>

  <button type='button' id='buttonSignOut' class='btn-login form-item'>Sair</button>
  `;

  const btnSignOut = root.querySelector('#buttonSignOut');

  btnSignOut.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  })

  return root;
}