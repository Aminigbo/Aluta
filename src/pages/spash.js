import React, { useState } from "react";
import "../static/css/auth/login.css";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { loginSuc, add_wallet, disp_session, logOut, splash_screen } from "../redux";
import { supabase } from "../functions/configs/index";
import { ToastContainer, toast, Bounce } from "react-toastify";
import loaderImg from "../static/logos/animation.gif";
import One from "../static/images/splash/1.svg";
import Two from "../static/images/avater/ads1.jpg";
import Three from "../static/images/splash/3.svg";
import Four from "../static/images/splash/4.svg";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import md5 from "md5";


import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';



import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';




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



const steps = [
  {
    label: 'Get cash on few clicks',
    bottom: "Easy",
    image: One,
  },
  {
    label: 'Get cash by the corner',
    bottom: "Fast",
    image: Two
  },
  {
    label: 'Anytime Anywhere',
    bottom: "Convenient",
    image: Three
  },
  {
    label: 'Why go through stress for your cash?',
    bottom: "Get Started",
    image: Four
  },
];

function Login({ appState, login_suc, walletAdd, set_session, log_out, disph }) {
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

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    console.log("Nothing")
    if (activeStep === 3) {
      disph()
      history.push("/register")
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className=" " style={{ backgroundColor: "#f4f6f7", height: "100%", position: "fixed", top: "0px", left: "0px", width: "100%" }}>
      {/* {state.splsh === true && <> {history.push("/login")} </>} */}
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <div style={{
          position: "absolute", top: "6%", width: "100%", padding: "10px", left: "0px"
        }}> 

          <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}> 

            <div style={{ padding: "30px 0px", color: "#0a3d62", textAlign: "center", fontSize: "26px", fontWeight: "bold" }}>
              {steps[activeStep].label}
              <br /> <br />
            </div>
            <img style={{
              width: "100%",
            }} src={steps[activeStep].image} />
            <br /> <br /><br />



            <br />
          </Box>

        </div>
        <div style={{ textAlign: "center", position: "absolute", bottom: "10%", left: "0px", width: "100%" }}>
          <span
            onClick={handleNext}
            style={{
              backgroundColor: "#0a3d62", padding: "10px 50px",
              borderRadius: "5px",
              color: "white", fontWeight: "bold", fontSize: "23px"
            }}>
            {steps[activeStep].bottom}
            &nbsp;&nbsp; 
            <ArrowForwardIosOutlinedIcon />
            <ArrowForwardIosOutlinedIcon />
          </span>
        </div>
        {console.log(steps[activeStep])}

        <div style={{
          position: "absolute", bottom: "18%", width: "100%", left: "0px"
        }}>
         
          {console.log(activeStep)}
          {/* <MobileStepper
            variant="text" 
            position="static" 
            style={{ backgroundColor: "#f4f6f7" }}
            // style={{backgroundColor:"black"}}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
              // disabled={activeStep === maxSteps - 1}
              >

                {activeStep === 2 ? "Signup" : "Next"}
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              activeStep === 0 ? '':<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button> 
              
            }
          /> */}


        </div>
      </Box>

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
    disph: () => dispatch(splash_screen()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
