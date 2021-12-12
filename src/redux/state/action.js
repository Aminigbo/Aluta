import {
  LOGGED_IN_SUCCESS,
  LOGGED_IN_ERROR,
  ALL_MATCHES,
  LOADING,
  LOGIN_SUCCESS,
   LOG_OUT,
  LOG_OUT_HARD,
  GIVEAWAY_BENEFICIARIES,
  TEST_RESULT,
  INIT_TOPUP,
  WALLET,
  ALL_ONE_ON_ONE,
  COMPARED_RESULT,
  WINNER,
  STAGGED_MATCHES,
  ISSIGNAL,
  DRAFT,
  WHOREQUEESTED,
  NOTIFICATION,
  REQUEST,
  REALTIME,

  // betslip
  BETSLIPDATA,

  // withdrawal
  WITHDRAW,
  SESSION,

  // load all feeds
  FEED,

  // ========================== ADMIN
  ADMIN_WITHDRAWAL_REQUEST,
} from "./type";

export const loginError = (error) => {
  return {
    type: LOGGED_IN_ERROR,
    error,
  };
};

export const alloneonone = (data) => {
  return {
    type: ALL_ONE_ON_ONE,
    data,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGGED_IN_SUCCESS,
    user,
  };
};

export const disp_loading = (bolean) => {
  return {
    type: LOADING,
    bolean,
  };
};

export const allMatches = (all_matches) => {
  return {
    type: ALL_MATCHES,
    all_matches,
  };
};

export const loginSuc = (userMetadata) => {
  return {
    type: LOGIN_SUCCESS,
    userMetadata,
  };
};

export const logOut = (type) => {
     console.log(type)
   if (type == "HARD") {
     return {
      type:LOG_OUT_HARD
   }
  } else {
    return {
      type: LOG_OUT,
    };
  }
};

export const allWhoBenefited = (payload) => {
  return {
    type: GIVEAWAY_BENEFICIARIES,
    payload,
  };
};

export const testResult = (result) => {
  return {
    type: TEST_RESULT,
    result,
  };
};

export const init_payment = (payment) => {
  return {
    type: INIT_TOPUP,
    payment,
  };
};

export const add_wallet = (wallet) => {
  return {
    type: WALLET,
    wallet,
  };
};

export const set_winner = (winner) => {
  return {
    type: WINNER,
    winner,
  };
};

export const disp_noti = (payload) => {
  return {
    type: NOTIFICATION,
    payload,
  };
};

// ////////////////////////////  ADMIN

export const stage_match = (stagged) => {
  return {
    type: STAGGED_MATCHES,
    stagged,
  };
};

export const isSignal = (signal) => {
  return {
    type: ISSIGNAL,
    signal,
  };
};

export const draft = (payload) => {
  return {
    type: DRAFT,
    payload,
  };
};

export const disp_whoRequested = (who) => {
  return {
    type: WHOREQUEESTED,
    who,
  };
};

export const disp_request = (bolean) => {
  return {
    type: REQUEST,
    bolean,
  };
};

export const disp_realtime = (realData) => {
  return {
    type: REALTIME,
    realData,
  };
};

// log out user at every inactivity
export const disp_session = (time) => {
  return {
    type: SESSION,
    time,
  };
};

// dispatch betslips
export const disp_betslip = (betslip) => {
  return {
    type: BETSLIPDATA,
    betslip,
  };
};

// dispatch withdrawal atatus
export const disp_withdrawal = (meta) => {
  return {
    type: WITHDRAW,
    meta,
  };
};

// admin get notification of withdrawal request
export const disp_admin_withdrawal_req = (request) => {
  return {
    type: ADMIN_WITHDRAWAL_REQUEST,
    request,
  };
};

// dispatch all feeds to state
export const disp_feeds = (payload) => {
  return {
    type: FEED,
    payload,
  };
};
