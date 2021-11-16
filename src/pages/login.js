import React, { useState } from "react";
import "../static/css/auth/login.css";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { loginSuc, add_wallet, disp_session, logOut } from "../redux";
import { supabase } from "../functions/configs/index";
import { ToastContainer, toast, Bounce } from "react-toastify";
import loaderImg from "../static/logos/animation.gif";
import logo from "../static/logos/aluta.png";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";

// @=== import success response from worker function
import { alert } from "../functions/workers_functions/alert";

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
const logoStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  width: "25%",
};

function Login({ appState, login_suc, walletAdd, set_session, log_out }) {
  // initialize supabase
  const new_supabase = supabase();
  let history = useHistory();

  const errorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      // onClose: () => { console.log("Redirect") },
      transition: Bounce,
    });
  };

  const successToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      // onClose: () => { console.log("Redirect") },
      transition: Bounce,
    });
  };

  console.log(-0.0 < -305);

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    setStates({ ...compState, loader: true });
    setTimeout(() => setStates({ ...compState, loader: false }), 500);
    //  log_out()
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = appState;
  const [compState, setStates] = useState("");
  const [stateAlert, setStateAlert] = useState("");

  // reroute function
  let reroute = () => {
    setStates({ ...compState, loader: true });
  };

  const classes = useStyles();

  let login = () => {
    setStates({ ...compState, loader: true, error: false, success: false });
    if (!email || !password) { 
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Please you have to fill out all forms",
      });
    } else {
      return (
        new_supabase
          .from("users")
          // .select(`*, transactions (*), predictions (*), challenge (*)`)
          .select("*")

          .eq("email", email)
          .then((response2) => {
            if (response2.body.length < 1) {
              setStateAlert(false);
              setStates({
                ...compState,
                loader: false,
                alertMsg: "Invalid credentials",
              });
            } else {
              return new_supabase.auth
                .signIn({
                  email,
                  password,
                })
                .then((signin_response) => {
                  if (
                    signin_response.data === null ||
                    signin_response.data.length < 1
                  ) {
                    setStateAlert(false);
              setStates({
                ...compState,
                loader: false,
                alertMsg: "Invalid credentials",
              });
                  } else {
                    const data = {
                      user: response2.body[0],
                      meta: signin_response.data,
                    };
                    walletAdd(data.user.wallet);
                    login_suc(data); 
              
                  }
                });
            }
          })
          .catch((error) => {
            errorToast("A network error occured");
            setStates({ ...compState, loader: false });
          })
      );
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

  return state.loggedIn == true ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : (
    <div className="bg">
      {stateAlert === true && alert(successPayload, setStateAlert)}
      {stateAlert === false && alert(errorPayload, setStateAlert)}
      {console.log(state)}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Aluta-Mata</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div id="formHolder">
        <img style={logoStyle} src={logo} />
        <div style={{fontSize:"20px",marginTop:"20px"}} id=" ">Login</div>
        <ToastContainer autoClose={2000} />

        <form className="form" noValidate autoComplete="off">
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            id="input"
            label="Enter email address"
            type="email"
            variant="standard"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
            id="input"
            label="Enter password"
            type="password"
            variant="standard"
          />{" "}
          <br />
          <div
            onClick={() => {
              history.push("/reset");
            }}
            style={{ float: "right", marginTop: "7px", cursor: "pointer",marginRight:"15px",color:"#0a3d62"}}
          >
            <span style={{color:"#0a3d62"}}>Forgot Password?</span>
          </div>
          <br />
          <br />
          {compState.loader != true ? (
              <Button
                style={{background:"#0a3d62", color:"white"}}
              onClick={(e) => {
                login();
              }}
              variant="outlined" 
              id="primary-btn"
            >
              {" "}
              Login{" "}
            </Button>
          ) : (
            <img src={loaderImg} />
          )}
          <div class="option">
            <br />
            <span>Don't have an account? </span>{" "}
            <Link
              onClick={(e) => {
                reroute();
              }}
              className="action"
              to="/register"
            >
              {" "}
              <b style={{color:"#0a3d62"}}>Register</b>
            </Link>
          </div>
        </form>
      </div>
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
    log_out: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
