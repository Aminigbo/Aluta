import  "../../static/css/home/index.css"
import React from 'react';
// import {useHistory } from "react-router-dom";
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import logo from "../../static/logos/logo2.png"
// import {Dehaze, FindInPage} from '@material-ui/icons';
// import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { logOut } from '../../redux'
 
import ads3 from "../../static/images/avater/ogabikead.gif"
import ogapredcitor from "../../static/images/avater/ogapredictor.gif"


// import Naira from 'react-naira'

function Desktopright({ appState }) {
   // let history = useHistory();
   // const state = appState 
   // const log_out = ()=>{
   //    console.log("Hello");
   // }
  
   // const reroute_breadcrumb = (link) => {
   //    history.push(`/${link}`)
   // }
  
   
   // const [setAnchorEl] = React.useState(null);

   // const handleClick = (event) => {
   //    setAnchorEl(event.currentTarget);
   // };

   // const handleClose = () => {
   //    setAnchorEl(null);
   // };
   return (
     <div className="desktop fixedAdsTab">
       
       {/* <img className="unboxAd" src={ads2} />
       
       <br /><br /><br /> */}
       
       <img className="ogapredcitor" src={ogapredcitor} /> 
       
      <img className="unboxAds" src={ads3} />
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
)(Desktopright)