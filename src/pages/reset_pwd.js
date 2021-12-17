import React, { useState } from "react";
import "../static/css/auth/login.css";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { loginSuc, add_wallet, disp_session } from "../redux";
import { supabase } from "../functions/configs/index";
import md5 from "md5";
import logo from "../static/logos/logo2.png";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import { EuroSymbolOutlined } from "@material-ui/icons";
import { cashbackloader } from "../components/loading";

import {
  KeyboardBackspace,
  Backspace,
  InputOutlined,
  Lock,
  LockOpenOutlined,
} from "@material-ui/icons";

import { Drawer, Divider, alertTitleClasses } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: theme.spacing(2),
    },
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Login({ appState, login_suc, walletAdd, set_session }) {
  // initialize supabase
  const new_supabase = supabase();

  let history = useHistory();

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    // setStates({ ...compState, loader: true})
    // setTimeout(() => setStates({ ...compState, loader: false}), 500);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = appState;
  const [compState, setStates] = useState("");

  // reroute function
  let reroute = () => {
    setStates({ ...compState, loader: true });
  };

  let login = () => {
    setStates({ ...compState, loader: true, error: false, success: false });
    if (!email) {
      setStates({
        ...compState,
        loader: false,
        error: true,
        errorMsg: "Enter your phone number",
      });
    } else {
      return new_supabase
        .from("users")
        .select("*")
        .eq("phone", email)
        .then((res) => {
          console.log(res);
          if (res.body.length < 1) {
            setStates({
              ...compState,
              loader: false,
              error: true,
              errorMsg: "User not found",
            });
          } else {
            setStates({
              ...compState,
              loader: false,
              data: res.body[0],
            });
            // setDrawerState({ ...drawerState, bottom: true });
            history.push(`/otp/${res.body[0].phone}`)
          }
        })
        .catch((error) => {
          setStates({
            ...compState,
            loader: false,
            error: true,
            errorMsg: "A network error occured",
          });
        });
    }
  };

  const [pin, setPin] = useState("");
  let error = "";
  const [pinError, setpinError] = useState("");

  const verify = (pin) => {
    // if (pin.length == 4) {
    if (pin == "0019") {
      console.log(compState)
         setStates({ ...compState, loader: true});
        const new_pwd = md5(compState.data.meta.rawPwd + compState.data.email); 
        return new_supabase.auth
          .signIn({
            email: compState.data.email,
            password: new_pwd,
          })
          .then((signin_response) => {
            if (
              signin_response.data === null ||
              signin_response.data.length < 1
            ) {
              console.log(signin_response)
            } else {
              const data = {
                // user: response2.body[0].meta,
                user: compState.data,
                meta: signin_response.data,
              };
              login_suc(data);
              history.push("/"); 
            }
          });

        // setDrawerState({ ...drawerState, bottom: false });
      } else {
        error = "Wrong pin";
        setpinError("Incorrect OTP");
        setPin("");
        window.navigator.vibrate([200]);
        // alert(pin)
      }
    // }
  };
  const append = (e) => {
    let newPin = pin + e;
    if (pin.length !== 4) {
      setPin(newPin);
    }
    if (newPin.length == 4) {
      verify(newPin);
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
              margin: "15px 17px",
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

    // setDrawerState({ ...drawerState, [anchor]: open });
  };

  return state.loggedIn === true ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : (
    <div className="bg">
      {compState.loader === true && <>{cashbackloader()} </>}
      {console.log(state)}
      {console.log(compState)}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Aluta Meter</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div id="formHolder">
        {/* <div
          style={{
            marginLeft: "15px",
            fontSize: "35px",
            color: "#0a3d62",
            textAlign: "left",
          }}
        >
          <b>
            B
            <EuroSymbolOutlined
              style={{ transform: "rotateZ(-90deg)", fontSize: "35px" }}
            />
            zz
          </b>
        </div>
        <br />
        <br /> */}
        <div id=" ">Reset your assword</div>

        <form className="form" noValidate autoComplete="off">
          <br />
          <br />
          <TextField
          autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
              setStates({
                ...compState,
                error: false,
              });
            }}
            value={email}
            required
            id="input"
            label="Enter your phone number"
            type="number"
            variant="standard"
            style={{ textAlign: "center" }}
          />
          <div style={{ marginTop: "10px" }}>
            {" "}
            {compState.error === true && (
              <>
                <span style={{ color: "crimson" }}>{compState.errorMsg}</span>
              </>
            )}
          </div>
          <br />
          <br />

          <button
            type="button"
            style={{
              background: "#0a3d62",
              color: "white",
              border: "none",
              outline: "none",
              padding: "7px 50px",
              margin: "10px",
              borderRadius: "6px",
            }}
            onClick={(e) => {
              login();
            }}
          >
            {" "}
            Continue{" "}
          </button>
        </form>

        <br />
        <div class=" ">
          <span>OR </span> <br /> <br />{" "}
          <Link
            onClick={(e) => {
              reroute();
            }}
            className="action"
            to="/login"
          >
            {" "}
            <b className="action">Login</b>
          </Link>
          <br />
          <br />
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
                // background: "lightgray",
                color: "black",
                position: " ",
                top: "5%",
                width: "100%",
                textAlign: "center",
              }}
            >
              <b style={{ fontSize: " " }}>
                Enter the OTP sent to <br /> ********* {email.substring(8, 11)}{" "}
              </b>
            </div>
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
              {/* {verify()} */}
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
               <div
              style={{
                padding: "3px 15px",
                // background: "lightgray",
                color: "black",
                position: " ", 
                width: "100%",
                textAlign: "center",
              }}
            >
             <span> {compState.error === true && <> {compState.errorMsg} </>} </span>
            </div>
            {buttons()}
          </div>
        </Drawer>
      </React.Fragment>
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
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    set_session: (time) => dispatch(disp_session(time)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
