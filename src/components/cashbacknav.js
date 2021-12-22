import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css"; 
import { confirmPinLockScreen } from "./confirmPinLockScreen";
import { ViewAgenda } from "@material-ui/icons"; 
import { confirmCashbackCreation } from "../functions/workers_functions/cashback"; // CASHBACK CONTROLLER
import { Drawer, Divider } from "@mui/material"; 
import { add_wallet, logOut, loginSuc } from "../redux";
import { moveBuzzmeFunds } from "../functions/controllers/movebuzzmefunds";
import { btn_primary, btn_danger } from "../components/buttons";
import { text_input } from "../components/forms"; 
import { cashbackCurrency } from "../components/currency";
import { cashbackchargecentage } from "../functions/utils/index";
import { cashbackloader } from "../components/loading";
import { errorComponent, successComponent } from "../components/error"; // error component for error handling
import {
  handleChashbackGeneration,
  handleVerifyToken,
  settleCashbackToWallet,
} from "../functions/controllers/cashback"; // CASHBACK TOKEN CONTROLLER
import { pinConfirmPop } from "../components/confirmPin";
import {FcCurrencyExchange} from "react-icons/fc";

// @======== ALLL BUZZME CONTROLLER
import { getAllBuzz } from "../functions/controllers/allbuzzme";
function Home({ appState, login_suc }) {
  let history = useHistory();
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
  const [value, setValue] = useState(null); //TOKEN TO BE VERIFIED
  const [verifyPayload, setVerifypayload] = useState({
    data: null,
    success: null,
  });

  const [buzzState, setBuzzState] = useState({
    leading: false,
    data: [],
  });

  const [tokenamount, setTokenamount] = useState(""); // amount to be generated
  const [cashbackpinresolved, setcashbackpinresolved] = useState(false); // state to control resolving cashback
  const [initiateCreate, setInitiateCreate] = useState(false); // show the confirm or cancel popup when click initiate
  const [generatedcode, setGeneratedcode] = useState(null); // return true or false if code is generated
  const [generatedToken, setGeneratedToken] = useState(null); // set the returned generated token
  const [pin, setPin] = useState("");
  const [resolved, setResolved] = useState(null); // return true if the cashback has been resolved to the
  const [pwd, setPwd] = useState(""); // set password requird to view balance
  const [clickToViewPwd, setClickToViewPwd] = useState(false);
  const [resolvedVerifyPin, setResolvedPinVerification] = useState(false);

  const [movebuzzResolved, setmovebuzzResolved] = useState(false);

  // @========  FUNCTION TO VERIFY pin AND SHOW balance
  const showPwd = () => {
    if (state.loggedInUser.user.meta.transactionPin != pwd) {
      setStates({
        ...compState,
        wallethidden: true,
        confirmpwderror: true,
        confirmpwderrormsg: "Wrong pin",
      });
      setPwd("");
      window.navigator.vibrate([200]);
    } else {
      console.log("true");
      setClickToViewPwd(false);
      setStates({
        ...compState,
        wallethidden: false,
        confirmpwderror: false,
        confirmpwderrormsg: "",
      });
      setPwd("");
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
          // else {
          //   setStates({
          //      ...compState, error:true
          //    })
          //  }
        });
      }
    }
  };

  const closePwd = () => {
    setClickToViewPwd(false);
    setResolvedPinVerification(false);
    setStates({
      ...compState,
      confirmpwderrormsg: "",
    });
  };

  let userWallet = "";
  if (state.loggedIn === true) {
    userWallet = state.loggedInUser.user.meta.wallet;
  }

  // ===   function to move Buzz me balance to wallet
  function moveBuzzmeBalance() {
    setClickToViewPwd(true);
    setResolvedPinVerification(true);
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
  };

  // @======== close success pop
  const closeSuccessPop = () => {
    setResolved(false);
    setmovebuzzResolved(false);
    setResolvedPinVerification(false);
  };

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });
  const [drawerState2, setDrawerState2] = React.useState({
    bottom: false,
  });

  const [auth, setAuth] = React.useState(false);

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

  const toggleDrawer2 = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState2({ ...drawerState2, [anchor]: open });
    setcashbackpinresolved(false);
    setGeneratedcode(false);
    setStates({
      ...compState,
      copy: false,
    });
  };

  React.useEffect(() => {
    getAllBuzz(userId, buzzState, setBuzzState);
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

  // @======== INITATE THE  TOKEN GENERATION
  const handleGeneratecashback = () => {
    if (!tokenamount || tokenamount.length < 1 || tokenamount < 100) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "Please provide a valid amount greater than NGN 100.00",
      });
      window.navigator.vibrate([200]);
    } else if (amountPlusCharge > userWallet) {
      console.log(amountPlusCharge);
      setStates({
        ...compState,
        error: true,
        errorMsg: "You have insufficient wallet balance",
      });
      window.navigator.vibrate([200]);
    } else if (tokenamount > 10000) { 
      setStates({
        ...compState,
        error: true,
        errorMsg: "Only verified vendors can generate cashback above NGN 10,000.00",
      });
      window.navigator.vibrate([200]);
    }
    else {
      setDrawerState2({ ...drawerState2, bottom: false });
      setDrawerState({ ...drawerState, bottom: true });
      setAuth(true);
    }
  };

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
            borderRadius:"30px 30px 0px 0px"
          }}
        >
          <div style={{ textAlign: "center" }}>
            {generatedcode !== false && (
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
                    {/* <div
                      style={{
                        width: "25%",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {text_input("Your pin", pin, "number", setPin)}
                    </div> */}
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
                        amountPlusCharge,
                        true,
                        toggleDrawer
                      )}
                    </div>{" "}
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

  const [pinError, setpinError] = useState("");

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      {clickToViewPwd === true && (
        <>
          {" "}
          {pinConfirmPop(
            compState,
            pwd,
            setPwd,
            closePwd,
            showPwd,
            text_input,
            btn_danger,
            btn_primary
          )}{" "}
        </>
      )}
      {/* {state.loggedInUser.user.meta.schoolmode === true && history.push("/")} */}
      {/* {console.log(state)}
      {console.log(verifyPayload)} */}
      {/* IF TOKEN VERIFICATION TURNS ERROR */}
      {verifyPayload.success === false && <> </>}

      {/* if the user successfully resolved the cashback */}
      {resolved === true && (
        <>
          {" "}
          {successComponent(
            "The cashback has been resolved to your wallet successfully",
            closeSuccessPop
          )}{" "}
        </>
      )}

      {/* @======== WHEN USER SUCCESSFULLY MOVE BUZZ ME BALANCE TO WALLET */}
      {movebuzzResolved === true && (
        <>
          {" "}
          {successComponent(
            "Balance successfully moved to wallet",
            closeSuccessPop
          )}{" "}
        </>
      )}

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
       
        <div className="mobile">
          <div>
            <div>
              <div style={{ zIndex: "80000", background: " " }}>
                <div
                  onClick={toggleDrawer2("bottom", true)}
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
                    // height: "110px",
                  }}
                >
                  <FcCurrencyExchange
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      fontSize: "40px",
                    }}
                  />
                  <b style={{ fontSize: "18px", color: "#0a3d62" }}>
                    Generate Cashback token
                  </b>{" "}
                  <br />
                  <small style={{ color: "" }}>
                    When you click me, I will guide you through generating
                    cashback token{" "}
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* {confirmPinLockScreen(drawerState,setDrawerState,setStates,compState,pin,setPin,pinError,setpinError,state)} */}
          {auth === true && (
            <>
              {" "}
              {confirmPinLockScreen(
                drawerState,
                setDrawerState,
                setStates,
                compState,
                pin,
                setPin,
                pinError,
                setpinError,
                state,
                setInitiateCreate,
                drawerState2,
                setDrawerState2
              )}{" "}
            </>
          )}
        </div>
 
        <React.Fragment key="bottom">
            <Drawer
              
            anchor="bottom"
            open={drawerState2["bottom"]}
            onClose={toggleDrawer2("bottom", false, false)}
          >
            {createCashback("bottom")}
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
    logout: () => dispatch(logOut()),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
