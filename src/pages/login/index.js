export const Login = () => {
  const rootElement = document.createElement("div");
  rootElement.setAttribute("class", "page")
  rootElement.innerHTML = `<div class="container">
    <img class="logo" src="img/logo.png" alt="GO VEG - logo">
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

  rootElement.querySelector('#entrar').addEventListener('click', () => {
    let usuario = document.getElementById('usuario').value;
    let passwordLogin = document.getElementById('passwordLogin').value;
    firebase
        .auth()
        .signInWithEmailAndPassword(usuario, passwordLogin)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            window.history.pushState({}, "", "/home")
            const popstateEvent = new PopStateEvent("popstate", { state: {} })
            dispatchEvent(popstateEvent)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert('E-mail ou senha incorretos, por favor, verifique!')
        });

});

  const botao = rootElement.querySelector("#cadastro")
  botao.addEventListener("click", () => {
      window.history.pushState({}, "", "/cadastro")
      const popstateEvent = new PopStateEvent("popstate", { state: {} })
      dispatchEvent(popstateEvent)
  })
  const botaoGoogle = rootElement.querySelector("#google-login")
  botaoGoogle.addEventListener("click", console.log("funcionou o botao"))

  return rootElement;
}

    //   const signButton = rootElement.querySelector("#button-sign-in")
    //   signButton.addEventListener("click", () => {
    //     window.history.pushState({}, "", "/register")
    //     const popstateEvent = new PopStateEvent("popstate", {state:{}})
    //     dispatchEvent(popstateEvent)
    //   })

    // console.log(rootElement)

    // const signInButton = rootElement.querySelector("#signin-form");

   


 