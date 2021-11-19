import React, { useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
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

import { getUserController } from "../functions/controllers/account";

function Home({ appState, login_suc }) {
  let history = useHistory();
  const state = appState;
  const { profileId, userId } = useParams();

  React.useEffect((compState) => {
    window.scrollTo(0, 0);

    getUserController(userId).then((res) => {
      const userReAuth = {
        user: res.body[0],
        meta: state.loggedInUser.meta,
      };
      login_suc(userReAuth);
    });
  }, []);

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      <>
        <div className="mobile">{profileId}</div>
        {userId}

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
