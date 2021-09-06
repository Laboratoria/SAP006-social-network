import profile from './index.js';
import { addPost } from '../../components/post/index.js';
import { getUserData, loadRecipe } from '../../services/index.js';
import errorModal from '../../components/error/index.js';

export default () => {
  const myRecipesContainer = document.createElement('div');
  const myRecipesSection = document.createElement('section');
  myRecipesSection.setAttribute('class', 'myrecipesSection');

  myRecipesContainer.append(profile());

  const userUid = getUserData().uid;

  loadRecipe(userUid)
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        if (post.data().user_id === userUid) {
          myRecipesSection.append(addPost(post));
        }
      });
      if (myRecipesSection.childElementCount === 0) {
        myRecipesSection.innerHTML = `
          <div id="notice" class="notice" style="margin-top:2rem;">
            <p> Você ainda não publicou nenhuma receita </p>
          </div>
        `;
      }
    })
    .catch((error) => {
      myRecipesSection.innerHTML = `
        <div class="overlay"></div>
      `;
      const overlay = myRecipesSection.querySelector('.overlay');
      overlay.classList.add('active');
      myRecipesContainer.append(errorModal());
      throw Error(error);
    });

  myRecipesContainer.append(myRecipesSection);

  return myRecipesContainer;
};
