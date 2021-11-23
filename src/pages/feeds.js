import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import Header from "../components/includes/mobile_header.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import Pills from "../components/includes/desktoppillsholder";
import Toppills from "../components/includes/topdesktoppills";
import Realtime from "../components/includes/realtime";
import { logOut, disp_feeds, add_wallet, isSignal } from "../redux";
import { ALLPOSTS } from "../functions/controllers/feeds";
import { Helmet } from "react-helmet";
import logo from "../static/logos/logo2.png";
import {
  ArrowRightOutlined,
  Send,
  AccountBalanceWalletOutlined,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import { TextareaAutosize } from "@mui/material";
import "../static/css/feed.css";
import { List, Drawer, Box } from "@mui/material";
import { addComment } from "../functions/controllers/comments"; // importing all the comment controllers
import { handleAddLike, handleUnlike } from "../functions/controllers/likes"; // importing likes controllers
import { createPanel } from "../components/create";
import Naira from "react-naira";
// @== import from feeds controller
import { returnFeeds } from "../functions/controllers/feeds";

function Home({ appState, loadFeeds, disp_signal }) {
  let history = useHistory();
  const state = appState;
  const schoolFeeds = state.feeds.filter(
    (e) => e.poster.school == state.loggedInUser.user.meta.school
  );
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
          setDrawerState={setDrawerState}
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
  const [active, setActive] = useState(false);
  const [postText, setPostText] = useState("");
  const [blob, setBlob] = useState("");
  const [postType, setPostType] = useState("POST");
  const [compState, setStates] = useState("");
  ALLPOSTS.propTypes = {
    loading: PropTypes.bool,
  };
 

  React.useEffect((compState) => { 
    // setStates({ ...compState, loader: true });
    // setTimeout(() => setStates({ ...compState, loader: false }), 500);

    if (state.loggedIn == true) {
      returnFeeds(
        state.loggedInUser.user.meta.school,
        loadFeeds,
        disp_signal,
        setStates,
        compState
      );
    }

    window.onscroll = () => {
       
      // window.pageYOffset === 0 && console.log("back at top");
      console.log(window.pageYOffset)
    }
    
     console.log(window.pageYOffset)
   
    
    // fetch_feeds()
    loadFeeds(state.feeds);
    
  }, []);

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open, post) => (event) => {
    console.log("okk");
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
        <div className="header_footer">
          {/* <Footer /> */}
          <Header />
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
                padding: "0px  ",
              }}
            >
              <Toppills />
              <div style={{ marginTop: "-5px" }}>
                <Link
                  to="giveaway"
                  style={{
                    marginLeft: "10px",
                    fontSize: "10px",
                    color: "#0a3d62",
                    textDecoration: "none",
                  }}
                >
                  GIVE AWAYS
                  <ArrowRightOutlined style={{ marginLeft: "-4px" }} />
                </Link>
                <Link
                  to="events"
                  style={{
                    marginLeft: "10px",
                    fontSize: "10px",
                    color: "#0a3d62",
                    textDecoration: "none",
                  }}
                >
                  EVENTS
                  <ArrowRightOutlined style={{ marginLeft: "-4px" }} />
                </Link>{" "}
                <Link
                  to="events"
                  style={{
                    marginRight: "10px",
                    fontSize: "10px",
                    color: "#0a3d62",
                    textDecoration: "none",
                    float: "right",
                  }}
                >
                  {/* <AccountBalanceWalletOutlined
                    style={{ marginLeft: "" }}
                  /> */} 
                  
                    <b  style={{ color: "#0a3d62", fontSize: "14px" }}>{state.loggedInUser.user.meta.wallet} <s>BUZ</s></b>
                </Link>{" "}
                <br />
              </div>
            </div>
            {createPanel(
              history,
              setPostText,
              postText,
              "",
              setActive,
              active,
              setBlob,
              blob,
              setPostType,
              postType
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
              </div>
            ) : (
              <ALLPOSTS loading data={[]} />
            )}
            {/* <Pills /> */}
            {state.feeds.length < 1 && (
              <div style={{ textAlign: "center", marginTop: "40%" }}>
                No avilable feed ! <br />
                <br />
                <Link style={{ textDecoration: "none" }} to="/create">
                  Create one
                </Link>
              </div>
            )}
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
    disp_signal: (signal) => dispatch(isSignal(signal)),
    // isSignal
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
