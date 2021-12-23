import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import Naira from "react-naira";
import {
  AccountBalanceWallet,
  FiberPin,
  FileCopyOutlined,
  RemoveRedEye,
  LibraryAddCheckOutlined,
  VisibilityOffOutlined,
  Backspace,
  InputOutlined,
  Lock,
  LockOpenOutlined,
  KeyboardBackspace,
} from "@material-ui/icons";
import { cashbackloader } from "../components/loading";
import { Drawer, Divider, alertTitleClasses } from "@mui/material";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import { moveBuzzmeFunds } from "../functions/controllers/movebuzzmefunds";
import { errorComponent, successComponent } from "../components/error"; // error component for error handling
// @======== ALLL BUZZME CONTROLLER
import { getAllBuzz } from "../functions/controllers/allbuzzme";
// import { IconName } from "react-icons/fc";
import { MdOutlineArrowForwardIos } from "react-icons/md";

function Home({ appState, login_suc }) {
  const state = appState;
  let userId = "";
  if (state.loggedIn === true) {
    userId = state.loggedInUser.user.id;
  }

  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
    miniLoad: false,
    wallethidden: true,
    confirmpwderror: null,
    confirmpwderrormsg: "",
    error: null,
  });

  const [pwd, setPwd] = useState(""); // set password requird to view balance
  const [clickToViewPwd, setClickToViewPwd] = useState(false);
  const [resolvedVerifyPin, setResolvedPinVerification] = useState(false);

  const [movebuzzResolved, setmovebuzzResolved] = useState(false);

  // @========  FUNCTION TO VERIFY pin AND SHOW balance
  const moveBuzzBalance = () => {
    moveBuzzmeFunds(
      state.loggedInUser,
      compState,
      setStates,
      login_suc,
      setmovebuzzResolved
    ).then((res) => {
      // if (res === true) {
      //   setStates({
      //     ...compState,
      //     error: false,
      //     loader:false
      //   });
      // }
    });
  };

  let userWallet = "";
  if (state.loggedIn === true) {
    userWallet = state.loggedInUser.user.meta.wallet;
  }

  // ===   function to move Buzz me balance to wallet
  function moveBuzzmeBalance() {
    if (state.loggedInUser.user.meta.buzzmewallet < 1) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "You have insufficient Buzz Me balance",
      });
    } else {
      setStates({
        ...compState,
        loader: true,
      });
      moveBuzzBalance();
    }
  }

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

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setStates({
      ...compState,
      loading: false,
      wallethidden: true,
    });
  }, []);

  const clearError = () => {
    setStates({
      ...compState,
      error: false,
      errorMsg: "",
    });
  };

  const [pin, setPin] = useState("");
  let error = "";
  const [pinError, setpinError] = useState("");

  const verify = () => {
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
        // @==== if the action was to move buzzme balance to wallet
        if (resolvedVerifyPin === true) {
          moveBuzzmeFunds(
            state.loggedInUser,
            compState,
            setStates,
            login_suc,
            setmovebuzzResolved
          ).then((res) => {
            if (res === true) {
              setStates({
                ...compState,
                error: false,
              });
            }
          });
        }
      } else {
        error = "Wrong pin";
        setpinError("Wrong pin");
        setPin("");
        window.navigator.vibrate([200]);
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

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      <>
        {compState.error === true && (
          <> {errorComponent(compState.errorMsg, clearError)} </>
        )}

        {compState.loader === true && <>{cashbackloader()} </>}
        {}

        <div className="mobile">
          <div>
            <div>
              <div style={{ zIndex: "80000", background: " " }}>
                {/* @======== START OF RESOLVE BLOCK */}

                {/* @======== SHOW SIDE BUZZ ME WALLET */}

                <div
                  style={{
                    width: "90%",
                    height: "60px",
                    background: "white",
                    boxShadow: " 1px 1px 3px #888888",
                    // border: "2px solid #f3f3f3",
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginLeft: "5%",
                    position: "relative",
                  }}
                >
                  {/* <FiberPin style={{ margin: "5px", color: "#0a3d62" }} /> */}
                  <div
                    style={{
                      height: "100%",
                      background: " ",
                      textAlign: "center",
                      display: "inline-block",
                      padding: "4px 0px",
                      position: "absolute",
                      width: "45%",
                    }}
                  >
                    <span>Buzz me balance</span> <br />
                    <b>
                      {compState.wallethidden === false ? (
                        <>
                          <b style={{ fontSize: "15px", marginRight: "4px" }}>
                            <Naira>
                              {state.loggedInUser.user.meta.buzzmewallet}
                            </Naira>
                          </b>{" "}
                          <VisibilityOffOutlined
                            onClick={() => {
                              setStates({
                                ...compState,
                                wallethidden: true,
                              });
                            }}
                            style={{
                              fontSize: "17px",
                              color: "#0a3d62",
                              // float: "right",
                              marginLeft: "15px",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          {clickToViewPwd === false && (
                            <>
                              <b
                                style={{
                                  fontSize: "7px",
                                  marginRight: "4px",
                                  color: "gray",
                                }}
                              >
                                ⚫ ⚫ ⚫ ⚫
                              </b>
                              <RemoveRedEye
                                onClick={toggleDrawer("bottom", true)}
                                style={{
                                  fontSize: "17px",
                                  color: "#0a3d62",
                                  float: " ",
                                  marginLeft: "20px",
                                }}
                              />
                            </>
                          )}
                        </>
                      )}
                    </b>
                  </div>

                  <div
                    onClick={() => {
                      moveBuzzmeBalance();
                    }}
                    style={{
                      height: "100%",
                      // background: " #0a3d62",
                      textAlign: "center",
                      display: "inline-block",
                      padding: "18px 0px",
                      position: "absolute",
                      width: "45%",
                      right: "0px",
                      color: " #0a3d62",
                      // borderRadius: "30px 16px",
                      fontSize: "15px",
                      backgroundImage:
                        "linear-gradient(to right,lightgray, #385b74)",
                    }}
                  >
                    <button
                      style={{
                        background: "none",
                        border: "none",
                          outline: "none",
                        color:"#0a3d62"
                      }}
                    >
                      {" "}
                      <b>To wallet <MdOutlineArrowForwardIos style={{color:"#ffaa0f"}}/> <MdOutlineArrowForwardIos style={{color:"#ffaa0f"}}/> </b>
                    </button>
                  </div>
                </div>

                {/* account balance and beneficiary id */}
                <div
                  style={{
                    width: "90%",
                    background: "",
                    padding: "",
                    marginLeft: "5%",
                    marginTop: "25px",
                    borderRadius: "3px",
                    marginBottom: "25px",
                  }}
                >
                  <div
                    style={{
                      width: "49%",
                      height: "120px",
                      background: "white",
                      display: "inline-block",
                      boxShadow: " 1px 1px 3px #888888",
                      border: "2px solid #f3f3f3",
                      position: "relative",
                    }}
                  >
                    <AccountBalanceWallet
                      style={{ margin: "5px", color: "#ffaa0f" }}
                    />
                    <span>Wallet</span>

                    <div
                      style={{
                        height: "30px",
                        background: " ",
                        textAlign: "center",
                        // marginTop: "5px",
                        padding: "0px",
                      }}
                    >
                      {/* <b>{state.loggedInUser.user.meta.wallet}</b> */}

                      {compState.wallethidden === false ? (
                        <>
                          {" "}
                          <b style={{ fontSize: "15px", marginRight: "4px" }}>
                            <Naira>{state.loggedInUser.user.meta.wallet}</Naira>
                          </b>{" "}
                          <VisibilityOffOutlined
                            onClick={() => {
                              setStates({
                                ...compState,
                                wallethidden: true,
                              });
                            }}
                            style={{
                              fontSize: "17px",
                              color: "#0a3d62",
                              // float: "right",
                              marginLeft: "15px",
                            }}
                          />
                        </>
                      ) : (
                        <>
                          {clickToViewPwd === false && (
                            <>
                              <b
                                style={{
                                  fontSize: "7px",
                                  marginRight: "4px",
                                  color: "gray",
                                }}
                              >
                                ⚫ ⚫ ⚫ ⚫
                              </b>
                              <RemoveRedEye
                                onClick={toggleDrawer("bottom", true)}
                                style={{
                                  fontSize: "17px",
                                  color: "#0a3d62",
                                  float: " ",
                                  marginLeft: "20px",
                                }}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>

                    <div
                      onClick={() => {}}
                      style={{
                        // height: "40px",
                        // background: "#f3f3f3",
                        textAlign: "center",
                        marginTop: "5px",
                        padding: "3px 0px",
                        color: " #0a3d62",
                        position: "absolute",
                        bottom: "0px",
                        width: "100%",
                        left: "0px",
                      }}
                    >
                      <small style={{ opacity: "0.4" }}>Withdrawable</small>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "49%",
                      height: "120px",
                      background: "white",
                      display: "inline-block",
                      float: "right",
                      boxShadow: " 1px 1px 3px #888888",
                      border: "2px solid #f3f3f3",
                      position: "relative",
                    }}
                  >
                    <FiberPin style={{ margin: "5px", color: "#ffaa0f" }} />
                    &nbsp;<span>Buzz ID</span>
                    <div
                      onClick={() => {
                        setStates({
                          ...compState,
                          copy: true,
                        });
                        if (navigator && navigator.clipboard) {
                          navigator.clipboard.writeText(
                            state.loggedInUser.user.meta.beneficiaryId
                          );
                        }
                      }}
                      style={{
                        // height: "70px",
                        background: " ",
                        textAlign: "center",
                        marginTop: "5px",
                        padding: "4px 0px",
                      }}
                    >
                      <b> {state.loggedInUser.user.meta.beneficiaryId}</b>
                    </div>
                    <div
                      onClick={() => {
                        setStates({
                          ...compState,
                          copy: true,
                        });
                        if (navigator && navigator.clipboard) {
                          navigator.clipboard.writeText(
                            state.loggedInUser.user.meta.beneficiaryId
                          );
                        }
                      }}
                      style={{
                        // height: "40px",
                        // background: " #f3f3f3",
                        textAlign: "center",
                        marginTop: "5px",
                        padding: "3px 0px",
                        // borderRadius: "30px 16px",
                        color: "#0a3d62",
                        position: "absolute",
                        bottom: "0px",
                        width: "100%",
                        fontSize: "16px",
                        left: "0px",
                      }}
                    >
                      <small style={{ opacity: "0.4" }}>Transaction ID</small>
                      {/* &nbsp;&nbsp; */}
                      {/* {compState.copy == true ? (
                        <LibraryAddCheckOutlined
                          style={{
                            fontSize: "24px",
                            color: "mediumseagreen",
                          }}
                        />
                      ) : (
                        <FileCopyOutlined
                          style={{ fontSize: "24px", color: "orange" }}
                        />
                      )}{" "} */}
                    </div>
                  </div>
                </div>
              </div>
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

        <Desktopleft />
        <Desktopright />
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
    logout: () => dispatch(logOut()),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
