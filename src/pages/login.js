export const Login = () => {
    const rootElement = document.createElement("div");
    rootElement.innerHTML = `<h1> babla </h1>
    <button id="cadastro"> Cadastre-se </button>`;

    console.log(rootElement)

    const botao = rootElement.querySelector("#cadastro")
    botao.addEventListener("click", () => {
        window.history.pushState({}, "", "/cadastro")
        const popstateEvent = new PopStateEvent("popstate", { state: {} })
        dispatchEvent(popstateEvent)
    })

    return rootElement;

}
