import { auth } from '../../lib/authentication.js';
import { onNavigate } from '../../navigate.js';

export default () => {
    const feed = document.createElement('div');
    const container = `
  <section class="container-Feed">
    <header>
      <nav>
        <ul>
          <li>
          <button type="submit" id="logou">Home</button>
          </li>
          <li>
            <button type="submit" id="logout">Signout</button>
          </li>
        </ul>
      </nav>
    </header>
  </section>
    `;

    feed.innerHTML = container;

    //     const logout = document.querySelector('#logout');
    //     logout.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     auth.signOut().then(() => {
    //         console.log('user saiu da pagina')
    //     })
    // })

    return feed;

};


//pendente:
//Imprimir o container feed do template string
//Rotas do feed 
//função de logout
//rotas do post
