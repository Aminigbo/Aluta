import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";
import { 
  HistoryOutlined,
} from "@material-ui/icons";

import {
  Person, 
  AccountBalanceWallet, 
  FiberPin,
  EuroSymbolOutlined,
  FileCopyOutlined,
  RemoveRedEye, 
  ViewAgenda,
  LibraryAddCheckOutlined,
} from "@material-ui/icons";

import { confirmCashbackCreation } from "../functions/workers_functions/cashback"; // CASHBACK CONTROLLER
import { Drawer, Divider } from "@mui/material";
import Accountsummery from "../components/ccountsummary"
import Cashbacknav from "../components/cashbacknav"
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import { moveBuzzmeFunds } from "../functions/controllers/movebuzzmefunds";
import { btn_primary, btn_danger } from "../components/buttons";
import { text_input } from "../components/forms";
import Toppills from "../components/includes/topdesktoppills"; 
import { cashbackchargecentage } from "../functions/utils/index";
import { cashbackloader } from "../components/loading";
import { errorComponent, successComponent } from "../components/error"; // error component for error handling
import { 
  handleVerifyToken, 
} from "../functions/controllers/cashback"; // CASHBACK TOKEN CONTROLLER  
import Cashbackdrawer from "../components/cashbackdrawer"
// @======== ALLL BUZZME CONTROLLER
import {getAllBuzz} from "../functions/controllers/allbuzzme"
function Home({ appState, login_suc }) {
  let history = useHistory();
  const state = appState;
  let userId =""
  if (state.loggedIn === true) {
    userId = state.loggedInUser.user.id
  }


  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
    miniLoad: false,
    wallethidden: true,
    confirmpwderror: null,
    confirmpwderrormsg: "",
    error:null
  });
  const [value, setValue] = useState(null); //TOKEN TO BE VERIFIED
  const [verifyPayload, setVerifypayload] = useState({
    data: null,
    success: null,
  });

  const [buzzState, setBuzzState] = useState({
    leading: false,
    data:[]
  })

  const [tokenamount, setTokenamount] = useState(""); // amount to be generated
  const [cashbackpinresolved, setcashbackpinresolved] = useState(false); // state to control resolving cashback
  const [initiateCreate, setInitiateCreate] = useState(false); // show the confirm or cancel popup when click initiate
  const [generatedcode, setGeneratedcode] = useState(null); // return true or false if code is generated
  const [generatedToken, setGeneratedToken] = useState(null); // set the returned generated token
  const [pin, setPin] = useState("");
  const [resolved, setResolved] = useState(null); // return true if the cashback has been resolved to the
  const [pwd, setPwd] = useState(""); // set password requird to view balance
  const [clickToViewPwd, setClickToViewPwd] = useState(false);
  const [resolvedVerifyPin, setResolvedPinVerification] = useState(false)

  const [movebuzzResolved, setmovebuzzResolved] = useState(false)

  

 

  let userWallet = "";
  if (state.loggedIn === true) {
    userWallet = state.loggedInUser.user.meta.wallet;
  }

  // ===   function to move Buzz me balance to wallet
  function moveBuzzmeBalance() {
    setClickToViewPwd(true)
    setResolvedPinVerification(true)
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

  

  // @======== close success pop
  const closeSuccessPop = () => {
    setResolved(false);
    setmovebuzzResolved(false)
    setResolvedPinVerification(false)
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
    setcashbackpinresolved(false);
    setGeneratedcode(false);
    setStates({
      ...compState,
      copy: false,
    });
  };

  React.useEffect(() => {
    getAllBuzz(userId,buzzState,setBuzzState)
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

 
 
  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg"> 
      {state.loggedInUser.user.meta.schoolmode === true && history.push("/")} 
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
                
                  <Cashbacknav />


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
                    // borderRadius: "40px 40px 2px 3px",
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
                  
                </div>
                {/* @======== RESOLVE CASHBACK TOKEN ENDS */}

                {/* @======== SHOW SIDE BUZZ ME WALLET */}

                <div
                  style={{
                    width: "90%",
                    height: "70px",
                    background: "white",
                    boxShadow: " 1px 1px 3px #888888",
                    border: "2px solid #f3f3f3",
                    marginBottom: "20px",
                    marginTop: "20px",
                    marginLeft: "5%",
                    position: "relative",
                  }}
                >
                  {/* <FiberPin style={{ margin: "5px", color: "#0a3d62" }} /> */}
                  <div 
                    style={{
                      height: "100%",
                      background: " ",
                      textAlign: "center",
                      display: "inline-block",
                      padding: "4px 0px",
                      position: "absolute",
                      width: "45%",
                    }}
                  >
                    <span>Buzz me balance</span> <br />
                    <b>
                      {compState.wallethidden === false ? (
                        <>
                          {" "} 
                          <b> NGN {state.loggedInUser.user.meta.buzzmewallet}</b>{" "}
                        </>
                      ) : (
                        <>
                          {clickToViewPwd === false && (
                            <>
                              {" "}
                              <RemoveRedEye
                                onClick={() => {
                                  setClickToViewPwd(true);
                                }}
                                style={{ fontSize: "25px", color: "#0a3d62" }}
                              />
                            </>
                          )}
                        </>
                      )}
                    </b>
                  </div>

                  <div
                    onClick={() => {
                      moveBuzzmeBalance();
                    }}
                    style={{
                      height: "100%",
                      background: " #0a3d62",
                      textAlign: "center",
                      display: "inline-block",
                      padding: "18px 0px",
                      position: "absolute",
                      width: "45%",
                      right: "0px",
                      color: "white",
                      borderRadius: "30px 16px",
                      fontSize: "15px",
                    }}
                  >
                    <b> Move to wallet</b>
                  </div>
                </div>

                {/* account balance and beneficiary id */}
                <div
                  style={{
                    width: "90%",
                    background: "",
                    padding: "",
                    marginLeft: "5%",
                    marginTop: "20px",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      width: "49%",
                      height: "120px",
                      background: "white",
                      display: "inline-block",
                      boxShadow: " 1px 1px 3px #888888",
                      border: "2px solid #f3f3f3",
                    }}
                  >
                    <AccountBalanceWallet
                      style={{ margin: "5px", color: "#0a3d62" }}
                    />

                    <div
                      style={{
                        // height: "70px",
                        background: " ",
                        textAlign: "center",
                        marginTop: "5px",
                        padding: "4px 0px",
                      }}
                    >
                      <span>Wallet balance</span>
                      <br />

                      {/* <b>{state.loggedInUser.user.meta.wallet}</b> */}

                      {compState.wallethidden === false ? (
                        <>
                          {" "}
                          <b style={{ fontSize: " ", marginRight: "4px" }}>
                            NGN  {state.loggedInUser.user.meta.wallet}</b>{" "}
                        </>
                      ) : (
                        <>
                          {clickToViewPwd === false && (
                            <>
                              {" "}
                              <RemoveRedEye
                                onClick={() => {
                                  setClickToViewPwd(true);
                                }}
                                style={{ fontSize: "25px", color: "#0a3d62" }}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "49%",
                      height: "120px",
                      background: "white",
                      display: "inline-block",
                      float: "right",
                      boxShadow: " 1px 1px 3px #888888",
                      border: "2px solid #f3f3f3",
                    }}
                  >
                    <FiberPin style={{ margin: "5px", color: "#0a3d62" }} />
                    <div
                      onClick={() => {
                        setStates({
                          ...compState,
                          copy: true,
                        });
                        if (navigator && navigator.clipboard) {
                          navigator.clipboard.writeText(state.loggedInUser.user.meta.beneficiaryId);
                        }
                      }}
                      style={{
                        // height: "70px",
                        background: " ",
                        textAlign: "center",
                        marginTop: "5px",
                        padding: "4px 0px",
                      }}
                    >
                      <span>Beneficiary ID</span> <br />
                      <b>
                        {state.loggedInUser.user.meta.beneficiaryId}{" "}
                        {compState.copy == true ? (
                          <LibraryAddCheckOutlined
                            style={{
                              fontSize: "24px",
                              color: "mediumseagreen",
                            }}
                          />
                        ) : (
                          <FileCopyOutlined
                            style={{ fontSize: "24px", color: "orange" }}
                          />
                        )}{" "}
                      </b>
                    </div>
                  </div>
                  </div>
                    <Cashbackdrawer /> 

                {/* @========      */}
                  <Accountsummery />

              </div>
            </div>
          </div>
        </div> 

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
