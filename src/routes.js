import { login } from './pages/login/index.js';
import { signUp } from './pages/signup/index.js';
// import { feed } from './pages/feed/index.js';

export const routeRender = () => {
    const content = document.getElementById('root');
    const routes = {
        '/': login,
        '/signUp': signUp,
        // '/feed': feed,
    };
    content.innerHTML = '';
    content.appendChild(routes[window.location.pathname]());
};