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
  CloseOutlined
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
import {formatAMPM,daysOfTheWeek, monthsOfTheYear} from "../functions/utils/index"
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
  padding: "10px 14px",
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
  const [beneficiary, setbeneficiary] = useState("");
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
    setStates("")
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
      setAmount(newPin);
    // if (newPin < state.loggedInUser.user.meta.wallet) {
    // }


    //  if (newPin > 9999) {
    //    setMax("Maximum amount reached");
    //  } else



    // if (newPin > state.loggedInUser.user.meta.wallet) {
    //   setMax("Insufficient wallet balance");
    // } else {
    //   setMax("");
    // }
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

  const showAmount = () => {
    return (
      <>
        {" "}
        <b style={{ opacity: "1", color: "#0a3d62", fontSize: "35px" }}>
          <Naira>{amount}</Naira>
        </b>
      </>
    );
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
    let filterOpt = [];
    fetchUsersOfUniversity(loggedInUserSchool, id)
      .then((res) => {
        res.body.map((resp) => {
          let prepared = {
            value: resp.meta.beneficiaryId,
            // label: resp.fullname,
            label:resp.meta.beneficiaryId,
            email: resp.email,
            phone: resp.phone,
            id: resp.id,
          };
          filterOpt.push(prepared);
        });
        console.log(filterOpt);
        setStates({ ...compState, filterOption: filterOpt });
      })
      .catch((error) => {
        alert("network error");
      });
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

  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // @============== REQUEST BUZZ
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================

  const [reason, setReason] = useState("");
  const [privacy, setPrivacy] = useState(1);
  const [sendTo, setSendTo] = useState("");
  const animatedComponents = makeAnimated();
  const loggedInUserSchool = state.loggedInUser.user.meta.school;
  const { fullname, email, phone, id } = state.loggedInUser.user;
  // const userId = state.loggedInUser.meta.user.id;

  const filterSchoolMates = (inputValue) => {
    return compState.filterOption.filter((i) =>
      i.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterSchoolMates(inputValue));
    }, 1000);
  };

  let handleInputChange = (newValue) => {
    const inputValue = newValue;
    setSendTo(inputValue);
  };

  const proceedAuthForRequest = () => {
    if (reason.length < 10) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Please give a clear reason for your request",
      });
    } else if (privacy == 1 && sendTo.length < 1) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Add who receives the request or change the request privacy",
      });
      document.getElementById("sendto").focus();
    } else {
      setProceedSend(true);
    }
  };

  //   ?@==========================
  async function placeRequest() {
    if (reason.length > 10) {
      let split = reason.split(" ")[1];
      if (split === undefined) {
        setStateAlert(false);
        setStates({
          ...compState,
          loader: false,
          alertMsg: "please give a clear reason for your request",
        });
      } else {
        let postPrivacy = "";

        if (privacy == 1) {
          postPrivacy = { sendTo, privacy: "LISTED" };
        } else if (privacy == 0) {
          postPrivacy = { privacy: "ONLY ME" };
        } else if (privacy == 2) {
          postPrivacy = { privacy: "ALL" };
        }
        let payload = {
          sendTo,
          privacy: postPrivacy,
          reason,
          amount: parseInt(amount),
          from: {
            fullname,
            email,
            phone,
            // userId,
            school: loggedInUserSchool,
          },
        };
        const postBody = {
          postPrivacy,
          postType: "BUZ REQUEST",
          // id: new Date().getTime(),
          postText: reason,
          poster: {},
          post: {
            time: new Date(),
            text: reason,
            file: undefined,
            meta: {
              payload,
              event: null,
              giveaway: null,
            },
          },
          time: new Date(),
        };
        setStates({ ...compState, loader: true });
        var timeleft = 75;
        var downloadTimer = setInterval(function () {
          if (timeleft > 96) {
            clearInterval(downloadTimer);
          } else {
            if (document.getElementById("progressBar") == null) {
              clearInterval(downloadTimer);
            } else {
              document.getElementById("progressBar").value = timeleft;
            }

            timeleft += 20;
          }
        }, 1000);
        handleCreateRequest(postBody, state).then((res) => {
          console.log(sendTo);
          if (res.success == true) {
            let sendToPhones = [];
            for (let i = 0; i < sendTo.length; i++) {
              sendToPhones.push(`+234${sendTo[i].phone.substring(1, 11)}`);
            }
            // let desc = ""
            // if (reason.length > 40) {
            //   desc = reason.substring(0, 36)+"...."
            // } else {
            //   desc = reason
            // }
            let smsPayload = {
              phones: sendToPhones, // array[]
              sender: fullname,
              amount: parseInt(amount),
              desc: reason,
            };
            console.log(smsPayload);
            buzz_request(smsPayload); //call sms function

            // document.getElementById("progressBar").value = 100;
            setStateAlert(true);
            setStates({
              ...compState,
              loader: false,
              success: true,
              alertMsg: res.message,
            });
          } else {
            setStateAlert(false);
            setStates({
              ...compState,
              loader: false,
              alertMsg: res.message,
            });
          }
        });
      }
    }
  }

  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================

  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  //   ==================     BUZZ ME
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================

  async function verifyBeneficiary() {
    if (beneficiary == state.loggedInUser.user.meta.beneficiaryId) {
      setverifyError("Can't buzz yourself");
    } else {
      if (beneficiary.length == 10) {
        setStates({ ...compState, loader: true }); //  set loader to true

        new_supabase
          .from("users")
          .select("*")
          // .eq("beneficiaryId", beneficiary)
          .contains("meta", { beneficiaryId: beneficiary })
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
              console.log(beneficiary.id);
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
      } else {
        setverifyError("Beneficiary ID");
        setStates({ ...compState, loader: false });
      }
    }
  }

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
      // setProceedAuth(true);

      if (actionType === false) {
        placeRequest();
      } else {
        initiateTransaction();
      }
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
    let pinNumbers = [1, 2, 3, 4, 5, 6, 7, 8, "out", 9, 0, "clear"];
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
                //  history.push("/");
                setProceedSend(false);
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

  const initiateTransaction = () => {
    setStates({ ...compState, loader: true });
    let newBenefWallet = parseInt(amount) + parseInt(compState.benefWallet);
    let newBoxerWallet =
      parseInt(state.loggedInUser.user.meta.wallet) - parseInt(amount);

    let beneficiaryNewData = {
      ...compState.beneficiaryMeta,
      buzzmewallet: newBenefWallet,
    };

    // setting giver's new data
    let buzzerNewWallet = {
      ...state.loggedInUser.user.meta,
      wallet: newBoxerWallet,
    };
    let descX = ""
    if (desc.length > 0) {
      descX = desc
    } else {
      descX =  `NGN ${parseInt(amount)} Buzz alert from ${
          state.loggedInUser.user.fullname
        }-${new Date().getTime()}`
    }

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
        amount: parseInt(amount),
        // desc: `NGN ${parseInt(amount)} Buzz alert from ${
        //   state.loggedInUser.user.fullname
        // }-${new Date().getTime()}`,
        desc:descX
      },
      date: {
        day:daysOfTheWeek(new Date),
        month:monthsOfTheYear(),
        year: new Date().getFullYear(),
        date: new Date().getDate(),
        time:formatAMPM(new Date())
      }
    };

    new_supabase
      .from("users")
      .update([{ meta: beneficiaryNewData }])
      .contains("meta", { beneficiaryId: beneficiary })
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
                    let smsPayload = {
                      phone: [
                        `+234${resX.body[0].meta.reciever.beneficiaryID}`,
                      ],
                      sender: resX.body[0].meta.sender.fullname,
                      amount: parseInt(amount),
                      desc: resX.body[0].meta.data.desc,
                      balance: state.loggedInUser.user.meta.wallet,
                    };
                    console.log(compState);
                    send_buzz_alert(smsPayload);
                    login_suc(newUserData);
                    setStateAlert(true);
                    setStates({
                      ...compState,
                      loader: false,
                      alertMsg: `Yeahh!!!  you buzzed NGN ${parseInt(
                        amount
                      )} to ${compState.benef}`,
                      resolved: false,
                    });
                    setProceedSend(false);
                    setbeneficiary("");
                    setAmount(0);
                    setPin("");
                    setDrawerState({ ...drawerState, bottom: false });
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

  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================
  // ============================================================================================

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
  };

  return (
    <div id="body bg">
      <>
        {compState.loader === true && <>{cashbackloader()} </>}
        {stateAlert === true &&
          alert(successPayload, setStateAlert, sendToDefault)}
        {stateAlert === false && alert(errorPayload, setStateAlert)}
        {pin == "validated" && <> {cashbackloader()}</>}
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "0px",
            left: "0px",
            // zIndex: "10000",
            background: " ",
          }}
        >
          {/* KeyboardBackspace */}
          <div
            onClick={history.goBack}
            style={{
              position: "absolute",
              width: "100px",
              height: "50px",
              top: "15px",
              left: "30px",
              fontWeight: "bold",
              padding: "4px",
            }}
          >
            <ArrowBackIosOutlined style={{ fontSize: "30px" }} />
          </div>
          <div
            style={{
              position: "absolute",
              //   width: "100px",
              height: "50px",
              top: "15px",
              right: "20px",
              fontWeight: "bold",
              padding: "4px",
            }}
          >
            {parseInt(state.loggedInUser.user.meta.wallet) >
            1 ? (
              <div
                style={{
                  border: "0.5px solid #0a3d62",
                  textAlign: "center",
                  borderRadius: "4px",
                  boxShadow: " 1px 1px 3px #0a3d62",
                  padding: "4px 10px",
                }}
              >
                {" "}
                <Naira style={{ color: "crimson" }}>
                  {parseInt(state.loggedInUser.user.meta.wallet) }
                </Naira>
              </div>
            ) : (
              <div
                style={{
                  border: "0.5px solid crimson",
                  textAlign: "center",
                  borderRadius: "4px",
                  boxShadow: " 1px 1px 3px crimson",
                }}
              >
                <Naira>0</Naira>
              </div>
            )}
          </div>
          <div
            style={{
              height: "",
              //  background: "black",
              padding: " ",
              textAlign: "center",
            }}
          >
            <div
              style={{
                padding: "15px",
                // background: "lightgray",
                color: "white",
                position: "absolute",
                top: "15%",
                width: "100%",
                textAlign: "center",
              }}
            >
              {showAmount()}
              {/* {verify()} */}
              <div style={{ color: "crimson" }}>{max}</div>
            </div>
            <div style={{ position: "absolute", top: "30%", width: "100%" }}>
              {buttons()}
              <br /> <br />
              <div>
                <input
                  onClick={() => {
                    if (amount < 100) {
                      setMax("Minimum amount is NGN 100");
                    } else {
                      if (amount > 10000) {
                        setMax("Maximum amount exceeded");
                      } else if (amount > state.loggedInUser.user.meta.wallet) {
                        setMax("Insufficient wallet balance");
                      } else {
                        setMax("");
                        setActiontype(false);
                        setDrawerState({ ...drawerState, bottom: true });
                        setMax("");
                      }
                    }
                  }}
                  type="button"
                  value="REQUEST"
                  style={{
                    padding: "5px",
                    outline: "none",
                    width: "100px",
                    border: "none",
                    background: "#0a3d62",
                    color: "white",
                    borderRadius: "6px",
                    margin: "10px 19px",
                  }}
                />
                <input
                  type="button"
                  value="SEND"
                  style={{
                    padding: "5px",
                    outline: "none",
                    width: "100px",
                    //   background: "crimson",
                    border: "0.5px solid #0a3d62",
                    color: "#0a3d62",
                    borderRadius: "6px",
                    margin: "10px 19px",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    if (amount < 100) {
                      setMax("Minimum amount is NGN 100");
                    } else {
                      if (amount > 10000) {
                        setMax("Maximum amount exceeded");
                      } else if (amount > state.loggedInUser.user.meta.wallet) {
                        setMax("Insufficient wallet balance");
                      } else {
                        setMax("");
                        setDrawerState({ ...drawerState, bottom: true });
                        setMax("");
                        setActiontype(true);
                      }
                    }
                  }}
                />
              </div> 
            </div>
          </div>
        </div>

        {/* {finallySend === true && <>{initiateTransaction()}</>} */}

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
                  {compState.resolved !== true && (
                    <>
                      {actionType === true && (
                        <>
                          {" "}
                          <span>Beneficiary ID</span> <br />
                          <input
                            onChange={(e) => {
                              setbeneficiary(e.target.value);
                              setverifyError("");
                            }}
                            type="number"
                            maxlength="10"
                            autoFocus
                            value={beneficiary}
                            placeholder="* * * * * * * * 7 6"
                            style={{
                              padding: "10px 0px",
                              border: "none",
                              width: "50%",
                              textAlign: " ",
                              background: "",
                              outline: "none",
                              marginLeft: "25%",
                            }}
                          />{" "}
                        </>
                      )}
                    </>
                  )}

                  <div style={{ color: "crimson" }}>{verifyError}</div>
                  {compState.resolved == true && actionType === true && (
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
                          <b> {`${compState.benef}`}</b>
                        </div>
                        <div style={{ fontWeight: "bold" }}>
                          <Naira>{amount}</Naira>
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
                                e.nativeEvent.inputType ==
                                "deleteContentBackward"
                              ) {
                                setDesc(e.target.value);
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
                      {/* sendToDefault */}
                      {proceedSend === false && (
                        <div style={{ textAlign: "center" }}>
                           <CloseOutlined onClick={()=>{
                             sendToDefault()
                           }} style={{marginRight:"30px",fontSize:"30px"}} />

                          <input
                            onClick={() => {
                              setProceedSend(true)
                            }}
                            type="button"
                            value="Authenticate"
                            style={{
                              padding: "5px",
                              outline: "none",
                              width: "150px",
                              background: "#0a3d62",
                              border: "0.5px solid #0a3d62",
                              color: "white",
                              borderRadius: "6px",
                              //   margin: "10px 19px",
                              fontWeight: "bold",
                              marginTop: "10px",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {compState.resolved !== true && actionType === true && (
                    <input
                      onClick={() => {
                        verifyBeneficiary();
                      }}
                      type="button"
                      value="NEXT"
                      style={{
                        padding: "5px",
                        outline: "none",
                        width: "100px",
                        background: "#0a3d62",
                        border: "0.5px solid #0a3d62",
                        color: "white",
                        borderRadius: "6px",
                        //   margin: "10px 19px",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>
                <br />
              </div>
            )}

            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @==================== BUZZ REQUEST FORMS ========================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}

            {proceedSend === true && actionType === false && (
              <div
                style={{
                  // fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: " ",
                  width: " ",
                  marginTop: "-40px",
                  background: "#efedc4",
                  padding: " 10px",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    marginLeft: "17%",
                    textALign: "left",
                    background: " ",
                  }}
                >
                  <Naira>{amount}</Naira>
                  <br />
                  <p style={{ fontSize: "14px", fontWeight: "lighter" }}>
                    {reason}
                  </p>
                  {/* <PeopleAltOutlined /> */}
                  <small style={{ fontWeight: "lighter", color: "gray" }}>
                    send to{" "}
                  </small>
                  <div style={{ fontSize: "12px" }}>
                    {actionType === false &&
                      <>
                      {typeof sendTo === "object" ? sendTo.map((e) => {
                        return <> {e.label},</>;
                      }):"PUBLIC"}
                      </>}
                  </div>
                </div>
              </div>
            )}

            {actionType === false && proceedSend !== true && (
              <>
                <textarea
                  cols="40"
                  rows="20"
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  value={reason}
                  style={rec_inputs}
                  placeholder="Enter your request reason *"
                ></textarea>{" "}
                <br />
                <FormControl
                  style={{
                    margin: "5px 10px",
                    marginBottom: "10px",
                    background: "  ",
                    borderBottom: "none",
                  }}
                  id="postArea1"
                  variant="standard"
                  style={rec_inputs2}
                >
                  {/* <InputLabel id="demo-simple-select-label">
                    Change privacy &nbsp; &nbsp;
                    <VpnLockOutlined style={{ marginLeft: "60px" }} />
                  </InputLabel> */}

                  {/* <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={privacy}
                    label="Age"
                    onChange={(e) => {
                      if (e.target.value != 2) {
                        setSendTo("");
                      }
                      setPrivacy(e.target.value);
                    }}
                  > 
                    <MenuItem value={1} style={{ fontSize: "10px" }}>
                      <small style={{ color: "" }}> Request from friends</small>{" "}
                      &nbsp; &nbsp; <PeopleAltOutlined />{" "}
                    </MenuItem>
                    <MenuItem value={2}>
                      <small style={{ color: "" }}>
                        {" "}
                        Every Buzz user will see this
                      </small>{" "}
                      &nbsp; &nbsp; <PublicOutlined />{" "}
                    </MenuItem>
                  </Select> */}
                </FormControl>
                {/* <br /> */}
                <span style={{ marginLeft: "20px", fontSize: "11px",marginTop:"-10px" }}>
                  Who are you requesting from? (Buzz ID)
                </span>
                {privacy == 1 && (
                  <FormControl
                    style={{
                      margin: "0px 1px",
                      marginBottom: "10px",
                      background: "green ",
                      height: "55px",
                    }}
                    id="postArea1"
                    variant="standard"
                    style={rec_inputs2}
                  >
                    <AsyncSelect
                      id="sendto"
                      style={rec_inputs}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      // defaultValue={[options[0], options[1]]}
                      isMulti
                      loadOptions={loadOptions}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                  </FormControl>
                )}
                <div style={modal_footer2_btn_holder}>
                  <button
                    onClick={(e) => {
                      //   placeRequest(reason);
                      console.log(typeof sendTo);
                      console.log(privacy);
                      proceedAuthForRequest();
                    }}
                    style={action_btn_success2}
                  >
                    Proceed to authenticate
                  </button>{" "}
                  <br />
                  <br />
                </div>
              </>
            )}

            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}
            {/* @============================================== */}

            {proceedSend === true && (
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
            )}
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
