export const Login = () => {
  const container = document.createElement('div');

  const template = `
    <header class="fortTitle">
        <h2>Fort</h2>
    </header>
    <section>
        <h4>Nova por aqui? <span><a href="link-cadastro">Cadastre-se</a></span></h4>
    </section>
    <main>
        <input type="text" class="input login" placeholder="Login">
        <input type="password" class="input login" placeholder="Senha">
        <a href="">Esqueceu a senha?</a>
        <input type="button" class="login btn" value="LOGIN">
        <div>
            <img src="" alt="icone google">
            <h4><a href="" target="_blank">Login com o Google</a></h4>
        </div>
    </main> 
     `;

  container.innerHTML = template;

  return container;
};