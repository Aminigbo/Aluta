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

const smile = {
  color: "white",
  fontSize: "20px",
};
function Desktopright({ appState, login_suc }) {
  let history = useHistory();
  const state = appState;

  const [pins, setPins] = useState({
    first: "",
    second: "",
  });

  const resetTPin = () => {
    if (pins.first.length != 4 || pins.second.length != 4) {
      alert("Invalid pin");
    } else if (pins.first !== pins.second) {
      alert("Pin doesn't match");
    } else if (pins.first == "0000" || pins.second == "0000") {
      alert("You can not use  the default pin");
    } else {
      setStates({
        ...compState,
        loader: true,
      });

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
      updateUserMeta(payload).then((res) => {
        if (res.success == true) {
          login_suc(data);
          setTimeout(() => history.push("/"), 2000);
          setStates({
            ...compState,
            done: true,
            loader: false,
          });
        } else {
          setStates({
            ...compState,
            done: false,
          });
        }
      }).catch(errer => {
        alert("A network error occured")
        setStates({
            ...compState, 
            loader: false,
          });
      })
    }
  };

  const [compState, setStates] = useState("");
  let pathname = window.location.pathname;
  let split = pathname.split("/")[1];
  let allow = ""
  if (split == "setschool" || split == "updateprofile") {
    allow = true
  } else {
    allow = false
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
          <span className="top-nav-pills">
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
          <span className="top-nav-pills">
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
          <span className="top-nav-pills">
            {" "}
            <EmojiTransportationOutlined />{" "}
          </span>
          <p className="top-nav-pills-title">Tour</p>
        </div>

        {compState.loader && (
          <div className="loader">
            {" "}
            <LinearProgress />
            {compState.done == true && (
              <div
                style={{
                  position: "relative",
                  top: "40%",
                  color: "white",
                  textAlign: "center",
                }}
              >
                You have successfully updated your school
              </div>
            )}
          </div>
        )}

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
          <span className="top-nav-pills">
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
          <span className="top-nav-pills">
            {" "}
            <AddBoxOutlined />{" "}
          </span>
          <p className="top-nav-pills-title"> CREATE</p>
        </div>

        {/* <div  style={{fontSize:"15px",marginTop:"-11px",color:"orange"}}><b>@RiversStateUniversity</b></div> */}
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
