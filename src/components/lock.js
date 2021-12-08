import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import { add_wallet, logOut, loginSuc,disp_session } from "../redux";
import {
  Backspace,
  InputOutlined,
  LockOpenOutlined,
  Lock,
} from "@material-ui/icons";
import { cashbackloader } from "./loading";
import { Drawer, Divider, alertTitleClasses } from "@mui/material";

function Home({ appState, login_suc, logout,set_session }) {
  const state = appState;
  const history = useHistory();
  const [pin, setPin] = useState("");

  const validate = () => {
    const data = {
      user: state.loggedInUser.user,
      meta: state.loggedInUser.meta,
     };
     set_session(new Date().getTime())
    return setTimeout(() => login_suc(data), 500);
  };

  const verify = () => {
    if (pin.length == 4) {
      if (pin == state.loggedInUser.user.meta.transactionPin) {
        setPin("validated");
        return validate();
      } else {
        console.log("Not correct");
        setPin("");
      }
    }
  };
  const append = (e) => {
    let newPin = pin + e;
    if (pin.length !== 4) {
      setPin(newPin);
    }
    if (pin.length > 2) {
      verify();
    }
  };

  const clear = (e) => {
    let pinLength = pin.length;
    let clearOne = pinLength - 1;
    setPin(pin.substring(0, clearOne));
  };

  const buttonValue = (e) => {
    if (e == "clear") {
      return <Backspace />;
    } else if (e == "out") {
      return <InputOutlined />;
    } else {
      return <>{e}</>;
    }
  };

  const pinVal = () => {
    if (pin.length == 1) {
      return (
        <>
          {" "}
          <b style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
        </>
      );
    } else if (pin.length == 2) {
      return (
        <>
          {" "}
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
        </>
      );
    } else if (pin.length == 3) {
      return (
        <>
          {" "}
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
        </>
      );
    } else if (pin.length == 4) {
      return (
        <>
          {" "}
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
        </>
      );
    } else {
      return (
        <>
          {" "}
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
        </>
      );
    }
  };

  React.useEffect(() => {}, []);

  const buttons = () => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "out", "0", "clear"];
    return numbers.map((e) => {
      return (
        <>
          {/* {console.log(state)} */}
            <button
               className="customInput"
               style={{
               width:"60px",
              padding: "10px 10px",
              fontWeight: "bold",
              border: "none",
            //   background: "white",
            //   color: "black",
              margin: "15px 20px",
              fontSize: "20px",
                  textAlign: "center",
              borderRadius:"5px"
            }}
            value={e}
            onClick={() => {
              if (e == "clear") {
                clear(e);
              } else if (e == "out") {
                setDrawerState({ ...drawerState, bottom: true });
              } else {
                append(e);
              }
            }}
          >
            {buttonValue(e)}
          </button>
        </>
      );
    });
  };

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return state.loggedIn === true ? (
    <div>
      {/* {state.loggedInUser == null ? <Redirect to="login" /> : <Redirect to="/" />} */}
       <Redirect to="/" />
    </div>
  ) : (
    <div id="body bg">
      <>
        {pin == "validated" && <> {cashbackloader()}</>}

        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "0px",
            left: "0px",
            // zIndex: "10000",
            background: " ",
          }}
        >
          <div
            style={{
              height: "",
              //  background: "black",
              padding: " ",
              textAlign: "center",
            }}
          >
            <div
              style={{
                padding: "15px",
                // background: "lightgray",
                color: "black",
                position: "absolute",
                top: "5%",
                width: "100%",
                textAlign: "center",
              }}
            >
              <b style={{ fontSize: "50px" }}>🔐</b>
            </div>
            <div
              style={{
                padding: "15px",
                // background: "lightgray",
                color: "white",
                position: "absolute",
                top: "27%",
                width: "100%",
                textAlign: "center",
              }}
            >
              {pinVal()}
              {verify()}
            </div>
            <div
              style={{ position: "absolute", bottom: "40px", width: "100%" }}
            >
              {buttons()}
            </div>
          </div>
        </div>

        <React.Fragment key="bottom">
          <Drawer
            anchor="bottom"
            open={drawerState["bottom"]}
            onClose={toggleDrawer("bottom", false, false)}
          >
            <div
              style={{
                height: " ",
                //  background: "black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <p style={{ fontWeight: "bold", margin: "10px" }}>
                {" "}
                Are you sure you want to signout from Buzz?
              </p>
              {/* setDrawerState({ ...drawerState, bottom: true }); */}
              <br />
              <input
                type="button"
                value="NO"
                style={{
                  padding: "5px",
                  outline: "none",
                  width: "80px",
                  border: "none",
                  background: "#0a3d62",
                  color: "white",
                  borderRadius: "6px",
                  margin: "10px 19px",
                }}
                onClick={toggleDrawer("bottom", false)}
              />
              <input
                type="button"
                value="YES"
                style={{
                  padding: "5px",
                  outline: "none",
                  width: "80px",
                  border: "none",
                  background: "crimson",
                  color: "white",
                  borderRadius: "6px",
                  margin: "10px 19px",
                }}
                onClick={() => {
                   logout("HARD");
                   history.push("/login")
                }}
              />
              <br />
              <br />
            </div>
          </Drawer>
        </React.Fragment>
      </>
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
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    logout: (type) => dispatch(logOut(type)),
     login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
    set_session: (time) => dispatch(disp_session(time)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);