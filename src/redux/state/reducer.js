import {
   LOGGED_IN_SUCCESS,
   LOGGED_IN_ERROR,
   LOADING,
   ALL_MATCHES,
   LOGIN_SUCCESS,
   LOG_OUT,
   GIVEAWAY_BENEFICIARIES,
   TEST_RESULT,
   INIT_TOPUP,
   WALLET,
   ALL_ONE_ON_ONE,
   WINNER,
   STAGGED_MATCHES,
   ISSIGNAL,
   DRAFT, 
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
   benefited:[],
   allMatches: [],
   testresult: [],
   payment: "",
   WALLET: 0,
   allOneOnOne: [],
   winner: [],
   stagged: [], 
   refresh: [],
   loading:false,
   cashout: "NO",
   oneXone_results: [],
   realtime: [],
   draft: [],
   session: '',
   betslip: [],
   withdrawal: [],
   feeds: [],
   signal:"",
   
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
         benefited: [],
         testresult: [],
         wallet: 0,
         allOneOnOne: [],
         stagged: [],
         refresh: [],
         loading: false,
         jackpots: [],
         session: -0.1,
         betslip: [],
         withdrawal: [],
         feeds:[],
         
         // admin withdrawal request noti
         withdrawal_request_noti:[]
         }
      case GIVEAWAY_BENEFICIARIES:
         return {
            ...state,
            benefited:action.payload
         }
      
      case LOADING:
         return {
            ...state,
            loading:action.bolean
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
      
      case ISSIGNAL:
         return {
            ...state,
            signal:action.signal
         }
      case DRAFT:
         return {
            ...state,
            draft:action.payload
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