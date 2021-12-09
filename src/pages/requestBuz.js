import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

// import Footer from "../components/includes/mobile_footer.js";
import Header from "../components/includes/mobile_header.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { LinearProgress } from "@material-ui/core";
import { supabase } from "../configurations";
import { add_wallet, logOut, disp_feeds, draft } from "../redux";
import Toppills from "../components/includes/topdesktoppills";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { fetchUsersOfUniversity } from "../functions/models/index";
import {
  VpnLockOutlined,
  PeopleAltOutlined,
  PublicOutlined,
  LockOutlined,
} from "@material-ui/icons";
import { handleCreatePost } from "../functions/controllers/feeds";
import Selects from "react-select";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

// @=== import success response from worker function
import { alert } from "../functions/workers_functions/alert";
import { handleCreateRequest } from "../functions/controllers/requestbuz";

import {buzz_request} from "../functions/workers_functions/notifications"
const rec_inputs = {
  margin: "5%",
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

const rec_inputs3 = {
  margin: "5%",
  width: "90%",
  padding: "4px 2px",
  border: "5px",
  height: "40px",
  borderBottom: "0.5px solid grey",
  backgroundColor: "#f4f6f7",
  color: "#4e7a97",
  outline: "none",
  fontSize: "13px",
};

let modal_footer2_btn_holder = {
  // position: 'absolute',
  marginTop: "15px",
  marginBottom: "10px",
  // backgroundColor: '#f3f3f3',
  width: "100%",
  opacity: "70000",
};

const paymentTitle = {
  fontSize: "16px",
  textAlign: "center",
  paddingTop: "20px",
  color: "gray",
  fontFamily: "Aclonica",
  //   color: "#fa983a",
  color: "#2C3A47",
};

let action_btn_success2 = {
  // background:"#1e272e",
  backgroundColor: "#2C3A47",
  // background:"#58B19F",
  padding: "2px 14px",
  marginLeft: "15px",
  color: "white",
  borderRadius: "3px",
  float: " ",
  border: "none",
};

const secured_env = {
  textAlign: "center",
  color: "#4e7a97",
  padding: "10px",
};

const explore = {
  display: "none",
};

const smile = {
  color: "#fa983a",
  fontSize: "30px",
};

function Home({ appState, disp_draft, logout, loadFeeds }) {
  let history = useHistory();
  const state = appState;
  const new_supabase = supabase();
  const loggedInUserSchool = state.loggedInUser.user.meta.school;
  const { fullname, email, phone, id } = state.loggedInUser.user;
  const userId = state.loggedInUser.meta.user.id;

  const [compState, setStates] = useState({
    filterOption: [],
  });
  const [amount, setAMOUNT] = useState("");
  const [reason, setReason] = useState("");
  const [privacy, setPrivacy] = useState(1);
  const [sendTo, setSendTo] = useState("");
  const [stateAlert, setStateAlert] = useState("");

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    // setStates({ ...compState, loader: true });
    // setTimeout(() => setStates({ ...compState, loader: false }), 500);
    let filterOpt = [];
    fetchUsersOfUniversity(loggedInUserSchool, id)
      .then((res) => {
        res.body.map((resp) => {
          let prepared = {
            value: resp.meta.beneficiaryId,
            label: resp.fullname,
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

  //   ?@==========================
  async function placeRequest(reason) {
    if (amount < 100) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Sorry, your minimum request amount is NGN 100",
      });
    } else if (amount > 5000) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Sorry, you have exceeded you maximum request amount",
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
            amount,
            from: {
              fullname,
              email,
              phone,
              userId,
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
          handleCreateRequest(postBody, state, loadFeeds, disp_draft).then(
            (res) => {
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
                  amount: amount,
                  reason,
                };
                console.log(smsPayload)
                buzz_request(smsPayload) //call sms function

                document.getElementById("progressBar").value = 100;
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
            }
          );
        }
      } else {
        setStateAlert(false);
        setStates({
          ...compState,
          loader: false,
          alertMsg: "Please give a clear reason for your request",
        });
      }
    }
  }

  const animatedComponents = makeAnimated();

  const filterSchoolMates = (inputValue) => {
    return compState.filterOption.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
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

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      {stateAlert === true && alert(successPayload, setStateAlert)}
      {stateAlert === false && alert(errorPayload, setStateAlert)}
      {compState.success === true && (
        <span>{stateAlert === null && <span>{history.push("/")}</span>}</span>
      )}

      <div className="mobile">
        {/* {state.realtime.length > 0 && <Realtime />} */}
        {/* <Realtime /> */}
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

            {/* <div className="explore desktop"><span>Explore</span>  <span className="logout" onClick={()=>{logout()}}>Logout</span>  </div> */}

            <div animateIn="fadeIn">
              <div className="">
                {compState.loader === true && (
                  <progress
                    style={{
                      width: "100%",
                      borderRadius: "0px",
                      height: "5px",
                    }}
                    value="40"
                    max="100"
                    id="progressBar"
                  ></progress>
                )}

                <div
                  className="paypanel"
                  style={{
                    width: "90%",
                    background: "white",
                    padding: "10px",
                    // marginLeft: "5%",
                    marginTop: "20px",
                    // borderRadius: "40px 40px 2px 3px",
                    boxShadow: " 1px 1px 3px #888888",
                    border: "0.5px solid #f3f3f3",
                  }}
                >
                  <div style={paymentTitle}>
                    <p>Request Buz</p>
                  </div>
                  {/* <SecurityOutlined style={secured}/>  */}

                  <input
                    type="number"
                    onChange={(e) => {
                      setAMOUNT(e.target.value);
                    }}
                    value={amount}
                    style={rec_inputs}
                    placeholder=" Enter Amount"
                  />

                  <br />
                  <textarea
                    cols="40"
                    rows="20"
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                    value={reason}
                    style={rec_inputs}
                    placeholder="Enter your request reason *"
                  ></textarea>

                  <FormControl
                    style={{
                      margin: "0px 10px",
                      marginBottom: "10px",
                      background: "  ",
                      borderBottom: "none",
                    }}
                    id="postArea1"
                    variant="standard"
                    style={rec_inputs2}
                  >
                    <InputLabel id="demo-simple-select-label">
                        Change privacy &nbsp; &nbsp;
                        {/* <VpnLockOutlined style={{ marginLeft: "60px" }} /> */}
                    </InputLabel>
                    <Select
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
                      {/* <MenuItem value={0}>
                        Only me &nbsp; &nbsp; <LockOutlined />{" "}
                      </MenuItem> */}
                      <MenuItem value={1} style={{fontSize:"10px"}}>
                      <small style={{color:""}}> Request from friends</small> &nbsp; &nbsp; <PeopleAltOutlined />{" "}
                      </MenuItem>
                      <MenuItem value={2}>
                        <small style={{color:""}}> Every Buzz user will see this</small> &nbsp; &nbsp; <PublicOutlined />{" "}
                      </MenuItem>
                    </Select>
                  </FormControl>

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

                  {compState.resolved != true && (
                    <div style={modal_footer2_btn_holder}>
                      <button
                        onClick={(e) => {
                          placeRequest(reason);
                        }}
                        style={action_btn_success2}
                      >
                        Request
                      </button>
                    </div>
                  )}

                  <br />

                  <div style={secured_env}>
                    {" "}
                    <small>Maximum of NGN 5000 per request.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* desktop left */}
      <Desktopleft />

      {/* desktop right */}
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
    disp_draft: (payload) => dispatch(draft(payload)),
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    loadFeeds: (payload) => dispatch(disp_feeds(payload)),
    logout: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
