import  "../../static/css/home/index.css"
import React, {useState} from 'react'
import { connect } from 'react-redux'
import {logOut,disp_session} from '../../redux' 
import { Link,useHistory } from "react-router-dom"; 
import {checkSession} from '../controlers/session'
import { ToastContainer, toast, Bounce} from 'react-toastify';
const link = {
  cursor:"pointer"
}

const right = {
  fontSize:"13px"
}
function Desktopright({ appState,log_out,set_session}) {
   let history = useHistory();
  const state = appState

  const errorToast = (message) => { 
      toast.error(message, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
   }
  
  React.useEffect((compState) => {   
      setStates({ ...compState, loader: true})
    setTimeout(() => setStates({ ...compState, loader: false }), 500);
    
    checkSession(log_out,set_session, state,errorToast) 
  }, []);
  
   
   let reroute = ()=>{
      setStates({ ...compState, loader: true}) 
   }
   
   const [compState, setStates] = useState('')
   
   return ( 
     <div className=" " style={{marginBottom:"0px",textAlign:"center"}}> 
       
       {/* <div  className="breadcrumb_pill_holder">
          <Link   onClick={()=>{history.push("/responsible")}} className="breadcrumb_pill" id="topup" >Ads Policies</Link>
          <Link className="breadcrumb_pill" id="withdraw" > User Policy</Link>
          <Link  onClick={()=>{history.push("/terms")}} className="breadcrumb_pill" id="jackpots" >  Terms</Link>
          <Link className="breadcrumb_pill" id="sell-ads" > Support</Link> 
          <Link className="breadcrumb_pill" id="sell-ads" > Ads</Link>
       </div>  */}

       <span style={right}>
         <small>Copyright @ Aluta Meter <small onClick={() => { history.push("/admin") }}>2021-2023.</small> All rights reserved</small>
       </span>
      </div> 
   );
}
const mapStateToProps = state => { 
  return {
    appState: state.user
  }
}


const mapDispatchToProps = (dispatch,encoded) => {
  return {
    log_out: () => dispatch(logOut()),
    set_session: (time) => dispatch(disp_session(time)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktopright)