import React, {useState} from 'react'
import { Redirect,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"

import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js"
// import Adsbanner from "./includes/adsbanner"
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright"

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
import axios from 'axios';
import {LinearProgress } from '@material-ui/core';
// import {SportsSoccer,People} from '@material-ui/icons'
// import Naira from 'react-naira'
// import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {init_payment} from '../redux'
// import Chip from '@material-ui/core/Chip';
import {HomeOutlined,TrackChangesOutlined,HorizontalSplitOutlined,HowToVoteOutlined,SportsRugbyOutlined,SportsKabaddiOutlined,SecurityOutlined,Person} from '@material-ui/icons';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { emphasize, withStyles } from '@material-ui/core/styles';
import {toast} from 'react-toastify';

import Pills from "./includes/desktoppillsholder"
import Toppills from "./includes/topdesktoppills"

// const style1 ={
//       color:'white',
//       backgroundColor: '#01001A',
//       paddingBottom:"5px"
//    }

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

const rec_inputs2 = { 
   margin: "3px",
   width: '45%',
   padding: '4px 2px',
   marginBottom: '5px',
   border:'none', 
   height: '30px',
   backgroundColor: "#FFFDF2",
   borderBottom: "0.5px solid grey",
   color:"#4e7a97",
   outline:"none"
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

const explore = {
   display:"none"
}

function Home({ appState,pay_init_suc,logout }) {
  let history = useHistory();
  const state = appState
  
  React.useEffect((compState) => {  
      window.scrollTo(0, 0);
      // disp_allMatches(mtchData)
      // disp_pickedMatches(0)
      setStates({ ...compState, loader: true})
      setTimeout(() => setStates({ ...compState, loader: false}), 500);
   }, []); 
 
   const [amount, setAMOUNT] = useState('')
  const [cardNo, setCARDNO] = useState('')
  const [cvv, setCVV] = useState('')
  const [yy, setYY] = useState('')
  const [mm, setMM] = useState('');
  
    const infoToast = (res) => { 
      toast.info(res, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => {history.push(`/`)}
      });
   }

  const reroute_breadcrumb = (link) => {
    history.push(`/${link}`)
  }
  
  
  const [compState, setStates] = useState('')

  // show loader when rerouting
//   let reroute = ()=>{
//     setStates({ ...compState, loader: true}) 
//   } 

   

   
   
   const initiateTransaction = () => { 

      if (!amount || !cardNo   || !cvv   || !yy   || !mm  || !amount) {
         return infoToast("Fill out all forms")
      }
      if (amount < 200) {
         infoToast("Minimum topup amount is 200.00")
      }else if (amount > 10000) {
         infoToast("Maximum topup amount is 10,000.00")
      } else {
         setStates({ ...compState, loader: true}) 
         let email = state.loggedInUser.user.email;
         let UserId = state.loggedInUser.user.id; 
         var data = { email, amount, cardNumber: cardNo, metadata: { UserId }, cvv, expiryMonth: mm, expiryYear: yy };
         // let load = setStates({ ...state,loader:true})
         // transactionInit(history, data, show_loader, hide_loader, pay_init_suc, 'topup-pin-auth',load) 
         // let action = 'topup-pin-auth'
         data = JSON.stringify(data); 
         var config = {
         method: 'post',
         url: 'https://ogapredictor.herokuapp.com/api/v1/user/topup',
         headers: { 
            'Content-Type': 'application/json'
         },
            data : data
         }; 
         axios(config)
            .then(function (response) { 
            if (response.data.success === true) {
               let payment = {
                  ref: response.data.data.data.reference,
                  amount: amount,
                  date: '',
                  cardNo: '',
                  cvv: '',
                  mm: '',
                  yy: '',
                  status:response.data.data.data.status
               }
               if (response.data.data.data.status === 'send_pin') {
                  setStates({ ...compState, loader: true}) 
                  history.push("/otp")
                  pay_init_suc(payment)
               } else {
                  setStates({ ...compState, loader: true}) 
                  history.push('/otp')
                  pay_init_suc(payment)
               } 
            } else {
               setStates({ ...compState, loader: false })
               console.log(response);
               alert(response)
            }
         })
         .catch(function (error) {
            // setStates({ ...state,loader:false,error:true,error_msg:'A network error occured '})
            setStates({ ...compState, loader: false}) 
         });
      }
   }

  return state.loggedIn === false ? (
    <div>
          <Redirect to="/login" />  
    </div>
    
  ):
  (
    <div id="body bg">
    <div className="mobile"> 
    {compState.loader && <div className="loader">  <LinearProgress /> </div>}
    
    <div className="header_footer">
      <Footer  />
      <Header />
    </div>
    
    <div>
      

      <br />  
      <div>   

        <div className="breadcrumb_pill_holder">
          <Link className="breadcrumb_pill desktop" id="topup" onClick={(e) => { reroute_breadcrumb(e.target.id) }}><HomeOutlined fontSize="small" />Home</Link>
          <Link className="breadcrumb_pill desktop" id="topup" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><SportsKabaddiOutlined fontSize="small" /> oneXone</Link>
          <Link className="breadcrumb_pill" id="topup" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><HorizontalSplitOutlined fontSize="small" /> Top Up</Link>
          <Link className="breadcrumb_pill" id="withdraw" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><HowToVoteOutlined fontSize="small" /> Withdraw</Link>
          <Link className="breadcrumb_pill" id="jackpots" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><SportsRugbyOutlined fontSize="small" /> Jackpots</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><TrackChangesOutlined fontSize="small" /> Ads Policy</Link>
        </div> 



        {/* <div className="explore desktop"><span>Explore</span>  <span className="logout" onClick={()=>{logout()}}>Logout</span>  </div> */}
         
        <div animateIn='fadeIn'>
          <div className="leagues_holder">
           <div style={explore} className="explore"><span>Topup</span>  <span className="logout"  >History</span></div>
        
                 
         <div className="paypanel">
            <SecurityOutlined style={secured}/> 
            
             <br /><input  onChange={(e) => { setAMOUNT(e.target.value)  }} value={amount} style={rec_inputs} placeholder="Enter Amount" />  


             
           <br /><input  onChange={(e) => { setCARDNO(e.target.value)  }} value={cardNo} style={rec_inputs} placeholder="Enter card number" /> 
            
            <br /> <input onChange={(e) => { setCVV(e.target.value) }} value={cvv} style={rec_inputs} maxLength='3' placeholder="CVV" /> <br /><br />
              
            <div>       
              <div style={float_left}>Expire Date</div>
              <select  onChange={(e) => {  setMM(e.target.value) }} style={rec_inputs2} >
                  <option value=''>MM</option> 
                  <option value='01' >01</option>
                  <option value='02' >02</option>
                  <option  value='03'>03</option>
                  <option value='04' >04</option>
                  <option  value='05'>05</option>
                  <option value='06' >06</option>
                  <option  value='07'>07</option>
                  <option  value='08'>08</option>
                  <option value='09' >09</option>
                  <option value='10' >10</option>
                  <option  value='11'>11</option>
                  <option  value='12'>12</option> 
              </select>
              <select  onChange={(e) => {  setYY(e.target.value) }} style={rec_inputs2} >
                  <option value="" selected="selected" disabled="">YY</option>  
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                  <option value="2034">2034</option>
                  <option value="2035">2035</option>
                  <option value="2036">2036</option>
                  <option value="2037">2037</option>
                  <option value="2038">2038</option>
                  <option value="2039">2039</option>
                  <option value="2040">2040</option>
                  <option value="2041">2041</option>
                  <option value="2042">2042</option>
                  <option value="2043">2043</option>
                  <option value="2044">2044</option>
                  <option value="2045">2045</option>
                  <option value="2046">2046</option>
                  <option value="2047">2047</option>
                  <option value="2048">2048</option>
                  <option value="2049">2049</option>
                  <option value="2050">2050</option>
                  <option value="2051">2051</option>
              </select>
            </div>  
            <div style={modal_footer2_btn_holder}> 
                <button onClick={(e) => {initiateTransaction() }} style={action_btn_success2}>TOPUP</button>
            </div> <br /><br />
           <div style={secured_env}> <small>Your transaction is in a secured envirenment</small></div>
         </div> 
          </div>
        </div>

        <br /> 
        <div  className="breadcrumb_pill_holder">
          <Link className="breadcrumb_pill" id="topup" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Terms</Link>
          <Link className="breadcrumb_pill" id="withdraw" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> User guide</Link>
          <Link className="breadcrumb_pill" id="jackpots" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}>  FAQ</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Support</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Blogs</Link>
          <Link className="breadcrumb_pill" id="sell-ads" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}> Ads</Link>
        </div>
      </div> 
      <br />  
      
      <Pills />
    </div> 
    
    
      </div> 
      
      {/* desktop left */}
      <Desktopleft />
      
        
        {/* desktop right */}
        <Desktopright />
        
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)