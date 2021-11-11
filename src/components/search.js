import React, {useState} from 'react'
import { Redirect,useHistory, useParams} from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"


import {alloneonone, add_wallet, disp_oneXoneResult} from '../redux'


import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js" 
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright"  

import {Button } from 'react-bootstrap';  

import { Link } from "react-router-dom"; 

import {LinearProgress } from '@material-ui/core';
import {HelpOutline, People} from '@material-ui/icons'
import Naira from 'react-naira'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {logOut} from '../redux'
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';

import {FileCopyOutlined, SentimentVeryDissatisfied,CheckCircle} from '@material-ui/icons';
 
 import loaderImg from "../static/logos/animation.gif"
 
import { emphasize, withStyles } from '@material-ui/core/styles';

import { ToastContainer, toast} from 'react-toastify';
 

import { supabase } from '../configurations';
import logo from "../static/logos/logo2.png"
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


const vs = {
   fontSize: "10px",
   color:"gray"
}
const kickoff_date = {
   fontWeight: "bold",
   fontSize: "12px",
}

let action_btn_success2_holder = {
  textAlign: "center",
  
}
let action_btn_success2 = { 
  //  width: '30%',
  backgroundColor: '#4e7a97', 
  marginRight: '15px',
  color: 'white',
  borderRadius: '3px',
  // float: "right",
  border: "none",
  padding: "2px 26px",
  fontWeight:"bold",
  outline:"none"
}

let action_btn_success2X = { 
  //  width: '30%',
  backgroundColor: 'lightgray', 
  marginRight: '15px',
  color: 'white',
  borderRadius: '3px',
  // float: "right",
  border: "none",
  padding: "2px 26px",
  fontWeight:"bold",
  outline: "none",
  cursor:"no-drop"
}

let action_btn_success2X2 = { 
  //  width: '30%',
  backgroundColor: 'orange', 
  marginRight: '15px',
  color: 'white',
  borderRadius: '3px',
  // float: "right",
  border: "none",
  padding: "2px 6px",
  fontWeight:"bold"
}

const alignLeft = {
  textAlign: "left",
  // backgroundColor: "red",
  width:"200px"
}

const emoji_holder = {
  // fontSize: "100px",
  textAlign: "center",
   color:"crimson"
}

const emoji = {
  fontSize: "100px",
  textAlign: "center",
  color:"crimson"
}

let action_btn_success3 = { 
  //  width: '30%',
  backgroundColor: 'gray', 
  marginRight: '15px',
  color: '#f2edd7',
  borderRadius: '3px',
  float: "right",
  border: "none",
  padding: "2px 6px",
  fontWeight:"bold"
}

const loaderB = {
  marginRight: '15px',   
  float: "right",  
}



const code = {
  fontSize:"12px",
  fontWeight: "bold",
  float: "left",
  marginTop: "5px",
  marginLeft:"5px"
}


const copy = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: '0.5px solid orange', 
  padding: '0 7px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  outline:"none"
}

const copied = {
  background: 'linear-gradient(45deg, lightblue  30%, mediumseagreen 90%)',
  borderRadius: 3,
  border: '0.5px solid lightblue', 
  padding: '0 7px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  outline:"none"
}

const big = {
  fontSize:"12px"
}
const small = {
  fontSize: "17px",
  color:'white'
}

function Home({ appState, logout,walletAdd,getOneOnOne,oneXoneResultAdd}) {
  let history = useHistory();
  const state = appState
   const new_supabase = supabase()
   const {challangeId} = useParams()
   


  React.useEffect((compState) => {  
    window.scrollTo(0, 0);
    // disp_allMatches(mtchData)
    // disp_pickedMatches(0)
    setStates({ ...compState, loader: true})
    setTimeout(() => setStates({ ...compState, loader: false}), 500);
   console.log(challangeId)
    let allOneOnOneMatches = []
    new_supabase
    .from('challenge')
    .select('*')
    .eq('code', challangeId)
    .then(response => {
      new_supabase
      .from('results')
      .select("*")
      .then(res => { 
        for (let i = 0; i < res.body.length; i++) { 
          allOneOnOneMatches.push(...res.body[i].result) 
        }
      })
      getOneOnOne(response.body)  // save all active one on one to redux
      setStates({ ...compState, loader: false}) 
    })
    .catch(error => {
      alreadyExistToast("A network error occured")
      setStates({ ...compState, loader: false}) 
    })
    
    oneXoneResultAdd(allOneOnOneMatches)
      
   }, []); 
 
  



  const reroute_breadcrumb = (link) => {
    history.push(`/${link}`)
  }
  


   // ============================================================   toasts
   const infoToast = (message) => { 
    toast.info(message, {
        position: toast.POSITION.TOP_CENTER,
      //  onClose: () => {history.push(`/board/${league}/${amount}`)}
    });
   }
  
  const toupToast = (message) => { 
    toast.info(message, {
        position: toast.POSITION.TOP_CENTER,
       onClose: () => {history.push(`/topup`)}
    });
  }
  

  const errorToast = (message) => { 
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      //  onClose: () => {history.push(`/board/${league}/${amount}`)}
    });
  }

  const successToast = (message) => { 
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => { 
        setStates({ ...compState, showModal: false,showConfirmModal: false,viewChallange: false,loader:false})  
      }
    });
  }

  const alreadyExistToast = (message) => { 
    toast.info(message, {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => { 
        setStates({ ...compState, showModal: false,showConfirmModal: false})  
      }
    });
  }

  const cashoutToast = (message) => {
     toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => { 
        // setStates({ ...compState, showModal: false,showConfirmModal: false,viewChallange: false,loader:false})  
        window.location.reload(false);
      }
    });
  }

  
  

  const [compState, setStates] = useState('')

  const [challangeState, setStates2] = useState('')
  



  const pickMatch = (matches, leagueId) => {
    setStates({ ...compState, showConfirmModal: true, showConfirmModalContent:{...matches,leagueId} }) 
  }



  //  SHOW CHALLANGE CREATION MODEL
  const showmodal = () => { 
    setStates({ ...compState, loader: true })  // set loader
    let err_ = []
    new_supabase
      .from('all_matches')
      .select("*")
      .then(response => { 
        let activeLeagueMatches = response.body[0].matches.filter(e => e.kickedOff == false)
        if (activeLeagueMatches.length > 0) {
          activeLeagueMatches[0].matches.map(er => {
            err_.push(er)
            setStates({ ...compState, showModal: true,all_matches:err_, loader: false})
          }) 
        } else {
          alreadyExistToast("There are no available matches")
        } 
      })
      .catch(error => {
        alreadyExistToast("A network error occured")
         setStates({ ...compState, loader: false}) 
    })
  }





  const hidemodal = () => { 
    setStates({ ...compState, showModal: false}) 
  }
  


  const [createAmount, setCreateAmount] = useState("")
  const [createChoice, setCreateChoice] = useState("")

  
  // CHECK IF CHALLANGE MATCHES ARE STILL ACTIVE
  const checkIfKicked = (category) => {
    let actualChallengeStatus = state.oneXone_results.filter(e => e.matchid == category.match)
    let kickedOff = ""
    if (actualChallengeStatus.length > 0) {
      kickedOff = true
      setStates2({ ...challangeState, viewChallange: true, challangeData:{...category.data, kickedOff,correct:actualChallengeStatus[0].correct} })
    } else {
      kickedOff = false
      setStates2({ ...challangeState, viewChallange: true, challangeData:{...category.data, kickedOff,correct:null} })
    } 
     
  }
  
 
// RENDER ALL CHALLENGES
  const render1X1 = () => {
    if (state.allOneOnOne.length < 1) {
        return (
          <div style={emoji_holder}>
            <SentimentVeryDissatisfied style={emoji} /> <br /><br />
            <b>OPS! .... <br /> there is no challenge found.</b>
          </div>
        )
    } else {
      
      return state.allOneOnOne.map(category => { 
        
        return (
          <div   class="leagues">
            <div className={category.data.users.length == 3 ? "stakes secondary" : "stakes primary"} >{category.data.users.length} <People /></div>

            <div style={code} >
               <button style={compState.copy == true ? copied : copy} onClick={() => {setStates({...compState, copy:true}); navigator.clipboard.writeText(category.code)}} > <b style={big}>{category.code} </b>   <FileCopyOutlined style={small}/>   </button>
            </div>
            
            <div onClick={(e) => {checkIfKicked(category)  }}  className="stakes_price">
              <b className='icon'><Naira>{category.data.price}</Naira></b> {category.data.isActive == false && <CheckCircle />}  <br /><br />
              <div className='oneXone'><b className="small">{category.data.matche.home}</b></div>
              <div className='oneXone'><b className="small">{category.data.matche.away}</b></div>
            </div>
          </div>
        )
      })
      
    }
  }

  


  // ===============show all active matches when user wants to create a challenge
  const show_matches = () => {  
    return compState.all_matches.map(all_matches => { 
        return (
          <div animateIn='fadeIn' id={1} onClick={(e)=>{pickMatch(all_matches,all_matches.id);}}>
            <div className="matches">
              <div className="select_prediction_btn_holder">
                Select  
              </div>
              <div className="select_prediction_logo_holder">
                <b>{all_matches.home} </b>  <b>{all_matches.away}</b> <br />
                <span style={kickoff_date}> {all_matches.date} {all_matches.time} </span>
              <div> 
              </div>
            </div>
          </div> 
        </div>
      )
    }) 
    
    // console.log(state.allMatches);
   
  }



  // ========================================== create challenge
 async function createChallenge(){ 
    let amount = createAmount;
    let choice = createChoice;
    let{id,username,email}= state.loggedInUser.user
    if (choice === "Your choice" || amount.length < 1 || choice.length < 1) {
      errorToast("PLease fill out all forms") 
    }else if (amount < 100) {
      errorToast("100 naira is the minimum amount to create a challenge")
    } else {
      setStates({ ...compState, loader: true })  // set loader

      function getRandomInt(n) {
        return Math.floor(Math.random() * n);
      }
      function shuffle(s) {
        var arr = s.split('');           // Convert String to array
        var n = arr.length;              // Length of the array
        
        for(var i=0 ; i<n-1 ; ++i) {
          var j = getRandomInt(n);       // Get random of [0, n-1]
          
          var temp = arr[i];             // Swap arr[i] and arr[j]
          arr[i] = arr[j];
          arr[j] = temp;
        }
        
        s = arr.join('');                // Convert Array to string
        return s;                        // Return shuffled string
      }
      var s = toString(new Date().getTime()+id+username+compState.showConfirmModalContent);
      s = shuffle(s);
      // console.log(s);

      let home = ""
      let draw = ""
      let away = ""
      
      if (choice == "Home") {
        home=choice
      }
      if (choice == "Draw") {
        draw=choice
      }

      if (choice == "Away") {
        away=choice
      }



      
      let hostData = {
        host: {
          id,  // user id
          username
        },
        id:s,
        isActive: true,
        league: "",
        matche: compState.showConfirmModalContent,
        price:amount,
        stake: 1,
        home,
        draw,
        away,
        users: [
          {
            choice,
            id, //user id
            isCorrect: null,
            isHost: true,
            username
          }
        ]
      } 
      // console.log(hostData) 
      // console.log(amount)
      //  console.log(wallet)
      if (parseInt(amount) > parseInt(state.wallet)) {
        setStates({ ...compState, loader: false }) // unset loader
        errorToast("Insufficient wallet balance")
      } else {
        await new_supabase
        .from('challenge')
        .select('*')
        .eq('amount', amount)
        .eq('match', hostData.matche.id) 
        .neq('status', 3)
        .then(response => { 
          
          if (response.body.length < 1) {

            let newWallet = state.wallet - amount 
            new_supabase
            .from('user')
            .update({ wallet: newWallet })
            .eq('email', email)
            .then(update => {
              walletAdd(update.body[0].wallet)
            })

            return new_supabase
            .from('challenge')
            .insert([
              { host: id, match: hostData.matche.id,amount,data:hostData,status:1, isActive:true, code:s },
            ])
              .then(created => {
               new_supabase
              .from('challenge')
              .select('*')
              .eq('isActive', 'true')
              .then(response => {
                getOneOnOne(response.body)  // save all active one on one to redux 
                successToast("Success!! Your challenge has been created.")
              })
            })
            .catch(error=>{
              setStates({ ...compState, loader: false })
              errorToast("A network error occured")
            })
          } else {
            setStates({ ...compState, loader: false })
            alreadyExistToast(`Challenge of ${amount} for this match is this active.`)
          }
        })
        // successToast("Ready") 
      }
      
    }
  }



  
  // CREATING CHALLANGE

  const child = () => {
    return <div className="child_one"> 
      <div className="vsHolder">  <b>{compState.showConfirmModalContent.home}</b> <br />Vs <br />  <b>{compState.showConfirmModalContent.away}</b></div>
      <div className="kickoff_holder"> <b>Kick-off: &nbsp;&nbsp;</b> {compState.showConfirmModalContent.date} &nbsp; {compState.showConfirmModalContent.time}</div>
      <div className="createButtonHolder"> 
        <input onChange={(e)=>{ setCreateAmount(e.target.value)  }} value={createAmount}  required id="entPriceer" placeholder="Enter price" type="text" variant="outlined" /> 
        <select onChange={(e)=>{ setCreateChoice(e.target.value)  }} value={createChoice} required id="entPriceer">
          <option >Your choice</option>
          <option value="Home">HOME</option>
          <option value="Draw">DRAW</option>
          <option value="Away">AWAY</option>
        </select>
        
        {compState.loader != true ? <Button id=" " onClick={(e) => { createChallenge(e.target.id) }} style={action_btn_success2X2}>Confirm</Button>  :
        <img  src={loaderImg} />
        }
        
      </div>
    </div>
  }

  
  function userTakeHome(numOfOfPredictors, price) {
    let totalAmount = price * numOfOfPredictors
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
  }
  



  const cashout1X1 = (data) => {
    setStates({...compState, loader2:true})
    let user = state.loggedInUser.user.id;
    let userWallet = state.wallet
    let { price, stake } = data
    let takeHome = userTakeHome(stake, price)
    let newWallet = parseInt(userWallet) + parseInt(takeHome)
    let challangeId = challangeState.challangeData.id
    console.log(challangeId)
    
    new_supabase.from("challenge").select("*").eq("isActive", "true").then(response => { 
      let newChallanged_data = { ...response.data[0].data, chashedout: true,isActive:false } 
      new_supabase.from("challenge").update([{ data: newChallanged_data }]).eq("id", response.data[0].id).then(response2 => {
        new_supabase.from("user").update([{ wallet: newWallet }]).eq("id", state.loggedInUser.user.id).then(wallet_updated => {
          setStates2({ ...challangeState, challangeData: newChallanged_data })
          walletAdd(newWallet)
          cashoutToast("Wowohh!!!  You've cashed out big!!!!")
        })
      }).catch(error => {
        errorToast("A network error occured")
      })
    }).catch(error => {
      errorToast("A network error occured")
    })
    
    
  }

  
 


  let returnCorrectPrediction = () => { 
    let correct_prediction = challangeState.challangeData.correct
    if (correct_prediction == 0) {
      correct_prediction = "Draw"
    }else if (correct_prediction == 1) {
      correct_prediction = "Home"
    } else if (correct_prediction == 2) {
      correct_prediction = "Away"
    } 
    return correct_prediction
  }

  // ============================= showing those who challenged
  const pickChallange = () => {
    let correct_prediction = returnCorrectPrediction()
    let data = {
      stake: challangeState.challangeData.stake,
      price:challangeState.challangeData.price
    }
    
    return challangeState.challangeData.users.map(users => { 
      return (
        <div className="says">
          <b>{users.username}</b> predicted <b>{users.choice}</b> <br />
          <b className="winner">{correct_prediction == users.choice ? <div>                
            <b>Winner!!!</b> 
            {state.loggedInUser.user.id == users.id &&
            <span>
              {compState.loader2 != true ? <span>
                 {challangeState.challangeData.isActive == true && <button onClick={() => { cashout1X1(data) }} className="primartBtn">Cash out</button>}
              </span>:
               <img  src={loaderImg} />
               } 
            </span>}
          </div> : <span className="secondary">----------</span>}
          </b>
          <b className="saysPrice"><Naira>{challangeState.challangeData.price}</Naira></b>
        </div>
      )
    })
  } 

  let expectedWin = '';
  
  // expected win when challengers are less than 3
  let expectedWin2 = ""
  let amountAfterDeduction2 = ""


  let percentage = "";
  let amountAfterDeduction = ""

  
  if (challangeState.challangeData) { 
      // determining admin percentages for every win
    if (challangeState.challangeData.price > 90 && challangeState.challangeData.price < 7600) {
      percentage = 5
    } else if(challangeState.challangeData.price > 7500 && challangeState.challangeData.price < 30001) {
      percentage = 4
    } else if(challangeState.challangeData.price > 30000 && challangeState.challangeData.price < 100001) {
      percentage = 3
    }else if (challangeState.challangeData.price > 100000) {
      percentage = 2
    }

    let amount = challangeState.challangeData.price;
    expectedWin = challangeState.challangeData.users.length 
    expectedWin2 = challangeState.challangeData.users.length

    // amount without commision
    let amountWithoutCommission = amount * expectedWin;

    // amount to be deducted
    let amountToBeDeducted = amountWithoutCommission * percentage / 100
    
    // amount to win after deduction of commission
    amountAfterDeduction = amountWithoutCommission - amountToBeDeducted

    
// /////////////////////////////////////////////////////////////////////////////
        // when challengers are less than 3
    // amount without commision
    let amountWithoutCommission2 = amount * expectedWin2;

    // amount to be deducted
    let amountToBeDeducted2 = amountWithoutCommission2 * percentage / 100
    
    // amount to win after deduction of commission
    amountAfterDeduction2 = amountWithoutCommission2 - amountToBeDeducted2



  } else {
    expectedWin = ''
    amountAfterDeduction = " "
    amountAfterDeduction2=""
  }
  

  const challengeBtn = () => { 
    if (challangeState.challangeData.kickedOff === true) {
      return (<div> {compState.loader != true ? <Button  style={action_btn_success3}>Kicked off</Button> :
          <img style={loaderB}  src={loaderImg} />
        } 

      </div>)
    } else {
      return (
        <div>
          <Button id="Home" onClick={(e) => { acceptChallenge(e.target.id) }} style={challangeState.challangeData.home==="" ? action_btn_success2 : action_btn_success2X}> Home</Button>
            <Button id="Draw" onClick={(e) => { acceptChallenge(e.target.id) }} style={challangeState.challangeData.draw==="" ? action_btn_success2 : action_btn_success2X}> Draw</Button>
          <Button id="Away" onClick={(e) => { acceptChallenge(e.target.id) }} style={challangeState.challangeData.away==="" ? action_btn_success2 : action_btn_success2X}> Away</Button>
        </div>
        ) 
    }
  } 



// //////////////////////////////   check if logged in user already predicted
  const challengedOrNot = () => {
    console.log(challangeState.challangeData);

    // loggedin user details 
    let loggedInUser = state.loggedInUser.user.id

    let ifUserPredicted = challangeState.challangeData.users.filter(e => e.id === loggedInUser).length 

    if (ifUserPredicted < 3) {
      if (ifUserPredicted > 0) {
        if (challangeState.challangeData.kickedOff === true) {
          return (<div> {compState.loader != true ? <Button  style={action_btn_success3}>Kicked off</Button> :
              <img style={loaderB}  src={loaderImg} />
            } </div>)
        } else {
          return (<div> {compState.loader != true ? <Button  style={action_btn_success3}>You are in already</Button> :
            <img style={loaderB}  src={loaderImg} />
          } </div>) 
        }

      } else {
        return (
          <div style={action_btn_success2_holder}>
            <br />

            {compState.loader != true ? <div> {challengeBtn()} </div> :
              <img  src={loaderImg} />
            } 
          </div>
        ) 
      }
    }else{
      return (<div> {compState.loader != true ? <Button  style={action_btn_success3}>Good to go</Button> :
        <img style={loaderB}  src={loaderImg} />
      } </div>)
    } 
  }


  
  // //////////////////////////////   ACCEPT CHALLENGE
  const acceptChallenge = (e) => {
    setStates({ ...compState, loader: true })
    let choice = e;

    let isOptionSelected = challangeState.challangeData.users.filter(e => e.choice === choice).length 

    console.log(isOptionSelected);
    if (isOptionSelected > 0) {
      setStates({ ...compState, loader: false })
      infoToast("Option already selected")
    } else {
        // loggedin user details 
        let loggedInUser = state.loggedInUser.user 
        let newUser = {
          id: loggedInUser.id,
          username: loggedInUser.username,
          choice,
          isCorrect: null,
          isHost:false
        }
        console.log(state.allOneOnOne)
      let challenge_to_update = state.allOneOnOne.filter(e => e.data.id === challangeState.challangeData.id)
      

      if (parseInt(state.wallet) < parseInt(challenge_to_update[0].amount)){
        setStates({ ...compState, loader: false }) // unset loader
        toupToast("You have a low wallet balance to challenge")
      } else { 
        challangeState.challangeData.users.push(newUser)
        // console.log(challangeState.challangeData);

        let home = ""
        let draw = ""
        let away = ""
        
        if (choice == "Home" && challangeState.challangeData.home == "") {
          home=choice
        } else {
          home = challangeState.challangeData.home
        }

        if (choice == "Draw" && challangeState.challangeData.draw == "") {
          draw=choice
        } else {
          draw = challangeState.challangeData.draw 
        }
        
        if (choice == "Away" && challangeState.challangeData.away == "") {
          away=choice
        } else {
          away = challangeState.challangeData.away
        }
        

        let newStatus =  parseInt(challenge_to_update[0].status) + 1 

        let newData = { ...challenge_to_update[0].data ,users:challangeState.challangeData.users ,  home, draw, away ,stake:newStatus}
        
        console.log(newData)
        // console.log(challenge_to_update[0])
        
        let newWallet = parseInt(state.wallet) - parseInt(challenge_to_update[0].amount) 

        new_supabase
        .from('user')
        .update({ wallet: newWallet })
        .eq('email', state.loggedInUser.user.email)
        .then(update => {
          walletAdd(update.body[0].wallet)
        })
        

        new_supabase
        .from('challenge')
        .update({ data: newData})
        .eq('code', newData.id)
        .then(updateResponse => {   
          new_supabase
          .from('challenge')
          .select('*')
          .eq('isActive', 'true')
            .then(response => {
            // console.log(response)
            successToast("Challenge accepted.") 
            getOneOnOne(response.body)  // save all active one on one to redux  
          }) 
        })
        .catch(error=>{
          setStates({ ...compState, loader: false })
          errorToast("A network error occured")
        })
      }
    }
  }
  

  



  function handleClick(event) {
    event.preventDefault();
    history.push("/")
  }






  return state.loggedIn === false ? (
    <div>
          <Redirect to="/login" />  
    </div>
    
  ):
  (
    <div id="body bg">
    <div className="mobile">  
    <div className="header_footer">
      <Footer  />
      <Header />
    </div>
    
    <div>
    
      {console.log(state)}

      <br />  
      <div>  
         <ToastContainer autoClose={2000}/> 

        {/* <div className="breadcrumb_pill_holder">
          <Link className="breadcrumb_pill desktop" id="topup" onClick={(e) => { reroute_breadcrumb(e.target.id) }}><HomeOutlined fontSize="small" />Home</Link>
          <Link className="breadcrumb_pill desktop" id="oneXone" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><SportsKabaddiOutlined fontSize="small" /> oneXone</Link>
          <Link className="breadcrumb_pill" id="topup" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><HorizontalSplitOutlined fontSize="small" /> Top Up</Link>
          <Link className="breadcrumb_pill" id="withdraw" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><HowToVoteOutlined fontSize="small" /> Withdraw</Link>
          <Link className="breadcrumb_pill" id="jackpots" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><SportsRugbyOutlined fontSize="small" /> Jackpots</Link> */}
          {/* <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{window.location.assign("https://www.livescore.com/en/")}}><TrackChangesOutlined fontSize="small" /> Live Score</Link> */}
        {/* </div> */}
        {/* <div className="explore desktop"><span>Explore</span>  <span className="logout" onClick={() => { logout(); history.push("/")}}>Logout</span>  </div> <br /> */}
        <Toppills />      
              

        <br />
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
          onClick={handleClick}
          />
          {/* <StyledBreadcrumb component="a"  label={"Back"} onClick={history.goBack}  /> */}
          
      </Breadcrumbs>  
      
      
       {compState.loader == false && <div className="explore">   <span className="logout" onClick={()=>{showmodal()}}>Create</span> </div> } 
 
        {compState.loader != true ?
          <div animateIn='fadeIn'> <br />
            <div className="leagues_holder">
              {render1X1()} 
            </div>
          </div>
        :
        <div className="img_loader">  <br /><br /><br /><br /> <br /><br /><img  src={loaderImg} /> <br /> <br /><br /><br /><br /><br /></div>
        }

        {/* <br /> <br />
        <div  className="breadcrumb_pill_holder">
          <Link className="breadcrumb_pill" id="topup" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Terms</Link>
          <Link className="breadcrumb_pill" id="withdraw" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> User guide</Link>
          <Link className="breadcrumb_pill" id="jackpots" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}>  FAQ</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Support</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Blogs</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Ads</Link>
        </div> */}
      </div> 
      <br />
      
      <Pills /> <br />
    </div> 
    
    
      </div> 
      
      {/* desktop left */}
      <Desktopleft />
      
        
      {/* desktop right   */}
      <Desktopright />
      
      
      {compState.showModal === true && <div className="create1X1Modal1">
        <div className="create1X1Modal2">
          <div className="create1X1Modaltitle"><b>Select match</b> <b onClick={()=>{hidemodal()}} className="close">Close</b></div>
          
          {show_matches()} <br />
        </div>
      </div>}
      
        
        {/* confirm creating one on one */}
      {compState.showConfirmModal === true && <div className="create1X1Modal1_2">
        <div className="create1X1Modal2_2">
          <div className="create1X1Modaltitle_2"> <ToastContainer autoClose={2000}/><b>Confirm</b> <b onClick={()=>{setStates({ ...compState, showConfirmModal: false })}} className="close">Close</b></div>
            {child()}
            
          <div className="disclaimer">
            By confirming, you agree with the 1X1  terms and conditions
          </div>
        </div>
        
      </div>}
      
        


      {challangeState.viewChallange === true && <div className="create1X1Modal1">
      <div className="create1X1Modal2 challangeHolder">
          
          <div className="create1X1Modaltitle"><ToastContainer autoClose={2000}/><small>One on One </small> <b onClick={()=>{setStates2({ ...challangeState, viewChallange: false, challangeData:'' })}} className="close">Close</b></div>
           
            
            {challangeState.challangeData.users.length === 3 ? 
            <div className="createTitle"><b>{challangeState.challangeData.host.username}</b> and  <b>{challangeState.challangeData.users.length} others</b></div> :
            <div>Challange  <b>{challangeState.challangeData.host.username}</b> and  <b>{challangeState.challangeData.users.length - 1} other(s)</b></div>}
            {/* {console.log(challangeState.challangeData)} */}
            {console.log(state)}
            {pickChallange()} <br /><br />
            
           
            {challangeState.challangeData.users.length !== 3 ? <div> {challengedOrNot()} <br /><br /><br />
              
              <div className="expectedWin">Stand a chance of winning
                {/* <b> <Naira>{amountAfterDeduction2}</Naira></b> */}
                <b> &nbsp; &nbsp;BIG!!!</b>
              </div>
            </div> :
              
              <div> {challengedOrNot()} <br /><br /><br />
              
              <div className="expectedWin"> <div>Every challenger stands a chance of winning
              <b>  <Naira>{amountAfterDeduction}</Naira></b> </div></div>
            </div>
              
             }

           

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
    logout: () => dispatch(logOut()),
    getOneOnOne: (data) => dispatch(alloneonone(data)),
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    oneXoneResultAdd: (result) => dispatch(disp_oneXoneResult(result)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)