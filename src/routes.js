import signin from './pages/signin/index.js'
import signup from './pages/signup/index.js'
import createprofile from './pages/createprofile/index.js'
import home from './pages/home/index.js'
import profile from './pages/profile/index.js'
import forgotpassword from './pages/forgotpassword/index.js'

export const changeContent = (page) => {
  const main = document.getElementById('root');
  main.innerHTML=""
  switch(page){
    case 'signin':
      main.appendChild(signin())
      break
    case 'signup':
      main.appendChild(signup())
      break
    case 'createprofile':
      main.appendChild(createprofile())
      break
    case 'home':
      main.appendChild(home());
      break
    case 'profile':
      main.appendChild(profile())
      break
    case 'forgotpassword':
      main.appendChild(forgotpassword())
      break
    case '':
      main.appendChild(signin())
      break
    default:
     main.appendChild(signin())
     break
}}



// export const router = (pathname) => {
//   const routes = [
//       { path: "/", page: changeContent(signin())},
//       { path: "/signin", page: changeContent("signin")},
//       { path: "/signup", page: changeContent("signup")},
//       { path: "/createprofile",page: changeContent("createprofile")},
//       { path: "/feed", page: changeContent("feed")},
//       { path: "/profile", page: changeContent("profile")},
     
//   ];

//   const route = routes.find(route=>route.path === pathname)
//   const path = route.slice(1)
//   if (path != ""){
//     return changeContent(path)
//   }else{
//     return route.page[3]
//   }
// }

 




