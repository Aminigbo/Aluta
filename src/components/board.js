import React, {useState} from 'react'

import {seePredicted,testResult,disp_cashout,add_wallet,logOut,disp_betslip} from '../redux'

import { Redirect,useHistory,useParams} from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"   
 
import loaderImg from "../static/logos/animation.gif"
 
import {Close,Beenhere,SentimentVeryDissatisfied} from '@material-ui/icons';
import Realtime from "./includes/realtime" 
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js" 
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright"
import { emphasize, withStyles } from '@material-ui/core/styles'; 
import Chip from '@material-ui/core/Chip';

import { supabase } from '../configurations'; 
import Naira from 'react-naira'

import {ToastContainer,toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import Pills from "./includes/desktoppillsholder"
import Toppills from "./includes/topdesktoppills" 



const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); 



const emoji_holder = { 
  textAlign: "center",
   color:"crimson"
}

const emoji = {
  fontSize: "100px",
  textAlign: "center",
  color:"crimson"
}

const takeHome = {
   color: "red", 
   boxShadow: "inset 2px -2px 10px #f2edd7"
 }


const kickoff_date = {
   fontWeight: "bold",
   fontSize: "12px",
}

const green = {
   color:"green"
}

const crimson = {
   color:'crimson'
}

function Board({ appState,disp_predicted,logout,compare,disp_result,dispCashout,walletAdd,betslip}) {
    // initialize supabase
   const new_supabase = supabase()
   const state = appState  
   // console.log(state);

   let history = useHistory();
   const { league,categoryId } = useParams()  

   
   const mySubscription = () => {
      let data = []
      new_supabase
      .from('predictions')
      .on('*', payload => {
         data = payload.new 
         console.log(state.predicted)
         console.log(data)
         // disp_predicted(state.predicted)
      })
      .subscribe()
      // disp_predicted(data)

      new_supabase
      .from('category_results')
      .on('*', payload => {
         data = payload.new
         let result = []
         let actualResult2 = data.result.filter(e => e.categoryId == categoryId)
            console.log(actualResult2)
            actualResult2.map(pre => { 
               for (let i = 0; i < pre.predictions.length; i++) {
                  result.push(pre.predictions[i]) 
               }
            }) 
            disp_result(result) 
            
         
      })
      .subscribe()
   
   }


   async function compare() {
      setStates({ ...compState, loader: true })
      await new_supabase
      .from('category_results')
      .select('*')
      .eq('leagueId', league)
      .eq("status", "ACTIVE")
      .then(response => { 
         // console.log(response)
         if (response.body.length > 0) {
            let result = []
            let actualResult = response.body.filter(e => e.categoryId == categoryId)
            console.log(categoryId)
            if (actualResult.length > 0) {
               actualResult[0].result.map(pred => {
                  for (let i = 0; i < pred.predictions.length; i++) {
                     result.push(pred.predictions[i])
                     // console.log(pred.predictions[i])
                  }
               })
            } 
            disp_result(result)
            //  setStates({ ...compState, loader: false })
            setTimeout(() => setStates({ ...compState, loader: false }), 1000);
            // console.log(result)
         } else {
            disp_result([])
            //  setStates({ ...compState, loader: false })
            setTimeout(() => setStates({ ...compState, loader: false }), 1000); 
         }
      })

   }


   

   React.useEffect(() => {  
      window.scrollTo(0, 0); 
      setStates({ ...compState, loader: true })
      // setTimeout(() => setStates({ ...compState, loader: false }), 500); 
      new_supabase
      .from('predictions')
      .select('*')
      .eq('league', league)
      .eq('categoryId', categoryId)
      .then(response => { 
         disp_predicted(response.data)
      })
      

      new_supabase.from("categories").select("*").eq("league_id", league).eq("status", "ACTIVE").then(cashoutResponse => {
         let categoryToConfigure = cashoutResponse.body[0].data.filter(e => e.id === categoryId)[0]
         // console.log(categoryToConfigure)
         if (categoryToConfigure.status == "ACTIVE" || categoryToConfigure.cashedout == "NO") {
            dispCashout("YES")
         } else {
            dispCashout("NO")
         }
      }).catch(error => {
         setStates({...compState, loader:false})
      }) 


      compare()
      mySubscription()
      getUser()

      setBetslipData()
   }, []);

 

   const [compState, setStates] = useState("")
   
   const reroute_breadcrumb = (link) => {
      history.push(`/${link}`)
   }


   // toasts
   const successToast = (msg) => { 
      toast.success(msg, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => {console.log("Redirect")}
      });
   }

   const errorToast = (msg) => { 
      toast.error(msg, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
   }
   

   function handleClick(event) {
      event.preventDefault();
      history.push("/")
   }
   




   function getUser() {
      //SETTING THE WINNERS
      let correct_predictions = []
      let winner_holder = []
      let correctPicked = ''
      let predictor = '' 
      
      state.predicted.map(matches => {
         
         if (state.testresult.length > 0) {
            correctPicked = state.testresult.filter(e => e.user == matches.user && e.correct == true).length
            
            if (!state.testresult.filter(e => e.user == matches.user)[0]) {
               predictor = ''
            } else {
               predictor = state.testresult.filter(e => e.user == matches.user)[0].user
            }

            
            
         } else {
            correctPicked = ''
            predictor =''
         } 
         let winner_predictions = { correctPicked, predictor } 
         correct_predictions.push(correctPicked)
         winner_holder.push(winner_predictions)
      })
      // console.log(predictor)
      // console.log(state)

      let allPoints = []
      for (let i = 0; i < winner_holder.length; i++) {
         allPoints.push(winner_holder[i].correctPicked)
      }
      let highestPoint = Math.max(...allPoints)
      let highestPointArray = winner_holder.filter(e => e.correctPicked == highestPoint)
      // console.log(highestPoint)
      let whoWin = ''
      if (highestPointArray.length > 0 ) {
         whoWin = highestPointArray
         // console.log(highestPointArray)
      } else {
         whoWin = 0
      }
      return {
         highest_point:highestPoint,
         winner:whoWin
      }
   }
   

   //  GET  WINNER(S)
   function winners() {
      // state.loggedInUser.user.id
      // console.log(getUser().winner)
      return getUser().winner.map(winners => {
         if (winners.predictor == state.loggedInUser.user.id) {
            return (
               <div><button onClick={()=>{ cashOut() }} className="cashOut">CASH-OUT </button> <br /></div> 
            )
         }
      })
   }
   

   function sortPredictions() {
      if (state.predicted.length > 0) { 
         let newPredicted = []
         let newData = '' 
         if (state.testresult) {
            state.predicted.map(matches => { 
            let picked_count = state.testresult.filter(e => e.user == matches.user && e.correct == true).length
            newData = {
               ...matches,
               points:picked_count*3
            }
            newPredicted.push(newData)
         })
         newPredicted.sort(function(a, b) {
            return parseFloat(b.points) - parseFloat(a.points);
         });
            
         return newPredicted
         } else {
            return state.predicted

         }
      } 

   }


   

   const predictions = (picked_count, picked_count2) => {  
      if (state.predicted.length > 0) {
         // console.log(state);
         return sortPredictions().map(matches => {  
            if (state.testresult) {
               picked_count = state.testresult.filter(e => e.user == matches.user && e.correct == true).length
               picked_count2 = state.testresult.filter(e => e.user == matches.user)
            } else {
               picked_count = ''
               picked_count2 =''
            } 
            return (
               <div> 
                  <div className="matches boxshadow"> 
                  <div className="getUser_slip">  
                     {getUser().highest_point < 1 ?
                        <div className="points">
                           <small>{matches.points}</small> 
                        </div> :
                        <div className={picked_count === getUser().highest_point ? "winnerPoints" : "points"}>
                           <small>{matches.points}  </small> 
                        </div>
                     }  
                     <span className='view_slip' id={matches.away} onClick={() => {
                        setStates({ ...compState, showSlip: true, slipData: { ...matches, score: picked_count } }); 
                     }} >{matches.user == state.loggedInUser.user.id ? "view your slip " : "view slip "} </span>
                     
                        
                     </div> 
                  <div className="select_prediction_logo_holder"> 
                     <span className="predictor">{matches.username}</span>
                     <div className="predicted_time">
                        <span style={kickoff_date}>{matches.predicted_at} </span>
                     </div>  
                  </div>
               </div> 
               </div>
            ) 
         })
      } else {
         return (
         <div style={emoji_holder}> <br />
           <SentimentVeryDissatisfied style={emoji} /> <br /><br />
           <b>OPS! ....  There are no predictions found.</b>
          </div>
        )
      }
   }

   


      const userTakeHome = () => {
         if (state.predicted[0]) {
            
            let numOfOfPredictors = state.predicted.length
            let amount = state.predicted[0].amount
            let totalAmount = amount * numOfOfPredictors
            let netPerc = ""
            if (numOfOfPredictors == 1) {
            netPerc = 0
            }else if (totalAmount > 90 && totalAmount < 1001) {
            netPerc = 17;
            } else if (totalAmount >1000 && totalAmount < 5001) {
            netPerc = 15;
            }else if (totalAmount > 5000 && totalAmount < 15001) {
            netPerc = 12;
            } else if (totalAmount > 15000 && totalAmount < 30001) {
            netPerc = 10
            } else if (totalAmount > 30000) {
            netPerc = 8
            }

            let grossPer = netPerc * totalAmount / 100
            return totalAmount - grossPer
         } else {
            return 0
         }
      }



   // TAKING OUT COMMISION AND ALLOWING THE WINNER WITHDRAW HIS/HER BONUS
   const cashOut = () => { 
      let userTakeHome2 =''
      if (getUser().winner.length > 1) {
         userTakeHome2 = userTakeHome()/getUser().winner.length 
      } else {
         userTakeHome2 = userTakeHome()
      }
      console.log(userTakeHome2)
      console.log(getUser().winner.length)
      let newWallet = parseInt(state.wallet) + parseInt(userTakeHome2)

      // console.log(newWallet)
      setStates({ ...compState, loader: true })
      new_supabase.from("categories").select("*").eq("status", "ACTIVE").eq("league_id", league).then(updated => { 
         //    GET THE ACTUAL CATEGORY TO CONFIGURE
         let categoryToConfigure = updated.data[0].data.filter(e => e.id === categoryId)[0]
         let categoryToConfigurePosition = updated.data[0].data.findIndex(e => e.id === categoryId)
         let newCategory = { ...categoryToConfigure, status: "INACTIVE", cashedout:"YES" } 
         updated.data[0].data.splice(categoryToConfigurePosition, 1, newCategory)
         new_supabase.from("categories").update([{ data: updated.data[0].data }]).eq("status", "ACTIVE").eq("league_id", league).then(updated_status => {
            new_supabase.from("user").update([{ wallet: newWallet }]).eq("id", state.loggedInUser.user.id).then(updatedWallet => {

               const feed_meta = {category:categoryId, prize:userTakeHome2, amount:state.predicted[0].amount,league}
               new_supabase.from("feeds").insert([{type:"NEW WINNER", from: "ADMIN", to: "ALL", meta: feed_meta}]).then(insert_response => { 
                  walletAdd(updatedWallet.body[0].wallet)
                  dispCashout("NO")
                  setStates({ ...compState, loader: false })
                  successToast("Congratulations, cashed-out successfully")
                  // console.log(updated_status)

               })
               
            })  
         }) 
      }).catch(error => {
         errorToast("A network error occured")
      })
      
   }

   

   let setBetslipData = () => { 
         new_supabase
         .from('category_results')
         .select('*')
         .eq('leagueId', league)
         .eq("categoryId", categoryId)
         .eq("status", "ACTIVE")
         .then(response => {
            if (response.body.length < 1) {
               betslip([])
            } else {
               let results = response.body[0].result
               betslip(results) 
            }
         })
   }

   

 
   // Load users prediction slip
   const previewData = () => {
      let data = []
      let actualSlip  = []
      if (state.betslip.length < 1) {
         data = compState.slipData.predictions
         actualSlip = data
      } else {
         data = state.betslip
         actualSlip = data.filter(e => e.user == compState.slipData.user)[0].predictions
      }
      
      console.log(actualSlip)
      return actualSlip.map(matches => { 
         return (
            <div className="matches">
               
               <div className="select_prediction_btn_holder2"> 
                  <button className={matches.selected == 1  ? 'active' : 'select_prediction_btn'} id={1} >Home</button>
                  <button className={matches.selected == 0  ? 'active' : 'select_prediction_btn'} id={0} >Draw</button>
                  <button className={matches.selected == 2  ? 'active' : 'select_prediction_btn'} id={2} >Away</button> 
                  <div>
                     <span  style={kickoff_date}>{matches.correct != null && <span> {matches.correct === true ? <Beenhere style={green}/> : <Close style={crimson} / >}  </span>}   {matches.date} - {matches.time}</span>
                  </div>
               </div>
               <div className="select_prediction_logo_holder">
                  <b>{matches.home} <br /> {matches.away} </b>
                  
                  <div>
                     
                  </div>
               </div>
               
            </div> 
         )
      })
   }
   

 

  return state.loggedIn === false ? (
   <div>
      <Redirect to="/login" />  
   </div>
    
  ):
     (
        <div id="body bg">
    <div className="mobile">  
    {/* {state.realtime.length > 0 && <Realtime />} */}
         <Realtime />
    <div className="header_footer">
      <Footer  />
      <Header />
    </div>
    
    <div> 
   <br />
       
      <div>  
        <Toppills /> 
         
         <br /> 
                    
                    
         
        
       
       
        {state.cashout == "YES" ?
        <div className='explore'>
        
         <Naira style={takeHome} className="primary">{userTakeHome()}</Naira>
         
         {getUser().highest_point > 0 && <div>
            {winners()}
            {/* {getUser().winner == state.loggedInUser.user.id && 
            <button onClick={()=>{ cashOut() }} className="cashOut">CASH-OUT </button> } <br /> */}
         </div>}
         
         
         
        </div> :
        <div className=''> {compState.loader == false && <div>{state.categories.length > 1 && <div> <br /><div className='sectionLabels'><span><b> <Naira style={takeHome} className="primary">{userTakeHome()}</Naira></b> &nbsp; &nbsp; for the winner </span></div></div>}</div> }
        </div> } 

        {compState.loader != true ?
            <div animateIn='fadeIn'>
               <ToastContainer autoClose={2000}/>
               <div className="leagues_holder">
                  {predictions()} {/* load all matches */}  
               </div>
            </div> 
        :
        <div className="img_loader">  <br /><br /><br /><br /> <br /><br /><img  src={loaderImg} /> <br /> <br /><br /><br /><br /><br /></div>
        } 
      </div>  

      <Pills />  <br /><br />         
    </div> 
    
    
   </div>  
      <Desktopleft />  
      <Desktopright />
           {compState.showSlip == true && <div className="betslipModal2">
              <div className="betslipModal">
                  <div className="usernameHolder"><b className="username">
                     {console.log(compState)}
                     <br /><br />
                     {compState.slipData.username} &nbsp; - &nbsp; <span className="slipCode">{compState.slipData.league.toUpperCase()}</span></b>
                     <span className="closeModal" onClick={()=>{
                        setStates({ ...compState, showSlip: false, })
                     }}>Close</span>
                     <b className="betslipAmount"><Naira>{compState.slipData.amount}</Naira></b>
                     <div className="betslip_first">
                        <span>Predicted at:</span> <b className="betslipDate">{compState.slipData.predicted_at}</b>
                     </div>
                  </div>
                  
                  <div className="betslipMatchesHolder">
                     <br />{previewData()} <br /> 
                     </div>
                  
               </div>
           </div>}
      
        
    </div>
   )
   
}


const mapStateToProps = state => { 
  return {
    appState: state.user
  }
}


const mapDispatchToProps = (dispatch,encoded) => {
  return { 
     disp_predicted: (predicted) => dispatch(seePredicted(predicted)),
     disp_result: (result) => dispatch(testResult(result)),
     dispCashout: (cashout) => dispatch(disp_cashout(cashout)),
     walletAdd: (wallet) => dispatch(add_wallet(wallet)),
     betslip: (betslip) => dispatch(disp_betslip(betslip)),
     logout: () => dispatch(logOut()), 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)