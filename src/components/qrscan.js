import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import { cashbackCurrency } from "../components/currency";
import Header from "../components/includes/mobile_header.js";
import QrReader from "react-qr-reader";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import Create from "../components/cashbacknav";
import { cashbackloader } from "../components/loading";
import { btn_primary, btn_danger } from "../components/buttons";
import { text_input } from "../components/forms";
import { confirmPinLockScreen } from "./confirmPinLockScreen";
import { confirmCashbackCreation } from "../functions/workers_functions/cashback"; // CASHBACK CONTROLLER

import {
  handleChashbackGeneration,
  handleVerifyToken,
  settleCashbackToWallet,
} from "../functions/controllers/cashback"; // CASHBACK TOKEN CONTROLLER
import { errorComponent, successComponent } from "../components/error"; // error component for error handling
import { ImQrcode } from "react-icons/im";
import { MdClear } from "react-icons/md";
import { Drawer, Divider } from "@mui/material";
import { MdGridGoldenratio } from "react-icons/md";
import { cashbackchargecentage } from "../functions/utils/index";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";

function Home({ appState, login_suc }) {
  let history = useHistory();
  var QRCode = require("qrcode.react");
  const [auth, setAuth] = React.useState(false);

  const state = appState;
  const [value, setValue] = useState(null); //TOKEN TO BE VERIFIED
  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });
  const [drawerState2, setDrawerState2] = React.useState({
    bottom: false,
  });
  const [drawerState3, setDrawerState3] = React.useState({
    bottom: false,
  });
  const [tokenamount, setTokenamount] = useState(""); // amount to be generated
  const [initiateCreate, setInitiateCreate] = useState(false); // show the confirm or cancel popup when click initiate
  const [generatedcode, setGeneratedcode] = useState(null); // return true or false if code is generated
  const [generatedToken, setGeneratedToken] = useState(null); // set the returned generated token
  const [pin, setPin] = useState("");
  const [pinError, setpinError] = useState("");

  const toggleDrawer = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });

    setDrawerState2({ ...drawerState2, "bottom": false });
    setDrawerState3({ ...drawerState3, "bottom": false });
  };

  // @======== CREATE TOKEN INTERFACE
  const createCashback = () => {
    return (
      <>
        <div
          className=" "
          style={{
            marginTop: "5px",
            width: "100%",
            background: " ",
            marginLeft: "0%",
            borderRadius: "30px 30px 0px 0px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {generatedcode !== false && (
              <>
                <b>
                  TOKEN GENERATED{" "}
                  <b style={{ color: "#0a3d62", fontSize: "20px" }}>
                    {generatedToken}
                  </b>
                </b>
                <div>
                  <small>
                    QR code contains your cashback token. <br /> It is also
                    saved in your cashback history.
                  </small>
                </div>
              </>
            )}
          </div>
          <div
            style={{
              // height: "100px",
              marginBottom: "10px",
              // marginTop: "5px",
            }}
          >
            <div className=" ">
              <div
                style={{
                  // marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {generatedcode !== true && (
                  <>
                    <div
                      style={{
                        width: "50%",
                        // display: "inline-block",
                        float: " ",
                        marginLeft: "25%",
                        textAlign: "center",
                      }}
                    >
                      {text_input(
                        "Cashback amount ",
                        tokenamount,
                        "number",
                        setTokenamount
                      )}
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        textAlign: " ",
                        fontSize: "12px",
                      }}
                    >
                      {tokenamount.length > 0 && (
                        <>
                          {" "}
                          <b>
                            {" "}
                            NGN{" "}
                            {parseInt(tokenamount) +
                              cashbackchargecentage(tokenamount)}{" "}
                          </b>{" "}
                        </>
                      )}
                    </div>
                    <br />
                    <div style={{ float: "  ", textAlign: " " }}>
                      <span
                        onClick={() => {
                          handleGeneratecashback();
                        }}
                      >
                        {btn_primary("Continue", closeDrawer)}
                      </span>
                    </div>{" "}
                    <br />{" "}
                  </>
                )}
                {/* @======== SHOW THE CASH BACK CURRENCY WITH THE GENERATED CODE */}
                {generatedcode === true && (
                  <>
                    <div style={{ textAlign: "center", margin: "10px 2px" }}>
                      <QRCode value={generatedToken} />
                      <div style={{ marginTop: "5px" }}>
                        <b style={{ fontSize: "16px", color: "#0a3d62" }}>
                          {/* {generatedToken}{" "} */}
                          SCAN
                        </b>{" "}
                        <br /> <small>or accept pin</small> <br />
                        <b style={{ color: "#0a3d62", fontSize: "20px" }}>
                          {generatedToken}
                        </b>
                      </div>
                    </div>
                  </>
                )}

                {generatedcode !== true && (
                  <>
                    {" "}
                    <div style={{ marginTop: " ", textAlign: " " }}>
                      <i style={{ fontSize: "12px", color: "black" }}>
                        {" "}
                        {/* You agree to our Cashback terms of service and policies */}
                      </i>
                    </div>{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // @======== GET AMOUNT TO BE DEDUCTED
  const amountPlusCharge =
    parseInt(tokenamount) + cashbackchargecentage(tokenamount);
  let extraCharge = amountPlusCharge - tokenamount;
  let adminPercentage = (35 * extraCharge) / 100;

  let userTakes = amountPlusCharge - adminPercentage;
  let userWallet = "";
  if (state.loggedIn === true) {
    userWallet = state.loggedInUser.user.meta.wallet;
  }

  // @======== CLOSE CREATE CONFIRM POP
  const closecreatepop = () => {
    setInitiateCreate(false);
    setGeneratedcode(false);
    // setDrawerState({ ...drawerState, bottom: false });
  };

   // @======== USER ACCEPTS TO CREATE  THE CASHBACK

  const finallyGenerateCashbackCode = () => {
    let payload = {
      user: state.loggedInUser.user,
      amount: tokenamount,
      amountPlusCharge,
    };
    // console.log(pin);
    setInitiateCreate(false);
    handleChashbackGeneration(
      setInitiateCreate,
      setGeneratedcode,
      setGeneratedToken,
      payload,
      login_suc,
      state,
      compState,
      setStates,
      setPin
    );

    // setInitiateCreate(false);
    // setGeneratedcode(true);
  };

  const closeDrawer = () => {
    toggleDrawer("bottom", false);
  };
  // @======== INITATE THE  TOKEN GENERATION
  const handleGeneratecashback = () => {
    if (!tokenamount || tokenamount.length < 1 || tokenamount < 100) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "Please provide a valid amount greater than NGN 100.00",
      });
      window.navigator.vibrate([200]);
      setDrawerState2({ ...drawerState2, bottom: false });
    } else if (amountPlusCharge > userWallet) {
      console.log(amountPlusCharge);
      setStates({
        ...compState,
        error: true,
        errorMsg: "You have insufficient wallet balance",
      });
      window.navigator.vibrate([200]);
      setDrawerState2({ ...drawerState2, bottom: false });
    } else if (tokenamount > 10000) {
      setStates({
        ...compState,
        error: true,
        errorMsg:
          "Only verified vendors can generate cashback above NGN 10,000.00",
      });
      window.navigator.vibrate([200]);
      setDrawerState2({ ...drawerState2, bottom: false });
    } else {
      setDrawerState2({ ...drawerState2, bottom: false });
      setDrawerState3({ ...drawerState3, bottom: true });
      setAuth(true);
    }
  };

  // create token
  const toggleDrawer2 = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, "bottom": false });
    setDrawerState3({ ...drawerState3, "bottom": false });


    setDrawerState2({ ...drawerState2, [anchor]: open });

    setcashbackpinresolved(false);
    setGeneratedcode(false);
    setStates({
      ...compState,
      copy: false,
    });
  };

  const toggleDrawer3 = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState3({ ...drawerState3, [anchor]: open });

    setDrawerState({ ...drawerState, "bottom": false });
    setDrawerState2({ ...drawerState2, "bottom": false });

    setcashbackpinresolved(false);
    setGeneratedcode(false);
  };

  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
    miniLoad: false,
  });
  const [verifyPayload, setVerifypayload] = useState({
    data: null,
    success: null,
  });
  const [cashbackpinresolved, setcashbackpinresolved] = useState(false); // state to control resolving cashback
  const [resolved, setResolved] = useState(null); // return true if the cashback has been resolved to the

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setStates({
      ...compState,
      loading: false,
      resolved: false,
    });
  }, []);
  const cancelCashback = () => {
    setcashbackpinresolved(false);
    setValue(null);
    setStates({
      ...compState,
      resolved: false,
    });
  };

  const trigerVerify = (value) => {
    handleVerifyToken(
      value,
      compState,
      setStates,
      setVerifypayload,
      verifyPayload,
      setcashbackpinresolved
    );
    // setcashbackpinresolved(true);
  };

  const confirmCashback = () => {
    settleCashbackToWallet(
      verifyPayload,
      setcashbackpinresolved,
      setValue,
      state.loggedInUser,
      compState,
      setStates,
      login_suc,
      setResolved
    );
    setDrawerState({ ...drawerState, bottom: false });
  };

  const clearError = () => {
    setStates({
      ...compState,
      error: false,
      errorMsg: "",
    });
  };

  const handleScan = (data) => {
    if (data) {
      setStates({
        result: data,
        loading: true,
        resolved: true,
      });
      trigerVerify(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  // @======== close success pop
  const closeSuccessPop = () => {
    //   history.push("/");
    setDrawerState({ ...drawerState, bottom: false });
    setResolved(false);
    setcashbackpinresolved(true);
  };

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      {console.log(state)}

      {compState.loading === true && <> {cashbackloader()}</>}
      {compState.error === true && (
        <> {errorComponent(compState.errorMsg, clearError)} </>
      )}
      {resolved === true && (
        <>
          {" "}
          {successComponent(
            "The cashback has been resolved to your wallet successfully",
            closeSuccessPop
          )}{" "}
        </>
      )}
      <>
        <Box
          style={{
            background: " ",
            transform: "translateZ(0px)",
            flexGrow: 1,
            position: "fixed",
            bottom: "10px",
            right: "10px",
            padding: "10px 13px",
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            sx={{ background: " ", color: "white" }}
            icon={
              <SpeedDialIcon
                sx={{ background: " ", color: "white" }}
                openIcon={<MdClear style={{ fontSize: "25px" }} />}
              />
            }
          >
            <SpeedDialAction
              onClick={() => {
                setDrawerState({ ...drawerState, bottom: true });
              }}
              sx={{ background: "#385b74", color: "white" }}
              icon={<ImQrcode />}
              tooltipTitle="Scan"
            />
            <SpeedDialAction
              onClick={toggleDrawer2("bottom", true)}
              sx={{ background: "#385b74", color: "white" }}
              icon={<MdGridGoldenratio />}
              tooltipTitle="Create"
            />
            {/* <Create /> */}
          </SpeedDial>
        </Box>

        <React.Fragment key="bottom">
          <Drawer
            anchor="bottom"
            open={drawerState["bottom"]}
            onClose={toggleDrawer("bottom", false, false)}
          >
            {compState.loading === false && (
              <>
                {compState.resolved !== true && (
                  <>
                    {cashbackpinresolved !== true && (
                      <>
                        {" "}
                        <QrReader
                          style={{ width: "100%", height: "" }}
                          delay={300}
                          onError={handleError}
                          onScan={handleScan}
                          facingMode="environment"
                        />
                      </>
                    )}
                  </>
                )}

                {verifyPayload && (
                  <>
                    {/* {console.log(verifyPayload.data.isActive)} */}
                    {cashbackpinresolved === true && (
                      <>
                        {verifyPayload.success === true && (
                          <>
                            <div style={{ padding: "20px 5px" }}>
                              {" "}
                              {cashbackCurrency(
                                btn_primary,
                                btn_danger,
                                cancelCashback,
                                confirmCashback,
                                null,
                                setStates,
                                compState,
                                verifyPayload.data.meta.token,
                                verifyPayload.data.meta.name,
                                verifyPayload.data.meta.amount,
                                verifyPayload.data.isActive,
                                null
                              )}{" "}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Drawer>

          <Drawer
            anchor="bottom"
            open={drawerState2["bottom"]}
            onClose={toggleDrawer2("bottom", false, false)}
          >
              {createCashback("bottom")}
              
               {initiateCreate === true && (
              <>
                {" "}
                {confirmCashbackCreation(
                  tokenamount,
                  amountPlusCharge,
                  closecreatepop,
                  finallyGenerateCashbackCode,
                  btn_danger,
                  btn_primary,
                  compState,
                  setPin,
                  pin
                )}{" "}
              </>
            )}
          </Drawer>

          <Drawer
            anchor="bottom"
            open={drawerState3["bottom"]}
            onClose={toggleDrawer3("bottom", false, false)}
          >
            
            {/* {confirmPinLockScreen(drawerState,setDrawerState,setStates,compState,pin,setPin,pinError,setpinError,state)} */}
            {auth === true && (
              <>
                {" "}
                {confirmPinLockScreen(
                  drawerState3,
                  setDrawerState3,
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
                )}{" "}
              </>
            )}

           
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
