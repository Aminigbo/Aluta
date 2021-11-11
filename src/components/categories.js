import React, { useState } from 'react'

import { seePredicted,allMatches,disp_categories,logOut} from '../redux'

import { Redirect,useParams,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js" 
import { ToastContainer, toast, Bounce} from 'react-toastify';
 
import loaderImg from "../static/logos/animation.gif"
import Realtime from "./includes/realtime"
import { emphasize, withStyles } from '@material-ui/core/styles'; 
import Chip from '@material-ui/core/Chip'; 
import {Alert } from '@material-ui/lab';  
import Naira from 'react-naira' 
import { supabase } from '../configurations';  
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright"

import Pills from "./includes/desktoppillsholder"
import Toppills from "./includes/topdesktoppills"

import {People,SentimentVeryDissatisfied} from '@material-ui/icons';

import {Helmet} from "react-helmet";
import logo from "../static/logos/logo2.png"

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




const emoji_holder = {
  // fontSize: "100px",
  textAlign: "center",
   color:"crimson"
}

const emoji = {
  fontSize: "100px",
  textAlign: "center",
  color:"crimson"
}

const cashedout = {
   backgroundColor: "lightgray",
   color:"gray"
}
 
function Categories({appState,logout,disp_predicted,disp_allMatches,disp_allCategories}) {
   const state = appState
   let history = useHistory();
   let { league } = useParams()

   // const listen = (payload) => { 
   //    setStates({ ...compState, loader: true})
   //    new_supabase.from("categories").select("*").eq("status", "ACTIVE").then(response => {
   //       if (response.body.length < 1) {
   //          disp_allCategories([])
   //       } else { 
   //          disp_allCategories(response.body[0].data)
   //       }
   //       setStates({ ...compState, loader: false})
         
   //    }).catch(error => {
   //       errorToast("A network error occured.")
   //       setStates({ ...compState, loader: false})
   //    })
   // } 

   
   // const mySubscription = () => { 
   //    new_supabase
   //    .from(`categories`)
   //    // .on('INSERT', payload =>{  insert(payload)})
   //    .on('*', payload =>{  listen(payload)})
   //    .subscribe() 
   
   // }


   React.useEffect((compState) => { 
      // ReactDom.findDOMNode(this).scrollIntoView();
      window.scrollTo(0, 0);
      setStates({ ...compState, loader: true})
      // setTimeout(() => setStates({ ...compState, loader: false }), 500);
      console.log(state)
      
      
      new_supabase.from("categories").select("*").eq("league_id", league).eq("status", "ACTIVE").then(response => { 
         if (response.body.length < 1) {
            disp_allCategories([])
         } else { 
            disp_allCategories(response.body[0].data)
         }

         new_supabase
         .from('matches')
         .select("*")
         .eq("league", league)
         .eq("status", "ACTIVE")
         .then(insert_response => {
            if (insert_response.body.length < 1) {
               disp_allMatches([]) 
            } else { 
               disp_allMatches(insert_response.body)
            }  
            setTimeout(() => setStates({ ...compState, loader: false }), 500);
         }).catch(error => {
            setStates({ ...compState, loader: false})
            kickoffInfoToast("A network error occured")
         }) 
         
      }).catch(error => {
         errorToast("A network error occured.")
         setStates({ ...compState, loader: false})
      })

      
   }, []);

   

   const new_supabase = supabase()
   let user = '';
   if (state.loggedIn == true) {
      user = state.loggedInUser.user.id
   } else {
      logout()
      history.push("/login")
   }
   
   
   

   // console.log(newLeague);

   const [compState, setStates] = useState('')

   const kickoffInfoToast = (message) => { 
      toast.warning(message, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
   }

   const errorToast = (message) => { 
      toast.error(message, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
   }

   const reroute_breadcrumb = (link) => {
      history.push(`/${link}`)
   }

   



   // show loader when rerouting
   let reroute = (amount, categoryId) => {
      console.log(categoryId)
      let kickoff = state.allMatches[0].matches.kickoff_date
      
      const today = new Date()
      const yesterday = new Date(kickoff) 
      
      function msToTime(ms) {
         let seconds = (ms / 1000).toFixed(1);
         let minutes = (ms / (1000 * 60)).toFixed(1);
         let hours = (ms / (1000 * 60 * 60)).toFixed(1);
         let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
         if (seconds < 60) return seconds;
         else if (minutes < 60) return minutes;
         else if (hours < 24) return hours;
         else return days
      } 


      let timeDiff = msToTime(yesterday.getTime()-today.getTime()) 


      const firstDateIsPastDayComparedToSecond = (firstDate, secondDate) => {
         if (firstDate.setHours(0,0,0,0) - secondDate.setHours(0,0,0,0) >= 0) { //first date is in future, or it is today
            return false
         }
         return true
      }
      
      yesterday.setDate(yesterday.getDate() - 1)

      let ifTrue = firstDateIsPastDayComparedToSecond(yesterday, today)

      setStates({ ...compState, loader: true })
      new_supabase.from("category_results").select("*").eq("status", 'ACTIVE').eq("categoryId", categoryId).then(response2 => { 
         if (response2.body.length > 0) {  
            history.push(`/board/${league}/${categoryId}/${amount}`)  
         } else {
            if (ifTrue == true && Math.sign(timeDiff) == -1) { 
               history.push(`/board/${league}/${categoryId}/${amount}`) 
            } else {
               new_supabase    // CHECK IF USER ALREADY PREDICTED FOR THIS CATEGORY
               .from('predictions')
               .select('*')
               .eq('user', user)
               .eq('league', league)
               .eq('categoryId', categoryId)
               .then(response2 => {  
                  if (response2.data.length < 1) {
                     history.push(`${league}/${categoryId}/${amount}`)
                  } else {
                     history.push(`/board/${league}/${categoryId}/${amount}`)
                  }
               }).then(error => {
                  setStates({ ...compState, loader: false})
                  // kickoffInfoToast("A network error occured")
               }) 
            } 
         }
      }).catch(error => {
         setStates({ ...compState, loader: false})
         kickoffInfoToast("A network error occured")
      })  
   } 


   




   const infoToast = () => { 
      toast.warning("There are no matches available for this category", {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
   }

   const infoToast2 = (msg) => { 
      toast.warning(msg, {
         position: toast.POSITION.TOP_CENTER,
         onClose: () => {history.goBack() },
         transition: Bounce 
      });
   }
   

   function handleClick(event) {
      event.preventDefault();
      setStates({ ...compState, loader: true })
      setTimeout(() => history.push("/"), 500); 
      // history.push("/")
      
   }

   

   //  RENDER ALL THE CATEGORIES
   const renderCategories = () => {  
      if (state.categories.length < 1) {
         return (
         <div style={emoji_holder}> <br /><br />
           <SentimentVeryDissatisfied style={emoji} /> <br /><br />
           <b>OPS! .... <br /> There are no categories found.</b>
          </div>
        )
         
      } else {
         let leagueCategory = state.categories.filter(e => e.leagueId == league)
         if (leagueCategory.length > 0) {
            return leagueCategory.map(category=>{
               console.log(category)
               return (
                  <div  class="leagues">
                     <div id={category.price} className={category.stake > 6 ? "stakes secondary":"stakes primary" } >{category.stake} <People   id={category.price} /></div>
                     <div id={category.price} className="stakes_price2" >
                        <b id={category.price} className=''><Naira  id={category.price} >{category.price}</Naira></b> <br />
                        <small id={category.price} className="icon" >{category.league}</small>
                     </div>

                     {category.cashedout != "YES" ?
                        
                        <div>{category.stake > 6 ? <div className= "stakeBtn2"  id={category.price} onClick={(e) => { state.allMatches.length < 1 ? infoToast() : history.push(`/board/${league}/${category.id}/${e.target.id}`) }}> Completed</div>
                           : <div className= "stakeBtn" id={category.price} onClick={(e) => { state.allMatches.length < 1 ? infoToast() : reroute(e.target.id, category.id) }}> Continue</div>}
                        </div> :

                        <div className="stakeBtn" style={cashedout} id={category.price} onClick={(e) => {state.allMatches.length < 1 ? infoToast(): history.push(`/board/${league}/${category.id}/${e.target.id}`) }}> Cashed out</div>}
                  
                  </div>
               )
            })
         } else {
            return (
               <div style={emoji_holder}> <br /><br />
               <SentimentVeryDissatisfied style={emoji} /> <br /><br />
               <b>OPS! .... <br /> There are no categories found.</b>
               </div>
            )
         }
         
      }
   }


   
  return state.loggedIn === false ? (
    <div>
          <Redirect to="/login" />  
    </div>
    
  ):
  (
    <div id="bg body">
       {/* {state.realtime.length > 0 && <Realtime />} */}
         <Realtime />
       <Helmet>
        <meta charSet="utf-8" />
        <title>Ogapredictor</title>
        <link rel="icon" href={logo} />
      </Helmet>
      
       <div className="mobile" >  
         
         <div className="header_footer">
            <Footer  />
            <Header /> 
         </div>
         <div> <br />

               
         <div>  
         <Toppills /> 
            <br />  
            
            {compState.loader == false && <div>{state.categories.length > 1 && <div> <br /></div>}</div> }
            
            {compState.loader == false && <div>{state.allMatches.length < 1 && <div><br /> <Alert severity="error">There is no match for this league</Alert></div>} </div> }
            
            
            
            {compState.loader != true ?
            <div className="leagues_holder"> 
            {state.categories.length > 0 && <div className='explore'><span>Select categories</span></div> }
               <ToastContainer autoClose={2000}/>
               {renderCategories()}
            </div> : <div className="img_loader">  <br /><br /><br /><br /> <br /><br /><img  src={loaderImg} /> <br /> <br /><br /><br /><br /><br /></div>}
            <br /> 
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
      disp_predicted: (predicted) => dispatch(seePredicted(predicted)),
      disp_allMatches: (all_matches) => dispatch(allMatches(all_matches)),
      disp_allCategories: (categories) => dispatch(disp_categories(categories)),
      logout: () => dispatch(logOut()), 
      
      
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)