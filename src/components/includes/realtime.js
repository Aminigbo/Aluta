import "../../static/css/home/index.css"
import React, { useState } from 'react'  
import { connect } from 'react-redux' 
import Naira from 'react-naira'  
import { supabase } from '../../configurations/index';  
import {disp_realtime,add_wallet} from '../../redux'  
import {EmojiEmotions} from '@material-ui/icons';

const loader = {
  width:"10px"
}

const ogPin = {
  fontSize:"14px"
}

const smile = {
   color: "orange",
   fontSize:"20px"
}

const smile2 = {
   color: "orange",
   fontSize:"30px"
}


function Realtime({ appState,getBoxed,walletAdd}) { 
  const state = appState
   const new_supabase = supabase() 
   

   const mySubscription = () => { 

      new_supabase
      .from(`boxme:to=eq.${state.loggedInUser.user.meta.beneficiaryId}`)
       .on('INSERT', payload => {
          getBoxed([payload.new])
          console.log(payload)
      })
      .subscribe()
   
   }


   const check = () => {
      new_supabase.from("boxme").select("*").eq("to", state.loggedInUser.user.meta.transactionPin).eq("ack", 0).then(res => {
         // console.log(res.body)
         // if (res.body.length > 0) {
         //    getBoxed([res.body[0]])
         // } else {
         //    getBoxed([])
         // }
      })
   }

   const acknowledge = () => {
      getBoxed([]); 
      let wallet = state.wallet;
      let boxAmount = state.realtime[0].meta.data.amount;
      let newWallet = parseInt(wallet) + parseInt(boxAmount)
       

      new_supabase.from("boxme").select("*").eq("id", state.realtime[0].id).then(check1 => { 
            new_supabase.from("boxme").update([{ ack: 1 }]).eq("id", state.realtime[0].id).then(updated => {
               new_supabase.from("boxme").select("*").eq("id", state.realtime[0].id).then(checkUser => { 
                  new_supabase.from("user").select("*").eq("OgPin", state.loggedInUser.user.OgPin).then(user => {
                     walletAdd(user.body[0].wallet)
                     check()
                  }) 
               })
            }) 
       })
   }
   



   React.useEffect(() => { 
      mySubscription()
      check()
   }, []);

  
   return (

      <div>
         {state.realtime.length > 0 && <div className="realtime">
         <div className="realtimeParent">
            <div className="realtimeHeader" style={smile}>
               You Got Buzzed <EmojiEmotions  style={smile2}/>
            </div>
            <div className="realtimeBody">
               Yeah!!  <br />
               <b>{state.realtime[0].meta.sender.username}</b> just buzzed you <b><Naira>{state.realtime[0].meta.data.amount}</Naira></b> 
               
               <div className="description" >
                  <span><i>{state.realtime[0].meta.data.desc} <br /><br /></i></span>
               </div> <br />
                <button onClick={()=>{ acknowledge()}} className='active' >Acknowledge</button>
            </div>
         </div>
         
      </div> }
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
     getBoxed: (data) => dispatch(disp_realtime(data)),
     walletAdd: (wallet) => dispatch(add_wallet(wallet)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Realtime)