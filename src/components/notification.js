import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc, disp_noti } from "../redux";
import { cashbackloader } from "../components/loading";
import { fetchNotification, fetchUserProfile } from "../functions/models/index";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { EuroSymbolOutlined } from "@material-ui/icons";
const smile = {
  color: "white",
  fontSize: "20px",
  background: "#f3f3f3",
};

function Home({ appState, dispNoti, login_suc }) {
  let history = useHistory();
  const state = appState;

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
    fetchUserProfile(user).then((resX) => {
      console.log(resX.body[0].meta);
      const newUserData = {
        user: {
          ...state.loggedInUser.user,
          meta: resX.body[0].meta,
        },
        meta: state.loggedInUser.meta,
      };
      // console.log(newUserData)
      login_suc(newUserData);
    });
    fetchNotification(user)
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
    console.log(compState);
    dispNoti(false);
  }, []);

  const renderNotifications = () => {
    if (compState.data) {
      return compState.data.map((e) => {
        if (e.type == "BUZZ REQUEST" || e.type == "BUZZ ALERT") {
          return (
            <>
              {console.log(compState.data)}
              <div style={{ background: "" }}>
                <div
                  style={{
                    backgroundColor: "",
                    width: "100%",
                    padding: "10px 20px",
                  }}
                >
                  <b style={{ fontSize: "13px" }}>{e.type} </b> &nbsp;&nbsp;{" "}
                  <span style={{ fontSize: "14px" }}>
                    {" "}
                    From
                    <b> {e.meta.sender.fullname.split(" ")[0]}</b>
                  </span>{" "}
                  <b
                    style={{
                      color: "#0a3d62",
                      padding: "3px 10px",
                      borderRadius: "5px",
                      float: "right",
                      fontSize: "13px",
                    }}
                  >
                    NGN {e.meta.data.amount}
                  </b>
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
                  <small>{e.meta.data.desc}</small> <br />
                  <br />
                  {e.type == "BUZZ REQUEST" && (
                    <b
                      style={{
                        background: "#0a3d62",
                        color: "white",
                        padding: "3px 10px",
                        borderRadius: "5px",
                        marginTop: "20px",
                      }}
                    >
                      {" "}
                      BUZZ {e.meta.sender.fullname.split(" ")[0]}
                      &nbsp;&nbsp; NGN {e.meta.data.amount}
                    </b>
                  )}
                </div>
              </div>
              {/* <Divider /> */}
            </>
          );
        } else if (e.type == "CASHBACK RESOLVED") {
          return (
            <>
              {console.log(compState.data)}
              <div style={{ background: "" }}>
                <div
                  style={{
                    backgroundColor: "",
                    width: "100%",
                    padding: "10px 20px",
                  }}
                >
                  <b style={{ fontSize: "13px" }}>{e.type} </b> &nbsp;&nbsp;{" "}
                  <b
                    style={{
                      color: "#0a3d62",
                      padding: "3px 10px",
                      borderRadius: "5px",
                      float: "right",
                      fontSize: "13px",
                    }}
                  >
                    NGN {e.meta.amount}
                  </b>
                  <br />
                  <span style={{ fontSize: "13px" }}>
                    {" "}
                    By
                    <b> {e.from == e.to ? 'You': e.meta.resolvedby.split(" ")[0]}</b>
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
                  <small>
                    Your generated cashback of{" "}
                    <b
                      style={{
                        color: "#0a3d62",
                        padding: "3px 4px",
                        borderRadius: "5px",
                      }}
                    >
                      NGN {e.meta.amount}
                    </b>{" "}
                    has been resolved by {e.from == e.to ? 'You': e.meta.resolvedby}
                  </small>{" "}
                  <br />
                </div>
              </div>
              {/* <Divider /> */}
            </>
          );
        }
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
          <div className="header_footer">
            {/* <Footer /> */}
            <Header />
          </div>

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
                <b>Notifications</b>
              </div>{" "}
              {compState.loader != true &&
                compState.data !== null &&
                compState.data.length > 0 && (
                  <>
                    {" "}
                    <div
                      style={{
                        width: "100%",
                        background: "white",
                        padding: "0px 3px",
                        marginLeft: "0%",
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
                  No notification
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
