import { Feed } from './pages/Feed/index.js';
import { Login } from './pages/Login/index.js';
import { Reset } from './pages/Reset/index.js';
import { Register } from './pages/Register/index.js';

const route = () => {
    const elements = document.getElementById('root');
    const routes = {
        '/': Login,
        '/register': Register,
        '/feed': Feed,
        '/reset': Reset
    }
}   