import  "../../../static/css/home/index.css"
import React, { useState } from 'react'
import {useHistory } from "react-router-dom"; 
import logo from "../../../static/logos/logo2.png" 
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import {logOut} from '../../../redux' 
import ogapredcitor from "../../../static/images/avater/desktopad.gif"
import Naira from 'react-naira'
import Notification from "./realtime"



function Desktopleft({ appState, disp_new_cat }) {
  let history = useHistory();
  const state = appState

  const [newCategory, setNewCategory] = useState("")
  
   const reroute_breadcrumb = (link) => {
      history.push(`/${link}`)
  }
  
  //  create new category
  const add_category = (e) => {
    e.preventDefault()
  }


   return (
     <div className="desktop fixedTab">
       
       <div className=""> 
         <img className="predictorlogo" src={logo} />
       </div>
       
       <img className="desktopAvater" src={ogapredcitor} />
       
       <div className="balanceHolder">
         <div className="walletTitle"> <small>Wallet</small></div>
         <b><Naira>{state.wallet}</Naira></b> <br /> 
         
          <Link className="breadcrumb_pill" to="/admin" > Home</Link> 
          <Link className="breadcrumb_pill" id="oneXone" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}>  oneXone</Link>
         <Link className="breadcrumb_pill" id="jackpots" onClick={(e) => { reroute_breadcrumb(e.target.id) }}> Jackpot</Link>   <br />
         

         <Notification />
         
       </div>
       
       <div className="searchHolder">
         <span className="searchTitle">Add new category</span>
         <form onSUbmit = {(e)=>{add_category(e)}} >
           <input onChange = {(e)=>{setNewCategory(e.target.value)}} value={newCategory} className="searchInput" type="text"  placeholder="Enter amount" />
           <button className="searchButton" type="submit">Add</button>
         </form> 
       </div>
        
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktopleft)