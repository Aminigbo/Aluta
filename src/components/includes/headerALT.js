 import  "../../static/css/home/index.css"
import React, { useState } from 'react' 
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import logo from "../../static/logos/aluta.png"
import {Dehaze,Search} from '@material-ui/icons'; 
import { connect } from 'react-redux'
import {logOut,alloneonone} from '../../redux' 
import Naira from 'react-naira'
import {useHistory,Link } from "react-router-dom";
import {FileCopyOutlined,LibraryAddCheckOutlined} from '@material-ui/icons';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import { supabase } from '../../configurations/index';  
 

import {
  Container,
  Grid,
  useMediaQuery,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  SwipeableDrawer,
} from "@mui/material";


const link = {
  textDecoration:"none"
}

const select = {
  backgroundColor: "#01001A",
  color:"white"
}

const selected = {
  color: "mediumseagreen", 
}

const menu = { 
  borderBottom:"0.5px solid lightgray"
}
 

function Header({appState,log_out,getOneOnOne}) {
  const state = appState
  let history = useHistory();



   const new_supabase = supabase()
  
   const reroute_breadcrumb = (link) => {
      history.push(`/${link}`)
   }
  
  const errorToast = (message) => { 
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        // onClose: () => { console.log("Redirect") },
        transition: Bounce 
    });
  }

  



   const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const [searchinput, setsesrchinput] = useState("")
  const [compState, setStates] = useState("")


    const search = (e) => {
      e.preventDefault()
      console.log("hello")
    if (searchinput.length < 1) {
      errorToast("Kindly enter challange code")
    } else {
      setStates({ ...compState, loader: true })
      
      new_supabase
      .from('challenge')
      .select('*')
      .eq('code', searchinput)
      .then(response => { 
          if (response.body.length < 1) {
            errorToast("Challange do not exist")
            setStates({ ...compState, loader: false}) 
          } else {
            console.log(response.body)
            getOneOnOne(response.body)  // save all active one on one to redux
            history.push(`/search/${searchinput}`)
            console.log(searchinput)
            setStates({ ...compState, loader: false}) 
        } 
      })
      .catch(error => {
        errorToast("A network error occured")
        setStates({ ...compState, loader: false}) 
      })

    }
  }
  



  return (
     <div id="topNav">
         <Link style={link} to="/"><img alt="hello" id="icon" src={logo}/> </Link>  
         
         <Dehaze  className="menu"  onClick={handleClick}  />
         
         <form  onSubmit={(e)=>{search(e)}} className="searchForm">
        <b style={{fontSize:"15px"}}>Aluta Meter</b>
         </form>
          <b className="bal"><Naira>{state.loggedInUser.user.meta.wallet}</Naira></b>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
        
        <MenuItem
          onClick={() => { setStates({ ...compState, copy: true }); navigator.clipboard.writeText(state.loggedInUser.user.OgPin) }}
          style={select}>ID: {state.loggedInUser.user.meta.beneficiaryId} &nbsp;&nbsp;
          {compState.copy == true ?  <LibraryAddCheckOutlined  style={selected}/>: <FileCopyOutlined/> }
        </MenuItem>
          <MenuItem style={menu} onClick={() => { history.push(`/account/${state.loggedInUser.user.username}`)}}>Account</MenuItem>
          <MenuItem style={menu} onClick={ ()=>{history.push("/topup")}} >Top Up</MenuItem>
          <MenuItem style={menu}  onClick={() => { history.push(`/withdraw`)}} >Withdraw</MenuItem>
          <MenuItem style={menu}  onClick={() => { history.push(`/terms`)}}>Terms & Conditions</MenuItem> 
          <MenuItem style={menu} onClick={() => { history.push(`/responsible`) }} >Responsible gambling</MenuItem>
          <MenuItem style={menu} onClick={() => { handleClose(); history.push(`/predict`)}} >Predict</MenuItem>
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
    getOneOnOne: (data) => dispatch(alloneonone(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)