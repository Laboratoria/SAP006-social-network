import signin from './pages/signin/index.js'
import signup from './pages/signup/index.js'
import createprofile from './pages/createprofile/index.js'
import home from './pages/home/index.js'
import profile from './pages/profile/index.js'


export const router = () =>{
  const main = document.getElementById("root")

  const routes = {
    "/": signin,
    "/login": signin,
    "/cadastro": signup,
    "/cadastro-perfil": createprofile,
    "/home": home,
    "/perfil": profile
  }

  main.innerHTML = "";
  main.appendChild(routes[window.location.pathname]())
  console.log(window.location.pathname)
}

