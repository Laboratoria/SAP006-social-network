// import { feed } from './pages/feed/index.js';
import { login } from './pages/login.js';
import { register } from './pages/register.js';

const routes = {
  '': login,
  '#register': register,
  //        '/feed': feed,
  //        '/reset': reset
};

function renderPage() {
  const url = window.location.hash;
  const page = routes[url]();
  const divRoot = document.getElementById('root');
  divRoot.innerHTML = '';
  divRoot.appendChild(page);
}

window.addEventListener('load', renderPage);
window.addEventListener('hashchange', renderPage);
