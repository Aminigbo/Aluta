import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";

import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import Toppills from "../components/includes/topdesktoppills";
import { cashbackchargecentage } from "../functions/utils/index";
import { cashbackloader } from "../components/loading";
import { errorComponent } from "../components/error"; // error component for error handling
import Cashbackdrawer from "../components/cashbackdrawer";
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
  const [bankSettlement, setbankSettlement] = useState(false)

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
                    textAlign: "left",
                    width: "90%",
                    marginLeft: "5%",
                  }}
                >
                  <span
                    onClick={() => [setAllbuzzme(false)]}
                    // to="/cashback-create"
                    style={{
                      marginLeft: " ",
                      fontSize: "15px",
                      color: "#0a3d62",
                      textDecoration: "none",
                      background: allbuzzme == false && "lightgray",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {/* <ViewAgenda style={{ marginLeft: "-4px" }} /> */}
                    &nbsp;<cb>Cashbacks</cb>
                  </span>
                  
                  <span
                    onClick={() => {
                        setAllbuzzme(true);
                        setbankSettlement(false)
                    }}
                    style={{
                      marginLeft: "",
                      fontSize: "15px",
                      color: "#0a3d62",
                      textDecoration: "none",
                      background: allbuzzme == true && "lightgray",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {/* <HistoryOutlined style={{ marginLeft: "-4px" }} /> */}
                    &nbsp;<buzz>Buzz me</buzz>
                  </span>

                    <span
                    onClick={() => {
                      setbankSettlement(true);
                      setAllbuzzme(null)
                    }}
                    style={{
                      marginLeft: " ",
                      fontSize: "15px",
                      color: "#0a3d62",
                      textDecoration: "none",
                      background: bankSettlement == true && "lightgray",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {/* <HistoryOutlined style={{ marginLeft: "-4px" }} /> */}
                    &nbsp;<width>Bank settlement</width>
                  </span>
                  
                  <Link
                    to="updateprofile"
                    style={{
                      marginLeft: "",
                      fontSize: "15px",
                      color: "#0a3d62",
                      textDecoration: "none",
                    }}
                  >
                    {/* <Person style={{ marginLeft: "-4px" }} /> */}
                    &nbsp;<prf>Profile</prf>
                  </Link> 
                </div>
              </div>{" "}
              <div style={{ zIndex: "80000", background: " " }}>
                {/* <Cashbackdrawer /> */}
                {allbuzzme === true && <Allbuzzme />}

                {allbuzzme === false && <Allcashback />}
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
