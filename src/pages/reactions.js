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
import {
  FavoriteBorderOutlined,
  CommentOutlined,
  ThumbDownOutlined,
   Send,
   PublicOutlined,
  MoreHorizOutlined
} from "@material-ui/icons";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/material/IconButton";
// import MoreVertIcon from '@mui/icons-material/IconButton';
import Skeleton from "@mui/material/Skeleton";
import "../static/css/feed.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Avatar, Typography, Grid, Paper } from "@mui/material";
import { handleAddLike, handleUnlike, likedPost } from "../functions/controllers/likes"; // importing likes controllers 
import {commentDuration} from "../functions/utils/index"

function Home({ appState, loadFeeds, walletAdd }) {
  let history = useHistory();
  const state = appState;
  const { postId } = useParams();

  function renderFeeds(allFeeds) {
    const post_to_comment = allFeeds.filter((e) => e.id == postId)[0];

    return <Media loading={false} data={post_to_comment} />;
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
      FavoriteBorderOutlined,
      ThumbDownOutlined
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
      setStates({ ...compState, loader: true });
      addComment(comment, postId, setComment, loadFeeds, state).then((res) => {
        setStates({ ...compState, loader: false });
        window.scrollTo(0, document.body.scrollHeight);
      });
    }
  };

  const [comment, setComment] = useState("");

  function Media(props) {
    const { loading = false, data } = props;
    let label = "" 
    if (data) {
    if (data.postType == "GIVE AWAY") {
   label = `GIVE AWAY  -  NGN ${data.post.meta.giveaway.amount}`
  } else if (data.postType == "POST") {
    
  } else if(data.postType == "EVENT") {
    label = `EVENT  -   ${data.post.meta.event.date} |  ${data.post.meta.event.time}`
  }
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
                src="https://www.slazzer.com/static/images/home-page/banner-orignal-image.jpg"
              />
            )
          }
          action={
            loading ? null : (
               <> <MoreHorizOutlined style={{fontSize:" 30px"}} /> </>
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
                   <> <small>@{data.poster.school}</small> <span style={{ fontSize: "12px" }}> &nbsp;&nbsp;
                      {/* {commentDuration(data.post.time)} */}
                </span>.<PublicOutlined style={{ fontSize: "15px" }} />
                <br />
                  <b style={{ color: "black", fontSize: "14px" }}>{label}</b> <br />
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
          <CardMedia
            component="img"
            height=" "
            image={data.post.photo[0].image}
            alt="image"
          />
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
                <FavoriteBorderOutlined
                  style={{ color: likedPost(data.likes) == true ? "red" : "" }}
                  onClick={() => {
                    handleLike(data.id);
                  }}
                />
                <div style={{ fontSize: "11px" }}>{data.likes.length}</div>
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
                  style={{ color: likedPost(data.unlikes) == true ? "red" : "" }}
                  onClick={() => {
                    handleUnlikes(data.id);
                  }}
                />
                <div style={{ fontSize: "11px" }}>{data.unlikes.length}</div>
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
                <CommentOutlined
                  onClick={() => {
                    window.scrollTo(0, document.body.scrollHeight);
                    document.getElementById("commentInput").focus();
                  }}
                />
                <div style={{ fontSize: "11px" }}>{data.comments.length}</div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  position: "absolute",
                  width: "55%",
                  height: "40px",
                  background: " ",
                  textAlign: "left",
                  display: "inline-block",
                  marginLeft: "10px",
                }}
              >
                <small>10mins ago</small>
                <b
                  className="link"
                  style={{ float: "right", fontSize: "15px" }}
                >
                  AMC - 110
                </b>
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
    window.scrollTo(0, 0);
    // setStates({ ...compState, loader: true})
    // setTimeout(() => setStates({ ...compState, loader: false }), 500);

    // fetch_feeds()
    loadFeeds(state.feeds);
    // loadFeeds(posts)
    // window.scrollTo(0,document.body.scrollHeight);
    // document.getElementById("bottomDiv").scrollIntoView(false)
  }, []);

  const [compState, setStates] = useState("");

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
      {console.log(state)}
      {/* {state.realtime.length > 0 && <Realtime />} */}
      <Realtime />

      {/* user session */}
      <checkSession />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ogapredictor</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div className="mobile">
        <div className="header_footer">
          {/* <Footer /> */}
          {/* <Header /> */}
          {/* <ArrowBackIosOutlined /> */}
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
                
                <b style={{ color: "#0a3d62", padding: "0px 10px" }}>
                Rivers State University
              </b>

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

                <div style={{ margin: "10px" }}>
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
                    autoFocus
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
