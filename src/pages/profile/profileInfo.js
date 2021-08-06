import profile from './index.js';

export default () => {
  const profileInfoContainer = document.createElement('div');
  profileInfoContainer.append(profile());
  const profileInfoContent = `
          <aside class="editProfileForm">
            <div>
              <form>
                <input placeholder="nome"></input>
                <input placeholder="email"></input>
                <select name="level"> 
                <option value="" selected disabled;>Nível de Cozinha:</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                </select>
              </form>
            </div>
          <aside>
  
          `;
  profileInfoContainer.innerHTML += profileInfoContent;
  return profileInfoContainer;
};
