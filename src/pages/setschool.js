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
import { cashbackloader } from "../components/loading";
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
      meta: { ...state.loggedInUser.user.meta, school: school.label },
    };
    let payload = {
      email: user.email,
      newUser: newUser.meta,
    };

    const data = {
      user: newUser,
      meta: state.loggedInUser.meta,
    };

    console.log(payload);

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
          loading: false,
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
      {state.loggedInUser.user.meta.school !== null ? (
        history.push("/")
      ) : (
        <>
          {compState.loading === true && <>{cashbackloader()} </>}
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
                    {/* <div className="realtimeHeader" style={smile}>
                  Add your university
                </div> */}
                    <div className="realtimeBody">
                      <b> Welcome {state.loggedInUser.user.fullname}</b> <br />
                      <br />
                      Add your university to get in touch with your schoolmates
                      .
                      <div className="description">
                        Get the latest happening around the univers
                      </div>{" "}
                      <div
                        style={{
                          marginTop: "20px",
                          // width: "80%",
                          // marginLeft: "5%",
                          background: " ",
                          textAlign: "center",
                        }}
                      >
                        <br />
                        <Search
                          width="80vw"
                          spellcheck={true}
                          placeholder="Search for your school..."
                          options={countries}
                          onChange={(option, e) => setCapturedSearch(option)}
                        />{" "}
                      </div>{" "}
                      <br />
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div
                  style={{
                    marginTop: "-10px",
                    width: "90%",
                    marginLeft: "5%",
                    backgroundColor: " ",
                    textAlign: "center",
                  }}
                >
                  {capturedSearch && (
                    // "Hello and welcome to " + capturedSearch.label}
                    <ListItem
                      style={{ background: "lightgray", borderRadius: "4px" }}
                      onClick={() => {
                        setSchool(capturedSearch);
                      }}
                    >
                      {compState.loader && (
                        <div className="loader">
                          {" "}
                          <LinearProgress />
                          {compState.done == true && (
                            <div
                              style={{
                                position: "relative",
                                top: "40%",
                                color: "white",
                                textAlign: "center",
                              }}
                            >
                              You have successfully updated your school
                            </div>
                          )}
                        </div>
                      )}
                      <ListItemAvatar>
                        <Avatar>
                          <img
                            style={{ width: "40px" }}
                            src={capturedSearch.img}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={capturedSearch.label}
                        // secondary="+99 new activities"
                      />
                    </ListItem>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Desktopleft />
          <Desktopright />
        </>
      )}
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
