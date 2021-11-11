import "../../static/css/home/index.css"
import React, { useState } from 'react'  
import { connect } from 'react-redux'
import { Redirect,useHistory } from "react-router-dom";
import Naira from 'react-naira'  
import { supabase } from '../../configurations/index';
import loaderImg from "../../static/logos/animation.gif"  
const right = {
   float:"right"
}

function Predictions({ appState }) { 
  const state = appState
   const new_supabase = supabase()
   let history = useHistory();
   const [compState, setStates] = useState('')
   

   let ss = () => {
      
      console.log(compState)
      if (compState.predictions) {
         compState.predictions.sort(function (a, b) {
            return parseFloat(b.id) - parseFloat(a.id);
         });
         return compState.predictions.map(prediction => {
         return (
            <div onClick={()=>{ rout(prediction.league,prediction.categoryId,prediction.amount)}} className="predictionList"><b>{prediction.categoryId}</b> <span style={right}><Naira>{prediction.amount}</Naira>, &nbsp;&nbsp; {prediction.predictions.length} matches</span> </div>
         ) 
      })
      }
   }

   const rout = (league,category,amount) => {
      history.push(`/board/${league}/${category}/${amount}`)
   }

   const getPredictions = () => {
      setStates({ ...compState, loader: true })
      new_supabase.from("predictions").select("*").eq("user", state.loggedInUser.user.id).then(fetched => {
         setStates({...compState, predictions:fetched.body, fetched:true,loader:false})
      })
   }

   React.useEffect(() => {
      getPredictions()
   }, []);

  
   return (

      <div className="predictionHistoryHolder">
         {compState.loader == true ? <div className="img_loader">  <br /><br /><br /><br /> <br /><br /><img src={loaderImg} /> <br /> <br /><br /><br /><br /><br /></div> :
            <div> <b>Prediction History</b> {ss()} </div>}
         
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
)(Predictions)