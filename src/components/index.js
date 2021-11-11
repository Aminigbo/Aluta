import React, {useState} from 'react'
import { Redirect,useHistory} from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js" 
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright"
import Pills from "./includes/desktoppillsholder"
import Toppills from "./includes/topdesktoppills"
import Realtime from "./includes/realtime"
import Naira from 'react-naira' 
import loaderImg from "../static/logos/animation.gif"  
import {logOut} from '../redux' 


import {EmojiEmotions } from '@material-ui/icons';

import {Helmet} from "react-helmet";
import logo from "../static/logos/logo2.png"


const smile = {
   color: "orange",
   fontSize:"20px"
}

const smile2 = {
   color: "orange",
   fontSize:"20px"
}


function Home({ appState,set_session,logout }) {
  let history = useHistory();
  const state = appState
  
 
  React.useEffect((compState) => {  
      window.scrollTo(0, 0); 
      setStates({ ...compState, loader: true})
    setTimeout(() => setStates({ ...compState, loader: false }), 500); 
   }, []);

  
  
  const [compState, setStates] = useState('')

  // show loader when rerouting
  let reroute = (category) => {
    // history.push(`./leagues/${category.id}`)
    setStates({ ...compState, loader: true })
    setTimeout(() => history.push(`./leagues/${category.id}`), 500); 
  } 
 

  const feed = () => {
    return (
      <div>
        
                
        <div className="feed">
          <div className="feedParent">
            {/* <div className="realtimeHeader" style={smile}>
              <b>Aminigbo</b> the Ogapredictor
            </div> */}
            <div className="realtimeBody">
              Buz Alert  <EmojiEmotions  style={smile2}/> <br />
              <b>Aminigbo</b> buzzed Helen <b><Naira>5000</Naira></b> 
              
              <div className="description" >
                <span><i>
                  Helen, use this <b><Naira>5000</Naira></b> to get your self a brand new car... <br /><br /></i></span>
              </div> <br />
                <button className='active' >Buz me</button>
            </div>
          </div>
        </div><br />

        <div className="feed">
          <div className="feedParent">
            {/* <div className="realtimeHeader" style={smile}>
              <b>Aminigbo</b> the Ogapredictor
            </div> */}
            <div className="realtimeBody">
              Yeah!!  <br />
              <b>Aminigbo</b> <EmojiEmotions  style={smile2}/> <b><Naira>5000</Naira></b> 
              
              <div className="description" >
                <span><i>
                  <b>Aminigbo</b> after emerging as the Ogapredictor among 7 other predictors, cashed out the sum of  <b><Naira>5000</Naira></b> <br /><br /></i></span>
              </div> <br />
                <button className='active' >Hail</button>
            </div>
          </div>
        </div><br />

        <div className="feed">
          <div className="feedParent">
            {/* <div className="realtimeHeader" style={smile}>
              See Who Predicted
            </div> */}
            <div className="realtimeBody">
              Yeah!!  <br />
              If your mind reach, <b>PREDICT</b> <EmojiEmotions  style={smile2}/><EmojiEmotions  style={smile2}/> 
              
              <div className="description" >
                <span><i>
                      <b><Naira>5000</Naira></b> category of <b>Premier League </b> is on fire. <br />
                      You could be the Ogapredictor <br /><br /></i></span>
              </div> <br />
                <button className='active' >Predict</button>
            </div>
          </div>
        </div><br />

        <div className="feed">
          <div className="feedParent">
            {/* <div className="realtimeHeader" style={smile}>
              Helen Got Buzzed <EmojiEmotions  style={smile2}/>
            </div> */}
            <div className="realtimeBody">
              Yeah!!  <br />
              <b>Aminigbo</b> created a challenge <b><Naira>5000</Naira></b> 
              
              <div className="description" >
                <span><i>
                 Aminigbo created a challenge, <br />
                  face him <b>ONE on ONE</b> <br /><br /></i></span>
              </div> <br />
                <button className='active' >Challenge</button>
            </div>
          </div>
            </div><br />
            
        <div className="feed">
          <div className="feedParent">
            {/* <div className="realtimeHeader" style={smile}>
              Helen Got Buzzed <EmojiEmotions  style={smile2}/>
            </div> */}
            <div className="realtimeBody">
              Yeah!!  <br />
              <b>Aminigbo</b> Won the challenge <b><Naira>5000</Naira></b> 
              
              <div className="description" >
                <span><i>
                  The challenge is not for the faint Harted, it is for the big boys. <br /><br /></i></span>
              </div> <br />
                <button className='active' >Hail</button>
            </div>
          </div>
        </div><br /> 
                
     </div>
   )
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
        
        {/* user session */}
        <checkSession />
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
          <Toppills /> <br /> 
          
        
          {compState.loader != true ?
            <div animateIn='fadeIn'>
              <div className="leagues_holder"> 
              {feed()} {feed()} {feed()} {feed()} {feed()}
              {/* {feed()} {feed()} {feed()} {feed()} {feed()}
              {feed()} {feed()} {feed()} {feed()} {feed()} */}
                
                
              </div>
            </div>
          :
          <div className="img_loader"> <br /><br /><br /> <img  src={loaderImg} /> <br /> <br /><br /></div>
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
)(Home)