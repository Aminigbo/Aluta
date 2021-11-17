// import  "../../static/css/home/index.css"
import "../../static/css/top-nav.css";
import { LinearProgress } from "@material-ui/core";
import { React, useState } from "react";
import { connect } from "react-redux";
import { logOut, loginSuc } from "../../redux";
import { useHistory, Link } from "react-router-dom";
import {
  LocalAtm,
  Person,
  AddBoxOutlined,
  EmojiTransportationOutlined,
  CardGiftcardOutlined,
  ForumOutlined,
  HomeOutlined,
  StorefrontOutlined,
  
} from "@material-ui/icons";

import { updateUserMeta } from "../../functions/models/index";

//  function that checkes if the user is still using the default transaction pin
import { trigger, resetPin } from "../../functions/controllers/resetPin";

// @=== import success response from worker function
import { alert } from "../../functions/workers_functions/alert";

const smile = {
  color: "white",
  fontSize: "20px",
};


const active = {
  background: "#0a3d62",
  color:"white"
}

function Desktopright({ appState, login_suc },props) {
  let history = useHistory();
  const state = appState;

  const [pins, setPins] = useState({
    first: "",
    second: "",
  });
  const [stateAlert, setStateAlert] = useState("");
  const [compState, setStates] = useState("");

  const resetTPin = () => {
    if (pins.first.length != 4 || pins.second.length != 4) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Invalid pin selected",
      });
    } else if (pins.first !== pins.second) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Sorry, you first and second pin does not match",
      });
    } else if (pins.first == "0000" || pins.second == "0000") {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Sorry, you can not use the default pin.",
      });
    } else {
      let { first, second } = pins;

      let user = state.loggedInUser.user;
      let newUser = {
        ...user,
        meta: { ...user.meta, transactionPin: first },
      };
      let payload = {
        email: user.email,
        newUser,
      };

      const data = {
        user: newUser,
        meta: state.loggedInUser.meta,
      };
      // call a async function to reset the userpin in the database
      updateUserMeta(payload)
        .then((res) => {
          if (res.success == true) {
            login_suc(data);
            setStateAlert(true);
            setStates({
              ...compState,
              loader: false,
              alertMsg: "Your pin is ready for transactions.",
            });
          } else {
            setStateAlert(false);
            setStates({
              ...compState,
              loader: false,
              alertMsg: "Sorry, a network error occured",
            });
          }
        })
        .catch((errer) => {
          alert("A network error occured");
          setStates({
            ...compState,
            loader: false,
          });
        });
    }
  };

  let successPayload = {
    title: "SUCCESS",
    msg: compState.alertMsg,
    error: false,
  };

  let errorPayload = {
    title: "error",
    msg: compState.alertMsg,
    error: true,
  };

  let pathname = window.location.pathname;
  let split = pathname.split("/")[1];
  let allow = "";
  if (split == "setschool" || split == "updateprofile") {
    allow = true;
  } else {
    allow = false;
  }
  return (
    <>
      {allow === false && (
        <div>
          {resetPin(state, resetTPin, smile, setPins, pins)}
          {trigger(state, history, smile)}
        </div>
      )}

      <div id=" " className="top-nav-holder">
        {console.log(split)}
        {stateAlert === null && <span>{history.push("/")}</span>}
        {stateAlert === true && alert(successPayload, setStateAlert)}
        {stateAlert === false && alert(errorPayload, setStateAlert)}
       
        <div
          onClick={() => {
            window.scrollTo(0, 0);
            history.push("/");
          }}
          className="top-nav-pills-holder"
        >
          <span className="top-nav-pills">
            {" "}
            <HomeOutlined />{" "}
          </span>
          <p className="top-nav-pills-title"> Home</p>
        </div>

        <div
          onClick={() => {
            history.push("/transfer");
          }}
          className="top-nav-pills-holder"
        >
          <span  style={{background:split == "transfer" && "#0a3d62",color:split == "transfer" && "white"}} className="top-nav-pills">
            {" "}
            <LocalAtm />{" "}
          </span>
          <p className="top-nav-pills-title">Buz Me</p>
        </div>

        <div
          onClick={() => {
            history.push("/request");
          }}
          className="top-nav-pills-holder"
        >
          <span  style={{background:split == "request" && "#0a3d62",color:split == "request" && "white"}} className="top-nav-pills">
            {" "}
            <CardGiftcardOutlined />{" "}
          </span>
          <p className="top-nav-pills-title">Request Buz</p>
        </div>

        <div
         
          onClick={() => {
            history.push("/tour");
          }}
          
          className="top-nav-pills-holder"
        >
          <span style={{background:split == "tour" && "#0a3d62",color:split == "tour" && "white"}} className="top-nav-pills">
            {" "}
            <EmojiTransportationOutlined />{" "}
          </span>
          <p className="top-nav-pills-title">Tour</p>
        </div>

        

        {/* <div className="top-nav-pills-holder">
            <span  className="top-nav-pills" >  <ForumOutlined/> </span>
            <p className="top-nav-pills-title">Forum</p>
            </div> */}

        <div
          onClick={() => {
            history.push("/listmart");
          }}
          className="top-nav-pills-holder"
        >
          <span  style={{background:split == "listmart" && "#0a3d62",color:split == "listmart" && "white"}} className="top-nav-pills">
            {" "}
            <StorefrontOutlined />{" "}
          </span>
          <p className="top-nav-pills-title"> Aluta Mart</p>
        </div>

        <div
          onClick={() => {
            history.push("/create");
          }}
          className="top-nav-pills-holder"
        >
          <span  style={{background:split == "create" && "#0a3d62",color:split == "create" && "white"}} className="top-nav-pills">
            {" "}
            <AddBoxOutlined />{" "}
          </span>
          <p className="top-nav-pills-title"> Make post</p>
        </div>

        
      </div>
    </>
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
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Desktopright);
