import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import { FcLeftDown,FcRightUp ,FcBarChart} from "react-icons/fc";
import { Divider } from "@mui/material";
import { add_wallet, logOut, loginSuc } from "../redux";
import Naira from "react-naira";
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
        <div style={{ marginBottom: "20px",color:"gray" }}>
         <FcBarChart style={{fontSize:"35px"}}/> <b>Inflow -  Outflow summary</b> 
        </div>

        <div>
          <span> Buzz  <FcLeftDown /></span>{" "}
          <span style={{ float: "right" }}>
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
              <>
                {" "}
                <b style={{fontSize:"12px"}}><Naira>{buzzState.data.to}</Naira> </b>
              </>
            )}
          </span>
        </div>
        <div style={{ marginBottom: "28px",marginTop:"10px", border: "1px solid #0a3d62" }} ></div>

        <div>
          <span>Buzz  <FcRightUp /></span>{" "}
          <span style={{ float: "right" }}>
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
              <>
                {" "}
                <b style={{fontSize:"12px"}}><Naira>{buzzState.data.from}</Naira> </b>{" "}
              </>
            )}
          </span>
        </div>
        <div style={{ marginBottom: "28px",marginTop:"10px", border: "1px solid crimson" }} ></div>

        <div>
          <span>Cashback  <FcLeftDown /></span>{" "}
          <span style={{ float: "right" }}>
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
                  <>
                    {/* {console.log(cashbackstate)} */}
                    <b style={{ fontSize: "12px" }}><Naira>{cashbackstate.data.to}</Naira> </b>{" "}
                    {console.log(cashbackstate)}
              </>
            )}
          </span>
        </div>
        <div style={{ marginBottom: "28px",marginTop:"10px", border: "1px solid #0a3d62" }} ></div>

        <div>
          <span>Cashback  <FcRightUp /></span> {" "}
          <span style={{ float: "right" }}>
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
              <>
                {" "}
                <b style={{fontSize:"12px",color:"red"}}><Naira>{cashbackstate.data.from}</Naira> </b> {" "}
              </>
            )}
            {/* cashbackstate */}
          </span>
        </div>
        <div style={{ marginBottom: "28px",marginTop:"10px", border: "1px solid crimson" }} ></div>
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
