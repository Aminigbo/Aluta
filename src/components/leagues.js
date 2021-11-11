import React, {useState} from 'react'
import { Redirect,useHistory,Link} from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js" 
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright"
import Pills from "./includes/desktoppillsholder"
import Toppills from "./includes/topdesktoppills"
import Realtime from "./includes/realtime"

import loaderImg from "../static/logos/animation.gif"

import promo1 from "../static/images/league-logos/premier1.png"
import promo2 from "../static/images/league-logos/La_Liga.png"
import promo3 from "../static/images/league-logos/bundesliga.png"
import promo4 from "../static/images/league-logos/serieA.jpeg"
import promo5 from "../static/images/league-logos/ligue1.png"
import promo6 from "../static/images/league-logos/portugues.png"
import promo7 from "../static/images/league-logos/champions.png"
import promo8 from "../static/logos/logo2.png"

import {logOut} from '../redux' 


import {TrackChangesOutlined, HorizontalSplitOutlined, HowToVoteOutlined, SportsRugbyOutlined, } from '@material-ui/icons';

import {Helmet} from "react-helmet";
import logo from "../static/logos/logo2.png"


function Leagues({ appState }) {
  let history = useHistory();
  const state = appState
  
 
  React.useEffect((compState) => {  
      window.scrollTo(0, 0); 
      setStates({ ...compState, loader: true})
    setTimeout(() => setStates({ ...compState, loader: false }), 500); 
   }, []);

 const leagues = [
      { 
      league:'Legends',  
      id:'regregwt34tds',
      // logo:promo1,
      logo:promo8,
     code: "PL",
      bk:"linear-gradient(180deg, rgba(60, 83, 153, 0.15) 0%, rgba(97, 102, 18, 0.15) 46.47%, rgba(53, 72, 139, 0.5) 100%)"
    },
    { 
      league:'Bet Gurus',  
      id: 'regregwt3dfs4tds',
      // logo:promo2,
      logo:promo8,
      code: "LALIGA",
      bk:"linear-gradient(180deg, rgba(60, 83, 153, 0.15) 0%, rgba(97, 162, 68, 0.15) 46.47%, rgba(0, 0, 0, 0.8) 100%)"
      },
    { 
        league:'No Jokes', 
      id: 'regregwtwenh34tds',
        // logo:promo3,
      logo:promo8,
      code: "BUND",
        bk:"linear-gradient(180deg, rgba(60, 83, 153, 0.15) 0%, rgba(97, 162, 68, 0.15) 46.47%, rgba(217, 44, 44, 0.6) 100%)"
      },
    { 
        league:'Big Boiz', 
        id:'regrewerGKIKG76R56437878Gt34tds',
        // logo:promo4,
        logo:promo8,
      code: "SERIA",
        bk:"linear-gradient(180deg, rgba(60, 83, 153, 0.15) 0%, rgba(97, 162, 68, 0.15) 46.47%, rgba(151, 151, 78, 0.9) 100%)"
    },
    { 
        league:'Veterans', 
        id:'regregwt968587VIKNHJwv4tds',
        // logo:promo5,
        logo:promo8,
      code: "LEAG1",
        bk:"linear-gradient(180deg, rgba(60, 83, 153, 0.15) 0%, rgba(97, 162, 68, 0.15) 46.47%, rgba(87, 151, 78, 0.8) 100%)"
    },
    { 
        league:'Bet Biggies', 
        id:'regregwtrJCKJF666X7DTYTeg34tds',
        // logo:promo6,
        logo:promo8,
        code:"PORT",
        bk:"linear-gradient(180deg, rgba(60, 83, 153, 0.15) 0%, rgba(97, 162, 68, 0.15) 46.47%, rgba(78, 122, 151, 1) 100%)"
  },
  { 
        league:'Champions League', 
        id:'regregwtre0098JGFY65FVJHg34tds',
        // logo:promo7,
        logo:promo8,
    code: "CHAMP",
        bk:"linear-gradient(180deg, rgba(60, 83, 153, 0.15) 0%, rgba(97, 162, 68, 0.15) 46.47%, rgba(173, 160, 148, 0.15) 100%)"
  },
  { 
        league:"Ogapredictor's Mixed Games", 
        id:'regregwtrDDY67579reg34tds',
        logo:promo8,
    code: "CHAMP",
        bk:"linear-gradient(180deg, rgba(60, 83, 153, 0.15) 0%, rgba(97, 162, 68, 0.15) 46.47%, rgba(173, 160, 148, 1) 100%)"
    }
  ]
  

  const reroute_breadcrumb = (link) => {
    history.push(`/${link}`)
  }
  
  
  const [compState, setStates] = useState('')

  // show loader when rerouting
  let reroute = (category) => {
    // history.push(`./leagues/${category.id}`)
    setStates({ ...compState, loader: true })
    setTimeout(() => history.push(`./leagues/${category.id}`), 500); 
  } 


 const renderLeagues = ()=>{
    return leagues.map(category=>{
        return (
          <div onClick={() => { reroute(category);}}  style={{background:category.bk}}  class="leagues">
              <img alt={category.league} className='stakes2' src={category.logo} /> 
              <div className="stakes_price">
                <b className='icon'>{category.league}</b> <br />
                <small className="matches_count">{category.matches}</small>
              </div>
          </div>
        )
    })
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ogapredictor</title>
        <link rel="icon" href={logo} />
      </Helmet>
      
        
    <div className="mobile">  
    
    <div className="header_footer">
      <Footer  />
      <Header />
    </div>
    <div>  <br />
            
      <div>   
       
        <Toppills />
        
        <br />
        <div className='explore'><span>Choose Your Class</span></div>
        
       
        {compState.loader != true ?
          <div animateIn='fadeIn'>
            <div className="leagues_holder">   
              {renderLeagues()} 
            </div>
          </div>
        :
        <div className="img_loader">  <br /><br /><br /><br /><br /><br /><br /> <img  src={loaderImg} /> <br /> <br /><br /><br /><br /><br /><br /><br /></div>
        }
        <Pills />
      </div>   
      <br />
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leagues)