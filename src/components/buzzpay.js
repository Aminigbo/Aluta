import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import { add_wallet, logOut, loginSuc, disp_session } from "../redux";
import {
  Backspace,
  KeyboardBackspace,
  LockOpenOutlined,
  Lock,
  ArrowBackIosOutlined,
} from "@material-ui/icons";
import Naira from "react-naira";
import { cashbackloader } from "./loading";
import { Drawer, Divider, alertTitleClasses } from "@mui/material";

function Home({ appState, login_suc, logout, set_session }) {
  const state = appState;
  const history = useHistory();
  const [amount, setAmount] = useState(0);
   const [max, setMax] = useState("");
   const [pin, setPin] = useState("")
   const [compState, setStates] = useState("")
   const [pinError, setpinError] = useState("")
   const [proceedSend, setProceedSend] = useState("")
   let error = ''


  const validate = () => {
    const data = {
      user: state.loggedInUser.user,
      meta: state.loggedInUser.meta,
    };
    set_session(new Date().getTime());
    return setTimeout(() => login_suc(data), 500);
  };

  const append = (e) => {
    //  let newPin = pin + "" + e;
    //   setPin(newPin);

    let newPin = amount + "" + e;
    if (
      (newPin < 9999 && newPin < state.loggedInUser.user.meta.wallet) ||
      (newPin < 9999 && newPin == state.loggedInUser.user.meta.wallet)
    ) {
      setAmount(newPin);
    }
    if (newPin > 9999) {
      setMax("Maximum amount reached");
    } else if (newPin > state.loggedInUser.user.meta.wallet) {
      setMax("Insufficient wallet balance");
    } else {
      setMax("");
    }
  };

  const clear = (e) => {
    let pinLength = pin;
    let clearOne = pinLength - 1;
    setAmount(0);
    setMax("");
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
    return (
      <>
        {" "}
        <b style={{ opacity: "1", color: "#0a3d62", fontSize: "35px" }}>
          <Naira>{pin}</Naira>
        </b>
      </>
    );
  };

  React.useEffect(() => {
    set_session(new Date().getTime());
  }, []);

  const buttons = () => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "clear"];
    return numbers.map((e) => {
      return (
        <>
          {/* {console.log(state)} */}
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
                history.push("/");
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
          setAmount("");
         //  setDrawerState({ ...drawerState, bottom: false });
         //    setDrawerState2({ ...drawerState2, bottom: true }); 
          setProceedSend(true);
        } else {
          error = "Wrong pin";
          setpinError("Wrong pin");
          setAmount("");
        }
      }
    }
  };

  return (
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
          {/* KeyboardBackspace */}
          <div
            onClick={history.goBack}
            style={{
              position: "absolute",
              width: "100px",
              height: "50px",
              top: "15px",
              left: "30px",
              fontWeight: "bold",
              padding: "4px",
            }}
          >
            <ArrowBackIosOutlined style={{ fontSize: "30px" }} />
          </div>
          <div
            style={{
              position: "absolute",
              width: "100px",
              height: "50px",
              top: "15px",
              right: "20px",
              fontWeight: "bold",
              padding: "4px",
            }}
          >
            {parseInt(state.loggedInUser.user.meta.wallet) - parseInt(pin) >
            1 ? (
              <div
                style={{
                  border: "0.5px solid #0a3d62",
                  textAlign: "center",
                  borderRadius: "4px",
                  boxShadow: " 1px 1px 3px #0a3d62",
                }}
              >
                {" "}
                <Naira style={{ color: "crimson" }}>
                  {parseInt(state.loggedInUser.user.meta.wallet) -
                    parseInt(pin)}
                </Naira>
              </div>
            ) : (
              <div
                style={{
                  border: "0.5px solid crimson",
                  textAlign: "center",
                  borderRadius: "4px",
                  boxShadow: " 1px 1px 3px crimson",
                }}
              >
                <Naira>0</Naira>
              </div>
            )}
          </div>
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
                color: "white",
                position: "absolute",
                top: "15%",
                width: "100%",
                textAlign: "center",
              }}
            >
              {pinVal()}
              {/* {verify()} */}
              <div style={{ color: "crimson" }}>{max}</div>
            </div>
            <div style={{ position: "absolute", top: "30%", width: "100%" }}>
              {buttons()}
              <br /> <br />
              <div>
                <input
                  type="button"
                  value="REQUEST"
                  style={{
                    padding: "5px",
                    outline: "none",
                    width: "100px",
                    border: "none",
                    background: "#0a3d62",
                    color: "white",
                    borderRadius: "6px",
                    margin: "10px 19px",
                  }}
                />
                <input
                  type="button"
                  value="SEND"
                  style={{
                    padding: "5px",
                    outline: "none",
                    width: "100px",
                    //   background: "crimson",
                    border: "0.5px solid #0a3d62",
                    color: "#0a3d62",
                    borderRadius: "6px",
                    margin: "10px 19px",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    if (pin < 100) {
                      setMax("Minimum amount is NGN 100");
                    } else {
                      setDrawerState({ ...drawerState, bottom: true });
                      setMax("");
                    }
                  }}
                />
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
                  width: "",
                  marginLeft: "32.5%",
                  textAlign: "left",
                  background: " ",
                }}
              >
                <span>Beneficiary ID</span> <br />
                <input
                  placeholder="* * * * * * * * 7 6"
                  style={{
                    padding: "10px 0px", 
                   border:"none",
                    width: "50%",
                    textAlign: "left",
                    background: "",
                    outline: "none",
                  }}
                /> <br />
                 <input
                  type="button"
                  value="NEXT"
                  style={{
                    padding: "5px",
                    outline: "none",
                    width: "100px",
                      background: "#0a3d62",
                    border: "0.5px solid #0a3d62",
                    color: "white",
                    borderRadius: "6px",
                  //   margin: "10px 19px",
                    fontWeight: "bold",
                  }} />
              </div>
              <br />
            </div>

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
