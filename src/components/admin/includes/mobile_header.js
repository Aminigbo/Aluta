 import  "../../static/css/home/index.css"
import React from 'react';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from "../../static/logos/logo2.png"
import {Dehaze, FindInPage} from '@material-ui/icons'; 
import { connect } from 'react-redux'
import {logOut} from '../../redux'
import Naira from 'react-naira'
import {useHistory } from "react-router-dom";

function Header({appState,log_out}) {
  const state = appState
  let history = useHistory();
   const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
     <div id="topNav">
         <img alt="hello" id="icon" src={logo}/>   
         
         <Dehaze  className="menu"  onClick={handleClick}  />
         <FindInPage  className="menu" id="searchIcon" />
          <b className="bal"><Naira>{state.wallet}</Naira></b>
         <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
      >
        {/* {console.log(state.loggedInUser.user.wallet)} */}
            {/* {console.log(state)} */}
        <MenuItem onClick={() => { history.push(`/account/${state.loggedInUser.user.username}`)}}>Account</MenuItem>
            <MenuItem onClick={ ()=>{history.push("/topup")}} >Top Up</MenuItem>
            <MenuItem onClick={handleClose}>Withdraw</MenuItem>
            <MenuItem onClick={handleClose}>Terms & Conditions</MenuItem>
            <MenuItem onClick={handleClose}>FAQ</MenuItem>
            <MenuItem onClick={handleClose}>User Guide</MenuItem>
        <MenuItem onClick={() => { log_out(); history.push("/")}}>Logout</MenuItem>
         </Menu>


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
)(Header)