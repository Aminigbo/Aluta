import {
   LOGGED_IN_SUCCESS,
   LOGGED_IN_ERROR,
   LOADING,
   ALL_MATCHES,
   LOGIN_SUCCESS,
   LOG_OUT,
   LOG_OUT_HARD,
   GIVEAWAY_BENEFICIARIES,
   TEST_RESULT,
   INIT_TOPUP,
   WALLET,
   ALL_ONE_ON_ONE,
   WINNER,
   STAGGED_MATCHES,
   ISSIGNAL,
   DRAFT, 
   WHOREQUEESTED,
   NOTIFICATION,
   REQUEST,

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
   loggedInUser :null, 
   benefited:[],  
   payment: "",
   WALLET: 0,
   notification:false,
   // winner: [],
   // stagged: [], 
   // refresh: [],
   loading:false,
   whoRequested:null,
   request: false,
   realtime: [],
   draft: [],
   session: '', 
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
         loggedIn:true,
         loggedInUser:action.userMetadata
            
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
         wallet: 0, 
         refresh: [],
         loading: false, 
         session:0, 
         
         // admin withdrawal request noti
         withdrawal_request_noti:[]
      }
      
      case LOG_OUT_HARD:
         return { 
             ...state,
         loggedIn:false, 
         wallet: 0, 
         refresh: [],
         loading: false, 
         session: -0.1, 
         loggedInUser :null, 
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
      
      case WHOREQUEESTED:
         return {
            ...state,
            whoRequested:action.who
         }
      
      case NOTIFICATION:
         return {
            ...state,
            notification:action.payload
         }
      
      case REALTIME:
         return {
            ...state,
            realtime:action.realData
         }
      
      case REQUEST:
         return {
            ...state,
            request:action.bolean
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