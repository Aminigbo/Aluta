import "../../static/css/home/index.css"
import React, { useState } from 'react' 
import {useHistory } from "react-router-dom"; 
import logo from "../../static/logos/logo2.png" 
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import {logOut,alloneonone} from '../../redux' 
import ogapredcitor from "../../static/images/avater/desktopad.gif"
import Naira from 'react-naira'  
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { supabase } from '../../configurations/index'; 
import {FileCopyOutlined,LibraryAddCheckOutlined} from '@material-ui/icons';

const loader = {
  width:"10px"
}

const ogPin = {
  fontSize:"14px"
}


const select = {
  backgroundColor: "#01001A",
  color:"white"
}

const selected = {
  color: "mediumseagreen", 
}


function Desktopleft({ appState,getOneOnOne }) {
   let history = useHistory();
  const state = appState
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

  
  const [searchinput, setsesrchinput] = useState("")
  const [compState, setStates] = useState("")





  const search = (e) => {
    e.preventDefault()
    if (searchinput.length < 1) {
      errorToast("Kindly enter challange code")
    } else {
      setStates({ ...compState, loader: true}) 
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
     <div className="desktop fixedTab">
       
       <div className=""> 
        <Link to="/"> <img className="predictorlogo" src={logo} /></Link>
       </div>
       
       <img className="desktopAvater" src={ogapredcitor} />
       
       <div className="balanceHolder">
         <div className="walletTitle"> <small>Wallet</small></div>
         <b><Naira>{state.wallet}</Naira></b>
        
       </div>
       
       <div className="searchHolder">
         <ToastContainer autoClose={2000}/>
         <span className="searchTitle">Search for active oneXone</span>
         <form onSubmit={(e)=>{search(e)}}>
           
           <input className="searchInput" type="text" onChange={(e) => { setsesrchinput(e.target.value) }} value={searchinput} placeholder="Enter the challenge code" />
           
           {compState.loader != true ?  <button className="searchButton">Search</button>  :
            ""
           }
           
          
         </form>
       </div>
         <div  className="breadcrumb_pill_holder2"> 
         <div style={ogPin}>ID:  {state.loggedInUser.user.meta.beneficiaryId}</div>
         {compState.copy == true ?  <LibraryAddCheckOutlined   onClick={() => { setStates({ ...compState, copy: true }); navigator.clipboard.writeText(state.loggedInUser.user.OgPin) }} style={selected}/>: <FileCopyOutlined  onClick={() => { setStates({ ...compState, copy: true }); navigator.clipboard.writeText(state.loggedInUser.user.OgPin) }}/> }
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
    getOneOnOne: (data) => dispatch(alloneonone(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktopleft)