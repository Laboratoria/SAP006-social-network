import login from './pages/login/index.js';
import signUp from './pages/signup/index.js';
// import { feed } from './pages/feed/index.js';*/


const main = document.querySelector('#root');


const render = () => {
    main.innerHTML = '';

    switch (window.location.hash) {
        case "":
            main.appendChild(login());
            break;
        case "#login":
            main.appendChild(login());
            break;
        case "#signUp":
            main.appendChild(signUp());
            break;
        default:
            main.appendChild(login());
            break;
    }
};

window.addEventListener('load', render);
window.addEventListener('hashchange', render);


/*
export const routeRender = () => {
    window.addEventListener('hashchange', () => {
        switch (window.location.hash) {
            case '#signup':
                signUp();
                break;
                // case '#feed':
                //     feed();
                //     break;
            default:
                login();
        }
    });
};
routeRender();

window.addEventListener('load', () => {
    switch (window.location.hash) {
        case '#signup':
            signUp();
            break;
        case '#login':
            main.appendChild(login());
            break;
            //     feed();
            //     break;
        default:
            login();

    }
});







// export const routeRender = () => {
//     const content = document.getElementById('root');
//     const routes = {
//         '/': login,
//         '/signUp': signUp,
//         // '/feed': feed,
//     };
//     content.innerHTML = '';
//     content.appendChild(routes[window.location.pathname]());

// };*/