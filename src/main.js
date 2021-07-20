import auth from './auth.js';
import signin from './pages/signin/index.js';
import signup from './pages/signup/index.js';

window.addEventListener("load", () => {
    const signIn = document.getElementById("root");
    signIn.innerHTML = signin();

    const enterLogin = document.getElementById("enter");
    enterLogin.addEventListener("click", () => {
        auth.loginPage();  
    });
    
});
