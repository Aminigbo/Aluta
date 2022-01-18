import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import { FcRating } from "react-icons/fc";
import Naira from "react-naira";

import Header from "../components/includes/mobile_header.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import {
  add_wallet,
  logOut,
  loginSuc,
  disp_noti,
  disp_whoRequested,
} from "../redux";
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

function Home({ appState, dispNoti, login_suc, dispWho }) {
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
      // console.log(resX.body[0].meta);

      if (resX.body && resX.body.length > 0) {
        const newUserData = {
          user: {
            ...state.loggedInUser.user,
            meta: resX.body[0].meta,
          },
          meta: state.loggedInUser.meta,
        };
        // console.log(newUserData)
        login_suc(newUserData);
      } else {
        console.log(resX);
      }
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
                  {e.type == "BUZZ REQUEST" && <>
                  
                    {e.isRead === false ? (
                      <>
                        <div style={{ marginTop: "20px" }}>
                          <b
                            onClick={() => {
                              console.log("Hello");

                              let data = {
                                id: e.id,
                                buzzId: e.meta.sender.beneficiaryId,
                                name: e.meta.sender.fullname,
                                desc: e.meta.data.desc,
                                amount: e.meta.data.amount,
                              };
                              dispWho(data);
                              history.push("/req-response");
                            }}
                            style={{
                              background: "#0a3d62",
                              color: "white",
                              padding: "3px 10px",
                              borderRadius: "5px",
                            }}
                          >
                            {" "}
                            {e.meta.sender.fullname.split(" ")[0]}
                            &nbsp;&nbsp; NGN {e.meta.data.amount}
                          </b>
                        </div>
                      </>
                    ) :
                      <div style={{ marginTop: "20px" }}>
                        <b
                          style={{
                            background: "lightgray",
                            color: "black",
                            padding: "3px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          {" "}
                          Buzzed {e.meta.sender.fullname.split(" ")[0]}
                          &nbsp;&nbsp; NGN {e.meta.data.amount}
                        </b>
                      </div>
                    }
                  
                  </>}
                  <br />
                  {/* <small>
                    {e.meta.date.day} {e.meta.date.date} {e.meta.date.month},{" "}
                    {e.meta.date.year}
                  </small>{" "}
                  &nbsp;&nbsp;{" "}
                  <small style={{ float: "right" }}>{e.meta.date.time}</small> */}
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
                    <Naira>{e.meta.tokenamount}</Naira>
                  </b>
                  <br />
                  <span style={{ fontSize: "13px" }}>
                    {" "}
                    By
                    <b>
                      {" "}
                      {e.from == e.to ? "You" : e.meta.resolvedby.split(" ")[0]}
                    </b>
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
                      <Naira>{e.meta.tokenamount}</Naira>
                    </b>{" "}
                    has been resolved by{" "}
                    {e.from == e.to ? "You" : e.meta.resolvedby}
                  </small>{" "}
                  <br />
                  <br />
                  <small>
                    <span style={{ color: "crimson" }}>Service charge</span>:
                    &nbsp;
                    <div
                      style={{
                        float: "right",
                        width: "50%",
                        textAlign: "left",
                      }}
                    >
                      <Naira>
                        {e.meta.amountPlusCharge - e.meta.tokenamount}
                      </Naira>
                    </div>
                  </small>{" "}
                  <br />
                  <small>
                    <span style={{ color: "crimson" }}>Amount debited</span>:
                    &nbsp;
                    <div
                      style={{
                        float: "right",
                        width: "50%",
                        textAlign: "left",
                      }}
                    >
                      <Naira>{e.meta.amountPlusCharge}</Naira>
                    </div>
                  </small>{" "}
                  <br />
                  <small>
                    <span style={{ color: "crimson" }}>Resolved by</span>:
                    &nbsp;
                    <div
                      style={{
                        float: "right",
                        width: "50%",
                        textAlign: "left",
                      }}
                    >
                      <b>{e.from == e.to ? "You" : e.meta.resolvedby}</b>
                    </div>
                  </small>
                  <br /> <br />
                  <small>
                    {e.meta.date.day} {e.meta.date.date} {e.meta.date.month},{" "}
                    {e.meta.date.year}
                  </small>{" "}
                  &nbsp;&nbsp;{" "}
                  <small style={{ float: "right" }}>{e.meta.date.time}</small>
                </div>
              </div>
              {/* <Divider /> */}
            </>
          );
        } else {
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
                    <span style={{ fontSize: "14px" }}>
                      {" "}
                      <FcRating />
                    </span>{" "}
                    {e.meta.amount}
                  </b>
                  <br />
                  <span style={{ fontSize: "13px" }}>
                    {" "}
                    By
                    <b> {/* {e.meta.from.split(" ")[0]} */}</b>
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
                    You have received{" "}
                    <b
                      style={{
                        color: "#0a3d62",
                        padding: "3px 4px",
                        borderRadius: "5px",
                      }}
                    >
                      {e.meta.amount} Buzz coin(s)
                    </b>{" "}
                    as referrer bonus from {e.meta.from}'s cashback transaction
                  </small>{" "}
                  <br /> <br />
                  <small>
                    {e.meta.date.day} {e.meta.date.date} {e.meta.date.month},{" "}
                    {e.meta.date.year}
                  </small>{" "}
                  &nbsp;&nbsp;{" "}
                  <small style={{ float: "right" }}>{e.meta.date.time}</small>
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
    dispWho: (who) => dispatch(disp_whoRequested(who)),
  };
};
// disp_whoRequested
export default connect(mapStateToProps, mapDispatchToProps)(Home);
