import { updateUserProfile, showUserPhoto, uploadImage } from '../../services/index.js';

export function profilePic() {
  const root = document.querySelector('.root');
  const photoContainer = document.createElement('div');
  photoContainer.classList.add('root-photo');
  photoContainer.innerHTML = ` 
    <section class='profile-image-container col-4'>
      <label class='label-image'>
        <input type='file' class='file-input' accept='image/*' capture='user'/>
        <figure class='profile-figure'>
          <img src='img/avatar.png' class='avatar-image' alt='avatar'/>
          <figcaption class='avatar-figcaption'>
            <img src='img/camera-figcaption.png'/>
          </figcaption>
        </figure>
    </section>
  `;

  root.appendChild(photoContainer);

  const fileInput = root.querySelector('.avatar-figcaption');
  const avatarPic = root.querySelector('.avatar-image');

  showUserPhoto(avatarPic);

  fileInput.addEventListener('click', (event) => {
    uploadImage.src = '';
    const file = event.target.file;
    uploadImage.src = URL.createObjectURL(file);

    const makeUrlValid = (url) => {
      uploadImage.src = '';
      uploadImage.src = url;
    };

    updateUserProfile(fileInput, makeUrlValid);
  });

  return root;
}
