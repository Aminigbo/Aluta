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


import loaderImg from "../static/logos/animation.gif"

import promo1 from "../static/images/league-logos/premier1.png"
import promo2 from "../static/images/league-logos/La_Liga.png"
import promo3 from "../static/images/league-logos/bundesliga.png"
import promo4 from "../static/images/league-logos/serieA.jpeg"
import promo5 from "../static/images/league-logos/ligue1.png"
import promo6 from "../static/images/league-logos/portugues.png"
import promo7 from "../static/images/league-logos/champions.png"
import promo8 from "../static/logos/logo2.png" 

import { Link } from "react-router-dom";  
import {logOut} from '../redux' 


const body = {
   padding:"10px 20px"
}

function Terms({ appState,logout }) {
  let history = useHistory();
  const state = appState
  
 React.useEffect((compState) => {  
      window.scrollTo(0, 0);  
   }, []);



  
 return (
    <div id="body bg">
    <div className="mobile">  
    
    <div className="header_footer">
      <Footer  />
      <Header />
    </div>
    <div>  <br />
            
      <div>     
          <div animateIn='fadeIn'>
            <div style={body} className="leagues_holder">  
              <p> 
                 <b>We encourage responsible gambling</b> <br /><br />
                    
                  We take social responsibility and responsible gambling extremely seriously at Oga predictor. We want you to enjoy your time with us and believe it is our duty to ensure you do so in a safe environment.

                  It is important to bet only what you can afford by establishing sensible limits for yourself and sticking to those limits.

                  If you feel your betting is getting out of control, we have a range of tools available to support you which you can implement by contacting Customer Services.

                  Email: help@ogapredictor.com

                  Tools Available
                  We have a number of different responsible gambling tools that are available for you, these are detailed below

                  Net Loss Limits:
                  You can set a daily or monthly net loss limit. This can be set by contacting Customer Services who will be able set or amend your net loss limit as required.

                  Account Closure:
                  You can close your account indefinitely, at any time and for any reason by contacting Customer Services . In this situation, you will not be prevented from reopening your account if you wish to.

                  Account Time Out:
                  Should you wish to do so, you can take a break for 24 hours up to 6 months. During this time, you will be unable to log into your account and will be removed from receiving any marketing and promotional material.

                  Once your Time Out period has ended your account will be automatically reopened and you will be able to log back in.

                  In order to implement or extend your current TimeOut period, contact Customer Services.

                  Account Self-Exclusion:
                  If you feel you are struggling with your gambling and wish to close your account for a minimum period of 6 months or longer as required (including permanently), you can choose to self-exclude.

                  Please contact Customer Services to request self-exclusion.

                  Upon requesting self-exclusion, you will be unable to reopen or access your account and you will be removed from any marketing activity during that period. If you opt to self-exclude, we strongly recommend you consider self-excluding from any other accounts you may have with other operators.

                  Following the end of your self-exclusion period, if you wish to reactivate your account you are required to contact our Customer Services to request this.

                  Know your limits
                  We want you to enjoy betting and gamble responsibly. For some, gambling can become a problem. Please read the information below, especially if you are recovering from any kind of dependency:

                  Always establish limits before you start playing.
                  Decide beforehand on a time limit for your session and stick to it. Within that period, ensure you take regular breaks.
                  Never gamble if it interferes with your daily responsibilities.
                  Never gamble if you are in recovery from any kind of dependency or are under the influence of alcohol or any other substance.
                  Never gamble if your primary aim is to recover losses.
                  Self-Assessment Questions
                  Answering the following questions will help you to assess your level of gambling:

                  Have you lost interest in your family, friends or hobbies?
                  Have you ever lied, stolen or borrowed money to gamble or pay gambling debt?
                  Do you consider gambling a way to make money for a living?
                  Do you borrow from family and friends to gamble?
                  Do you ever miss work to gamble?
                  Do you gamble to escape a boring or unhappy life?
                  Do you gamble until your money is gone, even the money for food or transportation home?
                  Have others ever criticised you for gambling too much?
                  If you run out of money when gambling, do you feel lost or empty and in despair and need to gamble as soon as possible?
                  Are you reluctant to spend “gambling money” on anything else?
                  Do you feel the need to win back your losses as soon as possible?
                  Do you respond to arguments, frustrations or disappointments with a desire to gamble more?
                  Do you feel depressed or even suicidal because of your gambling?
                  The more you answer ‘yes’ to these questions, the more likely you are to have a serious gambling problem. At this point, we recommend you contact our Customer Services team.

                  Underage Gambling:
                  It is illegal for anyone under the age of 18 to open an account with us. Ogapredictor requires customers to declare that they are of lawful age to engage in gambling activities. We do not market or promote our services to persons who have not attained the age of 18 years.

                  We may ask for information to verify your age and/or identity and could restrict or suspend your account until your age and/or identity is confirmed. Any accounts found to have been 
                  opened by an underage individual will be immediately disabled and winnings forfeited. Misrepresenting your age to avoid age restrictions is considered fraud and a serious offense. In order to prevent underage individuals from accessing your account, we recommend keeping your PIN and account details secret.

                  If you share your computer with friends or family under the legal age to register and place bets, the following third-party applications offer parents and guardians facilities to monitor and restrict access to the internet:

                  Net Nanny filtering software protects children from inappropriate web content: www.netnanny.com.

              </p>
            </div>
          </div> 
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
)(Terms)