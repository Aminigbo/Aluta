import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";
// import { LinearProgress } from "@material-ui/core";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import Toppills from "../components/includes/topdesktoppills";
// import { allUniversities } from "../functions/utils/index";
import { updateUserMeta } from "../functions/models/index";
// import { LanguageOutlined } from "@material-ui/icons";
import { cashbackloader } from "../components/loading";
// @=== import success response from worker function
import { alert } from "../functions/workers_functions/alert";
const smile = {
  color: "white",
  fontSize: "20px",
};

function Home({ appState, login_suc }) {
  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
  });

  const [stateAlert, setStateAlert] = useState("");

  let history = useHistory();
  const state = appState;
  const [startDate, setStartDate] = useState(new Date());

  const year = () => {
    let mins = [];
    for (let i = 1970; i < 2006; i++) {
      mins.push(i);
    }
    // console.log(mins);
    return mins.map((MM) => {
      return <option>{MM}</option>;
    });
  };

  const month = () => {
    let mins = [];
    for (let i = 1; i < 32; i++) {
      mins.push(i);
    }
    // console.log(mins);
    return mins.map((MM) => {
      return <option>{MM}</option>;
    });
  };

  const day = () => {
    let mins = [];
    for (let i = 1; i < 32; i++) {
      mins.push(i);
    }
    // console.log(mins);
    return mins.map((MM) => {
      return <option>{MM}</option>;
    });
  };

  const [update, setUpdate] = useState({
    day: null,
    month: null,
    year: null,
    newPhone: null,
    gender: null,
    error: false,
  });

  const updateBtn = () => {
    if (
      update.day == null ||
      update.year == null ||
      update.month == null ||
      update.gender == null
    ) {
      setUpdate({
        ...update,
        error: true,
      });

      setStates({
        ...compState,
        loader: false,
        alertMsg: "Please fill out all fields to continue",
      });

      setStateAlert(false);
    } else {
      let DOB = update.day + "-" + update.month + "-" + update.year;
      let user = state.loggedInUser.user;
      
      let newUser = {
      ...user,
      meta: {...state.loggedInUser.user.meta, DOB: DOB, gender: update.gender },
    };
    let payload = {
      email: user.email,
      newUser:newUser.meta,
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
          // setTimeout(() => history.push("/"), 2000);
          setStateAlert(true);
          setStates({
            ...compState,
            alertMsg:
              "Your profile is set and ready to be recognized. Have fun while you explore Buzz",
          });
        } else {
          setStateAlert(false);
          setStates({
            ...compState,
            loader: false,
            alertMsg:
              "We could not complete this action due to network failure",
          });
          console.log(res);
        }
      });
    }
  };

  let successPayload = {
    title: "SUCCESS",
    msg: compState.alertMsg,
    error: false,
  };

  let errorPayload = {
    title: "error",
    msg: compState.alertMsg,
    error: true,
  };

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
  }, []);

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div>
      <div id="body bg">
        {stateAlert === null && <span>{history.push("/")}</span>}
        {stateAlert === true && alert(successPayload, setStateAlert)}
        {stateAlert === false && alert(errorPayload, setStateAlert)}
        <div className="mobile">
          <div className="header_footer">
            {console.log(compState)}
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
                  {/* <div className="realtimeHeader" style={smile}>
                    Update your profile
                  </div> */}
                  <div className="realtimeBody" style={{ fontSize: "13px" }}>
                    Update your details, this will help us serve you with the
                    right contents .
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
                        <div style={{ marginTop: "10px", color: "gray" }}>
                          <span style={{ fontSize: "17px", color: "gray" }}>
                            {state.loggedInUser.user.phone}
                          </span>{" "}
                          <br />
                          <span style={{ fontSize: "17px" }}>
                            {state.loggedInUser.user.email}
                          </span>{" "}
                          <br />
                          {/* <br />
                        <input
                          onChange={(e) => {
                            setUpdate({
                              ...update,
                              newPhone: e.target.value,
                              error: false,
                            });
                          }}
                          placeholder="Add phone number"
                          style={{
                            margin: "7px 0px",
                            border: "none",
                            borderBottom: "1px solid lightgray",
                            padding: "6px",
                            borderRadius: "6px",
                            width: "100%",
                            outline: "none",
                          }}
                        /> */}
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
                              <select
                                onChange={(e) => {
                                  setUpdate({
                                    ...update,
                                    year: e.target.value,
                                  });
                                }}
                                type="number"
                                style={{
                                  margin: "7px 4px",
                                  border: "none",
                                  borderBottom: "1px solid lightgray",
                                  padding: "4px",
                                  borderRadius: "6px",
                                  outline: "none",
                                  width: "65px",
                                }}
                              >
                                <option>Year</option>
                                {year()}
                              </select>
                              <select
                                onChange={(e) => {
                                  setUpdate({
                                    ...update,
                                    month: e.target.value,
                                  });
                                }}
                                type="number"
                                style={{
                                  margin: "7px 4px",
                                  border: "none",
                                  borderBottom: "1px solid lightgray",
                                  padding: "4px",
                                  borderRadius: "6px",
                                  outline: "none",
                                  width: "70px",
                                }}
                              >
                                <option>Month</option>
                                {month()}
                              </select>
                              <select
                                onChange={(e) => {
                                  setUpdate({
                                    ...update,
                                    day: e.target.value,
                                  });
                                }}
                                type="number"
                                style={{
                                  margin: "7px 4px",
                                  border: "none",
                                  borderBottom: "1px solid lightgray",
                                  padding: "4px",
                                  borderRadius: "6px",
                                  outline: "none",
                                  width: "60px",
                                }}
                              >
                                <option>Day</option>
                                {day()}
                              </select>
                              {/* <LanguageOutlined
                              style={{
                                marginLeft: "22px",
                                border: "none",
                                borderBottom: "1px solid lightgray",
                                padding: "0px",
                                borderRadius: "6px",
                                outline: "none",
                                width: "",
                              }}
                            />{" "} */}
                            </>
                          ) : (
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
                                    background: "gray",
                                    color: "white",
                                  }}
                                >
                                  {state.loggedInUser.user.meta.DOB}
                                </span>{" "}
                                <br /> <br />
                              </div>
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
                                    background: "gray",
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
                                onChange={(e) => {
                                  setUpdate({
                                    ...update,
                                    gender: e.target.value,
                                  });
                                }}
                                style={{
                                  margin: "7px 0px",
                                  border: "none",
                                  borderBottom: "1px solid lightgray",
                                  padding: "6px",
                                  borderRadius: "6px",
                                  width: "100%",
                                  outline: "none",
                                }}
                              >
                                <option>Your gender</option>
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                            </>
                          )}
                        </div>{" "}
                      </div>
                      <br />
                      <button
                        onClick={() => {
                          updateBtn();
                        }}
                        style={{
                          margin: "10px 0px",
                          width: "100%",
                          padding: "10px",
                          border: "none",
                          borderRadius: "6px",
                          background: "#0a3d62",
                          color: "white",
                          outline: "none",
                        }}
                      >
                        UPDATE
                      </button>
                    </div>{" "}
                    <br />
                  </div>

                   {compState.loader === true && <>{cashbackloader()} </>}
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>

        <Desktopleft />
        <Desktopright />
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
