import React, {useState} from 'react'
import { Redirect,useHistory} from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"

import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js"
// import Adsbanner from "./includes/adsbanner"
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright" 
import { Link } from "react-router-dom"; 
import axios from 'axios';
import {LinearProgress } from '@material-ui/core'; 
import {init_payment, add_wallet} from '../redux'
// import Chip from '@material-ui/core/Chip';
import {HomeOutlined,HorizontalSplitOutlined,HowToVoteOutlined,SportsRugbyOutlined,SportsKabaddiOutlined,SecurityOutlined} from '@material-ui/icons';
import { supabase } from '../configurations'; 
import {ToastContainer,toast} from 'react-toastify';

// import request from 'request'

import Pills from "./includes/desktoppillsholder"
// import Toppills from "./includes/topdesktoppills"

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

// const rec_inputs2 = { 
//    margin: "3px",
//    width: '45%',
//    padding: '4px 2px',
//    marginBottom: '5px',
//    border:'none', 
//    height: '30px',
//    backgroundColor: "#FFFDF2",
//    borderBottom: "0.5px solid grey",
//    color:"#4e7a97",
//    outline:"none"
// }


// const float_left = {
//    textAlign: 'left',
//    paddingLeft: '5%',
//    color:'lightgrey'
// }

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

function Home({ appState, walletAdd }) { 
   const state = appState
   let history = useHistory()
   const new_supabase = supabase()


   
  
  React.useEffect(() => {  
      window.scrollTo(0, 0);
      // disp_allMatches(mtchData)
      // disp_pickedMatches(0)
      setStates({ ...compState, loader: true})
      // setTimeout(() => setStates({ ...compState, loader: false }), 500);
     paySuccess();

     
   }, []); 
 
   const [amount, setAMOUNT] = useState('') 
  
   


    const infoToast = (res) => { 
      toast.info(res, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => {history.push(`/`)}
      });
    }
   
   const errorToast = (res) => { 
      toast.error(res, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => {history.push(`/`)}
      });
   }

   const declinedToast = (res) => {
      toast.error(res, {
         position: toast.POSITION.TOP_CENTER,
         onClose: () => {history.push(`/topup`)}
      });
   }

   const successToast = (res) => {
      toast.success(res, {
         position: toast.POSITION.TOP_CENTER,
         onClose: () => {history.push(`/`)}
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
      // generate code 
      String.prototype.shuffle = function () {
         var a = this.split(""),
            n = a.length;

         for (var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
         }
         return a.join("");
      }
      const radm = "theqbroyhyhyhwnfoxjumpsotyhyhyhthuickbrownfoxyhyhyjuhhythmpsobrownfoxjumpsovyhthyerthebjghjghfgjklrowtyhytnfoxjumpsolafgfhtyhzydog".shuffle()
      const radm2 = radm.shuffle();

      let radm3 = radm2.substring(3, 50).shuffle();
      const radm4 = radm3.shuffle().substring(3, 30).shuffle();

      const radm5 = radm4.shuffle().substring(3, 20).shuffle();

      const radm6 = radm5.shuffle().substring(4, 11).shuffle();
      const ref = radm6.toUpperCase().shuffle()


      if (!amount || amount < 1) {
         return infoToast("Fill out all forms") 
      } else if (amount > 10000) {
         return infoToast("Maximum amount exceeded") 
      }
      else {
         console.log(amount)
         if (amount < 200) {
            infoToast("Minimum topup amount is 200.00")
         } else if (amount > 10000) {
            infoToast("Maximum topup amount is 10,000.00")
         } else {
            setStates({ ...compState, loader: true })
            var data = {
               "tx_ref": ref,
               "amount": amount,
               "currency": "NGN",
               // "redirect_url": "https://ogapredictor.netlify.app/topup",
               "redirect_url": "https://ogapredictor.netlify.app/topup",
               "payment_options": "card",
               "meta": {
                  "consumer_id": state.loggedInUser.user.id,
                  "consumer_mac": state.loggedInUser.user.id + new Date().getTime() + ref
               },
               "customer": {
                  "email": state.loggedInUser.user.email,
                  "phonenumber": state.loggedInUser.user.phone,
                  "name": state.loggedInUser.user.name
               },
               "customizations": {
                  "title": "Ogapredictor's topup",
                  "description": "You are about to topup your Ogapredictor's account",
                  "logo": "https://ogapredictor.netlify.app/static/media/logo2.0204ebd3.png"
               },

               "key":"FLWSECK_TEST-8f61bec54454e6290c8371285b6a690b-X"
            }
            data = JSON.stringify(data);
            var config = {
               method: 'post',
               url: 'https://ogapredictor.herokuapp.com/api/v1/user/flutterwave',
               headers: {
                  'Content-Type': 'application/json'
               },
               data: data
            };
            axios(config)
               .then(function (response) {
                  console.log(response.data.response.data.link)
                  window.location.assign(response.data.response.data.link);
               })
               .catch(function (error) {
                  // setStates({ ...state,loader:false,error:true,error_msg:'A network error occured '})
                  setStates({ ...compState, loader: false })
                  console.log(error)
                  infoToast("A network error occured")
               });
            }
         
      } 
   }

   


   // =======================   Verify transaction.
   const paySuccess = () => {
      setStates({ ...compState, loader: true })
      var url_string =window.location.href
      var url = new URL(url_string);
      
      
      if (url.searchParams.get("status")) {
         var status = url.searchParams.get("status");
         var transaction_id = url.searchParams.get("transaction_id")
         var tx_ref = url.searchParams.get("tx_ref")
         
         const body = { ref: transaction_id }
         console.log(body)

         var config = {
         method: 'post',
         url: 'https://ogapredictor.herokuapp.com/api/v1/user/flutterwave-verify',
         headers: {
            'Content-Type': 'application/json'
            },
         data: {ref:transaction_id}
         };
         axios(config)
         .then(function (response) {
            console.log(response)
            
            if (response.data.response.status == "error") {
               declinedToast(response.data.response.message)
               setStates({ ...compState, loader: false })
            } else if (response.data.response.status == "cancelled") {
               declinedToast("Transaction cancelled")
               setStates({ ...compState, loader: false })
            }else {
               console.log(response.data.response)
               return new_supabase
               .from('transactions')
               .insert([
                  { user: state.loggedInUser.user.id, transaction_details: response.data.response.data },
               ])
               .then(update => { 
                  return new_supabase
                  .from('user')
                  .select('wallet')
                  .eq('email', state.loggedInUser.user.email)
                  .then(fetch => {
                     if (fetch.body[0]) {
                        let wallet = fetch.body[0].wallet;
                        let new_wallet = parseInt(wallet) + parseInt(response.data.response.data.amount)
                        return new_supabase
                        .from('user')
                        .update({ wallet: new_wallet })
                        .eq('email', state.loggedInUser.user.email)
                        .then(update => {
                           console.log(update);
                           setStates({ ...compState, loader: false })
                           walletAdd(update.body[0].wallet)
                           successToast(`Your wallet topup of ${response.data.response.data.amount} has been queued`)
                        })
                        .catch(error => {
                           console.log(error)
                           setStates({ ...compState, loader: false })
                           infoToast("A network error occured")
                        })
                     }
                  })
                  .catch(error => {
                     console.log(error)
                     setStates({ ...compState, loader: false })
                     infoToast("A network error occured")
                  })
                  
               })
               .catch(error => {
                  console.log(error)
                  setStates({ ...compState, loader: false })
                  infoToast("A network error occured")
               })
               
            }
         })
         .catch(error => {
            console.log(error)
            setStates({ ...compState, loader: false })
            infoToast("A network error occured")
         })
      } else {
         setStates({ ...compState, loader: false })
         console.log("No success response yet")
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
           <span style={{background:"white", color:"crimson", padding:"20px 7px"}}>Topup is currently inactive. Check up later </span> <br /><br/> 

            <b style={{color:"white", cursor:"pointer"}}>Request Buz</b>
        </div>
      </div>      
           
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
          <Link className="breadcrumb_pill desktop" to="" ><HomeOutlined fontSize="small" />Home</Link>
         <Link className="breadcrumb_pill desktop" id="oneXone" onClick={(e) => { reroute_breadcrumb(e.target.id) }}><SportsKabaddiOutlined fontSize="small" /> oneXone</Link>
         <Link className="breadcrumb_pill desktop" to="leagues" ><SportsKabaddiOutlined fontSize="small" /> Leagues</Link>
          <Link className="breadcrumb_pill" to="topup" ><HorizontalSplitOutlined fontSize="small" /> Top Up</Link>
          <Link className="breadcrumb_pill" to="withdraw" ><HowToVoteOutlined fontSize="small" /> Withdraw</Link>
          <Link className="breadcrumb_pill" to="jackpots" ><SportsRugbyOutlined fontSize="small" /> Jackpots</Link>
          {/* <Link className="breadcrumb_pill"   onClick={(e)=>{window.location.assign("https://www.livescore.com/en/")}}><TrackChangesOutlined fontSize="small" /> Live Score</Link> */}
       </div><br />

                    
        <div animateIn='fadeIn'>
           <ToastContainer autoClose={2000}/>
          <div className="leagues_holder">
           <div style={explore} className="explore"><span>Topup</span>  <span className="logout"  >History</span></div>
        
                 
         <div className="paypanel">
            <SecurityOutlined style={secured}/> 
            
            <br /><br /><br /> 
            <input  onChange={(e) => { setAMOUNT(e.target.value)  }} value={amount} style={rec_inputs} placeholder="Enter Amount" /> 
             
            <div style={modal_footer2_btn_holder}> 
                <button onClick={(e) => {initiateTransaction() }} style={action_btn_success2}>CONTINUE</button>
            </div> <br /><br />
           <div style={secured_env}> <small>Secured and free transaction </small></div>
         </div> 
          </div>
        </div> 
      </div>   
      
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
     walletAdd: (wallet) => dispatch(add_wallet(wallet)), 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)