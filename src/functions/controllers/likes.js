import {addLikes,addUnlike} from "../models/index"


export async function handleAddLike(state, postId, loadFeeds) { 
  const sessionUser = {
    name: state.loggedInUser.user.fullname,
    id: state.loggedInUser.user.id,
    school: state.loggedInUser.user.meta.school,
    gender: state.loggedInUser.user.meta.gender,
    badge: state.loggedInUser.user.meta.badge,
};

  let payload = {
      user_data: sessionUser,
      userId: sessionUser.id,
      fullname: sessionUser.name,
      post:postId
    }

  let actualPost = state.feeds.filter((e) => e.id == postId)[0];
  let actualPostPosition = state.feeds.findIndex((e) => e.id == postId);

  // check if logged in user already liked
  let actualLike = state.feeds[actualPostPosition].likes.filter(
    (e) => e.userId == sessionUser.id
  );
  let actualLikePosition = state.feeds[actualPostPosition].likes.findIndex(
    (e) => e.userId == sessionUser.id
  );

  if (actualLike.length > 0) {
    // user already liked

    state.feeds[actualPostPosition].likes.splice(actualLikePosition, 1);

    let modifiedPost = state.feeds[actualPostPosition]; // the modified post
    state.feeds.splice(actualPostPosition, 1, {
      ...modifiedPost,
    });

    loadFeeds(state.feeds);

    console.log("splice");
  } else {
    // not liked yet
    console.log("push");
    
    state.feeds[actualPostPosition].likes.push(payload);

    let modifiedPost = state.feeds[actualPostPosition]; // the modified post
    state.feeds.splice(actualPostPosition, 1, {
      ...modifiedPost,
    });
    // console.log(modifiedPost);
    loadFeeds(state.feeds); 

  }
    addLikes(payload).then(res => {
    // console.log(res)
  })
}




// USER UNLIKE MAIN POST
export async function handleUnlike(state, postId, loadFeeds) {
  const sessionUser = {
    name: state.loggedInUser.user.fullname,
    id: state.loggedInUser.user.id,
    school: state.loggedInUser.user.meta.school,
    gender: state.loggedInUser.user.meta.gender,
    badge: state.loggedInUser.user.meta.badge,
};

  let payload = {
      user_data: sessionUser,
      userId: sessionUser.id,
      fullname: sessionUser.name,
      post:postId
    }

  let actualPost = state.feeds.filter((e) => e.id == postId)[0];
  let actualPostPosition = state.feeds.findIndex((e) => e.id == postId);

  // check if logged in user already liked
  let actualLike = state.feeds[actualPostPosition].unlikes.filter(
    (e) => e.userId == sessionUser.id
  );
  let actualUnlikePosition = state.feeds[actualPostPosition].unlikes.findIndex(
    (e) => e.userId == sessionUser.id
  );

  if (actualLike.length > 0) {
    // user already liked

    state.feeds[actualPostPosition].unlikes.splice(actualUnlikePosition, 1);

    let modifiedPost = state.feeds[actualPostPosition]; // the modified post
    state.feeds.splice(actualPostPosition, 1, {
      ...modifiedPost,
    });

    loadFeeds(state.feeds);

    console.log("splice");
  } else {
    // not liked yet
    console.log("push");
    
    state.feeds[actualPostPosition].unlikes.push(payload);

    let modifiedPost = state.feeds[actualPostPosition]; // the modified post
    state.feeds.splice(actualPostPosition, 1, {
      ...modifiedPost,
    });
    // console.log(modifiedPost);
    loadFeeds(state.feeds); 

  }
    addUnlike(payload).then(res => {
    // console.log(res)
  })
}




// ?==============    COMMENT LIKES ADD
// export async function handleCommentLikes(feeds, postId, commentId, loadFeeds) {
   

//   let actualPost = feeds.filter((e) => e.id == postId)[0];
//   let actualPostPosition = feeds.findIndex((e) => e.id == postId);

//    // get actual comment
//    let actualComment = feeds[actualPostPosition].comments.filter(e => e.id == commentId)
   
//    // get actual comment position
//    let actualCommentPosition  = feeds[actualPostPosition].comments.findIndex(e => e.id == commentId)


//   // check if logged in user already liked
//   let actualLike = feeds[actualPostPosition].comments[actualCommentPosition].likes.filter(
//     (e) => e.id == sessionUser.id
//   );

//    // if liked, get the position of his/her like
//   let actualLikePosition = feeds[actualPostPosition].comments[actualCommentPosition].likes.findIndex(
//     (e) => e.id == sessionUser.id
//   );

//   if (actualLike.length > 0) {
//     // user already liked

//     feeds[actualPostPosition].comments[actualCommentPosition].likes.splice(actualLikePosition, 1);

//     let modifiedPost = feeds[actualPostPosition]; // the modified post
//     feeds.splice(actualPostPosition, 1, {
//       ...modifiedPost,
//       liked: false,
//     });

//     loadFeeds(feeds);

//     console.log("splice");
//   } else {
//     // not liked yet
//     console.log("push");
//    feeds[actualPostPosition].comments[actualCommentPosition].likes.push(sessionUser);

//     let modifiedPost = feeds[actualPostPosition]; // the modified post
//     feeds.splice(actualPostPosition, 1, {
//       ...modifiedPost,
//       liked: true,
//     });
//     console.log(modifiedPost);
//     loadFeeds(feeds);
//   }
// }



// // ?==============    COMMENT UNLIKE ADD
// export async function handleCommentsUnlike(feeds, postId, commentId, loadFeeds) {
   

//   let actualPost = feeds.filter((e) => e.id == postId)[0];
//   let actualPostPosition = feeds.findIndex((e) => e.id == postId);

//    // get actual comment
//    let actualComment = feeds[actualPostPosition].comments.filter(e => e.id == commentId)
   
//    // get actual comment position
//    let actualCommentPosition  = feeds[actualPostPosition].comments.findIndex(e => e.id == commentId)


//   // check if logged in user already liked
//   let actualLike = feeds[actualPostPosition].comments[actualCommentPosition].unlikes.filter(
//     (e) => e.id == sessionUser.id
//   );

//    // if liked, get the position of his/her like
//   let actualLikePosition = feeds[actualPostPosition].comments[actualCommentPosition].unlikes.findIndex(
//     (e) => e.id == sessionUser.id
//   );

//   if (actualLike.length > 0) {
//     // user already liked

//     feeds[actualPostPosition].comments[actualCommentPosition].unlikes.splice(actualLikePosition, 1);

//     let modifiedPost = feeds[actualPostPosition]; // the modified post
//     feeds.splice(actualPostPosition, 1, {
//       ...modifiedPost,
//       liked: false,
//     });

//     loadFeeds(feeds);

//     console.log("splice");
//   } else {
//     // not liked yet
//     console.log("push");
//    feeds[actualPostPosition].comments[actualCommentPosition].unlikes.push(sessionUser);

//     let modifiedPost = feeds[actualPostPosition]; // the modified post
//     feeds.splice(actualPostPosition, 1, {
//       ...modifiedPost,
//       liked: true,
//     });
//     console.log(modifiedPost);
//     loadFeeds(feeds);
//   }
// }



// ?==============  CHECK IF USER ALREADY LIKED A POST
export function likedPost(postLikesArr, state) {
  let id=""
  const sessionUser = {
    name: state.loggedInUser.user.fullname,
    id: state.loggedInUser.user.id,
    school: state.loggedInUser.user.meta.school,
    gender: state.loggedInUser.user.meta.gender,
    badge: state.loggedInUser.user.meta.badge,
};

  
  let filterLiked = postLikesArr.filter(e => e.userId == sessionUser.id)
  console.log(postLikesArr)
  // console.log(filterLiked)
  // console.log(sessionUser.id)
   if (filterLiked.length > 0) {
      return true
   }else{
      return false
   }
}