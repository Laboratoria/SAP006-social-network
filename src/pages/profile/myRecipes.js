import profile from './index.js';
import { addPost } from '../../components/post/index.js';
import { getUserData, loadRecipe } from '../../services/index.js';

export default () => {
  const myRecipesContainer = document.createElement('div');
  const myRecipesSection = document.createElement('section');
  myRecipesContainer.append(profile());

  const userUid = getUserData().uid;

  loadRecipe(userUid)
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        if (post.data().user_id === userUid) {
          myRecipesSection.append(addPost(post));
        }
      });
    });

  myRecipesContainer.append(myRecipesSection);
  return myRecipesContainer;
};
