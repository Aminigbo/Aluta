import React, {useState} from 'react'

import {disp_jackpots, logOut,match_refresh} from '../redux'

import { Redirect,useParams,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"

import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js"
// import Adsbanner from "./includes/adsbanner"
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright" 
import Toppills from "./includes/topdesktoppills"
import loaderImg from "../static/logos/animation.gif"
import Pills from "./includes/desktoppillsholder"
import { Link } from "react-router-dom";
import Realtime from "./includes/realtime"
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home'; 
import { supabase } from '../configurations'; 
import Naira from 'react-naira'
import { HomeOutlined, TrackChangesOutlined, HorizontalSplitOutlined, HowToVoteOutlined, SportsRugbyOutlined, SportsKabaddiOutlined,Person } from '@material-ui/icons';
import logo from "../static/logos/logo2.png"
import { ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); 


const noMatch = {
   textAlign: "center",
   color:"lightgrey"
}


const vs = {
   fontSize: "10px",
   color:"gray"
}
const kickoff_date = {
   fontWeight: "bold",
   fontSize: "12px",
}

   const loaderHolder = {
   width: "100px",
   float:"right"
}

const padding = {
   padding:"10px "
}


function Matches({ appState, dispjackpot }) {
    // initialize supabase
   const new_supabase = supabase()
   const state = appState 
   const user = state.loggedInUser.user.id;
   const username = state.loggedInUser.user.username;
   // console.log(state);

   let history = useHistory();
   const {id } = useParams()
   


   React.useEffect(() => {  
      window.scrollTo(0, 0); 
      setStates({ ...compState, loader: true })
      setTimeout(() => setStates({ ...compState, loader: null }), 500);
      
      // new_supabase.from("jackpotPredictions").select("*").eq("jackpot", id).eq("user", user).eq("username", username).then(jackpots => {
      //    dispjackpot(jackpots.body)
      //    
      // })
      
   }, []);

   const reroute_breadcrumb = (link) => {
    history.push(`/${link}`)
  }

   const [compState, setStates] = useState({
      amount:500,
      selected_count: 0,
      selected_matches :[],
   }) 

   // toasts
   const successToast = (msg) => { 
      toast.success(msg, {
         position: toast.POSITION.TOP_CENTER,
         onClose: () => { history.push(`/jackpots`) },
      });
   } 
 

   const description = () => {
      // let jkptData = state.jackpots.filter(e => e.id == id)[0]
      return (
         <div style={padding} animateIn='fadeIn'>
            <div className=" ">
               <div className=" ">
                  <b> {state.stagged.jkpt.title}</b> <br />
                  
                  <span>{state.stagged.jkpt.prize}</span> <br /><br/>
                  <small>{state.stagged.jkpt.desc}</small>
               </div>
            </div> <br/>
         </div>
      )
   }
   
   const matchData = () => {
      if (state.stagged.data[0].prediction) {
         return state.stagged.data[0].prediction.map(matches=>{
            return (
               <div animateIn='fadeIn'>
                  <div className="matches">
                  <div className="select_prediction_btn_holder2">
                     <button className={matches.selected == 1  ? 'active' : 'select_prediction_btn'} id={1} >Home</button>
                     <button className={matches.selected == 0  ? 'active' : 'select_prediction_btn'} id={0} >Draw</button>
                     <button className={matches.selected == 2  ? 'active' : 'select_prediction_btn'} id={2} >Away</button> 
                     <div>
                        <span style={kickoff_date}> 2022-01-31 08:53 </span>
                     </div>
                  </div>
                  <div className="select_prediction_logo_holder">
                     <b>{matches.home}</b>
                    <br />
                    <b>{matches.away}</b>
                     <div>
                        
                     </div>
                  </div>
               </div> 
               </div>
            )
         })  
         
      }
   }

  
  return state.loggedIn === false ? (
    <div>
          <Redirect to="/login" />  
    </div>
    
  ):
     (
   <div id="body bg">
      {/* {state.realtime.length > 0 && <Realtime />} */}
         <Realtime />
    <div className="mobile">  
    
    <div className="header_footer">
      <Footer  />
      <Header />
    </div>
    
    <div> 
      <div>   
        
        <Toppills /> 
         
        <div animateIn='fadeIn'>
          <div className="leagues_holder"> 
              {console.log(id)}            
            {console.log(state)} 
            <div id="body">  

               <div>  <br /> <br />
                
                  
                  {compState.loader != true ?
                     <div className="leagues_holder">
                        {description()}
                        {matchData()}  <br /> 
                     </div> :
                     <div className="img_loader">  <br /><br /><br /><br /><br /><br /><br /> <img  src={loaderImg} /> <br /> <br /><br /><br /><br /><br /><br /><br /></div>
                  }


               </div>
            </div>               
          </div>
        </div> 
      <Pills />   
      </div> <br />   
    </div> 
    
    
      </div> 
      
      {/* desktop left */}
      <Desktopleft />
      
        
        {/* desktop right */}
        <Desktopright />
        
    </div>
   )
   
}


const mapStateToProps = state => { 
  return {
    appState: state.user
  }
}


const mapDispatchToProps = (dispatch,encoded) => {
  return { 
      dispjackpot: (jackpot) => dispatch(disp_jackpots(jackpot)),
     logout: () => dispatch(logOut()),
      
     refresh_matches: (refresh) => dispatch(match_refresh(refresh)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches)