import "../../static/css/home/index.css"
import React, { useState } from 'react'  
import { connect } from 'react-redux'
import { Redirect,useHistory } from "react-router-dom";
import Naira from 'react-naira'  
import { supabase } from '../../configurations/index';
import loaderImg from "../../static/logos/animation.gif"  
const right = {
   float:" "
}

function Transactions({ appState }) { 
  const state = appState
   const new_supabase = supabase()
   let history = useHistory();
   const [compState, setStates] = useState('')
   

   let ss = () => {
      
      console.log(compState)
      if (compState.transactions) {
         compState.transactions.sort(function (a, b) {
            return parseFloat(b.id) - parseFloat(a.id);
         });
         return compState.transactions.map(prediction => {
         return (
            <div className="predictionList">
               {prediction.to == state.loggedInUser.user.OgPin ? "Credit":"Debit"} <br />
               <b><Naira>{prediction.meta.data.amount}</Naira>
               <span style={right}> {prediction.to == state.loggedInUser.user.OgPin ? `from ${prediction.meta.sender.username}`:`to ${prediction.meta.reciever.username}`}  </span></b> <br />
               <small>{prediction.meta.data.desc}</small>
            </div>
         ) 
      })
      }
   }

   const rout = (league,category,amount) => {
      history.push(`/board/${league}/${category}/${amount}`)
   }

   const getPredictions = () => {
      setStates({ ...compState, loader: true })
      new_supabase.from("boxme").select("*").or(`from.eq.${state.loggedInUser.user.meta.beneficiaryId}, to.eq.${state.loggedInUser.user.meta.beneficiaryId}`).then(fetched => {
         setStates({...compState, transactions:fetched.body, fetched:true,loader:false})
      })
   }

   React.useEffect(() => {
      getPredictions()
   }, []);

  
   return (

      <div className="predictionHistoryHolder">
         {compState.loader == true ? <div className="img_loader">  <br /><br /><br /><br /> <br /><br /><img src={loaderImg} /> <br /> <br /><br /><br /><br /><br /></div> :
            <div> <b>Transaction History</b> {ss()} </div>}
         
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
   //   getBoxed: (data) => dispatch(disp_realtime(data)),
   //   walletAdd: (wallet) => dispatch(add_wallet(wallet)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions)