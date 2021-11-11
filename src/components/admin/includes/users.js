import React, {useState} from 'react'
import { Redirect,useHistory,useParams} from "react-router-dom";
import { connect } from 'react-redux'
import  "../../../static/css/home/index.css"
import { supabase } from '../../../configurations';  
import PredictionHistory from "../../includes/predictionHistory"
import TransactionHistory from "../../includes/transactionHistory"
import Desktopleft from "../includes/desktopleft"
import Desktopright from "../includes/desktopright"
import {logOut,loginSuc} from '../../../redux'
import loaderImg from "../../../static/logos/animation.gif" 
import { Link } from "react-router-dom"; 
import {TextField,Button } from '@material-ui/core';
import Naira from 'react-naira'  
import { ToastContainer, toast} from 'react-toastify'; 

const desktop_profile_holder = {
   // backgroundColor: "#f5f7fa", 
   height: "220px",
   padding: "10px",
   marginBottom:"35px"
}

const breadcrumb_pill_holder = {
   marginTop:"20px"
}


const balance ={
   marginTop: "40px",
   padding: "10px 30px",
}
const fullnameHolder = {
   height: "50px",
   display: "inline-block",
   width: "30%",
   backgroundColor: "red",
   marginRight: "20px",
   marginLeft:"5%",
   // borderRadius:"4px",
   borderBottom:"0.5px solid lightgray"
}

const emailPhoneHolder = {
   height: "50px",
   display: "inline-block",
   width: "30%",
   // backgroundColor: "lime",
   marginRight:"20px",
   // borderRadius:"4px",
   borderBottom:"0.5px solid lightgray"
}
const fullnameHolder2 = {
   // height: "50px",
   display: "inline-block",
   width: "40%",
   // backgroundColor: "red",
   marginRight: "20px",
   marginLeft:"3%",
   // borderRadius:"4px",
   borderBottom: "0.5px solid lightgray",
   padding:"10px 2px"
}

   
const setting = {
   float: "right",
   marginRight: "10px",
   cursor: "pointer",
   color: "orange",
   textDecoration:"none"
}

const setting1 = { 
   marginRight: "10px",
   cursor: "pointer",
   color:"orange" ,
   margin:"0px 10px"                                           
}

const setting2 = { 
   marginRight: "10px",
   cursor: "pointer",
   color:"orange",
   margin:"0px 10px"
}

const settingHolder = {
   textAlign:"center"
}



function Account({appState,login_suc}) {
   const new_supabase = supabase()
   const state = appState
   let history = useHistory();
   let {userId} = useParams()

   // ============================================================   toasts
   const infoToast = (message) => {
      toast.warning(message, {
         position: toast.POSITION.TOP_CENTER,
      });
   }
   const successToast = (message) => {
      toast.success(message, {
         position: toast.POSITION.TOP_CENTER,
      });
   }
   
   const [compState, setStates] = useState('')
   const [oldPassword, setOldPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   

   // transaction pin
   const [oldPin, setOldPin] = useState("")
   const [newPin, setNewPin]= useState("")



   const fetchUser = () => {
      return new_supabase
      .from('user').select(`*, transactions (*), predictions (*), challenge (*)`).eq('id', userId).then(fetchedUser => { 
         setStates({ ...compState, viewUser: fetchedUser.body })
         console.log(fetchedUser.body)
      })
   }

   React.useEffect(() => { 
      window.scrollTo(0, 0);
      
      fetchUser()
   }, [state]);


   

   
   
   const showSetting = () => {
      setStates({...compState, setting:true, pwd:true,pinPwd:true, showPrediction:false})
   }
   
   

   const reroute_breadcrumb = (link) => {
      history.push(`/${link}`)
   }

   
   const resetPwd = () => {
      if (!oldPassword || !newPassword || oldPassword.length < 1 || newPassword.length < 1) {
         infoToast("Empty field")
      } else if (newPassword.length < 6) {
         infoToast("Weak password detected")
      } else if (oldPassword != compState.viewUser[0].password) {
         infoToast("Old password not correct")
      } else {
         setStates({ ...compState, loader: true})
         new_supabase.auth.update({
         email:compState.viewUser[0].email,
         password: newPassword, 
         }).then(updated => {
            new_supabase.from("user").update([{ password: newPassword }]).eq("email", compState.viewUser[0].email).then(updated2 => {
               successToast("Password updated successfully.") 
               const data = {
                  user:updated2.body[0],
                  meta:updated.data
               }
               setStates({ ...compState, loader: false})
               login_suc(data) 
            })
         }).then(error => {
            setStates({ ...compState, loader: false})
         })
      }
   }
   
 

   const resetPin = () => {
      if (!oldPin || !newPin || oldPin.length < 1 || newPin.length < 1) {
         infoToast("Empty field")
      } else if (newPin.length > 4) {
         infoToast("New pin must be 4 digit numbers")
      } else if (oldPin != compState.viewUser[0].pin) {
         infoToast("Old pin not correct")
      } else {
         setStates({ ...compState, loader: true})
         new_supabase.auth.update({
         email:compState.viewUser[0].email,
         password: compState.viewUser[0].password, 
         }).then(updated => {
            new_supabase.from("user").update([{ pin: newPin }]).eq("email", compState.viewUser[0].email).then(updated2 => {
               successToast("Password updated successfully.") 
               const data = {
                  user:updated2.body[0],
                  meta:updated.data
               }
               setStates({ ...compState, loader: false})
               login_suc(data)
               setNewPin("")
               setOldPin("")
            })
         }).then(error => {
            setStates({ ...compState, loader: false})
         })
      }
   }

   const active = {
      backgroundColor: "orange",
      color: "white",
      padding: "2px 5px",
      borderRadius:"6px"
   }




   


  return state.loggedIn === false ? (
    <div>
          <Redirect to="/login" />  
    </div>
    
  ):
  (
    <div id="body bg">
       {console.log(state)} 
    <div className="mobile">  
    
    <div>
      

      <br />  
      <div>     
         
        {compState.loader == true ? <div className="img_loader">  <br /><br /><br /><br /> <br /><br /><img  src={loaderImg} /> <br /> <br /><br /><br /><br /><br /></div>:
        
         
        <div animateIn='fadeIn'>
          <div className="leagues_holder">
              {compState.viewUser ? <div>
                 <div style={balance} className="balance">Bal: <b><Naira>{compState.viewUser[0].wallet}</Naira></b> <br /> <br/>
               <Link onClick={(e) => { setStates({...compState, setting:true, pwd:false, showPrediction:true,showTransactions:false,pinPwd:false}) }} style={setting}>Predictions</Link>
               <Link onClick={(e) => { setStates({...compState, setting:true, pwd:false, showPrediction:false, showTransactions:true,pinPwd:false}) }} style={setting}>Transactions</Link>
               <Link onClick={(e) => { showSetting() }} style={setting}>Settings</Link>
                 <Link onClick={()=>{ setStates({...compState, setting:false, pwd:false, pin:false,pinPwd:false}) }} style={setting}>Overview</Link>
               {/* <span onClick={(e) => { showSetting()}}  style={setting}>User</span> */}
               </div> <br/> <br/>
               
               {compState.setting != true && <div style={desktop_profile_holder} className=" "> 
                  
                  <div style={fullnameHolder2}>  <b>{compState.viewUser[0].username}</b> </div>
                  <div style={fullnameHolder2}>  <small>{compState.viewUser[0].email}</small></div>
                  
                  <div style={fullnameHolder2}><small>Phone</small>: <b>{compState.viewUser[0].phone}</b></div>
                  <div style={fullnameHolder2}><small>OgPin</small>: <b>{compState.viewUser[0].OgPin} </b></div>   
                  {/* numberOfChallengesCreated */}
                  
                  <div style={fullnameHolder2}><b>{compState.viewUser[0].predictions.length}</b>  {compState.viewUser[0].predictions.length < 2 ? "Prediction":"Predictions"}</div>
                  <div style={fullnameHolder2}><b>{compState.viewUser[0].challenge.length}</b>  {compState.viewUser[0].challenge.length < 2 ? "Challenge":"challenges"}</div>
                  <div style={fullnameHolder2}>T-pin: <b>{compState.viewUser[0].pin}</b>  </div>
                  <div style={fullnameHolder2}><b>{compState.viewUser[0].transactions.length}</b>  {compState.viewUser[0].transactions.length < 2 ? "Transaction":"Transactions"}</div>
              
               </div> } <br/>



               <div>
                  {compState.pinPwd == true && <div style={settingHolder}>   <span onClick={()=>{ setStates({...compState, setting:false, pwd:false, pin:false,pinPwd:false}) }} style={setting1} >Overview</span> &nbsp; |&nbsp;&nbsp;
                  <span  onClick={()=>{ setStates({...compState, setting:true, pwd:true, pin:false}) }}  style={compState.pin == true ? setting1: active} >Password</span> &nbsp; |&nbsp;&nbsp;
                  <span  onClick={()=>{ setStates({...compState, setting:true, pwd:false, pin:true}) }}  style={compState.pwd == true ? setting1: active}>Transaction pin</span><br/><br/><br/> </div> }
                  
                              
                  
                  {compState.pwd == true && <form className="regform" onSubmit={(e) => { e.preventDefault(); resetPwd() }}  noValidate autoComplete="off">
                     <small>Reset password</small>
                     <br /><br /> 
                     <TextField id="input" onChange={(e)=>{ setOldPassword(e.target.value)  }} value={oldPassword} required label="Old password" type="password" variant="outlined" />
                     <br /><br />
                     <TextField id="input" onChange={(e)=>{ setNewPassword(e.target.value)  }} value={newPassword} required label="New password" type="password" variant="outlined" />
                     <br /> <br /> 
                     {compState.loader != true ?<Button type="submit"  variant="outlined" color="primary" id='primary-btn'> Reset  </Button> :
                        <img  src={loaderImg} />
                     }
                  </form> } 

                  {compState.pin && <form className="regform" onSubmit={(e) => { e.preventDefault(); resetPin() }}  noValidate autoComplete="off">
                     <small>Reset Transaction pin</small>
                     <br /><br />
                     <TextField id="input" onChange={(e)=>{ setOldPin(e.target.value)  }} value={oldPin} required label="Old transaction pin" type="number" variant="outlined" />
                     <br /><br />
                     <TextField id="input" onChange={(e)=>{ setNewPin(e.target.value)  }} value={newPin} required label="New transaction pin" type="number" variant="outlined" />
                     <br /> <br /> 
                     {compState.loader != true ?<Button type="submit"  variant="outlined" color="primary" id='primary-btn'> Reset  </Button> :
                        <img  src={loaderImg} />
                     }
                  </form> }  

                  {compState.showPrediction == true && <PredictionHistory/>}
                  
                  
                  {/* show transaction */}
                  {compState.showTransactions == true && <TransactionHistory/>}
               </div> 
              </div>:<div className="img_loader">  <br /><br /><br /><br /> <br /><br /><img  src={loaderImg} /> <br /> <br /><br /><br /><br /><br /></div>} 
                    

               <ToastContainer autoClose={2000}/>  
          </div>
        </div> 
        
                    }
         
      </div>  
     
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


const mapDispatchToProps = (dispatch) => {
  return {
     login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),     
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)