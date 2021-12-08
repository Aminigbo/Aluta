import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Footer from "../components/includes/mobile_footer.js";
import Header from "../components/includes/mobile_header.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { cashbackloader } from "../components/loading";
import Realtime from "../components/includes/realtime";
import { Link } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { supabase } from "../configurations";
import { loginSuc, logOut } from "../redux";
import { CreditCardOutlined } from "@material-ui/icons";
import Toppills from "../components/includes/topdesktoppills";

// @=== import success response from worker function
import { alert } from "../functions/workers_functions/alert";
import { send_buzz_alert } from "../functions/workers_functions/notifications";
const rec_inputs = {
  margin: "5%",
  width: "90%",
  padding: "4px 2px",
  border: "5px",
  height: "30px",
  borderBottom: "0.5px solid grey",
  // backgroundColor: "#f4f6f7",
  color: "#4e7a97",
  outline: "none",
  fontSize: "13px",
};

const rec_inputs3 = {
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
};

let modal_footer2_btn_holder = {
  // position: 'absolute',
  marginTop: "15px",
  marginBottom: "10px",
  // backgroundColor: '#f3f3f3',
  width: "100%",
};

const paymentTitle = {
  fontSize: "16px",
  textAlign: "center",
  paddingTop: "20px",
  color: "gray",
  fontFamily: "Aclonica",
  color: "#2C3A47",
};

let action_btn_success2 = {
  backgroundColor: "#2C3A47",
  padding: "2px 18px",
  marginLeft: "15px",
  color: "white",
  borderRadius: "3px",
  float: " ",
  border: "none",
};

const secured_env = {
  textAlign: "center",
  color: "#4e7a97",
};

const explore = {
  display: "none",
};

const smile = {
  color: "#2C3A47",
  fontSize: "30px",
};

const benef = {
  fontSize: "13px",
  textAlign: "center",
  fontWeight: "bold",
};

const logoutBtn = {
  backgroundColor: "#fa983a",
  color: "white",
  cursor: "pointer",
};

function Home({ appState, login_suc, logout }) {
  let history = useHistory();
  const state = appState;
  const new_supabase = supabase();

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    // setStates({ ...compState, loader: true });
    // setTimeout(() => setStates({ ...compState, loader: false }), 500);
  }, []);

  const [amount, setAMOUNT] = useState("");
  const [beneficiary, setbeneficiary] = useState("");
  const [pin, setPin] = useState("");
  const [desc, setDesc] = useState("");
  const [compState, setStates] = useState("");
  const [stateAlert, setStateAlert] = useState("");

  //  ONKEYUP,  CONFIRM IF THERE IS A USER WITH SUCH BENEFICIARY ID
  async function verifyBeneficiary(beneficiaryID) {
    if (beneficiaryID.length == 10) {
      if (amount.length < 1 || amount < 50) {
        // infoToast("Enter a valid amount");
        setStateAlert(false);
        setStates({
          ...compState,
          loader: false,
          alertMsg: "Enter a valid amount",
        });
      } else {
        document.getElementById("beneficiary").blur(); // deactivate the input
        setStates({ ...compState, loader: true }); //  set loader to true

        new_supabase
          .from("users")
          .select("*")
          // .eq("beneficiaryId", beneficiary)
          .contains("meta", { beneficiaryId: beneficiary })
          .then((resolve) => {
            console.log(resolve);
            if (resolve.data.length > 0) {
              let beneficiary = resolve.body[0];
              setStates({
                ...compState,
                loader: false,
                resolved: true,
                benef: beneficiary.fullname,
                benefId: beneficiary.id,
                benefWallet: beneficiary.meta.buzzmewallet,
                beneficiaryMeta: beneficiary.meta,
              });
            } else {
              setStates({ ...compState, resolved: false, loader: false });
              setStateAlert(false);
              setStates({
                ...compState,
                loader: false,
                alertMsg: "Beneficiary not foundeee",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            setStateAlert(false);
            setStates({
              ...compState,
              loader: false,
              alertMsg:
                "Your operation could not be completed due to network error",
            });
          });
      }
    } else {
      setStates({ ...compState, loader: false, resolved: false });
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Please provide a valid beneficiary ID",
      });
    }
  }

  // CLEAR BENEFIACIARY WHEN ON AMOUNT KEY
  const clearBeneficiary = () => {
    setStates({ ...compState, resolved: false });
    document.getElementById("beneficiary").value = "";
    setbeneficiary("");
    setPin("");
  };

  const initiateTransaction = () => {
    if (!desc || !pin || !amount || !beneficiary) {
      // infoToast("Provide all fields");
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Please fill out all fields",
      });
    } else if (amount < 50) {
      // infoToast("Amount below minimum Box limit");
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "The amount you entered is below minimum Buz me linit",
      });
    } else {
      if (parseInt(amount) > parseInt(state.loggedInUser.user.meta.wallet)) {
        // infoToast("Insufficient balance");
        setStateAlert(false);
        setStates({
          ...compState,
          loader: false,
          alertMsg: "You have insufficient wallet balance",
        });
      } else {
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

        if (pin != state.loggedInUser.user.meta.transactionPin) {
          // infoToast("Incorrect transaction pin");
          console.log("pin");
          setStateAlert(false);
          setStates({
            ...compState,
            loader: false,
            alertMsg: "Please provide your correct transaction pin",
            resolved: false,
          });
          setbeneficiary("");
        } else {
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
              amount,
              desc,
            },
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
                        to: meta.reciever.id,
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
                            to: meta.reciever.id,
                            meta: meta,
                            type: "BUZZ ALERT",
                          },
                        ])
                        .then((resX) => { 
                          let smsPayload = {
                            phone: [`+234${resX.body[0].meta.reciever.beneficiaryID}`],
                            sender:resX.body[0].meta.sender.fullname,
                            amount: resX.body[0].meta.data.amount,
                            desc: resX.body[0].meta.data.desc,
                            balance: state.loggedInUser.user.meta.wallet,
                          };
                          send_buzz_alert(smsPayload);
                          console.log(smsPayload);
                          login_suc(newUserData);
                          setStateAlert(true);
                          setStates({
                            ...compState,
                            loader: false,
                            alertMsg: `Yeahh!!!  you buzzed NGN ${amount} to ${compState.benef}`,
                            resolved: false,
                          });
                          setbeneficiary("");
                          setAMOUNT("");
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
        }
      }
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
      {/* {resetPin(state, history, smile)} */}
      <div className="mobile">
        {compState.loader === true && <>{cashbackloader()} </>}
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
            {/* {console.log(compState)} */}

            {/* <div className="explore desktop"><span>Explore</span>  <span className="logout" onClick={()=>{logout()}}>Logout</span>  </div> */}

            <div animateIn="fadeIn">
              <div className="leagues_holder">
                <div style={explore} className="explore">
                  <span>Topup</span> <span className="logout">History</span>
                </div>

                <div
                  style={{ borderColor: "#2C3A47" }}
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
                    <p>
                      BUZ ME &nbsp; <CreditCardOutlined style={smile} />
                    </p>
                  </div>
                  {/* <SecurityOutlined style={secured}/>  */}

                  <input
                    type="number"
                    onKeyUp={() => {
                      clearBeneficiary();
                    }}
                    onChange={(e) => {
                      setAMOUNT(e.target.value);
                    }}
                    value={amount}
                    style={rec_inputs}
                    type="number"
                    placeholder=" Enter Amount to Buzz"
                  />

                  <br />
                  <input
                    type="number"
                    id="beneficiary"
                    onChange={(e) => {
                      setbeneficiary(e.target.value);
                    }}
                    value={beneficiary}
                    style={rec_inputs}
                    placeholder="Enter Beneficiary ID"
                  />

                  {compState.resolved != true && (
                    <div style={modal_footer2_btn_holder}>
                      <button
                        onClick={(e) => {
                          verifyBeneficiary(beneficiary);
                        }}
                        style={action_btn_success2}
                      >
                        Verify
                      </button>
                    </div>
                  )}

                  {compState.resolved == true && (
                    <span>
                      <br />
                      <div
                        style={benef}
                      >{`Buz ${compState.benef} some cash`}</div>{" "}
                      <br />
                      <textarea
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                        value={desc}
                        style={rec_inputs3}
                        placeholder="Description  e.g  support your Aluta struggle"
                      ></textarea>{" "}
                      <br />
                      <input
                        type="number"
                        onChange={(e) => {
                          setPin(e.target.value);
                        }}
                        value={pin}
                        style={rec_inputs}
                        placeholder="Your transaction"
                      />
                    </span>
                  )}

                  {compState.resolved == true && (
                    <>
                      {" "}
                      <div style={modal_footer2_btn_holder}>
                        <button
                          onClick={(e) => {
                            initiateTransaction();
                          }}
                          style={action_btn_success2}
                        >{`Buz ${compState.benef}`}</button>
                      </div>
                      <br />
                      <div style={secured_env}>
                        {" "}
                        <small>
                          NGN {amount} will be deducted from your wallet
                        </small>
                      </div>{" "}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <br />
          {/* <div style={{ textAlign: "center" }}>
            <small>OR </small> <br /> <br />
            <button
              onClick={(e) => {
                history.push("/request");
              }}
              style={{
                backgroundColor: "#2C3A47",
                padding: "2px 14px",
                marginRight: " ",
                color: "white",
                borderRadius: "3px",
                float: " ",
                border: "none",
              }}
            >
              Request Buz
            </button>
          </div>{" "}
          <br />
          <br />
          <br />
          <br /> */}
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
    logout: () => dispatch(logOut()),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
