import "../../static/css/home/index.css";
import React, { useState } from "react";
import logo from "../../static/logos/amm.png";
import am from "../../static/logos/logo-icon.png";
import { Dehaze, Search } from "@material-ui/icons";
import { connect } from "react-redux";
import { logOut,loginSuc } from "../../redux";
import Naira from "react-naira";
import { useHistory, Link } from "react-router-dom";
import { syncDB } from "../../functions/models/index";
import {
  LocalAtm,
  Money,
  EmojiTransportationOutlined,
  CardGiftcardOutlined,
  StorefrontOutlined,
  SettingsOutlined,
  EventNote,
  AccountBalanceWallet,
  Receipt,
  AddShoppingCart,
  DraftsOutlined,
  SchoolOutlined,
  FiberManualRecord,
  SignalCellularConnectedNoInternet1BarOutlined,
  FileCopyOutlined,
  LibraryAddCheckOutlined,
  ExitToAppOutlined,
} from "@material-ui/icons";

import avar from "../../static/logos/logo2.png";
import { supabase } from "../../configurations/index";
import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Box,
  Drawer,
  Avatar,
} from "@mui/material";

import {updateUserMeta} from "../../functions/models/index"

const select = {
  // backgroundColor: "#0a3d62",
  color: "#0a3d62",
  textAlign: "center",
};

const selected = {
  color: "mediumseagreen",
};

function Header({ appState, log_out, login_suc }) {
  const state = appState;
  let history = useHistory();

  const signoutfromschool = ()=>{
let user = state.loggedInUser.user;
    let newUser = {
      ...user,
      meta: { ...state.loggedInUser.user.meta, school: null },
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
  }

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });
  const [compState, setStates] = useState("");

  const toggleDrawer = (anchor, open, post) => (event) => {
    console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const list = () => (
    <Box sx={{ width: 270, height: "400px" }} role="presentation">
      <List>
        <img alt="Aluta Meter" style={{ width: "120px" }} src={logo} />
        <small
          style={{ float: "right", marginRight: "30px", color: "crimson" }}
        >
          <DraftsOutlined /> <br />
          <small>Draft</small>
        </small>
        <div
          style={{ padding: "0px 10px", fontSize: "13px", color: "#0a3d62" }}
        >
          {state.loggedInUser.user.meta.school !== null && (
            <b>@{state.loggedInUser.user.meta.school}</b>
          )}
        </div>
      </List>
      <Divider />

      <List
        style={{ padding: "5px" }}
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push(
            `profile/${state.loggedInUser.user.fullname}/${state.loggedInUser.user.id}`
          );
        }}
      >
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
        <div
          style={{
            width: " ",
            padding: "3px",
            background: " ",
            display: "inline-block",
          }}
        >
          <Avatar
            style={{ float: " " }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          >
            {state.loggedInUser.user.fullname[0]}
          </Avatar>
        </div>
        &nbsp;&nbsp;<span>{state.loggedInUser.user.fullname}</span>
        {/* <div style={{ textAlign: "center" }}>
          <b style={{ color: "#0a3d62", fontSize: "14px" }}>
            {state.loggedInUser.user.meta.wallet} <s>BUZ</s>
          </b>
        </div> */}
      </List>

      <Divider />
      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/giveaway");
        }}
        style={{ padding: "15px" }}
      >
        <Money /> &nbsp;
        <span>Give away</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />
      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/events");
        }}
        style={{ padding: "15px" }}
      >
        <EventNote /> &nbsp;
        <span>Events</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />
      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/listmart");
        }}
        style={{ padding: "15px" }}
      >
        <StorefrontOutlined /> &nbsp;
        <span>Aluta market</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />
      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/tour");
        }}
        style={{ padding: "15px" }}
      >
        <EmojiTransportationOutlined /> &nbsp;
        <span>Campus tour</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />
      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/transfer");
        }}
        style={{ padding: "15px" }}
      >
        <LocalAtm /> &nbsp;
        <span>Buz me</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />
      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          // history.push("/giveaway");
        }}
        style={{ padding: "15px" }}
      >
        <AddShoppingCart /> &nbsp;
        <span>Create market front</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>

      <Divider />

      {state.loggedInUser.user.meta.school === null ? (
        <>
          {" "}
          <List
            onClick={() => {
              setDrawerState({ ...drawerState, ["left"]: false });
              history.push("/setschool");
            }}
            style={{ padding: "15px" }}
          >
            <SchoolOutlined /> &nbsp;
            <span>Add school</span>
            {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
          </List>
          <Divider />
        </>
      ) : 
       <>
          {" "}
          <List
            onClick={() => {
              setDrawerState({ ...drawerState, ["left"]: false });
              signoutfromschool()
            }}
            style={{ padding: "15px" }}
          >
            <SchoolOutlined /> &nbsp;
            <span>Leave school</span>
            {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
          </List>
          <Divider />
        </>}

      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/updateprofile");
        }}
        style={{ padding: "15px" }}
      >
        <SettingsOutlined /> &nbsp;
        <span>Settings</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>

      <Divider />

      <List style={select}>
        <b
          style={{ float: "left", marginLeft: "10px" }}
          onClick={() => {
            setStates({ ...compState, copy: true });
            navigator.clipboard.writeText(
              state.loggedInUser.user.meta.beneficiaryId
            );
          }}
        >
          {" "}
          {state.loggedInUser.user.meta.beneficiaryId} &nbsp;&nbsp;
          {compState.copy == true ? (
            <LibraryAddCheckOutlined style={selected} />
          ) : (
            <FileCopyOutlined />
          )}
        </b>

        <b
          style={{ float: "right", marginRight: "10px", color: "orange" }}
          onClick={() => {
            log_out();
          }}
        >
          <ExitToAppOutlined />
        </b>

        <b
          style={{ float: "right", marginRight: "10px", color: "crimson" }}
          onClick={() => {
            syncDB().then((res) => {
              alert(res.message);
            });
          }}
        >
          <ExitToAppOutlined />
        </b>
      </List>
    </Box>
  );

  return (
    <div>
      <div>
        {state.signal == false && (
          <div
            style={{
              padding: " ",
              background: "crimson",
              position: "sticky",
              top: "0px",
              zIndex: "1000",
              color: "white",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            You are currently offline &nbsp;{" "}
            <SignalCellularConnectedNoInternet1BarOutlined />
          </div>
        )}
        <ListItem
          style={{
            marginTop: "0px",
            background: " ",
            position: "sticky",
            top: "0px",
            zIndex: "1000",
            padding: "15px 0px",
            color: "white",
          }}
        >
          <ListItemAvatar>
            {/* <img alt="Aluta Meter" style={{width:"70px"}}  src={logo}/>  */}
            <img alt="Aluta Meter" style={{ width: "60px" }} src={am} />
          </ListItemAvatar>{" "}
          &nbsp;&nbsp;
          {/* <b><ListItemText
            style={{color:"white"}}
                  primary={state.loggedInUser.user.meta.school}
                  secondary="+99 new activities"
          /></b> */}
          <b style={{ color: "#0a3d62", fontSize: "15px" }}>
            {state.loggedInUser.user.meta.school === null ? (
              <div style={{ marginLeft: "50px" }}>Aluta-Meter</div>
            ) : (
              <> @{state.loggedInUser.user.meta.school} </>
            )}
          </b>
          <Dehaze
            style={{ color: "#0a3d62", position: " absolute", right: "10px" }}
            className="menu"
            onClick={toggleDrawer("left", true)}
          />
          {state.draft.length > 0 && (
            <span
              onClick={toggleDrawer("left", true)}
              style={{
                color: "crimson",
                position: " absolute",
                right: "10px",
                fonrSize: "30px",
                top: "0px",
              }}
            >
              <FiberManualRecord />
            </span>
          )}
        </ListItem>
      </div>

      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open={drawerState["left"]}
          onClose={toggleDrawer("left", false, false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
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
    log_out: () => dispatch(logOut()), 
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
