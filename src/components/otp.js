import React, {useState} from 'react'
import { Redirect,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js"
// import logo from "../static/logos/logo2.png"
// import slidder1 from "../static/slidder/3.PNG"
// import slidder2 from "../static/slidder/2.PNG"

// import promo1 from "../static/slidder/promo1.jpg"
// import promo2 from "../static/slidder/promo2.jpg"
// import promo4 from "../static/slidder/promo4.jpg"

// import { Accordion,Card,Modal,Button,Row,Col, Toast, Carousel,InputGroup,FormControl,Form,OverlayTrigger,Tooltip,Spinner } from 'react-bootstrap'; 
// import { Box,Image,Badge} from "@chakra-ui/react"
// import { StarIcon} from '@chakra-ui/icons'

import { Link } from "react-router-dom";

// import { makeStyles } from '@material-ui/core/styles';
// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';
// import ImageListItemBar from '@material-ui/core/ImageListItemBar';
// import IconButton from '@material-ui/core/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder'; 
import { supabase } from '../configurations'; 
import {LinearProgress } from '@material-ui/core';
// import {SportsSoccer,People} from '@material-ui/icons'
// import Naira from 'react-naira'
// import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {init_payment,add_wallet} from '../redux'
// import Chip from '@material-ui/core/Chip';
import {TrackChangesOutlined,HorizontalSplitOutlined,HowToVoteOutlined,SportsRugbyOutlined,SecurityOutlined} from '@material-ui/icons';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { emphasize, withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';

const style1 ={
      color:'white',
      backgroundColor: '#01001A',
      paddingBottom:"5px"
   }

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
   outline: "none",
   wordSpacing: "30px",
   textAlign: "center",
   fontSize:"30px"
} 

const float_left = {
   textAlign: 'left',
   paddingLeft: '5%',
   color:'lightgrey'
}

let modal_footer2_btn_holder = {
   // position: 'absolute',
   marginTop:'15px',
   marginBottom: '10px',
   // backgroundColor: '#f3f3f3',
   width:'100%'
}

// const key = {
//    position: 'absolute',
//    right: '0px',
//    top:'0px'
// }

// const pay = {
//    color: 'rgb(255, 102, 0)',
//    fontSize:'14px'
// }

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






function Otp({ appState, pay_init_suc,walletAdd }) {
  let history = useHistory();
  const state = appState
  const new_supabase = supabase()
  React.useEffect((compState) => {  
      window.scrollTo(0, 0);
      // disp_allMatches(mtchData)
      // disp_pickedMatches(0)
      setStates({ ...compState, loader: true})
      setTimeout(() => setStates({ ...compState, loader: false}), 500);
   }, []);  
  const [pin, setPIN] = useState('') 

  const reroute_breadcrumb = (link) => {
    history.push(`/${link}`)
  }
  
  const successToast = (res,amount) => { 
      toast.info(res, {
         position: toast.POSITION.TOP_CENTER,
         onClose: () => {history.push(`/`)}
      });
   }


  const [compState, setStates] = useState('')

  // show loader when rerouting
//   let reroute = ()=>{
//     setStates({ ...compState, loader: true}) 
//   } 

   
   const initiateTransaction = () => {
      let email = state.loggedInUser.user.email;
      if (!pin) {
         return alert('Empty payload')
      }
      let data = {
         transactionReference: state.payment.ref,
         pin
      } 
      setStates({ ...state,loader:true})
      var config = {
      method: 'post',
      url: 'https://ogapredictor.herokuapp.com/api/v1/user/topup_pin',
      headers: { 
         'Content-Type': 'application/json'
      },
      data : JSON.stringify(data)
      };

      axios(config)
      .then(function (response) {
         console.log(response.data.response);
         if (response.data.response.data && response.data.response.status === false) {
            successToast(response.data.response.data.message) 
         setStates({ ...compState, loader: false}) 
         setStates({ ...state,topup_modal:true,loader:false,error:true,error_msg:response.data.response.data.message})
         } else if (response.data.response.data && response.data.response.status === true) {
         // successful 

         let payment = {
               ref: response.data.response.data.reference,
               amount: response.data.response.data.requested_amount, 
               mm: response.data.response.data.authorization.exp_month,
               yy: response.data.response.data.authorization.exp_year,
               auth:response.data.response.data.authorization
         }
         pay_init_suc(payment)
         
         return new_supabase
         .from('user')
         .select('wallet')
         .eq('email', email)
         .then(fetch=>{
            if (fetch.body[0]) {
               let wallet = fetch.body[0].wallet; 
               let new_wallet = parseInt(wallet) + parseInt(state.payment.amount) 
               return new_supabase
               .from('user')
               .update({ wallet: new_wallet })
               .eq('email', email)
                  .then(update => {
                  console.log(update);
                  walletAdd(update.body[0].wallet)
                  successToast(`Your wallet topup of ${state.payment.amount} has been queued`)
                  setStates(" ")
               })
            }
               
         }) 
         }
         else if(!response.data.response.data) {
         // alert(response.data.response.message)
            setStates({ ...state,topup_modal:false,loader:false,error:true,error_msg:response.data.response.message})
         }
      })
      .catch(function (error) {
         setStates({ ...state,loader:false,error:true,error_msg:'A network error occured '})
      });
   }

//  state.loggedIn === false ? (
//     <div>
//           <Redirect to="/login" />  
//     </div>
    
//   ):
  return
  (
    <div className="bg"> 
    {compState.loader && <div className="loader">  <LinearProgress /> </div>}
    
    <Footer />
    <Header />
    
    <div id="body"> 
      <div>  <br />

         <div  className="breadcrumb_pill_holder">
            <Link  style={style1} className="breadcrumb_pill" id="topup"  ><HorizontalSplitOutlined fontSize="small" /> Top Up</Link>
            <Link to="/withdraw"  className="breadcrumb_pill"  ><HowToVoteOutlined fontSize="small" /> Withdraw</Link>
            <Link to="/jackpots" className="breadcrumb_pill" id="jackpots"  ><SportsRugbyOutlined fontSize="small" /> Jackpots</Link>
            <Link to="sell-ads" className="breadcrumb_pill" id="sell-ads" ><TrackChangesOutlined fontSize="small" /> Sell Ads</Link>
         </div> <br />



        <br /> <div className="explore"><span>OTP</span>  <span className="logout"  >History</span></div>
        
        <ToastContainer autoClose={2000}/>         
         <div className="withdrawpanel">
            <SecurityOutlined style={secured}/>  
            <br /><br /><div style={float_left}>Enter OTP</div>
           <br /><input  onChange={(e) => { setPIN(e.target.value)  }} value={pin} style={rec_inputs} placeholder="* * * * *" />  
              
           <br /><br /> <div style={modal_footer2_btn_holder}> 
                <button onClick={(e) => {initiateTransaction() }} style={action_btn_success2}>AUTHORIZE</button>
            </div> <br /><br /> <br />
           <div style={secured_env}> <small>Your transaction is in a secured envirenment</small></div>
         </div>  

        <br /><br /> 
        <div  className="breadcrumb_pill_holder">
          <Link className="breadcrumb_pill" id="topup" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Terms</Link>
          <Link className="breadcrumb_pill" id="withdraw" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> User guide</Link>
          <Link className="breadcrumb_pill" id="jackpots" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}>  FAQ</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Support</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Blogs</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Ads</Link>
        </div>
      </div> 
      {console.log(state)}
      <br /> <br /> <br /> 
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
     pay_init_suc: (payment) => dispatch(init_payment(payment)),
     walletAdd: (wallet) => dispatch(add_wallet(wallet)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Otp)