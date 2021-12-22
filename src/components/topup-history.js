import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import Naira from "react-naira";
import Header from "../components/includes/mobile_header.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc, disp_noti } from "../redux";
import { cashbackloader } from "../components/loading";
import { allTopup } from "../functions/models/index";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { EuroSymbolOutlined } from "@material-ui/icons";
const smile = {
  color: "white",
  fontSize: "20px",
  background: "#f3f3f3",
};

function Home({ appState, dispNoti }) {
  let history = useHistory();
  const state = appState;
  let userId = "";
  if (state.loggedIn == true) {
    userId = state.loggedInUser.user.id;
  }

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const [compState, setStates] = useState({
    data: [],
  });

  const setSchool = () => {
    let user = state.loggedInUser.user.id;
    setStates({
      ...compState,
      loader: true,
    });
    allTopup(user,'topup')
      .then((res) => {
        console.log(res);
        if (res.error === null) {
          setStates({
            ...compState,
            loader: false,
            data: res.body,
          });
        } else {
          setStates({
            ...compState,
            loader: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        setStates({
          ...compState,
          loader: false,
          data: [],
        });
      });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setSchool();
    dispNoti(false);
  }, []);

  const renderNotifications = () => {
    if (compState.data) {
      return compState.data.map((e) => {
        return (
          <>
            {console.log(compState.data)}
            <div style={{ background: "" }}>
              <div
                style={{
                  backgroundColor: "",
                  width: "100%",
                  padding: " 10px 0px",
                }}
              >
                {/* <b>{e.type} </b> &nbsp;&nbsp;{" "}
                <span style={{ fontSize: "14px" }}>
                 Card Topup
                </span>{" "} */}
                <b
                  style={{
                    color: "#0a3d62",
                    padding: "3px 10px",
                    borderRadius: "5px",
                    float: "right",
                  }}
                >
                <Naira>{e.amount}</Naira>
                </b>
                <br />
              </div>
              <div
                style={{
                  backgroundColor: " ",
                  width: "100%",
                  padding: "10px",
                  marginTop: "-15px",
                  borderBottom: "0.5px solid lightgray",
                }}
              >
                    <div style={{ width: "30%", display: "inline-block", textAlign: "right",background:" " }}>Status</div>
                    <div style={{ width: "30%", display: "inline-block", textAlign: "left", marginLeft: "15px", color: "green",fontSize:"12px" }}><b>{e.meta.status}</b></div> <br />
                    
                     <div style={{ width: "30%", display: "inline-block", textAlign: "right",background:" " }}>Message</div>
                    <div style={{ width: "30%", display: "inline-block", textAlign: "left", marginLeft: "15px", color: "green",fontSize:"12px" }}><b>{e.meta.message}</b></div> <br />
                    
                     <div style={{ width: "30%", display: "inline-block", textAlign: "right",background:" " }}>Ref</div>
                    <div style={{ width: "30%", display: "inline-block", textAlign: "left",marginLeft:"15px",color:"gray" }}><small>{e.meta.trxref}</small></div> <br />
                <br /> 
                  <small>
                    {e.meta.date.day} {e.meta.date.date} {e.meta.date.month},{" "}
                    {e.meta.date.year}
                  </small>{" "}
                  &nbsp;&nbsp;{" "}
                <small style={{ float: " " }}>{e.meta.date.time}</small>
                
              </div>
            </div>
            {/* <Divider /> */}
          </>
        );
      });
    }
  };

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      <>
        {console.log(compState)}
        {compState.loader === true && <> {cashbackloader()}</>}
        <div className="mobile">
          <div>
            <div>
              {compState.loader != true &&
                compState.data !== null &&
                compState.data.length > 0 && (
                  <>
                    <div
                      style={{
                        textAlign: "left",
                        marginTop: "10px",
                        background: " #f4f6f7",
                        position: "sticky",
                        top: "0px",
                        // zIndex: "1000",
                        padding: "16px",
                      }}
                    >
                      {" "}
                      {compState.loader === false &&
                        compState.data.length > 0 && <b>Topup history</b>}
                    </div>{" "}
                    <div
                      style={{
                        width: "90%",
                        background: "white",
                        padding: "0px 15px",
                        marginLeft: "5%",
                        marginTop: "20px",
                        boxShadow: " 1px 1px 3px #888888",
                        border: "0.5px solid #f3f3f3",
                      }}
                    >
                      <List
                        sx={style}
                        component="nav"
                        aria-label="mailbox folders"
                      >
                        {renderNotifications()}
                      </List>{" "}
                    </div>
                  </>
                )}
              <br />
              {compState.loader === false && compState.data.length == 0 && (
                <div
                  style={{
                    width: "50%",
                    background: "white",
                    padding: "10px 3px",
                    marginLeft: "25%",
                    marginTop: "20px",
                    boxShadow: " 1px 1px 3px #888888",
                    border: "0.5px solid #f3f3f3",
                    textAlign: "center",
                  }}
                >
                  No topup record
                </div>
              )}
              <div
                style={{
                  marginTop: "-10px",
                  width: "90%",
                  marginLeft: "5%",
                  backgroundColor: " ",
                  textAlign: "center",
                }}
              ></div>
            </div>
          </div>
        </div>
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
    dispNoti: (payload) => dispatch(disp_noti(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
