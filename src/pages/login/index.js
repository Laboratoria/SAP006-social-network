export const login = () => {
    const rootElement = document.createElement("div");
    rootElement.innerHTML = `<div class="container">
    <div class="card">
      <img src="img/GOVEG.png" width="200px">
      <div class="label-float">
        <input class="login" type="text" id="usuario" placeholder="E-mail">
        <span class="focus-input100"></span>
      </div>

      <div class="label-float">
        <input class="password" type="password" id="senha" placeholder="Senha">
        <span class="focus-input100"></span>
      </div>

      <div class="justify-center">
        <button type="submit" name="botao" id="entrar">ENTRAR</button>
      </div>

      <div class="justify-center">
        <button type="submit" name="botao" id="google-login"> <img src="./img/google.png" class="google-logo" />Sign in
          with Google</button>
      </div>

      <div class="justify-center">
        <hr>
      </div>
      <div class="justify-center">
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
