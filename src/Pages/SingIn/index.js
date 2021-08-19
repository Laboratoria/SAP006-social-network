//Desenvolver a parte para a pessoa entrar na rede social
import { navagation } from "../../routes/navegation.js";
export const Login = () => {
  const rootElement = document.createElement("div");
  rootElement.innerHTML = `<h1>Login</h1>
  <button class = "btn"> cadastro </button>
  
  `;
  const botao = rootElement.querySelector(".btn");
  botao.addEventListener("click", () => {
    navagation("/singup");
  });
  return rootElement;
};
