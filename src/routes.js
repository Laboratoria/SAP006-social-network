import signin from './pages/signin/index.js'
import signup from './pages/signup/index.js'
import createprofile from './pages/createprofile/index.js'
import home from './pages/home/index.js'
import profile from './pages/profile/index.js'
import forgotpassword from './pages/forgotpassword/index.js'
import pagenotfound from './pages/pagenotfound/index.js'


export const router = () =>{
  const main = document.getElementById("root")

  const routes = {
    "/": signin,
    "/login": signin,
    "/cadastro": signup,
    "/cadastro-perfil": createprofile,
    "/home": home,
    "/perfil": profile,
    "/recuperacao-senha": forgotpassword,
    "/pagina-nao-encontrada":pagenotfound
  }
  
  firebase.auth()
  .onAuthStateChanged(() => {
    let path = window.location.pathname;
    let user = firebase.auth().currentUser;

    if (!user && path == '/home') {
      path = '/';
      window.history.replaceState(null, null, path);
    }
    if(user){
      path = '/home'
      window.history.replaceState(null, null, path);
    }
    main.innerHTML = "";
      main.appendChild(routes[path]())
  })
}
