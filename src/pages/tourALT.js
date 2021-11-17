import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";
import Footer from "../components/includes/mobile_footer.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut } from "../redux";
import Toppills from "../components/includes/topdesktoppills";

// import {ListItem,List,ListItemText,Divider} from '@mui/material/ListItem';
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar"; 
import Divider from "@mui/material/Divider";
import {allUniversities} from "../functions/utils/index"
function Home({ appState }) {



  let listOfSchools = () => {
    allUniversities().sort(function (a, b) {
      return parseFloat(b.value) - parseFloat(a.value);
    });
    return allUniversities().map(schl => { 
      return (
        <>
          <ListItem
                  onClick={() => {
                    history.push(`touring/${schl.label}`);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <img style={{width:"40px"}} src={schl.img} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={schl.label}
                    // secondary="+99 new activities"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
          </>
      )
    })
  }

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
            </div>

            <div animateIn="fadeIn">
              <div style={{ padding: "5px 10px",color:"lightgray" }}>
                <b>Take a tour round other universities</b>
              </div>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                 {listOfSchools()}
              </List>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
