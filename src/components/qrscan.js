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
import Toppills from "../components/includes/topdesktoppills";
import { cashbackloader } from "../components/loading"; 
import { btn_primary, btn_danger } from "../components/buttons";
import {
  handleChashbackGeneration,
  handleVerifyToken,
  settleCashbackToWallet,
} from "../functions/controllers/cashback"; // CASHBACK TOKEN CONTROLLER
import { errorComponent, successComponent } from "../components/error"; // error component for error handling

function Home({ appState, login_suc }) {
  let history = useHistory();
  const state = appState;
  const [value, setValue] = useState(null); //TOKEN TO BE VERIFIED

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
     history.push("/")
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
              </div>{" "}
              <div style={{ zIndex: "80000", background: " " }}>
                <div
                  style={{
                    padding: "20px",
                    height: "",
                    background: " ",
                    textAlign: "center",
                  }}
                >
                  {compState.loading === true ? (
                    "Please wait"
                  ) : (
                    <>
                      {compState.resolved !== true && (
                        <QrReader
                          style={{ width: "100%", height: "" }}
                          delay={300}
                          onError={handleError}
                          onScan={handleScan}
                          facingMode="environment"
                        />
                      )}
                    </>
                  )}

                  {/* <p>{compState.result}</p> */}

                  {verifyPayload && (
                    <>
                      {/* {console.log(verifyPayload.data.isActive)} */}
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
                                verifyPayload.data.isActive,
                                null
                              )}{" "}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
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
