import "../../../static/css/home/index.css"
import React, { useState } from 'react'  
import { connect } from 'react-redux' 
import Naira from 'react-naira'  
import { supabase } from '../../../configurations/index';  
import {disp_admin_withdrawal_req,add_wallet} from '../../../redux' 
import { mySubscription, check } from "../controllers/notification"
import { useHistory } from "react-router-dom";

const loader = {
  width:"10px"
} 

const desc = {
   fontSize:"14px"
}
const notiHolder = {
   background: 'lightgray',
   padding: '5px 10px',
   position:"relative"
   // fontSize:"12px"
}

const close = {
   position: "absolute",
   top: "-5px",
   right: "0px",
   color: 'crimson',
   fontSize: "16px",
   fontWeight: "bold",
   cursor:"pointer"
}

const head = {
   fontSize:"17px"
}


const holder = {
   marginTop:"15px"
}

function Realtime({ appState,withdrawalRequestNoti,walletAdd}) { 
  const state = appState
   const new_supabase = supabase()
   let history = useHistory();


   const closeNoti = (id) => { 
      let position= state.withdrawal_request_noti.filter(e=>e.id == id)
      state.withdrawal_request_noti.splice(position, 1)
      withdrawalRequestNoti([])
      new_supabase.from("withdrawal").update([{ seen: 1 }]).eq("id", id).then(seen => {
         new_supabase.from("withdrawal").select("*").eq("status", "pending").eq("seen", 0).then(res => { 
            if (res.body.length > 0) {
               withdrawalRequestNoti([res.body[0]])
            } else {
               withdrawalRequestNoti([])
            }
         })
      })
       
   }

   React.useEffect(() => { 
      mySubscription(new_supabase,withdrawalRequestNoti)
      check(new_supabase,withdrawalRequestNoti)
   }, []);

   const renderNotis = () => {
      if (state.withdrawal_request_noti.length > 0) {
         return state.withdrawal_request_noti.map(notis => {
            return (
               <div style={notiHolder}>
                  <span onClick={()=>{closeNoti(notis.id)}} style={close}>close</span>
                  <div className="pointer" onClick={()=>{history.push(`/withdrawal/user/${notis.username}/${notis.user}`)}}>
                     <b style={head} >{notis.username}</b>
                     <div style={desc}> 
                     A pending withdrawal request of <b><Naira>{notis.meta.amount}</Naira></b>
                     </div>
                 </div>
                  
               </div>
            )
         })
      }
   }

  
   return (
      <div style={holder}> 
            {state.withdrawal_request_noti.length > 0 && renderNotis() }
      </div> 
   );
}
const mapStateToProps = state => { 
  return {
    appState: state.user
  }
} 

const mapDispatchToProps = (dispatch) => {
  return { 
     withdrawalRequestNoti: (data) => dispatch(disp_admin_withdrawal_req(data)),
     walletAdd: (wallet) => dispatch(add_wallet(wallet)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Realtime)