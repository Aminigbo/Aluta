// import  "../../static/css/home/index.css"
import "../../static/css/top-nav.css";
import { LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  logOut,
  loginSuc,
  add_wallet,
  disp_noti,
  disp_session,
  disp_request,
} from "../../redux";
import { useHistory, Link } from "react-router-dom";
import {
  LocalAtm,
  Person,
  AddBoxOutlined,
  EmojiTransportationOutlined,
  CardGiftcardOutlined,
  ForumOutlined,
  HomeOutlined,
  StorefrontOutlined,
  AssignmentReturnedOutlined,
  NotificationsActiveOutlined,
  AccountBalanceWallet
} from "@material-ui/icons";

// strong tin.mp3
import mp3 from "../../static/audio/Doorbell.mp3";
import { checkSession } from "../controlers/session";
import { cashbackloader } from "../../components/loading";

import { updateUserMeta } from "../../functions/models/index";

//  function that checkes if the user is still using the default transaction pin
import { trigger, resetPin } from "../../functions/controllers/resetPin";

// @=== import success response from worker function
import { alert, BuzAlert } from "../../functions/workers_functions/alert";

// importing realtime controller
// import { buzSubscription } from "../../functions/controllers/realtime";

import { supabase } from "../../functions/configs/index";
const smile = {
  color: "white",
  fontSize: "20px",
};

const active = {
  background: "#0a3d62",
  color: "white",
};

function Desktopright({
  appState,
  login_suc,
  dispNoti,
  set_session,
  logout,
  dispRequest,
}) {
  let history = useHistory();
  const state = appState;

  const userId = state.loggedInUser.user.id;
  const beneficiaryId = state.loggedInUser.user.meta.beneficiaryId;
  const new_supabase = supabase();

  const [pins, setPins] = useState({
    first: "",
    second: "",
  });
  const [stateAlert, setStateAlert] = useState("");
  const [compState, setStates] = useState({
    title: "",
  });
  const [gotbuzzed, setGotbuzzed] = useState({
    status: false,
    data: null,
  });

  const resetTPin = () => {
    if (pins.first.length != 4 || pins.second.length != 4) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Invalid pin selected",
      });
    } else if (pins.first !== pins.second) {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Sorry, you first and second pin does not match",
      });
    } else if (pins.first == "0000" || pins.second == "0000") {
      setStateAlert(false);
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Sorry, you can not use the default pin.",
      });
    } else {
      setStates({
        ...compState,
        loading: true,
      });
      let { first, second } = pins;

      let user = state.loggedInUser.user;
      let newUser = {
        ...user,
        meta: { ...state.loggedInUser.user.meta, transactionPin: first },
      };
      let payload = {
        email: user.email,
        newUser: newUser.meta,
      };

      const data = {
        user: newUser,
        meta: state.loggedInUser.meta,
      };

      // call a async function to reset the userpin in the database
      updateUserMeta(payload)
        .then((res) => {
          if (res.success == true) {
            login_suc(data);
            setStateAlert(true);
            setStates({
              ...compState,
              loader: false,
              alertMsg: "Your pin is ready for transactions.",
            });
          } else {
            setStateAlert(false);
            setStates({
              ...compState,
              loader: false,
              alertMsg: "Sorry, a network error occured",
            });
          }
        })
        .catch((errer) => {
          alert("A network error occured");
          setStates({
            ...compState,
            loader: false,
          });
        });
    }
  };

  // @========  REALTIME SUBSCRIPTION
  const sub = () => {
    console.log(userId);
    new_supabase
      .from(`buz-me`)
      .on("INSERT", (payload) => {
        const response = payload.new;
        console.log(response);
        // let check = response.filter((e) => e.to == userId);
        if (response.to == userId) {
          let myNewWallet =
            parseInt(state.wallet) + parseInt(response.meta.data.amount);

          // addwallet(myNewWallet)
          setStates({
            ...compState,
            payload: response,
            myNewWallet,
          });
          window.navigator.vibrate([2000, 100, 2000]);
          var audio = new Audio(mp3);
          audio.play();
          setStateAlert("buzAlert");
        }
      })
      .subscribe();

    // @======== subscribe to cashback resolve
    new_supabase
      .from(`cashback`)
      .on("UPDATE", (payload) => {
        const response = payload.new;
        if (response.user == userId) {
          dispNoti(true);
          window.navigator.vibrate([2000, 100, 2000]);
          var audio = new Audio(mp3);
          audio.play();
        }
      })
      .subscribe();

    new_supabase
      .from(`giveaway-lucky-winners`)
      .on("INSERT", (payload) => {
        const response = payload.new;
        if (response.beneficiaryId == beneficiaryId) {
          let myNewWallet =
          parseInt(state.wallet) +
          parseInt(response.meta.giveawayData.userGets);
        console.log(response);

        // addwallet(myNewWallet)
        let load = {
          meta: {
            data: {
              amount: response.meta.giveawayData.userGets,
              desc:
                "You are one of the beneficiaries of " +
                response.giver.name +
                "'s give away. Cheers ",
            },
            sender: { fullname: response.giver.name },
          },
        };
        window.navigator.vibrate([2000, 100, 2000]);
        var audio = new Audio(mp3);
        audio.play();
        setStates({
          ...compState,
          payload: load,
          myNewWallet,
        });
        setStateAlert("buzAlert");
        }
      })
      .subscribe();

    // @======== SUBSCRIBE TO NOTIFICATION TABLE
    new_supabase
      .from(`notifications`)
      .on("INSERT", (payload) => {
        if (payload.new.to == userId) {
          dispNoti(true);
          // var audio = new Audio(mp3);
          // audio.play();
        }
      })
      .subscribe();

    // @======== SUBSCRIBE TO BUZZ REQUEST TABLE
    new_supabase
      .from(`buzz-request`)
      .on("INSERT", (payload) => {
        const response = payload.new;
        console.log(response);
        let check = response.to.filter((e) => e.value == beneficiaryId);
        if (check.length > 0) {
          dispNoti(true);
          var audio = new Audio(mp3);
          audio.play();
          window.navigator.vibrate([2000, 100, 2000]);
        }
      })
      .subscribe();
  };

  // @=====  claim the alert
  const claimBuz = () => {
    // addwallet(compState.myNewWallet)
    setStateAlert(null);
    history.push(`/notification`);
  };

  React.useEffect(() => {
    sub();
    checkSession(logout, set_session, state);
  }, []);

  let successPayload = {
    title: compState.title.length < 1 ? "SUCCESS" : compState.title,
    msg: compState.alertMsg,
    error: false,
  };

  let errorPayload = {
    title: "error",
    msg: compState.alertMsg,
    error: true,
  };

  let pathname = window.location.pathname;
  let split = pathname.split("/")[1];
  let allow = "";
  if (split == "setschool" || split == "updateprofile") {
    allow = true;
  } else {
    allow = false;
  }
  return (
    <>
      {allow === false && (
        <div>
          {resetPin(state, resetTPin, smile, setPins, pins)}
          {trigger(state, history, smile)}
        </div>
      )}

      <div id=" " className="top-nav-holder">
        {/* {console.log(split)} */}
        {compState.loading === true && <>{cashbackloader()} </>}
        {stateAlert === null && <span>{history.push("/")}</span>}
        {stateAlert === true && alert(successPayload, setStateAlert)}
        {stateAlert === false && alert(errorPayload, setStateAlert)}
        {stateAlert == "buzAlert" && BuzAlert(compState.payload, claimBuz)}
        <div
          onClick={() => {
            // window.scrollTo(0, 0);
            history.push("/");
            if (window.pageYOffset === 0) {
              console.log("refesh");
            } else {
              // window.scrollTo(0, 0)
            }
          }}
          className="top-nav-pills-holder"
        >
          <span className="top-nav-pills">
            {" "}
            <HomeOutlined />{" "}
          </span>
          <p className="top-nav-pills-title"> Home</p>
        </div>

        <div
          onClick={() => {
            history.push("/transfer");
          }}
          className="top-nav-pills-holder"
        >
          <span
            style={{
              background: split == "transfer" && "#0a3d62",
              color: split == "transfer" && "white",
            }}
            className="top-nav-pills"
          >
            {" "}
            <LocalAtm />{" "}
          </span>
          <p className="top-nav-pills-title">Buz Me</p>
        </div>

        <div
          onClick={() => {
            history.push("/request");
          }}
          className="top-nav-pills-holder"
        >
          <span
            style={{
              background: split == "request" && "#0a3d62",
              color: split == "request" && "white",
            }}
            className="top-nav-pills"
          >
            {" "}
            <CardGiftcardOutlined />{" "}
          </span>
          <p className="top-nav-pills-title">Request</p>
        </div>

        <div
          onClick={() => {
            history.push("/tour");
          }}
          className="top-nav-pills-holder"
        >
          <span
            style={{
              background: split == "tour" && "#0a3d62",
              color: split == "tour" && "white",
            }}
            className="top-nav-pills"
          >
            {" "}
            <EmojiTransportationOutlined />{" "}
          </span>
          <p className="top-nav-pills-title">Tour</p>
        </div>

        {/* <div className="top-nav-pills-holder">
            <span  className="top-nav-pills" >  <ForumOutlined/> </span>
            <p className="top-nav-pills-title">Forum</p>
            </div> */}

        {/* <div
          onClick={() => {
            history.push("/listmart");
          }}
          className="top-nav-pills-holder"
        >
          <span
            style={{
              background: split == "listmart" && "#0a3d62",
              color: split == "listmart" && "white",
            }}
            className="top-nav-pills"
          >
            {" "}
            <StorefrontOutlined />{" "} 
          </span>
          <p className="top-nav-pills-title">Redeem</p>
        </div> */}

        <div
          onClick={() => {
            if (state.loggedInUser.user.meta.schoolmode === false) {
              history.push("/cb");
            } else {
              history.push("/cashback");
            }
          }}
          className="top-nav-pills-holder"
        >
          <span
            style={{
              background: split == "cashback" || (split == "cb" && "#0a3d62"),
              color: split == "cashback" || (split == "cb" && "white"),
            }}
            className="top-nav-pills"
          >
            <AssignmentReturnedOutlined />
          </span>
          <p className="top-nav-pills-title">Cash Back</p>
        </div>

        {state.loggedInUser.user.meta.schoolmode !== false ? (
          <div
            onClick={() => {
              history.push("/create");
            }}
            className="top-nav-pills-holder"
          >
            <span
              style={{
                background: split == "create" && "#0a3d62",
                color: split == "create" && "white",
              }}
              className="top-nav-pills"
            >
              {" "}
              <AddBoxOutlined />{" "}
            </span>
            <p className="top-nav-pills-title">Post</p>
          </div>
        )
          : (
          <div
            onClick={() => {
              // history.push("/listmart");
                alert("To be completed")
            }}
            className="top-nav-pills-holder"
          >
            <span
              style={{
                background: split == "listmart" && "#0a3d62",
                color: split == "listmart" && "white",
              }}
              className="top-nav-pills"
              // nonstudentfeed
            >
              {" "}
              {/* <StorefrontOutlined />{" "} */}

                <AccountBalanceWallet />
            </span>
            <p className="top-nav-pills-title">Add cash</p>
          </div>
          )
        }
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = (dispatch, encoded) => {
  return {
    set_session: (time) => dispatch(disp_session(time)),
    logout: () => dispatch(logOut()),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
    addwallet: (walletBal) => dispatch(add_wallet(walletBal)),
    dispNoti: (payload) => dispatch(disp_noti(payload)),
    dispRequest: (bolean) => dispatch(disp_request(bolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Desktopright);
