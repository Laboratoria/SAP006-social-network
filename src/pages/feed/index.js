// import { auth } from '../../lib/authentication.js';
import { onNavigate } from '../../navigate.js';

export default () => {
  const feed = document.createElement('div');
  const container = `
<section class="feed">
  <div id="burger-menu">
  <span></span>
</div>

<div id="menu">
    <ul>
      <li><a id="home">Home</a></li>
      <li><a href="#">Profile</a></li>
      <li><a  id="logout" href="#">Logout</a></li>
        <!-- <li><button id="logout">Logout</button></li> -->
    </ul>
</div>
  <section class="profile">
    <figure>
      <img src="data:image/jpeg;base64,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" class="profile-img" id="user-img"/>
    </figure>
    <h3>username</h3>
    <textarea class="profile-description"></textarea>
  </section>

  <article class="post-area">
  <section class="post-container">
    <h3>O que você quer publicar?</h3>
    <textarea class="post-area"></textarea>
    <button class="post-btn" id="publish">postar</button>
  </section>

     <div class="posts-container">
      </div>
</article>
  <footer>
    <ul class="social-media-list">
      <li class="social-media-list-item">
        <a href="" class="social-media-list-item-link"><i></i></a>
      </li>
            <li class="social-media-list-item">
        <a href="" class="social-media-list-item-link"><i></i></a>
      </li>
            <li class="social-media-list-item">
        <a href="" class="social-media-list-item-link"><i></i></a>
      </li>
                  <li class="social-media-list-item">
        <a href="" class="social-media-list-item-link"><i></i></a>
      </li>
    </ul>
  </footer>
</section>
    `;

  feed.innerHTML = container;

  const logout = feed.querySelector('#logout');
  logout.addEventListener('click', () => onNavigate('#login'));

  const home = feed.querySelector('#home');
  home.addEventListener('click', () => onNavigate('#feed'));

  const burgerMenu = feed.querySelector('#burger-menu');
  const overlay = feed.querySelector('#menu');
  burgerMenu.addEventListener('click', function () {
    this.classList.toggle("close");
    overlay.classList.toggle("overlay");
  });

  return feed;

};



