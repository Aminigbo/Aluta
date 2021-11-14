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
import { updateUserSchool } from "../functions/models/index";
import Search from "search-react-input";

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
    updateUserSchool(payload).then((res) => {
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
            <br />
            <div
              style={{
                marginTop: "60px",
                width: "80%",
                marginLeft: "5%",
                backgroundColor: " ",
                textAlign: "center",
              }}
            >
              <Search
                width="90vw"
                spellcheck={true}
                placeholder="Search for your school..."
                options={countries}
                onChange={(option, e) => setCapturedSearch(option)}
              />{" "}
            </div>
            <br />
            <br />
            <div
              style={{
                marginTop: "10px",
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
                      <img style={{ width: "40px" }} src={capturedSearch.img} />
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
