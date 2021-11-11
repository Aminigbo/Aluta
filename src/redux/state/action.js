import {
   LOGGED_IN_SUCCESS,
   LOGGED_IN_ERROR,
   ALL_MATCHES,
   PICK_MATCH,
   LOGIN_SUCCESS,
   LOG_OUT,
   PREDICTED,
   TEST_RESULT,
   INIT_TOPUP,
   WALLET,
   ALL_ONE_ON_ONE,
   COMPARED_RESULT,
   WINNER,
   STAGGED_MATCHES,
   LEAGUE_STATUS,
   MATCH_REFRESH,
   CATEGORIES,
   CASHOUT,
   oneXoneResults,
   JACKPOT,

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
} from './type'

export const loginError = (error) => {
   return {
      type: LOGGED_IN_ERROR,
      error
   }
}

export const alloneonone = (data) => {
   return {
      type: ALL_ONE_ON_ONE,
      data
   }
}

export const loginSuccess = (user) => {
   return {
      type: LOGGED_IN_SUCCESS,
      user
   }
}

export const pickMatch = (picked_matches)=>{
   return {
      type:PICK_MATCH,
      picked_matches
   }
}

export const allMatches = (all_matches)=>{
   return {
      type:ALL_MATCHES,
      all_matches
   }
}

export const loginSuc = (userMetadata)=>{
   return {
      type:LOGIN_SUCCESS,
      userMetadata
   }
}

export const logOut = ()=>{
   return {
      type:LOG_OUT
   }
}

export const seePredicted = (predicted) => {
   return {
      type: PREDICTED,
      predicted
   }
}

export const testResult = (result) => {
   return {
      type: TEST_RESULT,
      result
   }
}

export const init_payment = (payment) => {
   return {
      type: INIT_TOPUP,
      payment
   }
}

export const add_wallet = (wallet) => {
   return {
      type: WALLET,
      wallet
   }
}

export const set_winner = (winner) => {
   return {
      type: WINNER,
      winner
   }
}

export const disp_oneXoneResult = (result) => {
   return {
      type: oneXoneResults,
      result
   }
}




// ////////////////////////////  ADMIN

export const stage_match = (stagged) => {
   return {
      type: STAGGED_MATCHES,
      stagged
   }
}

export const league_status = (status) => {
   return {
      type: LEAGUE_STATUS,
      status
   }
}

export const match_refresh = (refresh) => {
   return {
      type: MATCH_REFRESH,
      refresh
   }
}



export const disp_categories = (categories) => {
   return {
      type: CATEGORIES,
      categories
   }
}

export const disp_cashout = (cashout) => {
   return {
      type: CASHOUT,
      cashout
   }
}

export const disp_jackpots = (jackpot) => {
   return {
      type: JACKPOT,
      jackpot
   }
}

export const disp_realtime = (realData) => {
   return {
      type: REALTIME,
      realData
   }
}


// log out user at every inactivity
export const disp_session = (time) => {
   return {
      type: SESSION,
      time
   }
}

// dispatch betslips
export const disp_betslip = (betslip) => {
   return {
      type: BETSLIPDATA,
      betslip
   }
}


// dispatch withdrawal atatus
export const disp_withdrawal = (meta) => {
   return {
      type: WITHDRAW,
      meta
   }
}




// admin get notification of withdrawal request
export const disp_admin_withdrawal_req = (request) => {
   return {
      type: ADMIN_WITHDRAWAL_REQUEST,
      request
   }
}


// dispatch all feeds to state
export const disp_feeds = (payload) => {
   return {
      type: FEED,
      payload
   }
}
 