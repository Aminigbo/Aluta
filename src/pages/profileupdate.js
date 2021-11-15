import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";
import { LinearProgress } from "@material-ui/core";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import Toppills from "../components/includes/topdesktoppills";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { allUniversities } from "../functions/utils/index";
import { updateUserMeta } from "../functions/models/index";
import Search from "search-react-input";

const smile = {
  color: "white",
  fontSize: "20px",
};

function Home({ appState, login_suc }) {
  const countries = allUniversities();
  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
  });
  const [capturedSearch, setCapturedSearch] = useState(null);

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
  }, []);

  const setSchool = (school) => {
    let user = state.loggedInUser.user;
    let newUser = {
      ...user,
      meta: { ...user.meta, school: school.label },
    };
    let payload = {
      email: user.email,
      newUser,
    };

    const data = {
      user: newUser,
      meta: state.loggedInUser.meta,
    };

    setStates({
      ...compState,
      loader: true,
    });
    updateUserMeta(payload).then((res) => {
      if (res.success == true) {
        login_suc(data);
        setTimeout(() => history.push("/"), 2000);
        setStates({
          ...compState,
          done: true,
          loader: true,
        });
      } else {
        setStates({
          ...compState,
          done: true,
        });
      }
    });
  };

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  let history = useHistory();
  const state = appState;

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
  }, []);

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
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
            <div className=" " style={{ marginTop: "10px" }}>
              <div className="realtimeParent">
                <div className="realtimeHeader" style={smile}>
                  Update your profile
                </div>
                <div className="realtimeBody" style={{fontSize:"13px"}}>
                  Update your details, this will help us serve you with the right contents .
                  <div className="description">
                    {/* @+============= set phone number */}
                    <div
                      style={{
                        padding: "10px",
                        background: "#f3f3f3",
                        borderRadius: "6px",
                        height: " ",
                      }}
                    >
                      <div>
                        <b>CONTACT</b>
                      </div>{" "}
                      <div style={{ marginTop: "10px" }}>
                        <b style={{ fontSize: "17px" }}>
                          {state.loggedInUser.user.phone}
                        </b>{" "}
                        <br />
                        <b style={{ fontSize: "17px" }}>
                          {state.loggedInUser.user.email}
                        </b>{" "}
                        <br />
                        <br />
                        <input
                          placeholder="Add phone number"
                          style={{
                            margin: "7px 0px",
                            border: "none",
                            borderBottom: "1px solid lightgray",
                            padding: "6px",
                            borderRadius: "6px",
                             width: "100%",
                            outline:"none"
                          }}
                        />
                      </div>
                    </div>{" "}
                    <br />
                    {/* @=========  date of birth section */}
                    <div
                      style={{
                        padding: "10px",
                        background: "#f3f3f3",
                        borderRadius: "6px",
                        height: " ",
                      }}
                    >
                      {console.log(state.loggedInUser.user)}
                      <div>
                        <b>DATE OF BIRTH</b>
                      </div>{" "}
                      <div style={{ marginTop: "10px" }}>
                        {state.loggedInUser.user.meta.DOB === null ? (
                          <>
                            <input
                              type="date"
                              style={{
                                margin: "7px",
                                border: "none",
                                borderBottom: "1px solid lightgray",
                                padding: "6px",
                                 borderRadius: "6px",
                                 outline:"none"
                              }}
                            />
                            <select
                              style={{
                                margin: "7px",
                                border: "none",
                                borderBottom: "1px solid lightgray",
                                padding: "6px",
                                                  borderRadius: "6px",
                                 outline:"none"
                              }}
                            >
                              <option>Privacy</option>
                              <option>Only me</option>
                              <option>Public</option>
                            </select>{" "}
                          </>
                        ) : (
                          <>
                            {" "}
                            <br />{" "}
                            <span
                              style={{
                                margin: "7px",
                                border: "none",
                                borderBottom: "1px solid lightgray",
                                padding: "10px 60px",
                                borderRadius: "6px",
                                background: "gray",
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "bold",
                              }}
                            >
                              21-05-2021
                            </span>{" "}
                            <br />
                            <br />{" "}
                          </>
                        )}
                      </div>
                    </div>{" "}
                    <br />
                    {/* @============== gender section */}
                    <div
                      style={{
                        padding: "10px",
                        background: "#f3f3f3",
                        borderRadius: "6px",
                        height: " ",
                      }}
                    >
                      <div>
                        <b>GENDER</b>
                      </div>{" "}
                      <div style={{ marginTop: "10px" }}>
                        {state.loggedInUser.user.meta.gender !== null ? (
                          <>
                            <div>
                              <br />
                              <span
                                style={{
                                  margin: "7px",
                                  border: "none",
                                  borderBottom: "1px solid lightgray",
                                  padding: "6px 20px",
                                  borderRadius: "6px",
                                  background: "#0a3d62",
                                  color: "white",
                                }}
                              >
                                {state.loggedInUser.user.meta.gender}
                              </span>{" "}
                              <br /> <br />
                            </div>
                          </>
                        ) : (
                          <>
                            <select
                              style={{
                                margin: "7px 0px",
                                border: "none",
                                borderBottom: "1px solid lightgray",
                                padding: "6px",
                                borderRadius: "6px",
                                                     width: "100%",
                                 outline:"none"
                              }}
                            >
                              <option>Your gender</option>
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                          </>
                        )}
                      </div>{" "}
                      <br />
                      <button
                        style={{
                          margin: "10px 0px",
                          width: "100%",
                          padding: "10px",
                          border: "none",
                          borderRadius: "6px",
                          background: "#0a3d62",
                                         color: "white",
                           outline:"none"
                        }}
                      >
                        UPDATE
                      </button>
                    </div>
                  </div>{" "}
                  <br />
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>

      <Desktopleft />
      <Desktopright />
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
