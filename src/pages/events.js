import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
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
import { MdWest } from "react-icons/md";

import "../static/css/feed.css";
import { List, Drawer, Box, Avatar, Typography } from "@mui/material";
import { addComment } from "../functions/controllers/comments"; // importing all the comment controllers
import { handleAddLike, handleUnlike } from "../functions/controllers/likes"; // importing likes controllers
import { createPanel } from "./create";

function Home({ appState, loadFeeds, walletAdd }) {
  let history = useHistory();
  const state = appState;

  const allGiveAwayPosts = state.feeds.filter((e) => e.postType == "EVENT");
  function renderFeeds(allFeeds) {
    allFeeds.sort(function (a, b) {
      return parseFloat(b.id) - parseFloat(a.id);
    });

    console.log(allGiveAwayPosts);
    return allGiveAwayPosts.map((feeds) => {
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

  const [comment, setComment] = useState("");
  const [postToComment, setPostToComment] = useState("");

  ALLPOSTS.propTypes = {
    loading: PropTypes.bool,
  };

  // fetch feeds from db
  const fetch_feeds = () => {
    // fetchFeeds(loadFeeds).then((fetched) => {
    //   console.log(fetched);
    // });
  };

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
  }, []);

  const [compState, setStates] = useState("");

  // show loader when rerouting
  let reroute = (category) => {
    // history.push(`./leagues/${category.id}`)
    setStates({ ...compState, loader: true });
    setTimeout(() => history.push(`./leagues/${category.id}`), 500);
  };

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });

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
        <title>Buzz pay</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div className="mobile">
        <div className="header_footer">
          {/* <Footer /> */}
          {/* <Header /> */}
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
                padding: "0px 9px ",
              }}
            >
              {/* <Toppills /> */}
              <b
                onClick={() => {
                  history.goBack();
                }}
                style={{ fontSize: "30px" }}
              >
                <MdWest />
              </b>
            </div>

            {allGiveAwayPosts.length > 0 && (
              <div style={{ padding: "0px 10px" }}>
                <span>All events</span>
              </div>
            )}

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

                {allGiveAwayPosts.length < 1 && (
                  <div style={{ textAlign: "center", marginTop: "40%" }}>
                    No avilable event ! <br />
                    <br />
                    <Link style={{ textDecoration: "none" }} to="/create-event">
                      Create one
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <ALLPOSTS loading />
            )}
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
