// import { google } from '../../pages/index.js';

// import { } from '../../router.js';


export const login = () => {
    const template = document.createElement('div');

    template =   `
    <main class ="container">
        <form class="login-box">
            <figure class="logo">
                <img src="">
                <figcaption>logotipo</figcaption>
            </figure>
            <section class="input-login">
                <label for="username">E-mail:</label>
                <input  type="text" id="username" name="username"/>
            </section>
            <section class="input-password"
                <label for="password">Password:</label>
                <input type="password" id="pass" name="password" minlength="8" required>
            </section>
            <section class="container-buttons">
                <input type="submit" value="Sign in">
                <input type="google" value="Sign in with Google">
            </section>
            <section class="container-reset">
                <li>
                    <ul> Esqueci minha senha
                        <a href=""/>
                    </ul>
                </li>
            </section>
            
        </form> 
    </main>

`;
template.innerHTML = login;
return login;
} 