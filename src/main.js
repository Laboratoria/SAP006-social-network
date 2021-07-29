import home from './pages/home/index.js'
import signin from './pages/signin/index.js';
import {currentUser} from './lib/index.js'
import { router } from './routes.js';
import createprofile from './pages/createprofile/index.js';



const main = document.getElementById("root")

window.addEventListener("popstate", router);
window.addEventListener("load", router)


