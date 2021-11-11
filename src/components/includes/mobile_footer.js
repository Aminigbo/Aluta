import  "../../static/css/home/index.css"
import {Link } from "react-router-dom"; 
import React from 'react'; 
import { Home, Person, AccountBalanceWalletOutlined, SportsRugby,MenuBook,SportsSoccer,EuroSymbol,AttachMoney,EventOutlined, AddBoxOutlined} from '@material-ui/icons'

import { connect } from 'react-redux' 
 

  console.log(window.location.hash) 
function Footer({appState}, props) { 
  const nav = (e)=>{ 
  }
  
 
  
  window.addEventListener("hashchange", e => console.log('hashchange1', window.location.hash)); 
  return ( 
    <div id ='bottomNav'>  
      
      <Link to="/" className="bottomnatChildren" onClick={(e) => { nav('/');  window.scrollTo(0, 0);}} ><Home />  <br /> <div className="inline">Home</div> </Link>
      <Link to="/giveaway" className="bottomnatChildren" onClick={(e) => { nav('/giveaway');   window.scrollTo(0, 0);}}><AccountBalanceWalletOutlined /> <br /> <div className="inline">Give away </div> </Link>
      <Link to="/create" className="bottomnatChildren" onClick={(e) => {  window.scrollTo(0, 0); }}><AddBoxOutlined />  <br /> <div className="inline">Creates </div> </Link>
      <Link to="/events" className="bottomnatChildren" onClick={(e) => { nav('/events');   window.scrollTo(0, 0);}}><EventOutlined />  <br /> <div className="inline">Events</div> </Link>
      <Link to={`/account/${appState.loggedInUser.user.username}`} className="bottomnatChildren" onClick={(e) => { nav('/account');  window.scrollTo(0, 0);}}><Person />  <br /> <div className="inline"> {appState.loggedInUser.user.username.substring(0, 9)} </div> </Link>
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
    // log_out: () => dispatch(logOut()),  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)