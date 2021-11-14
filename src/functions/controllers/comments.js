// import utility functions
import { commentDuration,code } from "../utils/index";

// @============  importing add comment models
import { addComments } from "../models/index";
// comments like and unlike controller
import { handleCommentLikes, handleCommentsUnlike, likedPost } from "./likes";
const sessionUser = {
  name: "Aminigbo",
  id: "HJekidHGKofhGf87563jck",
  school: "RiversStateUniversity",
  gender: "male",
  badge: "SUPREME",
};

export async function addComment(
  comment,
  postId,
  setComment,
  loadFeeds,
  state
) {
  
  if (comment.length != 0) {
    // make sure you dont send empty comment
    let commentBody = {
      user: sessionUser,
      post: postId,
      comment,
      likes: [],
      unlikes: [],
      time: new Date(),
      id: new Date().getTime(),
      avater:
        "https://d5nunyagcicgy.cloudfront.net/external_asse…hero_examples/hair_beach_v391182663/original.jpeg",
    };

    let actualPost = state.feeds.filter((e) => e.id == postId)[0];
    let actualPostPosition = state.feeds.findIndex((e) => e.id == postId);

    state.feeds[actualPostPosition].comments.push(commentBody);
    loadFeeds(state.feeds);
    setComment("");

  const user = {
    name: state.loggedInUser.user.fullname,
    id: "HJekidHGKofhGf87563jck",
    school: "RiversStateUniversity",
    gender: state.loggedInUser.user.meta.gender,
    badge: state.loggedInUser.user.meta.badge,
    avater:state.loggedInUser.user.meta.avater,
  };
  const comment_id = code(state.loggedInUser.meta.access_token+new Date().getTime()) + new Date().getTime()
  const post = actualPost.id
  const meta = {
    time: new Date(),
    actualPost
  }

    let payload = { post, comment_id, user, comment,meta };

    addComments(payload).then((res) => {
      console.log(res)
    });
  }

  return {
    success: true,
    message: "Comment added",
  };
}

// render comments
export function renderComments(
  posts,
  postId,
  loadFeeds,
  Avatar,
  Typography,
  Grid,
  Paper,
  FavoriteBorderOutlined,
  ThumbDownOutlined
) {
  const post_to_comment = posts.filter((e) => e.id == postId);
  post_to_comment[0].comments.sort(function (a, b) {
    return parseFloat(b.id) + parseFloat(a.id);
  });

  return post_to_comment[0].comments.map((comments) => {
    return (
      <Paper
        style={{
          width: "100%",
          marginLeft: "0px",
          borderRadius: "0px",
          boxShadow: "0px 0px 1px lightgray",
        }}
        sx={{ my: 1, mx: "auto", p: 2 }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            {comments.user.avater == null ? (
              <Avatar>A.M</Avatar>
            ) : (
              <Avatar
                onDoubleClick={() => {
                  console.log("hello");
                }}
                alt="Ted talk"
                src="https://www.slazzer.com/static/images/home-page/banner-orignal-image.jpg"
              />
            )}
          </Grid>
          <Grid item xs>
            <b>
              {comments.user.name} &nbsp;{" "}
              {comments.time && <small>{commentDuration(comments.time)}</small>}
            </b>{" "}
            <br />
            <Typography>
              <span>{comments.comment}</span>
            </Typography>
          </Grid>
        </Grid>
        {console.log(comments)}
        {/* <div
          style={{
            marginTop: "10px",
            fontSize: "12px",
            position: "relative",
            width: "40px",
            height: "40px",
            background: " ",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <FavoriteBorderOutlined
            style={{ color: likedPost(comments.likes) == true ? "red" : "" }}
            onClick={() => {
              handleCommentLikes(posts, postId, comments.id, loadFeeds);
            }}
          />
          <div style={{ fontSize: "11px" }}>{comments.likes.length}</div>
        </div>
        <div
          style={{
            marginTop: "10px",
            fontSize: "12px",
            position: "relative",
            width: "40px",
            height: "40px",
            background: " ",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <ThumbDownOutlined
            style={{ color: likedPost(comments.unlikes) == true ? "red" : "" }}
            onClick={() => {
              handleCommentsUnlike(posts, postId, comments.id, loadFeeds);
            }}
          />
          <div style={{ fontSize: "11px" }}>{comments.unlikes.length}</div>
        </div> */}
      </Paper>
    );
  });
}
