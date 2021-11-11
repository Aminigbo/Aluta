import React, {useState} from 'react'
import { Redirect,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js" 
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright"

import Pills from "./includes/desktoppillsholder" 
import { supabase } from '../configurations';
import loaderImg from "../static/logos/animation.gif"
import { Link } from "react-router-dom"; 
import {toast} from 'react-toastify';
import {logOut,disp_withdrawal,add_wallet} from '../redux' 
import {HomeOutlined,ThumbUpOutlined,HorizontalSplitOutlined,HowToVoteOutlined,SportsRugbyOutlined,SecurityOutlined,SportsKabaddiOutlined,Person} from '@material-ui/icons';
 

const secured = {
   color: "#4e7a97",
   fontSize: "40px",
   position: "absolute",
   right: "5px",
   top:"5px"
}


const rec_inputs = { 
   margin: "5%",
   width: '90%',
   padding: '4px 2px',
   border: '5px',
   height: '30px',
   borderBottom: "0.5px solid grey",
   backgroundColor:"#FFFDF2",
   color:"#4e7a97",
   outline:"none"
} 

const explore = {
   display:"none"
} 
let modal_footer2_btn_holder = { 
   marginTop:'15px',
   marginBottom: '10px',
   // backgroundColor: '#f3f3f3',
   width:'100%'
} 

let action_btn_success2 = { 
   width: '30%',
   backgroundColor: '#4e7a97',
   padding:'2px 4px',
   marginRight: '15px',
   color: 'white',
   borderRadius: '3px',
   float: "right",
   border:"none"
}

const secured_env = {
   textAlign: "center",
   color:"#4e7a97"
}

const action_btn_loader = {
  float: "right",
  marginRight: '15px',
}

function Home({ appState, withdraw,walletAdd }) {
  let history = useHistory();
  const state = appState
  const new_supabase = supabase()


  
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


  
  React.useEffect((compState) => {  
      window.scrollTo(0, 0); 
      setStates({ ...compState, loader: true})
    
    
    new_supabase.from("withdrawal").select('*').eq('user', state.loggedInUser.user.id).eq('status', 'pending').then(check => {
      withdraw(check.body)
      setTimeout(() => setStates({ ...compState, loader: false }), 500);
    })
   }, []); 
 
   const [amount, setAMOUNT] = useState('')
  const [pin, setPin] = useState('') 

  const reroute_breadcrumb = (link) => {
    history.push(`/${link}`)
  }



  const infoToast = (res) => { 
      toast.info(res, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => {history.push(`/`)}
      });
   }
   const errorToast = (res) => {
      toast.error(res, {
         position: toast.POSITION.TOP_CENTER, 
      });
   }
   const successToast = (res) => {
      toast.success(res, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => {history.push(`/`)}
      });
   }
  

  
  const [compState, setStates] = useState({
    suspendCount : 0
  })
  
  const initiateTransaction = () => { 
    if (!amount || !pin || amount.length < 1 || pin.length < 3) {
      errorToast("Enpty / invalid field")
    } else if (parseInt(amount) > parseInt(state.wallet)) {
      errorToast("Insufficient fund ")
    } else if (amount < 500) {
      errorToast("Amount below maximum withdrawal")
    } else if (pin != state.loggedInUser.user.pin ) {
      errorToast("You provided a wrong PIN")
      // let inc = compState.suspendCount + 1
      // setStates({
      //   suspendCount :inc
      // })
      // console.log(compState)
    } else {
      setStates({ ...compState, loader: true})
      let newWallet = state.wallet - amount
      new_supabase.from("withdrawal").insert([{
        status: 'pending', user: state.loggedInUser.user.id, meta: {
          amount:amount,
          date: new Date().getDate(),
          ref: new Date()+amount+state.loggedInUser.user.id
          
        },
        username:state.loggedInUser.user.username
      }]).then(inserted => {
        new_supabase.from("user").update([{ wallet: newWallet }]).eq("id", state.loggedInUser.user.id).then(walletUpdate => {
          withdraw(inserted.body)
          successToast("Request queued")
          walletAdd(newWallet)
          setStates({ ...compState, loader: false})
        })
      }).catch(error => {
        errorToast("A network error occured")
      })
    }
  }

  
  
  return state.loggedIn === false ? (
    <div>
          <Redirect to="/login" />  
    </div>
    
  ):
  (

    <div id="body bg">
      <div style={{position:"fixed", width:"100%", height:"100%", left:"0px", top:"0px", background:"rgb(0,0,0,0.6)",zIndex:"1000"}} >
        <div style={{position:"absolute",top:"40%",width:"100%", height:"60px",textAlign:"center",left:"0%"}}>
           <span style={{background:"white", color:"crimson", padding:"20px 7px"}}>Withdrawal is inactive. Check up later </span> <br /><br/> 

            <p style={{ color: "white", padding: "5px 20px", textAlign: "center",background:" ", width:" " }}>All the amount in your wallet remains yours
              will be withdrawable to your local bank account once the
            withdrawal becomes active.</p>
        </div>
      </div> 
    <div>
      <div className="mobile"> 
      {/* {compState.loader && <div className="loader">  <LinearProgress /> </div>} */}
      
      <div className="header_footer">
        <Footer  />
        <Header />
      </div>
      {console.log(state)}
      <div> 
        <br />  
        <div>    
          <div className="breadcrumb_pill_holder">
            <Link className="breadcrumb_pill desktop" to="" ><HomeOutlined fontSize="small" />Home</Link>
          <Link className="breadcrumb_pill desktop" id="oneXone" onClick={(e) => { reroute_breadcrumb(e.target.id) }}><SportsKabaddiOutlined fontSize="small" /> oneXone</Link>
          <Link className="breadcrumb_pill desktop" to="leagues" ><SportsKabaddiOutlined fontSize="small" /> Leagues</Link>
            <Link className="breadcrumb_pill" to="topup" ><HorizontalSplitOutlined fontSize="small" /> Top Up</Link>
            <Link className="breadcrumb_pill" to="withdraw" ><HowToVoteOutlined fontSize="small" /> Withdraw</Link>
            <Link className="breadcrumb_pill" to="jackpots" ><SportsRugbyOutlined fontSize="small" /> Jackpots</Link>
            {/* <Link className="breadcrumb_pill"   onClick={(e)=>{window.location.assign("https://www.livescore.com/en/")}}><TrackChangesOutlined fontSize="small" /> Live Score</Link> */}
        </div><br />
          
          <div animateIn='fadeIn'>
            <div className="leagues_holder">
            <div style={explore} className="explore"><span>Topup</span>  <span className="logout"  >History</span></div>
          
                  
            <br /><div className="withdrawpanel">
              <SecurityOutlined style={secured}/> 
              
              {state.withdrawal && <div>
                
                {state.withdrawal.length > 0 ? <div style={emoji_holder}> <br /><br />
                <ThumbUpOutlined style={emoji} /> <br /><br />
                <b>Yeah! .... <br /> Your withdrawal <br /> request is  pending  </b>
                </div>:

                          
                <div>
                  <br /><br /><input  onChange={(e) => { setAMOUNT(e.target.value)  }} value={amount} style={rec_inputs} placeholder="Enter Amount" />  


                
              <br /><br /><input  onChange={(e) => { setPin(e.target.value)  }} value={pin} style={rec_inputs} placeholder="Enter Transaction pin" />  
                  
              <br /> <div style={modal_footer2_btn_holder}> 
              
                  {compState.loader != true ? <button onClick={(e) => {initiateTransaction() }} style={action_btn_success2}>WITHDRAW</button> :
                  <img  src={loaderImg}   style={action_btn_loader} />
                  }
                  
                    
                </div> <br /><br />
              <div style={secured_env}> <small>Secured and free transaction </small></div>
                </div>}
              </div>}
          </div>
                    

            </div>
          </div>

          <br /> 
        </div> 
        <br /> <br />
        <Pills />
      </div> 
      
      
        </div> 
        
        {/* desktop left */}
        <Desktopleft />
        
          
          {/* desktop right */}
          <Desktopright />
      </div>
        
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
    withdraw: (meta) => dispatch(disp_withdrawal(meta)),
    walletAdd: (wallet) => dispatch(add_wallet(wallet)), 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)