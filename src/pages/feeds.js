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
import "../static/css/feed.css";
import { List, Drawer, Box, Avatar, Typography } from "@mui/material";
import { addComment } from "../functions/controllers/comments"; // importing all the comment controllers
import { handleAddLike, handleUnlike } from "../functions/controllers/likes"; // importing likes controllers
import { createPanel } from "./create";

function Home({ appState, loadFeeds, walletAdd }) {
  let history = useHistory();
  const state = appState;

  let posts = [
    {
      liked: false,
      id: "1",
      poster: {
        name: "Ojims Kolinda",
        school: "RiversStateUniversity",
        gender: "male",
        id: "DF87efHJSG",
        badge: "SUPREME",
      },
      post: {
        time: new Date(),
        text: "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success....",
        photo: [
          {
            image:
              "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg",
          },
          {
            image:
              "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
          },
          {
            image:
              "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg",
          },
        ],
      },
      comments: [
        {
          user: {
            name: "Ojims Kolinda",
            school: "RiversStateUniversity",
            gender: "male",
            id: "DF87efHJSG",
            badge: "SUPREME",
            avater:
              "https://d5nunyagcicgy.cloudfront.net/external_asse…hero_examples/hair_beach_v391182663/original.jpeg",
          },
          post: "1",
          comment: "This is my comment",
          likes: [],
          unlikes: [],
          id: "gft5",
        },
      ],
      likes: [
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
      ],

      unlikes: [
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
      ],
      time: new Date(),
    },
    {
      liked: false,
      id: "2",
      poster: {
        name: "Ojims Kolinda",
        school: "RiversStateUniversity",
        gender: "male",
        id: "DF87efHJSG",
        badge: "SUPREME",
      },
      post: {
        time: new Date(),
        text: "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success....",
        photo: [
          {
            image:
              "https://www.slazzer.com/static/images/home-page/banner-orignal-image.jpg",
          },
          {
            image:
              "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
          },
          {
            image:
              "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
          },
        ],
      },
      comments: [
        {
          user: {
            name: "Ojims Kolinda",
            school: "RiversStateUniversity",
            gender: "male",
            id: "DF87efHJSG",
            badge: "SUPREME",
          },
          post: "2",
          comment: "This is my comment",
          likes: [],
          unlikes: [],
          id: "099iijdk",
          avater:
            "https://d5nunyagcicgy.cloudfront.net/external_asse…hero_examples/hair_beach_v391182663/original.jpeg",
        },
      ],
      likes: [
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
      ],

      unlikes: [
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
      ],
      time: new Date(),
    },
    {
      liked: false,
      id: "3",
      poster: {
        name: "Ojims Kolinda",
        school: "RiversStateUniversity",
        gender: "male",
        id: "DF87efHJSG",
        badge: "SUPREME",
      },
      post: {
        time: new Date(),
        text: "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success....",
        photo: [
          {
            image:
              "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
          },
          {
            image:
              "https://www.slazzer.com/static/images/home-page/banner-orignal-image.jpg",
          },
          {
            image:
              "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg",
          },
        ],
      },
      comments: [
        {
          user: {
            name: "Ojims Kolinda",
            school: "RiversStateUniversity",
            gender: "male",
            id: "DF87efHJSG",
            badge: "SUPREME",
          },
          post: "3",
          comment: "This is my comment",
          likes: [],
          unlikes: [],
          id: "8iidk57uj",
          avater:
            "https://d5nunyagcicgy.cloudfront.net/external_asse…hero_examples/hair_beach_v391182663/original.jpeg",
        },
      ],
      likes: [
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
      ],

      unlikes: [
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
        {
          name: "Aminigbo",
          id: "DF87efHJSG",
          school: "RiversStateUniversity",
          gender: "male",
          badge: "SUPREME",
        },
      ],
      time: new Date(),
    },
  ];

  function renderFeeds(allFeeds) {
    allFeeds.sort(function (a, b) {
      return parseFloat(b.id) - parseFloat(a.id);
    });

    return allFeeds.map((feeds) => {
      return (
        <ALLPOSTS
          loading={false}
          data={feeds}
          handleUnlikes={handleUnlikes}
          handleLike={handleLike}
          history={history}
          toggleDrawer={toggleDrawer}
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
  const [postText, setPostText] = useState("")
  const [blob, setBlob] = useState("")
  const [postType, setPostType] = useState("POST")


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
    // setStates({ ...compState, loader: true})
    // setTimeout(() => setStates({ ...compState, loader: false }), 500);

    // fetch_feeds()
    // loadFeeds(state.feeds);
    //  loadFeeds(posts)   
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
        <title>Ogapredictor</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div className="mobile">
        <div className="header_footer">
          <Footer />
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
            </div>
            {createPanel(history,setPostText,postText,'', setActive, active,setBlob,blob,setPostType, postType)}

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
              <ALLPOSTS loading />
            )}
            <Pills />
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
