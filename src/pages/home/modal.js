const modalElement = document.createElement('div');

export const modal = {
  confirm: (message, callback) => {
    const template = `<div id="modal-confirm" class="modal-background">
        <div class="modal">
          <span class="close-btn" id="close-btn">&times;</span>
          <p class="popUpMsg"> ${(message) || '???'}</p>
          <div class="buttons">
            <button class="yes" id="confirm-btn">
              Sim
            </button>
            <button class="no" id="no-btn">
              Não
            </button>
          </div>
        </div>
      </div>`;

    modalElement.innerHTML = template;

    const confirmBtn = modalElement.querySelector('#confirm-btn');
    const modalBackground = modalElement.querySelector('#modal-confirm');
    const closeBtn = modalElement.querySelector('#close-btn');
    const noBtn = modalElement.querySelector('#no-btn');

    confirmBtn.addEventListener('click', () => {
      modalBackground.style.display = 'none';
      callback();
    });

    closeBtn.addEventListener('click', () => {
      modalBackground.style.display = 'none';
    });

    noBtn.addEventListener('click', () => {
      modalBackground.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === modalBackground) {
        modalBackground.style.display = 'none';
      }
    });

    document.body.appendChild(modalElement);
  },

};
