import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";
import {
  LinearProgress,
  AssignmentReturnedOutlined,
  HistoryOutlined,
} from "@material-ui/icons";

import {
  Person,
  LocalAtm,
  AccountBalanceWallet,
  AddBoxOutlined,
  FiberPin,
  CardGiftcardOutlined,
  FileCopyOutlined,
  HomeOutlined,
  StorefrontOutlined,
  ViewAgenda,
  LibraryAddCheckOutlined,
} from "@material-ui/icons";

import { confirmCashbackCreation } from "../functions/workers_functions/cashback";
import { Drawer, Divider } from "@mui/material";

import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import { updateUserMeta } from "../functions/models/index";
import { btn_primary, btn_danger } from "../components/buttons";
import { text_input } from "../components/forms";
import Toppills from "../components/includes/topdesktoppills";
import { cashbackCurrency } from "../components/currency";
import { cashbackchargecentage } from "../functions/utils/index";
import { cashbackloader } from "../components/loading";
import { errorComponent,successComponent } from "../components/error"; // error component for error handling
import {
  handleChashbackGeneration,
  handleVerifyToken,
  settleCashbackToWallet
} from "../functions/controllers/cashback"; // CASHBACK TOKEN CONTROLLER

function Home({ appState, login_suc }) {
  let history = useHistory();
  const state = appState;

  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
    miniLoad: false,
  });
  const [value, setValue] = useState(null); //TOKEN TO BE VERIFIED
  const [verifyPayload, setVerifypayload] = useState({
    data: null,
    success: null,
  });

  const [tokenamount, setTokenamount] = useState(""); // amount to be generated
  const [cashbackpinresolved, setcashbackpinresolved] = useState(false); // state to control resolving cashback
  const [initiateCreate, setInitiateCreate] = useState(false); // show the confirm or cancel popup when click initiate
  const [generatedcode, setGeneratedcode] = useState(null); // return true or false if code is generated
  const [generatedToken, setGeneratedToken] = useState(null); // set the returned generated token
  const [pin, setPin] = useState("");
  const [resolved, setResolved] = useState(null)  // return true if the cashback has been resolved to the wallet


  let userWallet = "";
  if (state.loggedIn === true) {
    userWallet = state.loggedInUser.user.meta.wallet;
  }

  // @======== GET AMOUNT TO BE DEDUCTED
  const amountPlusCharge =
    parseInt(tokenamount) + cashbackchargecentage(tokenamount);
  let extraCharge = amountPlusCharge - tokenamount;
  let adminPercentage = (35 * extraCharge) / 100;

  let userTakes = amountPlusCharge - adminPercentage;

  const trigerVerify = () => {
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

  const cancelCashback = () => {
    setcashbackpinresolved(false);
    setValue(null);
  };

  const confirmCashback = () => { 
    settleCashbackToWallet(verifyPayload,setcashbackpinresolved,setValue,state.loggedInUser,compState,setStates,login_suc,setResolved)
  };

  // @======== close success pop
  const closeSuccessPop = () => {
    setResolved(false)
  }

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
  }, []);

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
    setcashbackpinresolved(false);
    setGeneratedcode(false);
    setStates({
      ...compState,
      copy: false,
    });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setStates({
      ...compState,
      loading: false,
    });
  }, []);

  const clearError = () => {
    setStates({
      ...compState,
      error: false,
      errorMsg: "",
    });
  };

  // @======== INITATE THE  TOKEN GENERATION 
  const handleGeneratecashback = () => {
    if (!tokenamount || tokenamount.length < 1 || tokenamount < 100) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "Please provide a valid amount greater than 100 BUZ",
      });
    } else if (amountPlusCharge > userWallet) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "You have insufficient wallet balance",
      });
    } else if (pin !== state.loggedInUser.user.meta.transactionPin) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "You Provided a wrong transaction pin",
      });
    } else {
      setInitiateCreate(true);
    }
  };

  // @======== CLOSE CREATE CONFIRM POP
  const closecreatepop = () => {
    setInitiateCreate(false);
    setGeneratedcode(false);
  };

  // @======== USER ACCEPTS TO CREATE  THE CASHBACK
  const finallyGenerateCashbackCode = () => {
    let payload = {
      user: state.loggedInUser.user,
      amount: tokenamount,
      amountPlusCharge,
    };
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

  // @======== CREATE TOKEN INTERFACE
  const createCashback = () => {
    return (
      <>
        <div
          className=" "
          style={{
            marginTop: "25px",
            width: "90%",
            background: " ",
            marginLeft: "5%",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {generatedcode !== true ? (
              <b>Generate a cashback token </b>
            ) : (
              <>
                <b>TOKEN GENERATED</b>
                <div>
                  <small>
                    Copy the Cashback token generated for you. It is also saved
                    in your cashback history.
                  </small>
                </div>
              </>
            )}
          </div>
          <div
            style={{
              // height: "100px",
              marginBottom: "30px",
              marginTop: "20px",
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
                        display: "inline-block",
                        float: "left",
                      }}
                    >
                      {text_input(
                        "Amount to generate ",
                        tokenamount,
                        "number",
                        setTokenamount
                      )}
                    </div>
                    <div
                      style={{
                        width: "25%",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {text_input("Your pin", pin, "password", setPin)}
                    </div>
                    <div style={{ marginTop: "10px", textAlign: "left" }}>
                      {tokenamount.length > 0 && (
                        <>
                          {" "}
                          <b>
                            ={" "}
                            {parseInt(tokenamount) +
                              cashbackchargecentage(tokenamount)}{" "}
                            BUZ
                          </b>{" "}
                        </>
                      )}
                    </div>
                    <br />
                    <div style={{ float: "left ", textAlign: "left" }}>
                      <span
                        onClick={() => {
                          handleGeneratecashback();
                        }}
                      >
                        {btn_primary("Generate")}
                      </span>
                    </div>{" "}
                    <br />{" "}
                  </>
                )}
                {/* @======== SHOW THE CASH BACK CURRENCY WITH THE GENERATED CODE */}
                {generatedcode === true && (
                  <>
                    {" "}
                    <div style={{ marginBottom: "20%", marginTop: "30px" }}>
                      {cashbackCurrency(
                        btn_primary,
                        "",
                        "",
                        "",
                        "copy",
                        setStates,
                        compState,
                        generatedToken,
                        state.loggedInUser.user.fullname,
                        userTakes,
                        toggleDrawer
                      )}
                    </div>{" "}
                  </>
                )}

                {generatedcode !== true && (
                  <>
                    {" "}
                    <div style={{ marginTop: "20px", textAlign: "left" }}>
                      <i style={{ fontSize: "12px", color: "orange" }}>
                        {" "}
                        Using this service, you agree to our Cashback terms of
                        service and policies
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

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
      <div id="body bg">
        {state.loggedInUser.user.meta.school !== null && <> {history.push("/nonstudentfeed")} </>}
      {console.log(state)}
      {console.log(verifyPayload)}
      {/* IF TOKEN VERIFICATION TURNS ERROR */}
        {verifyPayload.success === false && <> </>}
        
        {/* if the user successfully resolved the cashback */}
        {resolved === true && <> {successComponent("The cashback has been resolved to your wallet successfully", closeSuccessPop)}  </>}

      {compState.loading === true && <> {cashbackloader()}</>}
      {compState.error === true && (
        <> {errorComponent(compState.errorMsg, clearError)} </>
      )}
      <>
        {initiateCreate === true && (
          <>
            {" "}
            {confirmCashbackCreation(
              tokenamount,
              closecreatepop,
              finallyGenerateCashbackCode,
              btn_danger,
              btn_primary,
              compState
            )}{" "}
          </>
        )}
        <div className="mobile">
          <div className="header_footer">
            {/* <Footer /> */}
            <Header />
          </div>

          <div>
            <div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  background: " #f4f6f7",
                  position: "sticky",
                  top: "0px",
                  zIndex: "1000",
                  padding: "0px",
                }}
              >
                {" "}
                <Toppills />
                <div
                  style={{
                    marginTop: "5px",
                    textAlign: "center",
                    width: "90%",
                    marginLeft: "5%",
                  }}
                >
                  <span
                    onClick={toggleDrawer("bottom", true)}
                    // to="/cashback-create"
                    style={{
                      marginLeft: " ",
                      fontSize: "15px",
                      color: "#0a3d62",
                      textDecoration: "none",
                    }}
                  >
                    <ViewAgenda style={{ marginLeft: "-4px" }} />
                    &nbsp;<b>Generate</b>
                  </span>
                  &nbsp;&nbsp;
                  <Link
                    to="history"
                    style={{
                      marginLeft: "10px",
                      fontSize: "15px",
                      color: "#0a3d62",
                      textDecoration: "none",
                    }}
                  >
                    <HistoryOutlined style={{ marginLeft: "-4px" }} />
                    &nbsp;<b>History</b>
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    to="updateprofile"
                    style={{
                      marginLeft: "10px",
                      fontSize: "15px",
                      color: "#0a3d62",
                      textDecoration: "none",
                    }}
                  >
                    <Person style={{ marginLeft: "-4px" }} />
                    &nbsp;<b>Profile</b>
                  </Link>
                  <br />
                </div>
              </div>{" "}
              <div style={{ zIndex: "80000", background: " " }}>
                {/* @======== START OF RESOLVE BLOCK */}
                <div
                  style={{
                    width: "90%",
                    background: "white",
                    padding: "40px 20px",
                    marginLeft: "5%",
                    marginTop: "20px",
                    borderRadius: "40px 40px 2px 3px",
                    boxShadow: " 1px 1px 3px #888888",
                    border: "0.5px solid #f3f3f3",
                  }}
                >
                  <div
                    className=" "
                    style={{
                      marginTop: "15px",
                      width: "90%",
                      background: " ",
                      marginLeft: "5%",
                    }}
                  >
                    <div className=" ">
                      <div className=" ">
                        {cashbackpinresolved !== true ? (
                          <>
                            <div
                              style={{
                                marginTop: "-30px",
                                textAlign: "center",
                              }}
                            >
                              {text_input(
                                "Enter pin to cashback",
                                value,
                                "text",
                                setValue
                              )}
                              <br />
                              <div
                                style={{ marginTop: "15px", textAlign: "left" }}
                              >
                                {btn_primary("continue", trigerVerify)}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div
                            style={{
                              textAlign: "center",
                              marginTop: "-40px",
                              marginBottom: "-20px",
                            }}
                          >
                            Valid token
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* @======== SHOW THE CASH BACK CURRENCY WITH THE GENERATED CODE */}
                  {verifyPayload && (
                    <>
                      {cashbackpinresolved === true && (
                        <>
                          {verifyPayload.success === true && (
                            <>
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
                                null
                              )}{" "}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                {/* @======== RESOLVE CASHBACK TOKEN ENDS */}

                {/* <div
                  style={{
                    width: "90%",
                    background: "white",
                    padding: "40px 20px",
                    marginLeft: "5%",
                    marginTop: "20px",
                    borderRadius: "3px",
                    boxShadow: " 1px 1px 3px #c1cfd9",
                    backgroundImage:'linear-gradient(to right, #385b74,lightgray)',
                  }}
                          >
                             <AttachMoneyOutlined style={{ color: "white", position: "absolute", top: "10px", left: "10px", fontSize: "30px" }} />
                              <b style={{fontSize:"20px"}}>
                                Generate Cashback token
                             </b>
                </div> */}
                <div
                  onClick={toggleDrawer("bottom", true)}
                  style={{
                    width: "90%",
                    background: "white",
                    padding: "20px 20px",
                    marginLeft: "5%",
                    marginTop: "20px",
                    borderRadius: "3px",
                    boxShadow: " 1px 1px 3px #c1cfd9",
                    backgroundImage:
                      "linear-gradient(to right,lightgray, #385b74)",
                    position: "relative",
                    height: "110px",
                  }}
                >
                  <ViewAgenda
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      fontSize: "30px",
                    }}
                  />
                  <b style={{ fontSize: "18px", color: "#0a3d62" }}>
                    Generate Cashback token
                  </b>{" "}
                  <br />
                  <small style={{ color: "" }}>
                    When you click me, i will guide you through generating
                    cashback token{" "}
                  </small>
                </div>

                <div
                  style={{
                    width: "90%",
                    background: "white",
                    padding: "40px 20px",
                    marginLeft: "5%",
                    marginTop: "20px",
                    borderRadius: "3px 3px 40px 40px",
                    marginBottom: "20px",
                    boxShadow: " 1px 1px 3px #888888",
                    paddingTop: "20px",
                    border: "0.5px solid #f3f3f3",
                  }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    <b>Cashback summary</b>
                  </div>

                  <div>
                    <span>Cashback generated</span>{" "}
                    <span style={{ float: "right" }}>2100</span>
                  </div>
                  <Divider style={{ marginBottom: "28px", color: "#0a3d62" }} />

                  <div>
                    <span>Cashback resolved</span>{" "}
                    <span style={{ float: "right" }}>2100</span>
                  </div>
                  <Divider style={{ marginBottom: "28px", color: "#0a3d62" }} />
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
            {createCashback("bottom")}
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