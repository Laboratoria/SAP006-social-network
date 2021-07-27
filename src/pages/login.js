export const Login = () => {
    const rootElement = document.createElement("div");
    rootElement.innerHTML = `<div class="container">
    <div class="logo">
      <img src="img/logo.png" alt="GO VEG - logo">
      </div>
      <div class="label-float">
        <input class="login" type="text" id="usuario" placeholder="E-mail">
        <span class="focus-input100"></span>
      </div>

      <div class="label-float">
        <input class="password" type="password" id="senha" placeholder="Senha">
        <span class="focus-input100"></span>
      </div>

      <div class="justify-enter">
        <button type="button" name="botao" id="entrar">ENTRAR</button>
      </div>

      <div class="justify-google">
        <button type="button" name="botao" id="google-login"> <img src="./img/google.png" class="google-logo" />Sign in
          with Google</button>
      </div>
      <div class="line">
        <hr>
      </div>
      <div class="justify-register">
        <a id="cadastro" href="#">Cadastre-se</a>
      </div>
    </div>`;

    console.log(rootElement)

    const botao = rootElement.querySelector("#cadastro")
    botao.addEventListener("click", () => {
        window.history.pushState({}, "", "/cadastro")
        const popstateEvent = new PopStateEvent("popstate", { state: {} })
        dispatchEvent(popstateEvent)
    })

    return rootElement;

}
