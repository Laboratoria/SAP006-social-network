import { login } from './pages/login/index.js';
// import { signup } from './pages/signup/index.js';
// import { feed } from './pages/feed/index.js';
export const routeRender = () => {
    const content = document.querySelector('#root');
    const routes = {
        '/': login,
        // '/signup': signup,
        // '/feed': feed,
    };
    content.innerHTML = '';
    content.appendChild(routes[window.location.pathname]());
};