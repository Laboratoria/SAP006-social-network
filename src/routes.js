import signin from './pages/signin/index.js'
import signup from './pages/signup/index.js'
import createprofile from './pages/createprofile/index.js'
import home from './pages/home/index.js'
import profile from './pages/profile/index.js'
import forgotpassword from './pages/forgotpassword/index.js'
import pagenotfound from './pages/pagenotfound/index.js'
import saved from './pages/saved/index.js'


export const router = () =>{
  const main = document.getElementById("root")

  const routes = {
    "/": signin,
    "/login": signin,
    "/cadastro": signup,
    "/editar-perfil": createprofile,
    "/home": home,
    "/salvos":saved,
    "/perfil": profile,
    "/recuperacao-senha": forgotpassword,
    "/pagina-nao-encontrada":pagenotfound
  }
  
  firebase.auth()
  .onAuthStateChanged(() => {
    let path = window.location.pathname;
    let user = firebase.auth().currentUser;

    if (!user && (path == '/home'||path=="/editar-perfil")) {
      path = '/';
      window.history.replaceState(null, null, path);
    }
    if(user && (path=="/" || path=="/cadastro" || path=="/login")){
      path = '/home'
      window.history.replaceState(null, null, path);
    }
    if(routes[window.location.pathname] != undefined){
      main.innerHTML = "";
      main.appendChild(routes[path]())
    }
    else{
      main.innerHTML = "";
      main.appendChild(routes["/pagina-nao-encontrada"]())
    }
})
}
