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
import { EmojiEmotions } from "@material-ui/icons";
import Toppills from "../components/includes/topdesktoppills";
import { ToastContainer, toast, Bounce } from "react-toastify";
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
//   color: "#fa983a",
  color:"#2C3A47"
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

function Home({ appState, walletAdd, logout }) {
  let history = useHistory();
  const state = appState;
  const new_supabase = supabase();

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    setStates({ ...compState, loader: true });
    setTimeout(() => setStates({ ...compState, loader: false }), 500);
  }, []);

  const [amount, setAMOUNT] = useState("");
  const [reason, setReason] = useState("");

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
  const successToast = (res) => {
    toast.success(res, {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => {
        history.push(`/`);
      },
    });
  };

  const reroute_breadcrumb = (link) => {
    history.push(`/${link}`);
  };

  const [compState, setStates] = useState("");

  //   ?@==========================
  async function placeRequest(reason) {
    if (amount < 100) {
      infoToast("minimum amount is 100 Buz");
    } else if (amount > 5000) {
      infoToast("Maximum amount exceeded");
    } else {
      if (reason.length > 10) {
        setStates({ ...compState, loader: true }); //  set loader to true
        const meta = { response: [] };
        const feedMeta = {
          requster: state.loggedInUser.user.OgPin,
          reason,
          amount,
        };
        new_supabase
          .from("requsts")
          .insert([
            {
              user: state.loggedInUser.user.username,
              amount,
              reason,
              userpin: state.loggedInUser.user.OgPin,
              meta,
            },
          ])
          .then((resolve) => {
            new_supabase
              .from("feeds")
              .insert([
                {
                  type: "NEW BUZ REQUEST",
                  from: state.loggedInUser.user.username,
                  to: "ALL",
                  req_id: resolve.body[0].id,
                  meta: feedMeta,
                },
              ])
              .then((insert_response) => {
                setStates({ ...compState, loader: false });
                successToast("Your requst has been placed successfully");
              });
          })
          .catch((error) => {
            setStates({ ...compState, loader: false });
          });
      } else {
        alert("Give a clear reason");
      }
    }
  }

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      {resetPin(state, history, smile)}
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
          <Footer />
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
                padding: "0px 20px",
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

                <div className="paypanel">
                  <div style={paymentTitle}>
                    <p>Request Buz</p>
                  </div>
                  {/* <SecurityOutlined style={secured}/>  */}

                  <input
                    onChange={(e) => {
                      setAMOUNT(e.target.value);
                    }}
                    value={amount}
                    style={rec_inputs}
                    placeholder=" Enter Amount"
                  />

                  <br />
                  <textarea
                    cols="20"
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                    value={reason}
                    style={rec_inputs}
                    placeholder="Enter your request reason *"
                  ></textarea>

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
                    <small>
                      You can only request maximum of 5000 Buz per day.
                    </small>
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
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    logout: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
