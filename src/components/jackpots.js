 import React, {useState} from 'react'
import { Redirect,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js" 
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright"
import Pills from "./includes/desktoppillsholder"
import Toppills from "./includes/topdesktoppills"
 import { ToastContainer, toast, Bounce} from 'react-toastify';

import promo1 from "../static/slidder/promo1.jpg" 
import { Link } from "react-router-dom"; 
import {LinearProgress } from '@material-ui/core'; 
import {stage_match,logOut,disp_jackpots} from '../redux'
import { supabase } from '../configurations';


import {HomeOutlined,TrackChangesOutlined,HorizontalSplitOutlined,HowToVoteOutlined,SportsRugbyOutlined,SportsKabaddiOutlined,SentimentVeryDissatisfied} from '@material-ui/icons';
 const emoji_holder = { 
      textAlign: "center",
      color:"crimson"
    }
  
  const emoji = {
    fontSize: "100px",
    textAlign: "center",
    color:"crimson"
  }

const jkHolder = {
  padding: "12px 6px",
  color:"orange"
}
  
const title = {
    color:'orange'
  }
function Home({ disp_stage_match, appState, logout ,dispjackpot}) {
  let history = useHistory();
  const state = appState
  const new_supabase = supabase()


  
  React.useEffect((compState) => {  
      window.scrollTo(0, 0); 
    setStates({ ...compState, loader: true })
    new_supabase.from("jackpot").select("*").eq("active", true).then(jackpots => {
      dispjackpot(jackpots.body)
    })

    setTimeout(() => setStates({ ...compState, loader: false }), 2000);
    
  }, []);
  
  const errorToast = (msg,id) => { 
      toast.error(msg, {
         position: toast.POSITION.TOP_CENTER, 
         transition: Bounce 
      });
   }

  

  const categoryData = [
      {
         price:300,
         league:'Premire League',
         stake:1,
         matches:'11 matches',
         id:'regregwt34tds'
      },
      {
         price:700,
         league:'La Liga',
         stake:6,
         matches:'11 matches',
         id:'regregwt3dfs4tds'
      },
      {
         price:1500,
         league:'Bundesliga',
         stake:11,
         matches:'11 matches',
         id:'regregwtwenh34tds'
      },
      {
         price:500,
         league:'Seria A',
         stake:9,
         matches:'11 matches',
         id:'regrewerewgwt34tds'
      },
      {
         price:200,
         league:'League 1',
         stake:2,
         matches:'11 matches',
         id:'regregwtvgrewv4tds'
      },
      {
         price:3000,
         league:'General',
         stake:0,
         matches:'11 matches',
         id:'regregwtregreg34tds'
      }
   ]
  
    
  const [compState, setStates] = useState('')

  const reroute_breadcrumb = (link) => {
    history.push(`/${link}`)
  }
  
  
  // show loader when rerouting
  let reroute = ()=>{
    setStates({ ...compState, loader: true}) 
  } 


  const rerouting = (id) => {
    setStates({ ...compState, loader: true}) 
    new_supabase.from("jackpotPredictions").select("*").eq("jackpot", id.id).eq("user", state.loggedInUser.user.id).then(check => {
         if (check.body.length > 0) {
           errorToast("You have predicted already", id)
           disp_stage_match({data:check.body, jkpt:id,})
           history.push(`/jackpotslip/${state.loggedInUser.meta.access_token}/${id.id}`)
         } else {
           history.push(`/predictjkpt/${state.loggedInUser.meta.access_token}/${id.id}`)
        }
      })
  }

  const renderJackpots = () => {
    if (state.jackpots.length > 0) {
      return state.jackpots.map(category => {
         return (
          <div onClick={()=>{rerouting(category)}} class="leagues"> 
              <div style={jkHolder} className=" ">
               <span style={title}>{category.title}</span> <br />
               {/* <small>{category.prize}</small><br /> */} <br />
               {category.matches == null ?  <span className=" ">No match added</span> :  <span className=" ">{category.matches.length} matches</span>}
              </div>
          </div>
        )
      })
    } else {
      return (
        <div style={emoji_holder}> <br /><br />
              <SentimentVeryDissatisfied style={emoji} /> <br /><br />
              <b>OPS! .... <br /> There are no jackpots found.</b>
            </div> 
      )
    }
  }

  

  return state.loggedIn === false ? (
    <div>
          <Redirect to="/login" />  
    </div>
    
  ):
  (
    <div id="body bg">
    <div className="mobile"> 
    {compState.loader && <div className="loader">  <LinearProgress /> </div>}
    {console.log(state)}
    <div className="header_footer">
      <Footer  />
      <Header />
    </div>
    
    <div>   <br />
      <div>  
        <Toppills />
        
        <br />
        <div className='explore'><span>Choose Jackpots</span></div>
        
       
        <div animateIn='fadeIn'>
          <div className="leagues_holder">
            {renderJackpots()}
            
            

          </div>
        </div>

        <br />  
      </div>    
      
      <Pills />
      
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
    logout: () => dispatch(logOut()),
    dispjackpot: (jackpot) => dispatch(disp_jackpots(jackpot)),
    disp_stage_match: (stagged) => dispatch(stage_match(stagged)), 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)