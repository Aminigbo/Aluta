import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import { add_wallet, logOut, loginSuc, disp_session } from "../redux";
import {
  Backspace,
  KeyboardBackspace,
  LockOpenOutlined,
  Lock,
  ArrowBackIosOutlined,
  PeopleAltOutlined,
  PublicOutlined,
  CloseOutlined,
} from "@material-ui/icons";
import Naira from "react-naira";
import { Drawer, Divider, alertTitleClasses } from "@mui/material";
import { supabase } from "../configurations";
import { cashbackloader } from "../components/loading";
import { alert } from "../functions/workers_functions/alert";
import {
  send_buzz_alert,
  buzz_request,
} from "../functions/workers_functions/notifications";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { fetchUsersOfUniversity } from "../functions/models/index";
import { handleCreateRequest } from "../functions/controllers/requestbuz";

const rec_inputs = {
  margin: "0px 5%",
  width: "90%",
  padding: "4px 2px",
  border: "5px",
  height: "60px",
  borderBottom: "0.5px solid grey",
  // backgroundColor: "#f4f6f7",
  color: "#4e7a97",
  outline: "none",
  fontSize: "13px",
  resize: "none",
};

const rec_inputs3 = {
  // margin: "5%",
  width: "100%",
  padding: "4px",
  border: "5px",
  height: "70px",
  border: "0.3px solid lightgrey",
  // backgroundColor: "#f4f6f7",
  color: "#4e7a97",
  outline: "none",
  fontSize: "13px",
  resize: "none",
  marginTop: "10px",
  borderRadius: "4px",
};

const rec_inputs2 = {
  margin: "3px 5%",
  width: "90%",
  padding: "4px 2px",
  border: "5px",
  // height: "630px",
  // borderBottom: "0.5px solid grey",
  // backgroundColor: "#f4f6f7",
  color: "#4e7a97",
  outline: "none",
  fontSize: "13px",
  resize: "none",
};

let modal_footer2_btn_holder = {
  // position: 'absolute',
  marginTop: "15px",
  marginBottom: "10px",
  // backgroundColor: '#f3f3f3',
  width: "100%",
  opacity: "70000",
};

let action_btn_success2 = {
  // background:"#1e272e",
  backgroundColor: "#2C3A47",
  // background:"#58B19F",
  padding: "2px 14px",
  marginLeft: "5%",
  color: "white",
  borderRadius: "3px",
  float: " ",
  border: "none",
  width: "90%",
};

function Home({ appState, login_suc, logout, set_session }) {
  const state = appState;
  const history = useHistory();
  const new_supabase = supabase();
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [max, setMax] = useState("");
  const [pin, setPin] = useState("");
  const [compState, setStates] = useState("");
  const [pinError, setpinError] = useState("");
  const [proceedSend, setProceedSend] = useState(false);
  const [proceedAuth, setProceedAuth] = useState(false);
  const [beneficiary, setbeneficiary] = useState(state.whoRequested.buzzId);
  const [verifyError, setverifyError] = useState("");
  const [finallySend, setFinallysend] = useState("");
  const [stateAlert, setStateAlert] = useState("");
  const [actionType, setActiontype] = useState(null); // set treu if action type is send else set false if action type is request
  const [maxDesc, setMaxDesc] = useState(false);
  // @==== RESET ALL STATE UON SUCCESS
  const sendToDefault = () => {
    setProceedSend(false);
    setbeneficiary("");
    setActiontype(null);
    setPin("");
    setAmount(0);
    setDrawerState({ ...drawerState, bottom: false });
    setStates("");
    history.push("/notification");
  };
  const validate = () => {
    const data = {
      user: state.loggedInUser.user,
      meta: state.loggedInUser.meta,
    };
    set_session(new Date().getTime());
    return setTimeout(() => login_suc(data), 500);
  };

  const append = (e) => {
    //  let newPin = pin + "" + e;
    //   setPin(newPin);

    let newPin = amount + "" + e;
    if (newPin < state.loggedInUser.user.meta.wallet) {
      setAmount(newPin);
    }
    //  if (newPin > 9999) {
    //    setMax("Maximum amount reached");
    //  } else
    if (newPin > state.loggedInUser.user.meta.wallet) {
      setMax("Insufficient wallet balance");
    } else {
      setMax("");
    }
  };

  const clear = (e) => {
    let pinLength = pin;
    let clearOne = pinLength - 1;
    setAmount(0);
    setMax("");
  };

  const buttonValue = (e) => {
    if (e == "clear") {
      return <Backspace />;
    } else if (e == "out") {
      return <KeyboardBackspace />;
    } else {
      return <>{e}</>;
    }
  };

  const pinVal = () => {
    if (pin.length == 1) {
      return (
        <>
          {" "}
          <b style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
        </>
      );
    } else if (pin.length == 2) {
      return (
        <>
          {" "}
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
        </>
      );
    } else if (pin.length == 3) {
      return (
        <>
          {" "}
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
        </>
      );
    } else if (pin.length == 4) {
      return (
        <>
          {" "}
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
        </>
      );
    } else {
      return (
        <>
          {" "}
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
        </>
      );
    }
  };

  React.useEffect(() => {
    set_session(new Date().getTime());
    setDrawerState({ ...drawerState, bottom: true });
    verifyBeneficiary();
  }, []);

  const buttons = () => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "clear"];
    return numbers.map((e) => {
      return (
        <>
          {/* {console.log(state)} */}
          <button
            className="customInput"
            style={{
              width: "60px",
              padding: "10px 10px",
              fontWeight: "bold",
              border: "none",
              //   background: "white",
              //   color: "black",
              margin: "15px 20px",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "5px",
            }}
            value={e}
            onClick={() => {
              if (e == "clear") {
                clear(e);
              } else if (e == "out") {
                history.push("/");
              } else {
                append(e);
              }
            }}
          >
            {buttonValue(e)}
          </button>
        </>
      );
    });
  };

  const [reason, setReason] = useState("");
  const [privacy, setPrivacy] = useState(1);
  const [sendTo, setSendTo] = useState("");
  const animatedComponents = makeAnimated();
  const loggedInUserSchool = state.loggedInUser.user.meta.school;
  const { fullname, email, phone, id } = state.loggedInUser.user;
  // const userId = state.loggedInUser.meta.user.id;

  const filterSchoolMates = (inputValue) => {
    return compState.filterOption.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const appendPin = (e) => {
    //   setpinError("")
    let newPin = pin + e;
    if (pin.length !== 4) {
      setPin(newPin);
    }
    if (newPin.length == 4) {
      verify(newPin);
    }
    //  console.log(newPin)
  };

  const clearPin = (e) => {
    let pinLength = pin.length;
    let clearOne = pinLength - 1;
    setPin(pin.substring(0, clearOne));
  };

  const verify = (newPin) => {
    if (newPin == state.loggedInUser.user.meta.transactionPin) {
      initiateTransaction();
      // console.log("cool")
    } else {
      // setpinError("Wrong pin");
      setPin("");
      console.log("Not same");
      window.navigator.vibrate([200]);
    }
    //  console.log(state.loggedInUser.user.meta.transactionPin)
    //  console.log(newPin)
  };

  //   AUTHENTICATION KEYBOARD
  const authKeyboaard = () => {
    let pinNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "out", 0, "clear"];
    return pinNumbers.map((e) => {
      return (
        <>
          {/* {console.log(state)} */}
          <button
            className="customInput"
            style={{
              width: "60px",
              padding: "10px 10px",
              fontWeight: "bold",
              border: "none",
              //   background: "white",
              //   color: "black",
              margin: "5px 10px",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "5px",
            }}
            value={e}
            onClick={() => {
              if (e == "clear") {
                clearPin(e);
              } else if (e == "out") {
                history.push("/notification");
                //  setProceedSend(false);
              } else {
                appendPin(e);
              }
            }}
          >
            {buttonValue(e)}
          </button>
        </>
      );
    });
  };

  async function verifyBeneficiary() {
    setStates({ ...compState, loader: true }); //  set loader to true

    new_supabase
      .from("users")
      .select("*")
      // .eq("beneficiaryId", beneficiary)
      .contains("meta", { beneficiaryId: state.whoRequested.buzzId })
      .then((resolve) => {
        if (resolve.data.length > 0) {
          let beneficiary = resolve.body[0];
          setverifyError("");
          setProceedSend(false);
          setStates({
            ...compState,
            loader: false,
            resolved: true,
            benef: beneficiary.fullname,
            benefId: beneficiary.id,
            benefWallet: beneficiary.meta.buzzmewallet,
            beneficiaryMeta: beneficiary.meta,
          });
          // console.log(beneficiary.id);
        } else {
          setverifyError("Beneficiary not found");
          setStates({ ...compState, loader: false });
          setbeneficiary("");
        }
      })
      .catch((error) => {
        setverifyError("Network error");
        setStates({ ...compState, loader: false });
      });
  }

  const initiateTransaction = () => {
    setStates({ ...compState, loader: true });
    let newBenefWallet =
      parseInt(state.whoRequested.amount) + parseInt(compState.benefWallet);
    let newBoxerWallet =
      parseInt(state.loggedInUser.user.meta.wallet) -
      parseInt(state.whoRequested.amount);

    let beneficiaryNewData = {
      ...compState.beneficiaryMeta,
      buzzmewallet: newBenefWallet,
    };

    // setting giver's new data
    let buzzerNewWallet = {
      ...state.loggedInUser.user.meta,
      wallet: newBoxerWallet,
    };

    let meta = {
      sender: {
        fullname: state.loggedInUser.user.fullname,
        beneficiaryID: state.loggedInUser.user.meta.beneficiaryID,
        id: state.loggedInUser.user.id,
        phone: state.loggedInUser.user.phone,
      },
      reciever: {
        Fullname: compState.benef,
        beneficiaryID: beneficiary,
        id: compState.benefId,
      },
      data: {
        amount: parseInt(state.whoRequested.amount),
        desc: `${
          state.loggedInUser.user.fullname
        } responded to your buzz request of NGN ${parseInt(
          state.whoRequested.amount
        )}   ${desc.substring(0, 101)} "`,
      },
    };

    new_supabase
      .from("users")
      .update([{ meta: beneficiaryNewData }])
      .contains("meta", { beneficiaryId: state.whoRequested.buzzId })
      .then((boxed) => {
        new_supabase
          .from("users")
          .update([{ meta: buzzerNewWallet }])
          .contains("meta", {
            beneficiaryId: buzzerNewWallet.beneficiaryId,
          })
          .then((charged) => {
            new_supabase
              .from("buz-me")
              .insert([
                {
                  from: meta.sender.id,
                  to: compState.benefId,
                  meta: meta,
                },
              ])
              .then((insertResponse) => {
                console.log(insertResponse);
                const newUserData = {
                  user: {
                    ...state.loggedInUser.user,
                    meta: buzzerNewWallet,
                  },
                  meta: state.loggedInUser.meta,
                };

                new_supabase
                  .from("notifications")
                  .insert([
                    {
                      from: meta.sender.id,
                      to: compState.benefId,
                      meta: meta,
                      type: "BUZZ ALERT",
                    },
                  ])
                  .then((resX) => {
                    new_supabase
                      .from("notifications")
                      .update({ isRead: true })
                      .eq("id", state.whoRequested.id)
                      .then((resXXs) => {
                        let smsPayload = {
                          phone: [
                            `+234${resX.body[0].meta.reciever.beneficiaryID}`,
                          ],
                          sender: resX.body[0].meta.sender.fullname,
                          amount: parseInt(parseInt(state.whoRequested.amount)),
                          desc: resX.body[0].meta.data.desc,
                          balance: state.loggedInUser.user.meta.wallet,
                        };
                        send_buzz_alert(smsPayload);
                        login_suc(newUserData);
                        setStateAlert(true);
                        setStates({
                          ...compState,
                          loader: false,
                          alertMsg: `Yeahh!!!  you buzzed NGN ${parseInt(
                            state.whoRequested.amount
                          )} to ${compState.benef}`,
                          resolved: false,
                        });
                        //   setProceedSend(false);
                        //   setbeneficiary("");
                        //   setAmount(0);
                        //   setPin("");
                        //   setDrawerState({ ...drawerState, bottom: false });
                      });
                  });
              });
          });
      })
      .catch((error) => {
        // errorToast("A network error occured");
        setStateAlert(false);
        setStates({
          ...compState,
          loader: false,
          alertMsg:
            "Your operation could not be completed due to network error",
        });
      });
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

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
    history.push("/notification");
  };

  return (
    <div id="body bg">
      <>
        {compState.loader === true && <>{cashbackloader()} </>}
        {stateAlert === true &&
          alert(successPayload, setStateAlert, sendToDefault)}
        {stateAlert === false && alert(errorPayload, setStateAlert)}
        {pin == "validated" && <> {cashbackloader()}</>}

        {/* {finallySend === true && <>{initiateTransaction()}</>} */}
        {console.log(compState)}
        <React.Fragment key="bottom">
          <Drawer
            anchor="bottom"
            open={drawerState["bottom"]}
            onClose={toggleDrawer("bottom", false, false)}
          >
            {proceedAuth === false && (
              <div
                style={{
                  height: " ",
                  //  background: "black",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "",
                    //   marginLeft: "32.5%",
                    //   textAlign: "left",
                    background: " ",
                  }}
                >
                  <div style={{ color: "crimson" }}>{verifyError}</div>
                  <div
                    style={{
                      fontSize: " ",
                      fontWeight: " ",
                      textAlign: "left",
                      width: " ",
                      marginLeft: "",
                      // background: "#efedc4",
                      padding: " 10px",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>Buzz Me Details</p>
                    <div
                      style={{
                        boxShadow: " 1px 1px 3px #888888",
                        padding: "5px 10px",
                      }}
                    >
                      <spall style={{ fontSize: "11px" }}>
                        You want to Buzz
                      </spall>
                      <div>
                        <b> {state.whoRequested.name}</b>
                      </div>
                      <div style={{ fontWeight: "bold" }}>
                        <Naira>{parseInt(state.whoRequested.amount)}</Naira>
                      </div>
                      {/* <br /> */}
                      <textarea
                        onChange={(e) => {
                          if (desc.length < 100) {
                            setMaxDesc(false);
                            setDesc(e.target.value);
                          } else {
                            // setMaxDesc(true)
                            if (
                              e.nativeEvent.inputType == "deleteContentBackward"
                            ) {
                              setDesc(e.target.value.substring(1, 100));
                              setMaxDesc(false);
                            } else {
                              setMaxDesc(true);
                            }
                          }
                        }}
                        value={desc}
                        style={rec_inputs3}
                        placeholder="Description  e.g  Pay some bills with this little token and remain happy.."
                      ></textarea>
                      {maxDesc === true && (
                        <small style={{ color: "crimson" }}>
                          maximum reaches
                        </small>
                      )}
                    </div>
                    {/* {console.log(state)} */}
                  </div>
                </div>
                <br />
              </div>
            )}

            {/* {proceedSend === true && ( */}
            <div
              style={{
                height: " ",
                //  background: "black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <span>Authenticate </span>
              <div
                style={{
                  padding: "15px",
                  // background: "black",
                  color: "white",
                  //  marginBottom:"5px"
                }}
              >
                {pinVal()}

                <br />
                <div
                  style={{
                    color: "crimson",
                    height: "30px",
                    background: " ",
                    padding: "5px",
                  }}
                >
                  {pinError}
                </div>
              </div>
              {authKeyboaard()}
            </div>
            {/* )} */}
          </Drawer>
        </React.Fragment>
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
    logout: (type) => dispatch(logOut(type)),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
    set_session: (time) => dispatch(disp_session(time)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
