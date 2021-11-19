import React, { useState } from "react";
import { Redirect, useHistory, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import Footer from "../components/includes/mobile_footer.js";
import Header from "../components/includes/mobile_header.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import Pills from "../components/includes/desktoppillsholder";
import Toppills from "../components/includes/topdesktoppills";
import Realtime from "../components/includes/realtime";
import { logOut, disp_feeds, add_wallet } from "../redux";
import { fetchFeeds, ALLPOSTS } from "../functions/controllers/feeds";
import { Helmet } from "react-helmet";
import logo from "../static/logos/logo2.png";
import {
  FavoriteBorderOutlined,
  CommentOutlined,
  ThumbDownOutlined,
  Send,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  TextareaAutosize,
} from "@mui/material";
import "../static/css/feed.css";
import { addComment } from "../functions/controllers/comments"; // importing all the comment controllers
import { handleAddLike, handleUnlike } from "../functions/controllers/likes"; // importing likes controllers

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Box,
  Drawer,
} from "@mui/material";

import { allUniversities } from "../functions/utils/index";

import { fetchAllFeeds } from "../functions/models/index";

function Home({ appState, loadFeeds, walletAdd }) {
  let history = useHistory();
  const state = appState;
  const { school } = useParams();
  const allSCHOOLS = allUniversities();
  const TOUREDSCHOOL = allSCHOOLS.filter((e) => e.label == school)[0];

  
  const [comment, setComment] = useState("");
  const [postToComment, setPostToComment] = useState("");
const [compState, setStates] = useState("");

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });
  ALLPOSTS.propTypes = {
    loading: PropTypes.bool,
  };

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    setStates({ ...compState, loader: true})
    // setTimeout(() => setStates({ ...compState, loader: false }), 500);

    // fetch_feeds()
    loadFeeds(state.feeds);

    fetchAllFeeds(school).then((res) => {
      let arry = [];
      if (res.body != null) {
        res.body.map((posts) => {
          let new_feeds = {
            ...posts.data,
            comments: posts.comments,
            likes: posts.post_likes,
            unlikes: posts.unlikes,
            feed_id: posts.data.id,
            id: posts.id,
          };
          arry.push(new_feeds);
        });
        loadFeeds(arry);
        // disp_signal(true);
        setStates({ ...compState, loader: false });
      } else {
        // disp_signal(false);
        setStates({ ...compState, loader: false });
      }
    });
  }, []);

  

  
  const schoolFeeds = state.feeds.filter((e) => e.poster.school == school);
  function renderFeeds(allFeeds) {
    allFeeds.sort(function (a, b) {
      return parseFloat(b.id) - parseFloat(a.id);
    });

    return schoolFeeds.map((feeds) => {
      return (
        <ALLPOSTS
          loading={false}
          data={feeds}
          handleUnlikes={handleUnlikes}
          handleLike={handleLike}
          history={history}
          toggleDrawer={toggleDrawer}
          state={state}
        />
      );
    });
  }

  // handle likes==================================
  const handleLike = (postId) => {
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
      console.log("empty");
    } else {
      setStates({ ...compState, loader: true });
      addComment(comment, postToComment, setComment, loadFeeds, state).then(
        (res) => {}
      );
      history.push(`/reaction/${postToComment}`);
    }
  };

  

  const toggleDrawer = (anchor, open, post) => (event) => {
    if (post != false) {
      setPostToComment(post.data.id);
    }
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const list = (anchor, data) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        <div
          style={{
            position: "relative",
            height: " ",
            background: " #f0f0f0",
            borderRadius: "27px",
            padding: "3px",
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
            maxRows={4}
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

          <Send
            onClick={() => {
              setDrawerState({ ...drawerState, ["bottom"]: false });
              handleComment();
            }}
            style={{ position: "absolute", right: "10px", bottom: "10px" }}
          />
        </div>
      </List>
    </Box>
  );
  // handleComment

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
        <title>Aluta Meter</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div className="mobile">
        <div className="header_footer">{/* <Footer />  */}</div>
        <div>
          <div>
            <div
              style={{
                marginTop: "10px",
                background: " #f4f6f7",
                position: "sticky",
                top: "0px",
                zIndex: "1000",
                padding: "0px  ",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <img style={{ width: "40px" }} src={TOUREDSCHOOL.img} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={school}
                  // secondary="+99 new activities"
                />
              </ListItem>
              <Toppills />
            </div>

            <React.Fragment key="bottom">
              <Drawer
                anchor="bottom"
                open={drawerState["bottom"]}
                onClose={toggleDrawer("bottom", false, false)}
              >
                {list("bottom")}
              </Drawer>
            </React.Fragment>

            {compState.loader != true ? (
              <div className="" style={{ background: " " }}>
                {renderFeeds(state.feeds)}
              </div>
            ) : (
              <ALLPOSTS loading data={[]}  />
            )}

            {schoolFeeds.length < 1 && (
              <div style={{ textAlign: "center", marginTop: "40%" }}>
                No avilable feed from <br /> <b>{school}</b> ! <br />
                <br />
                <Link style={{ textDecoration: "none" }} to="/tour">
                  Check other school
                </Link>
              </div>
            )}
            {/* <Pills /> */}
          </div>
          <br />
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
