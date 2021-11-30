import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc, disp_noti } from "../redux";
import { cashbackloader } from "../components/loading";
import { allCashback } from "../functions/models/index";

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
  let userId = ""

  if (state.loggedIn === true) {
    userId = state.loggedInUser.user.id
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
    allCashback(user)
      .then((res) => {
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
        console.log(e)
          return (
            <> 
              <div style={{ background: "" }}>
                <div
                  style={{
                    backgroundColor: "",
                    width: "100%",
                    padding: "10px 20px",
                  }}
                >
                  <b>{e.isActive === true ? "VALID":"INVALID"} </b> &nbsp;&nbsp;{" "}
                  <b
                    style={{
                      color: "#0a3d62",
                      padding: "3px 10px",
                      borderRadius: "5px",
                      float: "right",
                    }}
                  >NGN {e.meta.amount}
                  </b>
                  <br />
                  <span style={{ fontSize: "14px" }}>
                    {" "}
                    By
                    {e.user == userId ? <b>  You</b> : <b> {e.meta.name.split(" ")[0]}</b>}
                    
                  </span>{" "}
                  <br />
                </div>
                <div
                  style={{
                    backgroundColor: " ",
                    width: "100%",
                    padding: "10px 20px",
                    marginTop: "-15px",
                    borderBottom: "0.5px solid lightgray",
                  }}
                >
                  {e.user == userId ?  <small>
                      You generated a cashback of   <b
                        style={{
                          color: "#0a3d62",
                          padding: "3px 4px",
                          borderRadius: "5px",
                        }}
                    >
                       NGN {e.meta.amount}
                     <br />
                      <div style={{marginTop:"5px"}}>
                        <b style={{fontSize:"16px",color:"#0a3d62"}}>{e.token} </b>
                      </div>
                    </b>
                  
                    </small> :
                    <small>
                      You resolved a cashback of   <b
                        style={{
                          color: "#0a3d62",
                          padding: "3px 4px",
                          borderRadius: "5px",
                        }}
                      >NGN {e.meta.amount}
                      </b><br /> <div style={{marginTop:"5px"}}>
                        <b style={{fontSize:"16px",color:"#0a3d62"}}>{e.token} </b>
                      </div>
                  
                    </small>}
                  <br />
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
              <div
                style={{
                  textAlign: "left",
                  marginTop: "10px",
                  background: " #f4f6f7",
                  position: "sticky",
                  top: "0px",
                  zIndex: "1000",
                  padding: "10px 15px",
                }}
              >
                  {" "}
                  {compState.loader === false && compState.data.length > 0 && <b>Cashback histories</b>}
                
              </div>{" "}
              {compState.loader != true &&
                compState.data !== null &&
                compState.data.length > 0 && (
                  <>
                    {" "}
                    <div
                      style={{
                        width: "90%",
                        background: "white",
                        padding: "0px",
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
                  No cashback record
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
    dispNoti: (payload) => dispatch(disp_noti(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
