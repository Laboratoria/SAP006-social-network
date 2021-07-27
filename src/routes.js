import signin from './pages/signin/index.js'
import signup from './pages/signup/index.js'
import createprofile from './pages/createprofile/index.js'
import home from './pages/home/index.js'
import profile from './pages/profile/index.js'

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
    case '':
      main.appendChild(signin())
      break

    default:
     main.appendChild(signin())
     break
}}
