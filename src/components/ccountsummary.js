import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import { Divider } from "@mui/material";
import { add_wallet, logOut, loginSuc } from "../redux";

// @======== ALLL BUZZME CONTROLLER
import { getAllBuzz } from "../functions/controllers/allbuzzme";
import { getAllCashback } from "../functions/controllers/allcashback";
function Home({ appState }) {
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

  const [buzzState, setBuzzState] = useState({
    leading: false,
    data: [],
  });

  const [cashbackstate, setCashbackstate] = useState({
    leading: false,
    data: [],
  });

  React.useEffect(() => {
    getAllBuzz(userId, buzzState, setBuzzState);
    getAllCashback(userId, cashbackstate, setCashbackstate);
    window.scrollTo(0, 0);
    setStates({
      ...compState,
      loading: false,
      wallethidden: true,
    });
  }, []);

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
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
          <b>Account basic summary</b>
        </div>

        <div>
          <span>All Buzz In</span>{" "}
          <span style={{ float: "right" }}>
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
              <>
                {" "}
                <b style={{fontSize:"12px"}}>NGN {buzzState.data.to} </b>
              </>
            )}
          </span>
        </div>
        <Divider style={{ marginBottom: "28px", color: "#0a3d62" }} />

        <div>
          <span>All Buzz Out</span>{" "}
          <span style={{ float: "right" }}>
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
              <>
                {" "}
                <b style={{fontSize:"12px"}}>NGN {buzzState.data.from} </b>{" "}
              </>
            )}
          </span>
        </div>
        <Divider style={{ marginBottom: "28px", color: "#0a3d62" }} />

        <div>
          <span>Cashback generated</span>{" "}
          <span style={{ float: "right" }}>
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
                  <>
                    {/* {console.log(cashbackstate)} */}
                  <b style={{fontSize:"12px"}}>NGN {cashbackstate.data.from} </b>{" "}
              </>
            )}
          </span>
        </div>
        <Divider style={{ marginBottom: "28px", color: "#0a3d62" }} />

        <div>
          <span>Cashback resolved</span>{" "}
          <span style={{ float: "right" }}>
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
              <>
                {" "}
                <b style={{fontSize:"12px"}}>NGN {cashbackstate.data.to} </b>{" "}
              </>
            )}
            {/* cashbackstate */}
          </span>
        </div>
        <Divider style={{ marginBottom: "28px", color: "#0a3d62" }} />
      </div>
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
