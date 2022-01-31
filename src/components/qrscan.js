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
// import Toppills from "../components/includes/topdesktoppills";
import { cashbackloader } from "../components/loading";
import { btn_primary, btn_danger } from "../components/buttons";
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

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction"; 
import EditIcon from "@mui/icons-material/Edit";

function Home({ appState, login_suc }) {
  let history = useHistory();
  const state = appState;
  const [value, setValue] = useState(null); //TOKEN TO BE VERIFIED
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
        {/* <div
          onClick={() => { 
            setDrawerState({ ...drawerState, bottom: true });
          }}
          style={{
            position: "fixed",
            height: "55px",
            width: "55px",
            background: "white",
            borderRadius: "55px",
            bottom: "10px",
            right: "10px",
            padding: "10px 13px",
            boxShadow: " 1px 1px 3px #0a3d62",
            textAlign: "center",
          }}
        >
          <ImQrcode style={{ fontSize: "25px", color: "#0a3d62" }} />
          <div style={{ marginTop: "-4px", fontSize: "13px", color: "orange" }}>
            scan
          </div>
        </div> */}

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
                openIcon={<MdClear style={{fontSize:"25px"}} />}
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
              sx={{ background: "#385b74", color: "white" }}
              icon={<MdGridGoldenratio />}
              tooltipTitle="Create"
            />
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
