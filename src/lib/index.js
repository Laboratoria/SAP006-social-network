const database = firebase.firestore()
const storage = firebase.storage()

export const loginPage = (email, password) => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut()
  }
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
}

export const createUser = async (email, password) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
}

export const setPersistence = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
}

export const currentUser = () => {
  return firebase.auth().currentUser

}


export const logout = () => {
  firebase.auth().signOut()
}

export const updateUserName = (userName) => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: userName,
  })
}

export const updateUserImage = (urlImage) => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    photoURL: urlImage,
  })
}


export const signInGoogleAccount = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)

}
/*
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    .then((result) => {
    //@type {firebase.auth.OAuthCredential} 
    var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  })
  .catch((error) => {
    
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
*/

export const signOut = () => {
  firebase
    .auth()
    .signOut()
  /*
  .then(() => {
    // Sign-out successful.
  }).catch((error) => {
    swal.fire({
      icon: "error",
      title: error.message,
    })// An error happened.
  });
 */
}

export const uploadImage = (id, userid) => {
  const ref = storage.ref()
  const file = document.getElementById(id).files[0]
  const imageName = userid
  const metadata = {
    contentType: file.type,
  }

  return ref.child("profilephotos").child(imageName).put(file, metadata)
}

export const uploadImageBooks = (id) => {
  const ref = storage.ref()
  const imageName = ((new Date().getTime() / 1000) * Math.random()).toString()
  const file = document.getElementById(id).files[0]
  const metadata = {
    contentType: file.type,
  }

  return ref.child("bookcover").child(imageName).put(file, metadata)

}

export const forgotPassword = (email) => {
  if (email !== '') {
    return firebase.auth()
      .sendPasswordResetEmail(email)
  }
}


export const createReview = (bookUser, authorUser, reviewUser, ratingStars, nameUser, image, date, hour) => {
  return firebase
    .firestore()
    .collection("reviews").add({
      book: bookUser,
      author: authorUser,
      review: reviewUser,
      rating: ratingStars,
      userName: nameUser,
      userId: firebase.auth().currentUser.uid,
      userImg: firebase.auth().currentUser.photoURL,
      datePost: date,
      hourPost: hour,
      likes: [],
      comments: [],
      saves: [],
      imageUrl: image
    })
}


export const getReviews = () => {
  return database
    .collection('reviews').orderBy('datePost', 'desc').orderBy('hourPost', 'desc').get()
}


export const getPost = (postID) => {
  const review = database.collection("reviews").doc(postID)
  return review.get()
}

export const updateRewiews = () => {
  return database
    .collection("reviews").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(post => {
        if (post.type == "added") {
          console.log("added")
          //getReviews(post.doc.data(), post.doc.id);
        }
        if (post.type == "modified") {
          console.log("modified");
        }
        if (post.type == "removed") {
          console.log("removed")
        }
      })
    })
}

export const like = (postID, userID) => {

  const review = database.collection("reviews").doc(postID)
  review.get()
    .then((rev) => {
      const likesArray = rev.data().likes
      console.log(likesArray)
      if (likesArray.indexOf(userID) === -1) {
        review.update({
          likes: firebase.firestore.FieldValue.arrayUnion(userID)
        })

      } else {
        review.update({
          likes: firebase.firestore.FieldValue.arrayRemove(userID)
        })

      }

    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    })
}

export const sendComment = (postID, value, date, hour) => {
  return database.collection("reviews").doc(postID).update({
    comments: firebase.firestore.FieldValue.arrayUnion(
      {
        value: value,
        userId: firebase.auth().currentUser.uid,
        userImg: firebase.auth().currentUser.photoURL,
        userName: firebase.auth().currentUser.displayName,
        dateOfComment: date,
        hourOfComment: hour
      }
    )
  })
}

export const deleteComment = (postID, value, userId, userImg, userName, date, hour) => {
  return database.collection("reviews").doc(postID).update({
    comments: firebase.firestore.FieldValue.arrayRemove(
      {
        value: value,
        userId: userId,
        userImg: userImg,
        userName: userName,
        dateOfComment: date,
        hourOfComment: hour
      }
    )
  })
}

export const deletePost = (postId) => {
  return database.collection("reviews").doc(postId).delete()
}
export const saveReview = (userId, postId) => {
  return database
    .collection("saveReviews").add({
      userId: userId,
      postId: postId
    })
}

// export const deleteSaveReview = () => {
//   database.
//   collection("saveReviews").doc().delete().then(() => {
//     console.log("Document successfully deleted!");
//   }).catch((error) => {
//     console.error("Error removing document: ", error);
//   });
// }

export const save = (postID, userID) => {
  let numberOfSaves
  const saveReviews = database.collection("reviews").doc(postID)
  saveReviews.get()
    .then((review) => {
      const savesArray = review.data().saves
      if (savesArray.indexOf(userID) === -1) {
        saveReviews.update({
          saves: firebase.firestore.FieldValue.arrayUnion(userID)
        })
        numberOfSaves = (savesArray.length) + 1
      } else {
        saveReviews.update({
          saves: firebase.firestore.FieldValue.arrayRemove(userID)
        })
        numberOfSaves = (savesArray.length) - 1
      }
    })
    .catch((error) => { })
}

export const getSavedReviews = () => {

  return database
    .collection('reviews').where("saves", "array-contains", firebase.auth().currentUser.uid).get()
}