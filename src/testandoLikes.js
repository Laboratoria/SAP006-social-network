const database = firebase.firestore()
const storage = firebase.storage()

export const alreadyLikedThisPost = (postID) =>
firebase.firestore().collection("posts").doc(postID).get();

export const removeLike = (postID, userID) =>
firebase
  .firestore()
  .collection("posts")
  .doc(postID)
  .update({ likes: firebase.firestore.FieldValue.arrayRemove(userID) });

export const likePost = (postID, userID) =>
firebase
  .firestore()
  .collection("posts")
  .doc(postID)
  .update({ likes: firebase.firestore.FieldValue.arrayUnion(userID) });

export const addComment = (commentObject) =>
firebase.firestore().collection("comments").add(commentObject);




export const sendLike = (e) => {
  const getEvent = e.target;
  const postId = getEvent.parentNode.parentNode.parentNode.parentNode.id;
  const user = getCurrentUser();
  const likeValue = document.querySelector(`#likeValue-${postId}`);
  alreadyLikedThisPost(postId)
    .then((doc) => {
      const checkLike = doc.data().likes.includes(user.uid);
      if (!checkLike) {
        likePost(postId, user.uid)
          .then(() => {
            const getNewValue = addNewLikeValue(likeValue.innerText);
            likeValue.innerHTML = getNewValue;
          })
          .catch(timelineMessageError);
      } else {
        removeLike(postId, user.uid)
          .then(() => {
            const getNewValue = removeNewLikeValue(likeValue.innerText);
            likeValue.innerHTML = getNewValue;
          })
          .catch(timelineMessageError);
      }
    })
    .catch(timelineMessageError);
};

function addNewLikeValue(num) {
  return Number(num) + 1;
}

function removeNewLikeValue(num) {
  return Number(num) - 1;
}


const likeButtons = postContainer.querySelectorAll(".like");
likeButtons.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    sendLike(e);
  });
});