import loginScreen from './pages/login/index.js';
import signUpScreen from './pages/signUp/index.js';
import profileScreen from './pages/profile/index.js';

const routes = {
  '/': loginScreen,
  '/signUp': signUpScreen,
  '/profile': profileScreen,
};

export const render = (pathname) => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  window.history.pushState({}, null, window.location + pathname);

  const templatePage = routes[window.location.pathname];
  main.appendChild(templatePage);
  console.log('renderizou?');
};

// const routes = () => {
//   window.addEventListener('popstate', routes);
//   const routesPaths = {
//     '/': signUpScreen,
//     '/signUp': signUpScreen,
//   };

//   const main = document.getElementById('root');
//   main.innerHTML = '';

//   return (routesPaths[window.location.pathname]());
// };
