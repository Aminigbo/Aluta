import React, { useState } from "react";
import "../static/css/auth/register.css";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Link, useHistory, Redirect } from "react-router-dom";
import loaderImg from "../static/logos/animation.gif";
import { loginSuc, add_wallet } from "../redux";
import { Helmet } from "react-helmet";
import logo from "../static/logos/aluta.png";
import { EuroSymbolOutlined } from "@material-ui/icons";
import { send_otp } from "../functions/workers_functions/notifications";
import {
  validatePhoneNumber,
  validateEmail,
  code,
  generateOTP,
  beneficaryID,
} from "../functions/utils/index";
import { handleRegister } from "../functions/controllers/auth/register";

// @=== import success response from worker function
import { alert } from "../functions/workers_functions/alert";
import { cashbackloader } from "../components/loading";
const logoStyle = {
  position: "absolute",
  top: "20px",
  left: "10px",
  width: "25%",
};

function Register({ appState, login_suc, walletAdd }) {
  let history = useHistory();
  const state = appState;

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    // setStates({ ...compState, loader: true });
    setTimeout(() => setStates({ ...compState, loader: false }), 500);
  }, []);

  // form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [compState, setStates] = useState("");
  const [stateAlert, setStateAlert] = useState("");
  const [ref, setRef] = useState("")

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

  // register user
  async function registerUser() {
    // generate otp
    const generateOTP = (min, max) => {
      let randomNum = Math.random() * (max - min) + min;
      return Math.floor(randomNum);
    };
    const otp = generateOTP(10000, 99999);
    let formData = {
      email,
      phone,
      password,
      name,
      otp,
      referedBy:ref
    };
    if (
      !name ||
      name.length < 5 ||
      email.length < 5 ||
      phone.length < 10 ||
      password.length < 5
    ) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Please you have to fill out all forms",
      });
    } else if (validateEmail(email) === false) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Please provide a valid email address",
      });
    } else if (validatePhoneNumber(phone) === false) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Please provide a valid phone number",
      });
    } else {
      setStates({ ...compState, loader: true });
      handleRegister(formData)
        .then((res) => {
          if (res.success == true) {
            const data = {
              user: res.data[0],
              meta: res.data[1],
            };
            login_suc(data);
            walletAdd(2000);
            setStateAlert(true);
            console.log(res);
            setStates({
              ...compState,
              loader: false,
              resPhone: res.data[0].phone,
              alertMsg:
                "You have successfully created an account. OK to complete the process.",
            });
            
          } else {
            setStateAlert(false);
            setStates({
              ...compState,
              loader: false,
              alertMsg: "User already exists",
            });
          }
        })
        .catch((error) => {
          setStateAlert(false);
          setStates({
            ...compState,
            loader: false,
            alertMsg: "Sorry, a network error occured",
          });
        });
    }
  }

  // reroute function
  let reroute = () => {
    setStates({ ...compState, loader: true });
  };

  // redirect after registration
  const redir = () => {
    history.push(`/otp/${compState.resPhone}`);
  };

  return (
    <div>
      {compState.loader === true && <>{cashbackloader()} </>}
      {/* {stateAlert === null && <small>{history.push("/")}</small>} */}
      {stateAlert === true && alert(successPayload, setStateAlert, redir)}
      {stateAlert === false && alert(errorPayload, setStateAlert)}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Buzz</title>
        <link rel="icon" href={logo} />
      </Helmet>

      <div id="regformHolder" >
        {/* <img style={logoStyle} src={logo} /> */}
        {/* <div
          style={{
            marginLeft: "15px",
            fontSize: "35px",
            color: "#0a3d62",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          <b>
            B
            <EuroSymbolOutlined
              style={{ transform: "rotateZ(-90deg)", fontSize: "35px" }}
            />
            zz
          </b>
        </div> <br /> */}
        <div id="" style={{ marginTop: "" }}>
          <b> Create a free account</b>
        </div> 

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
            autoFocus
            id="input"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            required
            label="Your fullname"
            type="search"
            variant="standard"
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
            variant="standard"
          />
          <div style={{textAlign:"left",paddingLeft:"35px"}}><small style={{fontSize:"11px",color:"#0a3d62"}}>OTP will be sent</small></div> 
          <br />
          <TextField
            type="number"
            id="input"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            required
            label="Enter phone number"
            type="text"
            variant="standard"
          />
           <div style={{textAlign:"left",paddingLeft:"35px"}}><small style={{fontSize:"11px",color:"#0a3d62"}}>OTP will be sent</small></div> 

          {/* <div>
            <small style={{ fontSize: "12px" }}>
              You will recieve an OTP to verify your number
            </small>{" "}
          </div> */}
          {/* <br /><br />
               <TextField id="input" onChange={(e)=>{ setDob(e.target.value)  }} value={dob} required label="" type="date" variant="outlined" /> */}
          {/* <br />
          <br /> */}
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
            variant="standard"
          />{" "}
          <br />
          <br />

          <TextField
            id="input"
            onChange={(e) => {
              setRef(e.target.value);
            }}
            value={ref} 
            label="Referrer  (Optional)"
            type="text"
            variant="standard"
          />{" "}
          <br />
          <br />
          
          <button
            type="submit"
            style={{
              background: "#0a3d62",
              color: "white",
              border: "none",
              outline: "none",
              padding: "7px 20px",
              margin: "10px",
              borderRadius: "6px",
            }}
          >
            {" "}
            Create account{" "}
          </button>
          {"  "}
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
              <b style={{ color: "#0a3d62" }}>Login</b>
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
