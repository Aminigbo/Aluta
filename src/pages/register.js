import React, { useState } from "react";
import "../static/css/auth/register.css";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import loaderImg from "../static/logos/animation.gif";
import { loginSuc, add_wallet } from "../redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Helmet } from "react-helmet";
import logo from "../static/logos/logo2.png";
import {
  validatePhoneNumber,
  validateEmail,
  code,
  generateOTP,
} from "../functions/utils/index";
import { handleRegister } from "../functions/controllers/auth/register";

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
  top: "0px",
  left: "0px",
  width: "25%",
};

function Register({ appState, login_suc, walletAdd }) {
  let history = useHistory();

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    setStates({ ...compState, loader: true });
    setTimeout(() => setStates({ ...compState, loader: false }), 500);
  }, []);

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
      onClose: () => {
        history.push("");
      },
      transition: Bounce,
    });
  };

  // form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [compState, setStates] = useState("");

  // register user
  async function registerUser() {
    let formData = {
      email,
      phone,
      password,
      name,
    };
    setStates({ ...compState, loader: true})
    handleRegister(formData).then((res) => {
      if (res.success == true) {
        successToast("Registration successful");
        const data = {
          user: res.data[0],
          meta:res.data[1],
        };
        login_suc(data);
        walletAdd(2000);
        history.push("");
        // console.log(res.data)
        // setStates({ ...compState, loader: false})
        
      } else {
        setStates({ ...compState, loader: false})
        errorToast(res.message)
      }
    });
  }

  // reroute function
  let reroute = () => {
    setStates({ ...compState, loader: true });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ogapredictor</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div id="regformHolder">
        <img style={logoStyle} src={logo} />
        <div id="">
          <b> Register for free</b>
        </div>

        <ToastContainer autoClose={2000} />

        <form
          className="regform"
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
          noValidate
          autoComplete="off"
        >
          <br />
          <TextField
            id="input"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            required
            label="Your fullname"
            type="search"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            id="input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            label="Enter email"
            type="email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            id="input"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            required
            label="Enter phone number"
            type="text"
            variant="outlined"
          />
          <div>
            <small style={{ fontSize: "12px" }}>
              You will recieve an OTP to verify your number
            </small>{" "}
          </div>
          {/* <br /><br />
               <TextField id="input" onChange={(e)=>{ setDob(e.target.value)  }} value={dob} required label="" type="date" variant="outlined" /> */}
          <br />
          <TextField
            id="input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
            label="Provide password"
            type="password"
            variant="outlined"
          />{" "}
          <br />
          <br />
          {compState.loader != true ? (
            <Button
              type="submit"
              variant=" "
              id=" "
              style={{ background: "#2C3A47", color: "white" }}
            >
              {" "}
              Register{" "}
            </Button>
          ) : (
            <img src={loaderImg} />
          )}
          <div class="option">
            <span>Already have an account? </span>{" "}
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

const mapDispatchToProps = (dispatch) => {
  return {
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
