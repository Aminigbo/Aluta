import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import header from "../components/header.js";

import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import Toppills from "../components/includes/topdesktoppills";
import { cashbackchargecentage } from "../functions/utils/index";
import { cashbackloader } from "../components/loading";
import { errorComponent } from "../components/error"; // error component for error handling
import Topup from "../components/topup-history";
// @========  IMPORT CUSTOMER ACCOUNT SUMMARY
import Allcashback from "../components/allcashback";
import Allbuzzme from "../components/allbuzz-me";

function Home({ appState, login_suc }) {
  let history = useHistory();
  const state = appState;

  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
    miniLoad: false,
  });

  const [tokenamount, setTokenamount] = useState(""); // amount to be generated
  const [allbuzzme, setAllbuzzme] = useState(false);
  const [bankSettlement, setbankSettlement] = useState(false);
  const [allTopup, setAllTopup] = useState(false);
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
      <>
        <div className="mobile"  style={{ background: "#385b74" }}>
          <div className="header_footer">
            {/* <Footer /> */}
              {/* <Header /> */}
              {header()}
          </div>

          <div>
            <div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  background: " #385b74",
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
                    paddingBottom: "10px",
                    background:" "
                  }}
                  >
                    
                    <Link
                    to="updateprofile"
                    style={{
                      marginLeft: "",
                      fontSize: "13px",
                      color: "white",
                      textDecoration: "none",
                     //  fontWeight: "bold",
                    }}
                  >
                    {/* <Person style={{ marginLeft: "-4px" }} /> */}
                    <prf>Profile</prf>
                    </Link>
                    
                  <span
                    onClick={() => {
                      // setAllbuzzme(false)
                      // setAllTopup(FontFaceSetLoadEvent)
                      history.push("/history");
                    }}
                    // to="/cashback-create"

                    style={{
                      marginLeft: "5px",
                      fontSize: "15px",
                      color: "orange",
                      textDecoration: "none",
                      padding: "5px",
                       borderRadius: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    {/* <ViewAgenda style={{ marginLeft: "-4px" }} /> */}
                    <cb>Cashbacks</cb>
                  </span>

                  <span
                    onClick={() => {
                      // setAllbuzzme(true);
                      // setbankSettlement(false)
                      // setAllTopup(false)
                      history.push("/buzzhistory");
                    }}
                    style={{
                      marginLeft: "5px",
                      fontSize: "13px",
                      color: "white",
                      textDecoration: "none",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {/* <HistoryOutlined style={{ marginLeft: "-4px" }} /> */}
                    <buzz>Buzz me</buzz>
                  </span>

                  <span
                    onClick={() => {
                      //  setbankSettlement(true);
                      //    setAllbuzzme(null)
                      //    setAllTopup(true)
                      history.push("/topuphistory");
                    }}
                    style={{
                      marginLeft: "5px",
                      fontSize: "13px",
                      color: "white",
                      textDecoration: "none",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {/* <HistoryOutlined style={{ marginLeft: "-4px" }} /> */}
                    <width>Topup</width>
                  </span>

                  
                  </div> 
              </div>{" "}
              <div style={{
                  zIndex: "80000",
                  background: "#f4f6f7",
                  padding: "20px 0px",
                  borderRadius: "30px 30px 0px 0px",
                }}>
                {/* <Cashbackdrawer /> */}
                {allbuzzme === true && <Allbuzzme />}

                {allbuzzme === false && <Allcashback />}

                {allTopup === true && <Topup />}
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
