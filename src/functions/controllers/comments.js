// import utility functions
import { commentDuration, code } from "../utils/index";

// @============  importing add comment models
import { addComments } from "../models/index";
// comments like and unlike controller
import { handleCommentLikes, handleCommentsUnlike, likedPost } from "./likes";

// style for the button which allows users to login
const buzBTN = {
  marginTop: "4px",
  fontSize: "12px",
  position: "relative",
  width: " ",
  height: "40px",
  background: " ",
  textAlign: "center",
  display: "inline-block",
  marginLeft: "40px",
  color: "#0a3d62",
};
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
  state,
  setStates,
  compState
) {
  if (comment.length != 0) {
    let actualPost = state.feeds.filter((e) => e.id == postId)[0];
    let actualPostPosition = state.feeds.findIndex((e) => e.id == postId);

    const user = {
      name: state.loggedInUser.user.fullname,
      id: state.loggedInUser.user.id,
      school: state.loggedInUser.user.meta.school,
      gender: state.loggedInUser.user.meta.gender,
      badge: state.loggedInUser.user.meta.badge,
      avater: state.loggedInUser.user.meta.avater,
      beneficiary: state.loggedInUser.user.meta.beneficiaryId,
    };
    // make sure you dont send empty comment
    let commentBody = {
      user: user,
      post: postId,
      comment,
      likes: [],
      unlikes: [],
      time: new Date(),
      id: new Date().getTime(),
      beneficiary: user.beneficiary,
      avater: user.avater,
    };
    const comment_id =
      code(state.loggedInUser.user.meta.password + new Date().getTime()) +
      new Date().getTime();
    const post = actualPost.id;
    const meta = {
      time: new Date(),
      actualPost,
    };

    let payload = { post, comment_id, user, comment, meta };

    addComments(payload).then((res) => {
      state.feeds[actualPostPosition].comments.push(commentBody);
      loadFeeds(state.feeds);
      setStates({
        ...compState,
        commentLoader: false,
      });
      setComment("");
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
  CheckCircleOutlineOutlined,
  Divider,
  state,
  buzUsers,
  giveAwayConfirm
) {
  const post_to_comment = posts.filter((e) => e.id == postId);

  post_to_comment[0].comments.sort(function (a, b) {
    return parseFloat(b.id) + parseFloat(a.id);
  });
  // console.log(post_to_comment);
  return post_to_comment[0].comments.map((comments) => {
    let isBeneficiary = null;
    // filter benefited if user is found
    let beneficiariesFilter = state.benefited.filter(
      (e) => e.beneficiaryId == comments.user.beneficiary
    );
    if (beneficiariesFilter.length > 0) {
      isBeneficiary = true;
    } else {
      isBeneficiary = false;
    }

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
          {post_to_comment[0].postType == "GIVE AWAY" ? (
            <Grid item>
              <Avatar
                style={{ width: "30px", height: "30px", fontSize: "14px" }}
              ></Avatar>
            </Grid>
          ) : (
            <Grid item>
              {comments.user.avater == null ? (
                <Avatar
                  style={{ width: "30px", height: "30px", fontSize: "14px" }}
                >
                  A.M
                </Avatar>
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
          )}
          <Grid item xs>
            <b style={{ fontSize: "13px" }}>
              {post_to_comment[0].postType == "GIVE AWAY" ? (
                <b>ID : {comments.user.beneficiary}</b>
              ) : (
                comments.user.name
              )}

              {comments.time && <small>{commentDuration(comments.time)}</small>}
            </b>{" "}
            <br />
            <Typography>
              <span style={{ fontSize: "14px" }}>{comments.comment}</span>
            </Typography>
          </Grid>
        </Grid>
        {/* {console.log(comments)} */}

        {post_to_comment[0].postType == "GIVE AWAY" && (
          <>
            {post_to_comment[0].poster.id == state.loggedInUser.user.id ? (
              <>
                {comments.user.beneficiary ==
                state.loggedInUser.user.meta.beneficiaryId ? (
                  <>
                    <Divider
                      style={{ marginLeft: "40px", marginTop: "10px" }}
                    />
                    <div
                      onClick={() => {
                        buzUsers(post_to_comment[0]);
                      }}
                      style={buzBTN}
                    >
                      You commented
                    </div>{" "}
                  </>
                ) : (
                  <>
                    {giveAwayConfirm.miniLoad == true ? (
                      <div style={buzBTN}>
                        &nbsp; &nbsp;<b>Just a sec........</b>
                        {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
                      </div>
                    ) : (
                      <>
                        {isBeneficiary === true ? (
                          <div style={buzBTN}>
                            &nbsp; <CheckCircleOutlineOutlined />
                            &nbsp;<b>Benefited</b>
                            {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
                          </div>
                        ) : (
                          <>
                            {state.loading === true ? (
                              <div style={buzBTN}>
                                &nbsp; &nbsp;<b>Just a sec......</b>
                                {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
                              </div>
                            ) : (
                              <>
                                {isBeneficiary === true ? (
                                  <div style={buzBTN}>
                                    &nbsp; <CheckCircleOutlineOutlined />
                                    &nbsp;<b>YOU Benefited</b>
                                    {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
                                  </div>
                                ) : (
                                  <div
                                    onClick={() => {
                                      buzUsers({
                                        giveawayData:
                                          post_to_comment[0].post.meta.giveaway,
                                        luckyWinner: comments.user,
                                        postId: post_to_comment[0].id,
                                        poster: post_to_comment[0].poster,
                                      });
                                    }}
                                    style={buzBTN}
                                  >
                                    &nbsp; <FavoriteBorderOutlined />
                                    &nbsp;<b>Buz me </b>
                                    {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {comments.user.id == post_to_comment[0].poster.id ? (
                  <>
                    <Divider
                      style={{ marginLeft: "40px", marginTop: "10px" }}
                    />
                    <div
                      onClick={() => {
                        buzUsers(post_to_comment[0]);
                      }}
                      style={buzBTN}
                    >
                      Author
                    </div>
                  </>
                ) : (
                  <>
                    {comments.user.id == state.loggedInUser.user.id ? (
                      <>
                        <Divider
                          style={{ marginLeft: "40px", marginTop: "10px" }}
                        />
                        {isBeneficiary === true ? (
                          <>
                            {state.loading === true ? (
                              <div style={buzBTN}>
                                &nbsp; &nbsp;<b>Just a sec......</b>
                                {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
                              </div>
                            ) : (
                              <div style={buzBTN}>
                                &nbsp; <CheckCircleOutlineOutlined />
                                &nbsp;<b>YOU Benefited</b>
                                {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {state.loading === true ? (
                              <div style={buzBTN}>
                                &nbsp; &nbsp;<b>Just a sec......</b>
                                {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  buzUsers(post_to_comment[0]);
                                }}
                                style={buzBTN}
                              >
                                You commented.
                              </div>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      ""
                      // comments.user.beneficiary
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Paper>
    );
  });
}
