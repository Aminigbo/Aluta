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
import md5 from "md5";
// @=== import success response from worker function
import { alert } from "../functions/workers_functions/alert";
import { cashbackloader } from "../components/loading";

import { EuroSymbolOutlined } from "@material-ui/icons";

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
    // setStates({ ...compState, loader: true });
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
              const new_pwd = md5(password + email);
              console.log(new_pwd);
              return new_supabase.auth
                .signIn({
                  email,
                  password: new_pwd,
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
                      // user: response2.body[0].meta,
                      user: {
                        ...response2.body[0],
                        meta: response2.body[0].meta,
                      },
                      meta: signin_response.data,
                    };

                    if (response2.body[0].meta.isActive === false) {
                      login_suc(data);
                      history.push(`/otp/${response2.body[0].phone}`);
                    } else {
                      walletAdd(data.user.meta.wallet);
                      login_suc(data);
                      set_session(new Date().getTime());
                      history.push("/")
                    }
                  }
                });
            }
          })
          .catch((error) => {
            console.log(error);
            setStateAlert(false);
            setStates({
              ...compState,
              loader: false,
              alertMsg: "Sorry, we could not log you in due to network error.",
            });
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

  return state.loggedInUser !== null && state.loggedInUser.user.meta.isActive === true && state.loggedInUser.user.meta.transactionPin !== '0000' ? (
    <div>
      <Redirect to="/lockout" />
    </div>
  ) : (
    <div className="bg">
      {compState.loader === true && <>{cashbackloader()} </>}
      {stateAlert === true && alert(successPayload, setStateAlert)}
      {stateAlert === false && alert(errorPayload, setStateAlert)}
      {console.log(state)}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pay with buzz</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div id="formHolder" style={{paddingTop:"0px"}}>
        {/* <img style={logoStyle} src={logo} /> */}
        <div
          style={{
            marginLeft: "15px",
            fontSize: "35px",
            color: "#0a3d62",
            textAlign: "center",
            marginTop:"-20px"
          }}
        >
          <b>
            B
            <EuroSymbolOutlined
              style={{ transform: "rotateZ(-90deg)", fontSize: "35px" }}
            />
            zz
          </b> <br /><br />
        </div>
        <div style={{ fontSize: "20px", marginTop: "10px" }} id=" ">
          Login to your account
        </div> <br />

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
            style={{
              float: "right",
              marginTop: "7px",
              cursor: "pointer",
              marginRight: "15px",
              color: "#0a3d62",
            }}
          >
            <span style={{ color: "#0a3d62" }}>Forgot Password?</span>
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
            Login{" "}
          </button>
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
              <b style={{ color: "#0a3d62" }}>Register</b>
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
