export default () => {
    const popError = document.createElement('div');
    popError.setAttribute('class', 'popup error');
    popError.innerHTML = `
    <p> Ooooops! Alguma coisa deu errado! </p>
    <p> Tente de novo mais tarde! </p> 
    <button type="button" class="btn-login closePopUp"> OK </button>
    `;
  
    const overlayDiv = document.querySelector('.active');
    const closePopup = popError.querySelector('.closePopUp');
    closePopup.addEventListener('click', () => {
      popError.classList.remove('error');
      overlayDiv.classList.remove('active');
    });
  
    return popError;
  };
