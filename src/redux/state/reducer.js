import {
   LOGGED_IN_SUCCESS,
   LOGGED_IN_ERROR,
   PICK_MATCH,
   ALL_MATCHES,
   LOGIN_SUCCESS,
   LOG_OUT,
   PREDICTED,
   TEST_RESULT,
   INIT_TOPUP,
   WALLET,
   ALL_ONE_ON_ONE,
   WINNER,
   STAGGED_MATCHES,
   LEAGUE_STATUS,
   MATCH_REFRESH,
   CATEGORIES,
   CASHOUT,
   oneXoneResults,
   JACKPOT,

   REALTIME,
   
   BETSLIPDATA,

   // withdrawal
   WITHDRAW,

   // SESSION
   SESSION,

   // ========================== ADMIN
   ADMIN_WITHDRAWAL_REQUEST,

   // new test category
   FEED
} from './type'


const initialState = {
   loggedIn: false,
   loggedInUser : '',
   pickedMatches: 0,
   predicted:[],
   allMatches: [],
   testresult: [],
   payment: "",
   WALLET: 0,
   allOneOnOne: [],
   winner: [],
   stagged: [],
   league_status: '',
   refresh: [],
   categories: [],
   cashout: "NO",
   oneXone_results: [],
   realtime: [],
   jackpots: [],
   session: '',
   betslip: [],
   withdrawal: [],
   feeds:[],
   
   // admin withdrawal request noti
   withdrawal_request_noti: [], 
   
}





const reducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGGED_IN_ERROR:
         return {
            ...state,
            loggedIn: false,
            error:action.error
         }
      case LOGGED_IN_SUCCESS:
         return {
            ...state,
            loggedInUser: action.user,
            loggedIn:true
         }
      case PICK_MATCH :
      return {
         ...state,
         pickedMatches:action.picked_matches
      }
      case ALL_MATCHES:
      return {
         ...state,
         allMatches:action.all_matches
      }
      case LOGIN_SUCCESS:
      return {
         ...state,
         loggedIn:true,
         loggedInUser:action.userMetadata
      }
      case LOG_OUT:
      return {
         ...state,
         loggedIn:false,
         loggedInUser:'',
         pickedMatches:0,
         allMatches: [],
         predicted: [],
         testresult: [],
         wallet: 0,
         allOneOnOne: [],
         stagged: [],
         refresh: [],
         categories: [],
         jackpots: [],
         session: -0.1,
         betslip: [],
         withdrawal: [],
         feeds:[],
         
         // admin withdrawal request noti
         withdrawal_request_noti:[]
         }
      case PREDICTED:
         return {
            ...state,
            predicted:action.predicted
         }
      
      case TEST_RESULT:
         return {
            ...state,
            testresult:action.result
         }
      
      case INIT_TOPUP:
         return {
            ...state,
            payment:action.payment
         }
      case WALLET:
         return {
            ...state,
            wallet:action.wallet
         }
      
      case ALL_ONE_ON_ONE:
         return {
            ...state,
            allOneOnOne:action.data
         }
      
      case WINNER:
         return {
            ...state,
            winner:action.winner
         }
      case STAGGED_MATCHES:
         return {
            ...state,
            stagged:action.stagged
         }
      
      case LEAGUE_STATUS:
         return {
            ...state,
            league_status:action.status
         }
      case MATCH_REFRESH:
         return {
            ...state,
            refresh:action.refresh
         }
      case CATEGORIES:
         return {
            ...state,
            categories:action.categories
         }
      
      case CASHOUT:
         return {
            ...state,
            cashout:action.cashout
         }
      
      case oneXoneResults:
         return {
            ...state,
            oneXone_results:action.result
         }
      
      case REALTIME:
         return {
            ...state,
            realtime:action.realData
         }
      
      case JACKPOT:
         return {
            ...state,
            jackpots:action.jackpot
         }
      
      // loggout user at every inactivity
      case SESSION:
         return {
            ...state,
            session:action.time
         }
      
      case BETSLIPDATA:
         return {
            ...state,
            betslip:action.betslip
         }
      
      // user place withdrawal
      case WITHDRAW:
         return {
            ...state,
            withdrawal:action.meta
         }
      
      // admin receive withdrawal request
      case ADMIN_WITHDRAWAL_REQUEST:
         return {
            ...state,
            withdrawal_request_noti:action.request
         } 

      case FEED:
         return {
            ...state,
            feeds:action.payload
         }

      default:return state
   }
}

export default reducer