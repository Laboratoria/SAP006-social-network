import { resetPassword } from "../../services/authentication.js";

export const Reset = () => {
  const rootElement = document.createElement("div");
  const container = `
    <img id="background" src="./pages/login/img/paleta3.jpg" alt="">
    <div class="esmaeceHeader logotipo-text">
      <section>
        <h2>FORT</h2>
      </section>
    </div>
    <h4> Insira seu e-mail abaixo para receber o link de redefinição de senha</h4>
    <div class="inputAndReset">
      <input type="email" id="email" class="input" placeholder="Email">
    </div>
    <div class="google">
      <button id="btn-reset" class="login btn">Enviar</button>
    </div>
    `;

  rootElement.innerHTML = container;

  const btnReset = rootElement.querySelector("#btn-reset");

  btnReset.addEventListener("click", () => {
    const email = rootElement.querySelector("#email");
    resetPassword(email.value);
  });

  return rootElement;
};
