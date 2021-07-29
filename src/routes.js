import loginScreen from './pages/login/index.js';
import signUpScreen from './pages/signUp/index.js';

const routes = () => {
  // window.addEventListener('popstate', routes);
  const routesPaths = {
    '/': loginScreen,
    '/signUp': signUpScreen,
  };

  const main = document.getElementById('root');
  main.innerHTML = '';

  return (routesPaths[window.location.pathname]());
};

export default routes;
