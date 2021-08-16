import { getError } from '../../lib/errors.js';

export const getPosts = (createAndPrintAllPosts) => {
  firebase.firestore().collection('posts').orderBy('data', 'desc').get()
    .then((snap) => {
      snap.forEach((post) => {
        createAndPrintAllPosts(post);
      });
    });
};

export const editPost = (newText, postID) => {
  firebase.firestore().collection('posts').doc(postID).update({
    text: newText,
  });
};

export const likePost = (postID, currentUserEmail) => {
  const likesPostId = firebase.firestore().collection('posts').doc(postID);
  const promiseResult = likesPostId.get().then(((post) => {
    const people = post.data().likes;
    if (people.length >= 1) {
      if (people.includes(currentUserEmail)) {
        likesPostId.update({
          likes: firebase.firestore.FieldValue.arrayRemove(currentUserEmail),
        });
        return 'deslike';
      }
      likesPostId
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(currentUserEmail),
        });
      return 'like';
    }
    likesPostId
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(currentUserEmail),
      });
    return 'like';
  })).catch((error) => {
    getError(error);
  });
  return promiseResult;
};

export const commentPost = (postID, newCommentText, currentUserEmail) => {
  const commentPostId = firebase.firestore().collection('posts').doc(postID);
  const promiseResult = commentPostId.get().then((post) => {
    const comments = post.data().comments;
    if (newCommentText !== '') {
      const newComment = {
        owner: currentUserEmail,
        content: newCommentText,
        postOfOrigin: postID,
        commentLikes: [],
        id: postID + new Date().toLocaleString('pt-BR'),
      };
      commentPostId.update({ comments: firebase.firestore.FieldValue.arrayUnion(newComment) });
      const currentComments = comments.concat(newComment);
      return currentComments;
    }
    return comments;
  });
  return promiseResult;
};

export const showComments = (postID) => {
  const commentPostId = firebase.firestore().collection('posts').doc(postID);
  const promiseResult = commentPostId.get().then(((post) => {
    const comments = (post.data().comments);
    return comments;
  }));
  return promiseResult;
};

export const deletePost = (postID, loadPosts) => {
  firebase.firestore().collection('posts').doc(postID).delete()
    .then(() => {
      loadPosts();
    });
};

export const likePostComment = (postID, commentID, currentUserEmail) => {
  const commentPostId = firebase.firestore().collection('posts').doc(postID);
  const promiseResult = commentPostId.get().then(((post) => {
    const comments = (post.data().comments);
    const commentToLikeOrDislike = comments.filter((comment) => comment.id === commentID);
    const commentsNotChanged = comments.filter((comment) => comment.id !== commentID);
    let action = '';

    if (commentToLikeOrDislike[0].commentLikes.length >= 1) {
      if (commentToLikeOrDislike[0].commentLikes.includes(currentUserEmail)) {
        const index = commentToLikeOrDislike[0].commentLikes.indexOf(currentUserEmail);
        if (index > -1) {
          commentToLikeOrDislike[0].commentLikes.splice(index, 1);
        }
        action = 'deslike';
      } else {
        commentToLikeOrDislike[0].commentLikes.push(currentUserEmail);
        action = 'like';
      }
    } else {
      commentToLikeOrDislike[0].commentLikes.push(currentUserEmail);
      action = 'like';
    }
    const newContent = commentToLikeOrDislike.concat(commentsNotChanged);
    commentPostId.update({ comments: newContent });
    return action;
  }));
  return promiseResult;
};

export const deletePostComment = (postID, commentID) => {
  const commentPostId = firebase.firestore().collection('posts').doc(postID);
  const promiseResult = commentPostId.get().then(((post) => {
    const comments = (post.data().comments);
    const commentsToKeep = comments.filter((comment) => comment.id !== commentID);
    commentPostId.update({ comments: commentsToKeep });
    return commentsToKeep;
  }));
  return promiseResult;
};
