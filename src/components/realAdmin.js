import React, {useState} from 'react'
import { Redirect,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js"
import Adsbanner from "./includes/adsbanner"
import Desktopleft from "./admin/includes/desktopleft"
import Desktopright from "./admin/includes/desktopright"
import Pills from "./includes/desktoppillsholder"
import Toppills from "./includes/topdesktoppills"
import { supabase } from '../configurations';   

import { Link } from "react-router-dom"; 

import club1 from "../static/images/club-logos/arsenal.png"
import club2 from "../static/images/club-logos/chelsea.png"


import {LinearProgress } from '@material-ui/core'; 
import {logOut,allMatches,stage_match,league_status} from '../redux' 
import {HomeOutlined,TrackChangesOutlined,HorizontalSplitOutlined,HowToVoteOutlined,SportsRugbyOutlined,SportsKabaddiOutlined,Person} from '@material-ui/icons'; 

import { ToastContainer, toast, Bounce } from 'react-toastify';


import promo1 from "../static/images/league-logos/premier1.png"
import promo2 from "../static/images/league-logos/La_Liga.png"
import promo3 from "../static/images/league-logos/bundesliga.png"
import promo4 from "../static/images/league-logos/serieA.jpeg"
import promo5 from "../static/images/league-logos/ligue1.png"
import promo6 from "../static/images/league-logos/portugues.png"
import promo7 from "../static/images/league-logos/champions.png"
import promo8 from "../static/logos/logo2.png" 



const vs = {
   fontSize: "10px",
   color:"gray"
}
const kickoff_date = {
   fontWeight: "bold",
   fontSize: "12px",
}





 
function Home({ appState,logout,disp_allMatches, disp_stage_match,disp_league_state }) {
  let history = useHistory();
  const state = appState
  const new_supabase = supabase()

  
  

  React.useEffect((compState) => {  
     
    
    setStates({ ...compState,election:elections})
   }, []); 
  var elections = [
      {
        id: "DFVD43T543",
        title: "NURS Election",
        positions: [
          {
            position: "President",
            positionId:"FGTR453F",
            contenders: [
              {
                name: "Aminigbo",
                id:"fdbhe35rt",
                votes:0
              },
              {
                name: "Gift",
                id:"fvbgeh34t6",
                votes:0
              },
              {
                name: "Rose",
                id:"88484jfl",
                votes:0
              }
            ]
          },
          {
            position: "Vice President",
            positionId:"dfgregt43h,l",
            contenders: [
              {
                name: "Helen",
                id:"dgregty3fb",
                votes:0
              },
              {
                name: "Bryan",
                id:"856jyyh",
                votes:0
              }
            ]
          },
          {
            position: "PROVOST",
            positionId:"ytnhjmuyk,ymthn r",
            contenders: [
              {
                name: "Queen",
                id:"34tr54grv",
                votes:0
              },
              {
                name: "Stewart",
                id:"567ujytn",
                votes:0
              }
            ]
          },
          {
            position: "P.R.O",
            positionId:"4thrnyyn",
            contenders: [
              {
                name: "Precious",
                id:"uyi9;0'[-90;96lum]",
                votes:0
              },
              {
                name: "Boma",
                id:"576ujygntr",
                votes:0
              }
            ]
          }
        ]
      },
      
     ]
  const [compState, setStates] = useState({
    election:elections
  })
  
    // setStates({ ...compState, addMatchModal: true, default: true, leagueData: category,loader: true}) 

  
  const renderLeagues = () => { 
    console.log(compState.election)
    return compState.election[0].positions.map(election => { 
      return election.contenders.map(con => {
        return (
          <div>
            <button onClick={()=>{vote(election.positionId, con.id)}} >{election.position}--{con.name}---{con.votes}</button> <br /><br />
          </div>
        )
      })
    })
  }

 
  const vote = () => {
    let vote = [
      { positionId: "FGTR453F", contenderId: "fvbgeh34t6" },
      { positionId: "4thrnyyn", contenderId: "uyi9;0'[-90;96lum]" },
      { positionId: "dfgregt43h,l", contenderId:"856jyyh"},
      
    ]

    for (let i = 0; i < vote.length; i++) {
      // console.log(vote[i].contenderId)
      let positionId = vote[i].positionId
      let contenderId = vote[i].contenderId

      // console.log("Position==>  " + positionId)
      // console.log("contender id ==>  " + contenderId)
      let position = compState.election[0].positions.findIndex(i => i.positionId === positionId)


      // console.log(compState.election[0].positions[position])

      let position2 = compState.election[0].positions[position].contenders.findIndex(i => i.id === contenderId)
      // console.log(compState.election[0].positions[position].contenders[position2])
      let voteCount = compState.election[0].positions[position].contenders[position2].votes + 1
      
      let newV = { ...compState.election[0].positions[position].contenders[position2], votes: voteCount }
      
      // console.log(newV)

      compState.election[0].positions[position].contenders.splice(position2, 1, newV)
      
      // console.log(compState.election[0].positions[position])

      let newV2 = { ...compState.election[0].positions[position], contenders: compState.election[0].positions[position].contenders }
      
      compState.election[0].positions.splice(position, 1, newV2)
      
    }

    let newE = [
      {
        id: "",
        title: "",
        positions:compState.election[0].positions
      }
    ]
    // console.log(compState.election[0].positions)
    setStates({ ...compState,election:newE})

  }



  return state.loggedIn === false ? (
    <div>
          <Redirect to="/login" />  
    </div>
    
  ):
  (
      <div id="body bg"> 
      <div className="mobile">  
    <div>   
    <div>    
      <div className="explore desktop">
        <span>Explore</span>
        <span className="logout" onClick={()=>{logout()}}>Logout</span>
      </div> <br />
      <Toppills /><br />
      <div className='explore'>
        <span>Choose League</span>
      </div>
      <div animateIn='fadeIn'>
        <div className="leagues_holder">
          {renderLeagues()} 
        </div>
      </div>  
      </div> 
    </div> 
  </div>  
  <Desktopleft /> 
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
    disp_allMatches: (all_matches) => dispatch(allMatches(all_matches)),
    disp_stage_match: (stagged) => dispatch(stage_match(stagged)),
    disp_league_state: (status) => dispatch(league_status(status)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)