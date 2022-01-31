import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "../static/css/home/index.css";

import {
  Backspace,
  Lock,
  LockOpenOutlined,
  KeyboardBackspace,
} from "@material-ui/icons";

import { Drawer, Divider, alertTitleClasses } from "@mui/material";
import { errorComponent, successComponent } from "../components/error"; // error component for error handling
export function confirmPinLockScreen(
  drawerState,
  setDrawerState,
  setStates,
  compState,
  pin,
  setPin,
  pinError,
  setpinError,
  state,
  setInitiateCreate,
    drawerState2,
  setDrawerState2,
    setAuth
) {
  let error = "";

  //   const [drawerState, setDrawerState] = React.useState({
  //     bottom: false,
  //   });
//   console.log(pin);

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

  const clearError = () => {
    setStates({
      ...compState,
      error: false,
      errorMsg: "",
    });
  };

  const verify = () => {
    if (pin) {
      if (pin.length == 4) {
        if (pin == state.loggedInUser.user.meta.transactionPin) {
          setStates({
            ...compState,
            wallethidden: false,
            confirmpwderror: false,
            confirmpwderrormsg: "",
          });
          setPin("");
          setDrawerState({ ...drawerState, bottom: false });
            setDrawerState2({ ...drawerState2, bottom: true });
          console.log("hello");
          setInitiateCreate(true);
          if(setAuth){
            setAuth(false)
          }
        } else {
          error = "Wrong pin";
          setpinError("Wrong pin");
          setPin("");
        }
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
    setpinError();
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
      return <KeyboardBackspace />;
    } else {
      return <>{e}</>;
    }
  };

  const pinVal = () => {
    if (pin) {
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
    }
  };

  const buttons = () => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "out", 0, "clear"];
    return numbers.map((e) => {
      return (
        <>
          <button
            className="customInput"
            style={{
              width: "60px",
              padding: "10px 10px",
              fontWeight: "bold",
              border: "none",
              //   background: "white",
              //   color: "black",
              margin: "15px 20px",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "5px",
            }}
            value={e}
            onClick={() => {
              if (e == "clear") {
                clear(e);
              } else if (e == "out") {
                setDrawerState({ ...drawerState, bottom: false });
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

  return (
    <div id="body bg">
      <>
        {compState.error === true && (
          <> {errorComponent(compState.errorMsg, clearError)} </>
        )}

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
                    <span>Authenticate </span>
              <div
                style={{
                  padding: "15px",
                  // background: "black",
                  color: "white",
                  //  marginBottom:"5px"
                }}
              >
                {pinVal()}
                {/* {pin} */}
                {verify()}
                <br />
                <div
                  style={{
                    color: "crimson",
                    height: "30px",
                    background: " ",
                    padding: "15px",
                  }}
                >
                  {pinError}
                </div>
              </div>
              {buttons()}
            </div>
          </Drawer>
        </React.Fragment>
      </>
    </div>
  );
}
