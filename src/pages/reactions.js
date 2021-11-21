import React, { useState } from "react";
import { Redirect, useHistory, Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import Footer from "../components/includes/mobile_footer.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import Toppills from "../components/includes/topdesktoppills";
import Realtime from "../components/includes/realtime";
import { logOut, disp_feeds, add_wallet } from "../redux";
// importing functions from controllers
// import {fetchFeeds, renderFeeds} from "../functions/controllers/feeds"
import { addComment, renderComments } from "../functions/controllers/comments"; // importing all the comment controllers
import { fetchFeeds } from "../functions/controllers/feeds";
import { Helmet } from "react-helmet";
import logo from "../static/logos/logo2.png";
import loaderImg from "../static/logos/animation.gif";
import {
  FavoriteBorderOutlined,
  CommentOutlined,
  ThumbDownOutlined,
  Send,
  PublicOutlined,
  MoreHorizOutlined,
  LocalAtm,
  CheckCircleOutlineOutlined
} from "@material-ui/icons";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import "../static/css/feed.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Avatar, Typography, Grid, Paper, Divider } from "@mui/material";
import {
  handleAddLike,
  handleUnlike,
  likedPost,
} from "../functions/controllers/likes"; // importing likes controllers
import { commentDuration, API_URL } from "../functions/utils/index";

// import giveaway claim controller
import { claimGiveaway } from "../functions/controllers/giveaway";

function Home({ appState, loadFeeds, walletAdd }) {
  let history = useHistory();
  const state = appState;
  const { postId } = useParams();

  const post_to_comment = state.feeds.filter((e) => e.id == postId)[0];
  const [isClaim, setIsClaim] = useState(false);
  const [compState, setStates] = useState({
    commentLoader: false,
  });
  function renderFeeds(allFeeds) {
    console.log(post_to_comment);

    return <Media loading={false} data={post_to_comment} />;
  }

  // claim give away
  const claim = () => {
    claimGiveaway(post_to_comment).then((res) => {
      console.log(res);
    });
  };

  function timeout() {
    let delaysecond = "";
    if (post_to_comment.postType == "GIVE AWAY") {
      delaysecond = post_to_comment.post.meta.giveaway.delaysecond;

      var timeleft = delaysecond;
      var downloadTimer = setInterval(function () {
        if (timeleft < 1) {
          clearInterval(downloadTimer);
          console.log("delaysecond");
          setIsClaim(true);
        } else {
          if (document.getElementById("progressBar") == null) {
            clearInterval(downloadTimer);
          } else {
            document.getElementById("progressBar").innerHTML = `- ${timeleft}`;
          }
          timeleft -= 1;
        }
      }, 1000);
    } else {
      delaysecond = "";
    }
  }

  // @=======   function to buz users
  const buzUsers = (payload) => {
    console.log(payload)
  }

  // render all comments
  const allComments = (allFeeds) => {
    return renderComments(
      state.feeds,
      postId,
      loadFeeds,
      Avatar,
      Typography,
      Grid,
      Paper,
      LocalAtm,
      CheckCircleOutlineOutlined,
      Divider,
      state,
      buzUsers
      
    );
  };

  // handle likes==================================
  const handleLike = () => {
    handleAddLike(state, postId, loadFeeds).then((res) => {});
  };
  // handle likes ===================================

  //  handle unlikes
  const handleUnlikes = (postId) => {
    handleUnlike(state, postId, loadFeeds).then((res) => {});
  };

  // handle commenting
  const handleComment = () => {
    if (comment.match("^\\s+$")) {
      setComment("");
    } else {
      setStates({ ...compState, commentLoader: true });
      addComment(
        comment,
        postId,
        setComment,
        loadFeeds,
        state,
        setStates,
        compState
      ).then((res) => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    }
  };

  const [comment, setComment] = useState("");
  const [school, setSchool] = useState("");

  function Media(props) {
    const { loading = false, data } = props;
    let label = "";
    if (data) {
      if (data.postType == "GIVE AWAY") {
        label = `GIVE AWAY  -  NGN ${data.post.meta.giveaway.amount}`;
      } else if (data.postType == "POST") {
      } else if (data.postType == "EVENT") {
        label = `EVENT  -   ${data.post.meta.event.date} |  ${data.post.meta.event.time}`;
      }
      setSchool(data.poster.school);
    }
    return (
      <>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar
                onDoubleClick={() => {
                  console.log("hello");
                }}
                alt="Ted talk"
                src={data.poster.avater}
              />
            )
          }
          action={
            loading ? null : (
              <>
                {" "}
                <MoreHorizOutlined style={{ fontSize: " 30px" }} />{" "}
              </>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Link className="link" to="">
                <b>{data.poster.name}</b>
              </Link>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              <>
                {" "}
                <small>@{data.poster.school}</small>{" "}
                <span style={{ fontSize: "12px" }}>
                  {" "}
                  &nbsp;&nbsp;
                  {/* {commentDuration(data.post.time)} */}
                </span>
                .<PublicOutlined style={{ fontSize: "15px" }} />
                <br />
                <b style={{ color: "black", fontSize: "14px" }}>{label}</b>{" "}
                <br />
              </>
            )
          }
        />
        {loading ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <div>
            {data.post.photo != null && (
              <CardMedia
                component="img"
                // height="220"
                image={data.post.file.secure_url}
                alt="image"
              />
            )}
          </div>
        )}

        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </React.Fragment>
          ) : (
            <Typography variant="body2" color="text.secondary" component="p">
              <b>
                <Link className="link">@{data.poster.name} </Link>
              </b>
              &nbsp;&nbsp;
              <span style={{ fontFamily: "" }}>{data.post.text}</span>
              <br />
              <br />
              <div style={{ textAlign: "", fontSize: "12px" }}>
                <small>
                  {parseInt(data.likes.length) +
                    parseInt(data.unlikes.length) +
                    parseInt(data.comments.length)}{" "}
                  Reactions
                </small>
                {/* 
              <FavoriteBorderOutlined   style={{fontSize:"18px",color:"#0a3d62",marginLeft:"-5px"}} />
                <CommentOutlined style={{ fontSize: "18px", color: "#0a3d62", marginLeft: "-5px" }} />
                &nbsp; {parseInt(data.likes.length)+ parseInt(data.unlikes.length)+parseInt(data.comments.length)} */}
              </div>
              <Divider />
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  position: "relative",
                  width: " ",
                  height: "40px",
                  background: " ",
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                &nbsp;{" "}
                <FavoriteBorderOutlined
                  style={{
                    color: likedPost(data.likes, state) == true ? "red" : "",
                  }}
                  onClick={() => {
                    handleLike(data.id);
                  }}
                />
                &nbsp;<span>Love</span>
                {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
              </div>
              &nbsp; &nbsp;{" "}
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  position: "relative",
                  width: " ",
                  height: "40px ",
                  background: "  ",
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                &nbsp;{" "}
                <ThumbDownOutlined
                  style={{
                    color: likedPost(data.unlikes, state) == true ? "red" : "",
                  }}
                  onClick={() => {
                    handleUnlikes(data.id);
                  }}
                />
                &nbsp;<span>Dislike</span>
                {/* <span style={{ fontSize: "11px" }}>{data.unlikes.length}</span> */}
              </div>
              &nbsp; &nbsp;
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  position: "relative",
                  width: " ",
                  height: "40px",
                  background: "  ",
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                &nbsp;{" "}
                <CommentOutlined
                  onClick={() => {
                    window.scrollTo(0, document.body.scrollHeight);
                    document.getElementById("commentInput").focus();
                  }}
                />
                {/* <span style={{ fontSize: "11px" }}>{data.comments.length}</span> */}
                &nbsp;<span>Comment</span>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  position: "absolute",
                  width: "",
                  height: "40px",
                  background: " ",
                  textAlign: "right",
                  display: "inline-block",
                  right: "10px",
                }}
              >
                {/* <small id="progressBar">
                    <progress value="0" max="10" id="progressBar"></progress>
                  </small> */}

                {/* {data.postType == "GIVE AWAY" && (
                  <b
                    className="link"
                    id="clainHolder"
                    style={{ float: "right", fontSize: " " }}
                  >
                    {isClaim == true ? (
                      <button
                        id="progressBar"
                        style={{
                          background: "#0a3d62",
                          color: "white",
                          border: "none",
                          outline: "none",
                          borderRadius: "4px",
                          padding: "3px 10px",
                        }}
                        id="claimBTN"
                        onClick={() => {
                          claim();
                        }}
                      >
                        Claim{" "}
                      </button>
                    ) : (
                      <>
                        {" "}
                        <b id="progressBar"></b>{" "}
                      </>
                    )}
                  </b>
                )} */}
              </div>
            </Typography>
          )}
        </CardContent>
      </>
    );
  }

  Media.propTypes = {
    loading: PropTypes.bool,
  };

  // fetch feeds from db
  const fetch_feeds = () => {
    fetchFeeds(loadFeeds).then((fetched) => {
      console.log(fetched);
    });
  };

  React.useEffect((compState) => {
    // window.scrollTo(0, 0);
    // loadFeeds(state.feeds);
  }, []);

  // show loader when rerouting
  let reroute = (category) => {
    // history.push(`./leagues/${category.id}`)
    setStates({ ...compState, loader: true });
    setTimeout(() => history.push(`./leagues/${category.id}`), 500);
  };

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      {/* {console.log(state)} */}
      {/* {state.realtime.length > 0 && <Realtime />} */}
      <Realtime />

      {/* user session */}
      <checkSession />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Aluta Meter</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div className="mobile">
        <div className="header_footer">
          {/* <Footer /> */}
          {/* <Header /> */}
          {/* <ArrowBackIosOutlined /> */}
          {timeout()}
        </div>
        <div>
          <div>
            <div
              style={{
                marginTop: "10px",
                background: " #f4f6f7",
                position: "sticky",
                top: "0px",
                zIndex: "1000",
                padding: "0px",
              }}
            >
              <b style={{ color: "#0a3d62", padding: "0px 10px" }}>{school}</b>

              <Toppills />
            </div>

            {compState.loader != true ? (
              <Card
                style={{
                  width: "100%",
                  marginLeft: "0px",
                  borderRadius: "0px",
                  boxShadow: "0px 0px 0px lightgray",
                }}
                sx={{ m: 2 }}
              >
                {renderFeeds(state.feeds)}

                <div style={{ margin: "10px 16px" }}>
                  <small>comment</small>
                </div>

                {allComments(state.feeds)}

                <div
                  style={{
                    position: "relative",
                    height: " ",
                    background: " #f0f0f0",
                    borderRadius: "27px ",
                    padding: "3px",
                    margin: "16px",
                  }}
                >
                  <TextareaAutosize
                    // autoFocus
                    id="commentInput"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    value={comment}
                    aria-label="minimum height"
                    minRows={1}
                    maxRows={2}
                    placeholder="Write a comment...."
                    style={{
                      width: "86%",
                      outline: "none",
                      borderRadius: "27px 0px 0px 27px",
                      border: "none",
                      background: "#f0f0f0",
                      padding: "10px",
                      paddingRight: " ",
                      resize: "none",
                    }}
                  />

                  {comment && (
                    <span>
                      {compState.commentLoader == false && (
                        <Send
                          onClick={() => {
                            handleComment();
                            window.scrollTo(0, document.body.scrollHeight);
                          }}
                          style={{
                            position: "absolute",
                            right: "10px",
                            bottom: "10px",
                          }}
                        />
                      )}
                    </span>
                  )}
                  {compState.commentLoader == true && (
                    <img
                      style={{
                        width: "20px",
                        position: "absolute",
                        right: "20px",
                        bottom: "20px",
                      }}
                      src={loaderImg}
                    />
                  )}
                </div>
              </Card>
            ) : (
              <Media loading />
            )}
            {/* <Pills /> */}
          </div>
        </div>
      </div>

      {/* desktop left */}
      <Desktopleft />

      {/* desktop right */}
      <Desktopright />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = (dispatch, encoded) => {
  return {
    logout: () => dispatch(logOut()),
    loadFeeds: (payload) => dispatch(disp_feeds(payload)),
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
