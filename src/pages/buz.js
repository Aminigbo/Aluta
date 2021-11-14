import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Footer from "../components/includes/mobile_footer.js";
import Header from "../components/includes/mobile_header.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";

import Realtime from "../components/includes/realtime";
import { Link } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { supabase } from "../configurations";
import { add_wallet, logOut } from "../redux";
import { CreditCardOutlined } from "@material-ui/icons";
import Toppills from "../components/includes/topdesktoppills";
import { ToastContainer, toast, Bounce } from "react-toastify";

import Pills from "../components/includes/desktoppillsholder";

import { resetPin } from "../functions/controllers/resetPin";

const rec_inputs = {
  margin: "5%",
  width: "90%",
  padding: "4px 2px",
  border: "5px",
  height: "30px",
  borderBottom: "0.5px solid grey",
  backgroundColor: "#f4f6f7",
  color: "#4e7a97",
  outline: "none",
  fontSize: "13px",
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

function Home({ appState, walletAdd, logout }) {
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

  const infoToast = (res) => {
    toast.info(res, {
      position: toast.POSITION.TOP_CENTER,
      // onClose: () => {history.push(`/`)}
    });
  };
  const errorToast = (res) => {
    toast.error(res, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const boxedToast = (res) => {
    toast.success(res, {
      position: toast.POSITION.TOP_CENTER,
      // onClose: () => {history.push(`/`)}
    });
  };

  const reroute_breadcrumb = (link) => {
    history.push(`/${link}`);
  };

  const [compState, setStates] = useState("");

  //  ONKEYUP,  CONFIRM IF THERE IS A USER WITH SUCH BENEFICIARY ID
  async function verifyBeneficiary(beneficiaryID) {
    if (beneficiaryID.length == 10) {
      if (amount.length < 1 || amount < 50) {
        infoToast("Enter a valid amount");
      } else {
        document.getElementById("beneficiary").blur(); // deactivate the input
        setStates({ ...compState, loader: true }); //  set loader to true

        new_supabase
          .from("user")
          .select("*")
          .eq("OgPin", beneficiary)
          .then((resolve) => {
            // console.log(resolve)
            if (resolve.body.length < 1) {
              setStates({ ...compState, resolved: false, loader: false });
              infoToast("Beneficiary not resolved");
            } else {
              let beneficiary = resolve.body[0];
              if (beneficiary.id == state.loggedInUser.user.id) {
                infoToast("Sorry, you can't Buz yourself some cash");
                setStates({ ...compState, resolved: false });
              } else {
                setStates({
                  ...compState,
                  loader: false,
                  resolved: true,
                  benef: beneficiary.username,
                  benefId: beneficiary.id,
                  benefWallet: beneficiary.wallet,
                });
              }
            }
          })
          .catch((error) => {
            setStates({ ...compState, loader: false });
          });
      }
    } else {
      setStates({ ...compState, loader: false, resolved: false });
      infoToast("Provide beneficiary");
      console.log(beneficiaryID);
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
      infoToast("Provide all fields");
    } else if (amount < 50) {
      infoToast("Amount below minimum Box limit");
    } else {
      if (parseInt(amount) > parseInt(state.wallet)) {
        infoToast("Insufficient balance");
      } else {
        setStates({ ...compState, loader: true });
        let newBenefWallet = parseInt(amount) + parseInt(compState.benefWallet);
        let newBoxerWallet = parseInt(state.wallet) - parseInt(amount);
        if (pin != state.loggedInUser.user.pin) {
          infoToast("Incorrect transaction pin");
          setStates({ ...compState, resolved: false, loader: false });
          setbeneficiary("");
        } else {
          let meta = {
            sender: {
              username: state.loggedInUser.user.username,
              OgPin: state.loggedInUser.user.OgPin,
            },
            reciever: {
              username: compState.benef,
              OgPin: beneficiary,
            },
            data: {
              amount,
              desc,
            },
          };
          new_supabase
            .from("user")
            .update([{ wallet: newBenefWallet }])
            .eq("OgPin", beneficiary)
            .eq("id", compState.benefId)
            .then((boxed) => {
              new_supabase
                .from("user")
                .update([{ wallet: newBoxerWallet }])
                .eq("OgPin", state.loggedInUser.user.OgPin)
                .eq("id", state.loggedInUser.user.id)
                .then((charged) => {
                  new_supabase
                    .from("boxme")
                    .insert([
                      {
                        from: meta.sender.OgPin,
                        to: meta.reciever.OgPin,
                        meta: meta,
                      },
                    ])
                    .then((insertResponse) => {
                      new_supabase
                        .from("feeds")
                        .insert([
                          {
                            type: "NEW BUZ",
                            from: meta.sender.OgPin,
                            to: meta.reciever.OgPin,
                            meta: meta,
                          },
                        ])
                        .then((insert_response) => {
                          walletAdd(newBoxerWallet);
                          boxedToast(
                            `Yeahh!!!  you buzzed ${amount} to ${compState.benef}`
                          );
                          setStates({
                            ...compState,
                            resolved: false,
                            loader: false,
                          });
                          setbeneficiary("");
                          setAMOUNT("");
                        });
                    });
                });
            })
            .catch((error) => {
              errorToast("A network error occured");
            });
        }
      }
    }
  };

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      {/* {resetPin(state, history, smile)} */}
      <ToastContainer autoClose={2000} />
      <div className="mobile">
        {compState.loader && (
          <div className="loader">
            {" "}
            <LinearProgress />{" "}
          </div>
        )}
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
              <div className="leagues_holder">
                <div style={explore} className="explore">
                  <span>Topup</span> <span className="logout">History</span>
                </div>

                <div style={{borderColor:"#2C3A47"}} className="paypanel">
                  <div style={paymentTitle}>
                    <p>
                      BUZ ME &nbsp; <CreditCardOutlined style={smile} />
                    </p>
                  </div>
                  {/* <SecurityOutlined style={secured}/>  */}

                  <input
                    onKeyUp={() => {
                      clearBeneficiary();
                    }}
                    onChange={(e) => {
                      setAMOUNT(e.target.value);
                    }}
                    value={amount}
                    style={rec_inputs}
                    placeholder=" Enter Amount to Buz "
                  />

                  <br />
                  <input
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
                      >{`Buzz ${compState.benef} some cash`}</div>{" "}
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
                        type="password"
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
          <div style={{ textAlign: "center" }}>
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
          <br />
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
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    logout: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
