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
import { fetchFeeds, ALLPOSTS ,handleCreatePost} from "../functions/controllers/feeds";
import { Helmet } from "react-helmet";
import logo from "../static/logos/logo2.png";
import {
  FavoriteBorderOutlined,
  CommentOutlined,
  DialpadOutlined,
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
// import { createPanel } from "./create";

import ImageResize from "image-resize";

import {
  NativeSelect,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import {
  LocalAtm,
  EmojiTransportationOutlined,
  HowToVoteOutlined,
  EventNoteOutlined,
  AddPhotoAlternateOutlined,
  CameraEnhanceOutlined,
  CloseOutlined,
} from "@material-ui/icons";

function Home({ appState, loadFeeds, walletAdd }) { 
  const [postText, setPostText] = useState("");
  const [blob, setBlob] = useState("");
  const [postType, setPostType] = useState("POST");

  const [giveaway, setGiveaway] = useState({ 
    amount: null,
    delaysecond: null,
    beneficiaries: null,
  });

  const [event, setEvent] = useState({
    date: null,
    time: null,
  });

  let allowSend =""

  if (blob == "" && postText == "") {
      allowSend = false
    } else {
      allowSend = true
    }
   


  const makePost = () => {
    let photo = ""
    let type = ""
    if (postType == "GIVE AWAY" && giveaway.beneficiaries == null || giveaway.amount == null || giveaway.delaysecond == null) { 
    } else {
      type = postType
    }

    if (postType == "EVENT" && event.date == null || event.time == null ) { 
    } else {
      type = postType
    }


    if (blob == "") {
      photo = null
    } else {
      photo = [{
          image:blob.url2
        }]
    }
  const postBody = {
    postType:type, 
       id: new Date().getTime(),
      postText,
      poster: {
        name: "Ojims Kolinda",
        school: "RiversStateUniversity",
        gender: "male",
        id: "DF87efHJSG",
        badge: "SUPREME",
      },
      post: {
        time: new Date(),
        text: postText,
        file: blob.file,
        photo,
        meta: {
          event,
          giveaway
        }
      }, 
      time: new Date(),
    }
if (blob == "" && postText == "") {
      console.log("dont post")
    } else {
  handleCreatePost(postBody, state, loadFeeds).then(res => {
    if (res.success == true) {
          history.push("/") 
        }
      })
    }
    


  };




   
   
 

  const preview = (event) => {
    let files = event.target.files[0];

    // <input type="file" id="upload"/>
    let image = document.getElementById("upload");

    var imageResize = new ImageResize({
      quality: 18,
    });
    imageResize
      .play(image)
      .then((response) => {
        function dataURLtoFile(dataurl, filename) {
          var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }

          return new File([u8arr], filename, { type: mime });
        }

        //Usage example:
        var file = dataURLtoFile(response, files.name);
        setBlob({ ...blob, file: file, url2: URL.createObjectURL(file) });
        // window.scrollTo(0, document.body.scrollHeight);
        // console.log("scroll")
      })
      .catch((error) => {
        console.log(error);
      });
  };


  let url = blob.url2;

  // clear file input
  const clear = () => {
    setBlob('');
  };

  let placeholder = "";
  if (postType == "POOL") {
    placeholder = "Write a description of your pool";
  } else if (postType == "EVENT") {
    placeholder = "Describe your event here...";
  } else if (postType == "GIVE AWAY") {
    placeholder = "Describe your give away here..";
  } else {
    placeholder = "What is happening on campus???";
  }

  let history = useHistory();
  const state = appState;

 
 
  ALLPOSTS.propTypes = {
    loading: PropTypes.bool,
  };

  // fetch feeds from db
  // const fetch_feeds = () => {
  //   fetchFeeds(loadFeeds).then((fetched) => {
  //     console.log(fetched);
  //   });
  // };

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    // setStates({ ...compState, loader: true})
    // setTimeout(() => setStates({ ...compState, loader: false }), 500);

    // fetch_feeds()
    loadFeeds(state.feeds);
    //   loadFeeds(posts)

    if (!("geolocation" in navigator)) {
      console.log("dont support");
    } else {
      console.log("supports");
    }
  }, []);

  const [compState, setStates] = useState("");

 
 
  
 

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

            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  height: "",
                  background: "lightgray",
                  width: "100%",
                  marginBottom: "30px",
                  padding: "0px 0px",
                  position: "relative",
                }}
              >
                <div>
                  {blob.url2 != null && (
                    <>
                      <Card
                        id="postArea1"
                        style={{
                          width: "100%",
                          marginLeft: "0px",
                          borderRadius: "0px",
                          position: "relative",
                        }}
                        sx={{ m: 2 }}
                      >
                        {" "}
                        <span
                          onClick={() => {
                            clear();
                          }}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            color: "white",
                            background: "red",
                          }}
                        >
                          <CloseOutlined />
                        </span>
                        <CardMedia
                          id="postArea1"
                          component="img"
                          height=" "
                          // image={'https://i1.sndcdn.com/artworks-000371577855-entfet-t500x500.jpg'}
                          // image={  "https://usercontent.one/wp/zonknews.com/wp-content/uploads/2021/01/GHANIAN-SOCIALITEHAJIA4REAL-DROPS-FINEGIRLAFTER-RELEASING-BADDERTHAN.jpg" }
                          image={url}
                          alt="image"
                        />
                      </Card>
                      {/* <img style={{width:"50%"}} src = {url} /> */}
                    </>
                  )}
                </div>
                <div
                  style={{ height: " ", background: "", position: "relative" }}
                >
                  <TextareaAutosize
                    autoFocus
                    onChange={(e) => {
                      if (postText.length > 179) {
                        e.target.value = e.target.value.substring(0, 180);
                      } else {
                        e.target.value = e.target.value;
                      }
                      setPostText(e.target.value);
                      console.log(postText.length);
                    }}
                    //  onKeyUp={(e) => {
                    //    do_resize(e.target);
                    //  }}
                    id="postArea"
                    value={postText}
                    aria-label="minimum height"
                    minRows={5}
                    maxRows={5}
                    // placeholder="What is happening in your campus...."
                    placeholder={placeholder}
                    style={{
                      width: "100%",
                      outline: "none",
                      borderRadius: "4px",
                      border: "0.5px solid lightgray",
                      background: "#f0f0f0",
                      padding: "5px 10px",
                      resize: "none",
                      margin: "1px 0%",
                      //  float:"right"
                      paddingRight: "40px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "1px",
                      width: "40px",
                      background: " ",
                    }}
                    id="postArea1"
                    className="top-nav-pills-holder"
                  >
                    <span
                      id="postArea1"
                      style={{
                        background: "none",
                        color:
                          180 - postText.length < 10
                            ? "crimson"
                            : "mediumseagreen",
                      }}
                      className="top-nav-pills"
                    >
                      {" "}
                      <DialpadOutlined id="postArea1" />{" "}
                    </span>{" "}
                    <br />
                    <b
                      className="top-nav-pills-title"
                      style={{
                        background: "none",
                        color:
                          180 - postText.length < 10
                            ? "crimson"
                            : "mediumseagreen",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      {180 - postText.length}
                    </b>
                  </div>
                </div>

                {postType == "GIVE AWAY" && (
                  <Box
                    id="postArea1"
                    style={{
                      marginBottom: "10px",
                      textAlign: "center",
                      background: "rgb(240, 240, 240)",
                      width: "98%",
                      marginLeft: "1%",
                    }}
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "10ch" },
                    }}
                    noValidate
                    autoComplete="on"
                  >
                    <div
                      style={{
                        width: "95%",
                        background: "  ",
                        display: "inline-block",
                        height: " ",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      <FormControl
                        id="postArea1"
                        variant="standard"
                        sx={{ m: 0, minWidth: 230 }}
                      >
                        <TextField
                          id="postArea1"
                          value={giveaway.amount}
                          label="How much to giveaway"
                          variant="standard"
                          onChange={(e) => {
                            setGiveaway({
                              ...giveaway,
                              amount: e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                    </div> 

                    <div
                      style={{
                        width: "40%",
                        background: " ",
                        display: "inline-block",
                        height: " ",
                        padding: "10px 0px",
                        textAlign: "left",
                      }}
                    >
                      <FormControl
                        id="postArea1"
                        variant="standard"
                        sx={{ m: 0, minWidth: 135 }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Beneficiaries
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={giveaway.beneficiaries}
                          label="Age"
                          onChange={(e) => {
                            setGiveaway({
                              ...giveaway,
                              beneficiaries: e.target.value,
                            });
                          }}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={50}>50</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <div
                      style={{
                        width: "35%",
                        background: "",
                        display: "inline-block",
                        marginLeft: "30px ",
                        padding: "10px 0px",
                        textAlign: "left",
                      }}
                    >
                      <FormControl
                        id="postArea1"
                        variant="standard"
                        sx={{ m: 0, minWidth: 135 }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Delay seconds
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={giveaway.delaysecond}
                          label="Age"
                          onChange={(e) => {
                            setGiveaway({
                              ...giveaway,
                              delaysecond: e.target.value,
                            });
                          }}
                        >
                          <MenuItem value={30}>30</MenuItem>
                          <MenuItem value={45}>45</MenuItem>
                          <MenuItem value={60}>60</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Box>
                )}

                {/* !@=======  IF POST TYPE IS EVENT */}
                {postType == "EVENT" && (
                  <Box
                    id="postArea1"
                    style={{
                      marginBottom: "10px",
                      textAlign: "center",
                      background: "rgb(240, 240, 240)",
                      width: "98%",
                      marginLeft: "1%",
                    }}
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "10ch" },
                    }}
                    noValidate
                    autoComplete="on"
                  >
                    <div
                      style={{
                        width: "45%",
                        background: " ",
                        display: "inline-block",
                        height: " ",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      <small>Event date </small>
                      <input
                        onChange={(e) => {
                          setEvent({
                            ...event,
                            date: e.target.value,
                          });
                        }}
                        style={{
                          width: "100%",
                          border: "none",
                          background: "rgb(240, 240, 240)",
                          color: "#0a3d62",
                        }}
                        type="date"
                      />
                    </div>

                    <div
                      style={{
                        width: "45%",
                        background: " ",
                        display: "inline-block",
                        height: " ",
                        padding: "10px",
                        textAlign: "left",
                      }}
                    >
                      <small>Event time </small>
                      <input
                        onChange={(e) => {
                          setEvent({
                            ...event,
                            time: e.target.value,
                          });
                        }}
                        style={{
                          width: "100%",
                          border: "none",
                          background: "rgb(240, 240, 240)",
                          color: "#0a3d62",
                        }}
                        type="time"
                      />
                    </div>
                  </Box>
                )}

                {console.log(postType)}

                <div
                  id="postArea1"
                  className="create"
                  style={{
                    borderBottom: "0.5px solid lightgray",
                    marginTop: "-10px",
                    paddingBottom: "5px",
                    fontSize: "10px",
                  }}
                >
                  <>
                    <div id="postArea1">
                      <div
                        // onClick={() => {
                        //   history.push("/transfer");
                        // }}
                        className="top-nav-pills-holder"
                        id="postArea1"
                      >
                        <span
                          style={{ background: "none" }}
                          id="postArea1"
                          className="top-nav-pills"
                        >
                          {" "}
                          <label id="postArea1">
                            <input
                              onChange={(event) => {
                                preview(event);
                              }}
                              accept="image/png, image/gif, image/jpeg"
                              name="image"
                              id="upload"
                              type="file"
                              style={{ display: "none" }}
                            />
                            <AddPhotoAlternateOutlined id="postArea1" />{" "}
                          </label>
                        </span>
                        <p className="top-nav-pills-title">Add </p>
                      </div>

                      <div
                        id="postArea1"
                        className="top-nav-pills-holder"
                        onClick={() => {
                          setPostType("GIVE AWAY");
                        }}
                      >
                        <span
                          id="postArea1"
                          style={{
                            background:
                              postType == "GIVE AWAY" ? "#0a3d62" : "",
                            color: postType == "GIVE AWAY" ? "white" : "",
                          }}
                          className="top-nav-pills"
                        >
                          {" "}
                          <LocalAtm id="postArea1" />{" "}
                        </span>
                        <p className="top-nav-pills-title">Give away</p>
                      </div>

                      {/* <div
                        onClick={() => {
                          setPostType("POOL");
                        }}
                        id="postArea1"
                        className="top-nav-pills-holder"
                      >
                        <span
                          id="postArea1"
                          style={{
                            background: postType == "POOL" ? "#0a3d62" : "",
                            color: postType == "POOL" ? "white" : "",
                          }}
                          className="top-nav-pills"
                        >
                          {" "}
                          <HowToVoteOutlined id="postArea1" />{" "}
                        </span>
                        <p id="postArea1" className="top-nav-pills-title">
                          {" "}
                          Pool
                        </p>
                      </div> */}

                      <div
                        onClick={() => {
                          setPostType("EVENT");
                        }}
                        id="postArea1"
                        className="top-nav-pills-holder"
                      >
                        <span
                          id="postArea1"
                          style={{
                            background: postType == "EVENT" ? "#0a3d62" : "",
                            color: postType == "EVENT" ? "white" : "",
                          }}
                          className="top-nav-pills"
                        >
                          {" "}
                          <EventNoteOutlined id="postArea1" />{" "}
                        </span>
                        <p className="top-nav-pills-title"> Event</p>
                      </div>

                        {allowSend == true && <div
                        onClick={() => {
                          makePost();
                          }}
                          style={{marginRight:"20px",float:"right",color:"#0a3d62"}}
                        id="postArea1"
                        className="top-nav-pills-holder"
                      >
                        <span
                          id="postArea1"
                          style={{ background: "none", color: "#0a3d62" }}
                          className="top-nav-pills"
                        >
                          {" "}
                          <Send id="postArea1" />{" "}
                        </span>
                        <p className="top-nav-pills-title"> MAKE POST</p>
                      </div>}

                      
                    </div>
                  </>

                  {/* <div  style={{fontSize:"15px",marginTop:"-11px",color:"orange"}}><b>@RiversStateUniversity</b></div> */}
                </div>
              </div>
            </div>
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
