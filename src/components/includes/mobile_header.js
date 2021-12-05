import "../../static/css/home/index.css";
import React, { useState } from "react";
import logo from "../../static/logos/amm.png";
import am from "../../static/logos/logo-icon.png";
import { Redirect } from "react-router-dom";
import { Dehaze, Search } from "@material-ui/icons";
import { connect } from "react-redux";
import { logOut, loginSuc, disp_noti, disp_request } from "../../redux";
import { useHistory, Link } from "react-router-dom";
import { syncDB } from "../../functions/models/index";
import {
  LocalAtm,
  Money,
  EmojiTransportationOutlined,
  SettingsOutlined,
  EventNote,
  NotificationsActiveOutlined,
  DraftsOutlined,
  SchoolOutlined,
  FiberManualRecord,
  SignalCellularConnectedNoInternet1BarOutlined,
  FileCopyOutlined,
  LibraryAddCheckOutlined,
  ExitToAppOutlined,
  EuroSymbolOutlined,
  MailOutlined,
  AccountBalanceOutlined,
} from "@material-ui/icons";

import avar from "../../static/logos/logo2.png";
import { cashbackloader } from "../../components/loading";
import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Box,
  Drawer,
  Avatar,
  Switch,
} from "@mui/material";

import { updateUserMeta } from "../../functions/models/index";
import { notificationAlert } from "../../functions/utils/index";

const select = {
  // backgroundColor: "#0a3d62",
  color: "#0a3d62",
  textAlign: "center",
};

const selected = {
  color: "mediumseagreen",
};

function Header({ appState, log_out, login_suc, dispNoti, dispRequest }) {
  const state = appState;
  let history = useHistory();

  const [checked, setChecked] = React.useState(false);
  const schoolmode = (event) => {
    switchschool(event);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const switchschool = (mood) => {
    const moodSwitch = mood.target.checked;
    let user = state.loggedInUser.user;
    let newUser = {
      ...user,
      meta: { ...state.loggedInUser.user.meta, schoolmode: moodSwitch },
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
        setChecked(moodSwitch);
        // setDrawerState({ ...drawerState, ["left"]: false });
        setStates({
          ...compState,
          done: true,
          loader: false,
        });
      } else {
        console.log(res);
        setStates({
          ...compState,
          done: true,
          loading: false,
        });
      }
    });
  };

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
        <small
          style={{ float: "right", marginRight: "30px", color: "crimson" }}
        >
          <DraftsOutlined /> <br />
          <small>Draft</small>
        </small>
      </List>

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
      {/* <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/listmart");
        }}
        style={{ padding: "15px" }}
      >
        <StorefrontOutlined /> &nbsp;
        <span>Aluta market</span> 
      </List>
      <Divider /> */}
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
          history.push("/transfer");
        }}
        style={{ padding: "15px" }}
      >
        <AccountBalanceOutlined /> &nbsp;
        <span>Deposit from bank</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />

      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/transfer");
        }}
        style={{ padding: "15px", background: "", opacity: "0.2" }}
      >
        <AccountBalanceOutlined /> &nbsp;
        <span>Withdraw to bank</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />

      {/* <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false }); 
        }}
        style={{ padding: "15px" }}
      >
        <AddShoppingCart /> &nbsp;
        <span>Create market front</span> 
      </List>

      <Divider /> */}

      <>
        {" "}
        <List
          // onClick={() => {
          //   setDrawerState({ ...drawerState, ["left"]: false });
          //   history.push("/setschool");
          // }}
          style={{ padding: "15px" }}
        >
          <SchoolOutlined /> &nbsp;
          <span>School mode</span>
          <div style={{ display: "inline-block", float: "right" }}>
            <Switch
              style={{ float: "right" }}
              checked={state.loggedInUser.user.meta.schoolmode}
              onChange={schoolmode}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </List>
        <Divider />
      </>

      {/* <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/updateprofile");
        }}
        style={{ padding: "15px" }}
      >
        <SettingsOutlined /> &nbsp;
        <span>Settings</span> 
      </List>

      <Divider /> */}

      <List
        onClick={() => {
          setStates({ ...compState, copy: true });
          navigator.clipboard.writeText(
            // state.loggedInUser.user.meta.beneficiaryId
            "hello"
          );
        }}
        style={{ padding: "15px" }}
      >
        {compState.copy == true ? (
          <LibraryAddCheckOutlined style={selected} />
        ) : (
          <FileCopyOutlined />
        )}
        &nbsp;&nbsp;
        {state.loggedInUser.user.meta.beneficiaryId}
        <b
          style={{ float: "right", marginRight: "10px", color: "orange" }}
          onClick={() => {
            log_out();
          }}
        >
          <ExitToAppOutlined />
        </b>
      </List>

      <Divider />

      <List style={select}>
        <div style={{fontSize:"11px",textAlign:"left",padding:"10px"}}>
          Upgrade your account to be able to withdraw to your bank.
        </div>
      </List>
    </Box>
  );

  return  state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div>
      {compState.loader === true && <> {cashbackloader()} </>}
      {console.log(checked)}
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
          <ListItemAvatar
            onClick={() => {
              history.push("/");
            }}
          >
            {/* <img alt="Aluta Meter" style={{width:"70px"}}  src={logo}/>  */}
            {/* <img alt="Aluta Meter" style={{ width: "60px" }} src={am} /> */}
            <div
              style={{ marginLeft: "15px", fontSize: "35px", color: "#0a3d62" }}
            >
              <b>
                B
                <EuroSymbolOutlined
                  style={{ transform: "rotateZ(-90deg)", fontSize: "35px" }}
                />
                zz
              </b>
            </div>
          </ListItemAvatar>{" "}
          &nbsp;&nbsp;
          {/* <b><ListItemText
            style={{color:"white"}}
                  primary={state.loggedInUser.user.meta.school}
                  secondary="+99 new activities"
          /></b> */}
          <NotificationsActiveOutlined
            onClick={() => {
              dispNoti(false);
              history.push("/notification");
            }}
            className="menu"
            style={{
              color: state.notification === true ? "red" : "#0a3d62",
              position: " absolute",
              right: "75px",
            }}
          />
          <MailOutlined
            onClick={() => {
              dispRequest(false);
              // history.push("/notification")
            }}
            className="menu"
            style={{
              color: state.request === true ? "red" : "#0a3d62",
              position: " absolute",
              right: "140px",
            }}
          />
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

        {state.loggedInUser.user.meta.schoolmode === true && (
          <>
            <div
              style={{
                color: "#0a3d62",
                fontSize: "15px",
                marginTop: "-40px",
                padding: "0px 13px",
              }}
            >
              <br />
              {state.loggedInUser.user.meta.school != null && (
                <> @{state.loggedInUser.user.meta.school} </>
              )}{" "}
            </div>{" "}
          </>
        )}
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
    dispNoti: (payload) => dispatch(disp_noti(payload)),
    dispRequest: (bolean) => dispatch(disp_request(bolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
