export default () => {
  const container = document.createElement('div');
  const template = `
    <div class="container">
    <p class="subtitle">Uma rede para tutores e amantes de animais</p>
    <form class="form">
    <input type="email" placeholder="Email" value="" class="login" id="email" autocomplete="off"/>
    <input type="password" placeholder="Senha" value="" class="login" id="password" autocomplete="off"/>
    <a class="button" id="login" href="/#homepage">Entrar</a>
    <span>ou</span>
    <button class="google-btn">Continuar com o Google</button>
    </form>
    <p class="text">Ainda não é membro?</p>
    <a class="button" id="btn-signUp" href="/#Cadastrar">Cadastrar</a>
    </div>
  `;
  container.innerHTML = template;
  return container;
};
