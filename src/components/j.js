import React, {useState} from 'react'

import {seePredicted,testResult} from '../redux'

import { Redirect,useParams,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js"
// import logo from "../static/logos/logo2.png"

// import club1 from "../static/images/club-logos/arsenal.png"
// import club2 from "../static/images/club-logos/chelsea.png" 

// import { Accordion,Card,Modal,Button,Row,Col, Toast, Carousel,InputGroup,FormControl,Form,OverlayTrigger,Tooltip,Spinner } from 'react-bootstrap'; 
// import { Box,Image,Badge} from "@chakra-ui/react"
// import { StarIcon} from '@chakra-ui/icons'

// import { Link } from "react-router-dom";

import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {LinearProgress } from '@material-ui/core';
import { supabase } from '../configurations'; 
// import Naira from 'react-naira'

import {toast,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Save } from '@material-ui/icons';


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


// const noMatch = {
//    textAlign: "center",
//    color:"lightgrey"
// }


// const vs = {
//    fontSize: "10px",
//    color:"gray"
// }
const kickoff_date = {
   fontWeight: "bold",
   fontSize: "12px",
   color:"black"
}


function Board({ appState,disp_predicted,disp_result}) {
    // initialize supabase
   const new_supabase = supabase()
   const state = appState 
   const user = state.loggedInUser.user.id;
   // console.log(state);

   let history = useHistory();
   const {amount } = useParams()
   let league = 'regregwt34tds'

   const mtchData = [
      {
        id:"regregwt34tds",
        league:'Premire League',
        kickoff_date:'8/5/2021, 2:57:10 PM', 
        matches:[
            {
              id:'89i8ulki',
              home:'Man-U',
              away:'Chelsea',  
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'iulfukjf,i6',
              home:'Aresenal',
              away:'Liverpool',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'8t78ituyfcduk',
              home:'Totthem',
              away:'Liecester',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'fuykuiotgi',
              home:'Westbrom',
              away:'Man-city',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'fdukyoiuoiu',
              home:'Everton',
              away:'Fullham',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'uioto87tf',
              home:'Bounermouth',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'filiuyuf',
              home:'Man-U',
              away:'Liverpool',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'fil8yyyyyyyyyk',
              home:'Everton',
              away:'Arsenal',
              date:'2022-01-31',
              time:'08:53',   
            },{
              id:'89i8weweulki',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'89i8ulkwewi',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'89i8uleweki',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            }
        ]
      },
      {
        id:"regregwt3dfs4tds",
        league:'Laaliga',
        kickoff_date:'8/5/2021, 6:57:10 PM', 
        matches:[
            {
              id:'89i8ulki',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'iulfukjf,i6',
              home:'Aresenal',
              away:'Liverpool',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'8t78ituyfcduk',
              home:'Totthem',
              away:'Liecester',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'fuykuiotgi',
              home:'Westbrom',
              away:'Man-city',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'fdukyoiuoiu',
              home:'Everton',
              away:'Fullham',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'uioto87tf',
              home:'Bounermouth',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'filiuyuf',
              home:'Man-U',
              away:'Liverpool',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'fil8yyyyyyyyyk',
              home:'Everton',
              away:'Arsenal',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'89i8weweulki',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'89i8ulkwewi',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'89i8uleweki',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            }
        ]
      },
      {
        id:"regregwtwenh34tds",
        league:'Bundesliga',
        kickoff_date:'8/5/2021, 9:57:10 PM', 
        matches:[
            {
              id:'89i8ulki',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'iulfukjf,i6',
              home:'Aresenal',
              away:'Liverpool',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'8t78ituyfcduk',
              home:'Totthem',
              away:'Liecester',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'fuykuiotgi',
              home:'Westbrom',
              away:'Man-city',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'fdukyoiuoiu',
              home:'Everton',
              away:'Fullham',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'uioto87tf',
              home:'Bounermouth',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'filiuyuf',
              home:'Man-U',
              away:'Liverpool',
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'fil8yyyyyyyyyk',
              home:'Everton',
              away:'Arsenal',
              date:'2022-01-31',
              time:'08:53',  
            },{
              id:'89i8weweulki',
              home:'Man-U',
              away:'Chelsea', 
              date:'2022-01-31',
              time:'08:53', 
            },{
              id:'89i8ulkwewi',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            },{
              id:'89i8uleweki',
              home:'Man-U',
              away:'Chelsea',
              date:'2022-01-31',
              time:'08:53',
            }
        ]
      }
  ]


   React.useEffect(() => {  
      window.scrollTo(0, 0);
      // disp_allMatches(mtchData)
      // disp_pickedMatches(0)
      setStates({ ...compState, loader: true })
      setTimeout(() => setStates({ ...compState, loader: false }), 500);
      
        new_supabase
      .from('predictions')
      .select('*')
      .eq('league', league)
      .eq('amount', amount)
      .then(response => {
         // console.log(response);
        if (response.data == null) {
          disp_predicted([])
        } else {
          disp_predicted(response.data)
        }
         
      })

      compare() 
   }, []);

 

   const [compState, setStates] = useState({
      amount:500,
      selected_count: 0,
      selected_matches: [],
      result: [],
      league: "",
      
      adminResult:[]
   })

   // show loader when rerouting
   let reroute = ()=>{
      setStates({ ...compState, loader: true}) 
   } 


   
   let refreshState = (matchId, correct_score, leagueId) => {
      // let newLeague_matches = mtchData.filter(e => e.id === leagueId)

      let new_matches = compState.adminResult.filter(e => e.matchid === matchId).length
      let position = compState.adminResult.findIndex(e => e.matchid === matchId)

      if (new_matches > 0) {
         let ko = { matchid: matchId, correct: correct_score }
         compState.adminResult.splice(position, 1, ko)
         setStates({ ...compState, result: compState.adminResult })
         
      } else {
         let ko = { matchid: matchId, correct: correct_score }
         
         compState.adminResult.push(ko)
         setStates({ ...compState, result:compState.adminResult })
      }
      setStates({ ...compState, league:leagueId }) 
      
     console.log(compState.adminResult)
   }

   

   async function save(){
      // let league_id = compState.league;
      let matches = compState.adminResult
      await new_supabase
      .from('results')
      .select('league') 
      .eq('league', league) 
         .then(response => { 
         if (response.data.length == 0) {
            return new_supabase
            .from('results')
            .insert([
               { league: league, result: matches},
            ]).then(insert_response => {
               console.log(insert_response);
               successToast()
            })
         } else {
            return new_supabase
            .from('results')
            .update([
               {result: matches},
            ])
            .eq('league',league)
            .then(update_response => {
               console.log(update_response);
               successToast()
            })
         }
        
      })
      .catch(error => { errorToast() })
         
         
   }


   // toasts
   const successToast = () => { 
      toast.info("Prediction added successfully", {
         position: toast.POSITION.TOP_CENTER,
         onClose: () => {console.log("Redirect")}
      });
   }
   const errorToast = () => { 
      toast.error("A network error occured", {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
   }
   



   function handleClick(event) {
      event.preventDefault();
      history.push("/")
   } 
   
 


    
   

   const predictions = ()=>{ 
      if (state.predicted.length > 0) {
         // console.log(compState.result);
         return state.predicted.map(matches => {
            
            let picked_count = compState.result.filter(e => e.user == matches.user && e.status == "CORRECT").length
            console.log(matches.user +" --> " + picked_count)
            return (
               <div> 
                  <div className="matches">
                  <div className="see_slip"> 
                    <div className="points">
                        <small>{picked_count * 3}</small> 
                        </div>
                        {matches.user === user && <span className='view_slip'  id={ matches.away} >view slip</span>}
                      
                  </div>
                  <div className="select_prediction_logo_holder"> 
                     <span className="predictor">{matches.username}</span>
                     <div className="predicted_time">
                        <span style={kickoff_date}>{matches.predicted_at} </span>
                     </div>  
                  </div>
               </div> 
               </div>
            )
         })
      }
   }

   async function compare(){
      await new_supabase
      .from('results')
      .select('result')
      .eq('league', league)
      .then(response => {
         // // console.log(response.body[0].result);
         // console.log(state.predicted[0].predictions);
         // let correct = 0;
         // let wrong = 0;
         let correctList = []
         // for (let i = 0; i < response.body[0].result.length; i++) {

         //    if (state.predicted[0].predictions[i].selected == response.body[0].result[i].correct) {
         //       console.log(state.predicted[0].predictions[i].id + " ----- correct");
         //       correct = correct +1
         //    } else {
         //       console.log(state.predicted[0].predictions[i].id + " ----- wrong");
         //       wrong = wrong + 1
         //    }
            
         // }
         // console.log("correct == "+ correct);
         // console.log("wrong == "+ wrong); 

         console.log(state)
        if (state.predicted.length > 0) {
            for (let ii = 0; ii < state.predicted.length; ii++) {
              if(response.body.length > 0){
                for (let i = 0; i < response.body[0].result.length; i++) {

                    if (state.predicted[ii].predictions[ii].selected == response.body[0].result[i].correct) {
                      // console.log(state.predicted[ii].predictions[i].id + " ----- correct == " + state.predicted[ii].user);
                      let obj = {
                          user: state.predicted[ii].user,
                          match: state.predicted[ii].predictions[i].id,
                          status: 'CORRECT'
                      }
                      correctList.push(obj)
                          
                    } else {
                      // console.log(state.predicted[ii].predictions[i].id + " ----- wrong == " + state.predicted[ii].user);
                      let obj = {
                          user: state.predicted[ii].user,
                          match: state.predicted[ii].predictions[i].id,
                          status: 'WRONG'
                      }
                      correctList.push(obj)
                    }
                      
                }
                let result = correctList
                setStates({ ...compState, result: result, league })
              }
              
          }
        } else {
          console.log("No predictions yet")
         }
        
        console.log(compState)
      })
   }
 

    const dd = () => {
    const league_id = "regregwt34tds"
      let newLeague_matches = mtchData.filter(e => e.id === league_id)
      console.log(newLeague_matches)
      return newLeague_matches[0].matches.map(mt => { 
          return (
            <div>
            &nbsp;&nbsp; <button id={1} onClick={(e) => { refreshState(mt.id, e.target.id, league_id) }}>{mt.home} </button> &nbsp;&nbsp;
            <button id={0} onClick={(e) => { refreshState(mt.id, e.target.id, league_id) }}>Draw</button> &nbsp;&nbsp;
            <button id={2} onClick={(e)=>{refreshState(mt.id, e.target.id, league_id)}}>{mt.away}</button> <br /><br /></div>
          )
      })
    }

  return state.loggedIn === false ? (
   <div>
      <Redirect to="/login" />  
   </div>
    
  ):
  (
      <div> 
         {compState.loader && <div className="loader">  <LinearProgress /> </div>} 
         <Footer />
         <Header /> 
         
           {/* {console.log(state)} */}
           {console.log(compState)}
           
    
         <div id="body">
            <br />
            <Breadcrumbs aria-label="breadcrumb">
               <StyledBreadcrumb
               component="a"
               href="#"
               label="Home"
               icon={<HomeIcon fontSize="small" />}
               onClick={handleClick}
               />
               <StyledBreadcrumb component="a"  label="Categories" onClick={(e)=>{history.push("/")}}  />
               <StyledBreadcrumb component="a"  label={state.loggedInUser.user.username} onClick={(e)=>{history.push(`/account/${state.loggedInUser.user.username}`)}}  /> 
            </Breadcrumbs>

            <div>  
            
               <br />
                <div className='sectionLabels'><span>All matches</span></div>
               
               <div className="leagues_holder"> 
                  {predictions()} {/* load all matches */}  
                 </div> <br /><br />
                 
                 <button onClick={(e) => { compare() }}>Save ---------------------------------- change</button> <br /><br /><br /><br />
                 
                 {dd()}
                 <br />
                 <button onClick={(e) => { save() }}>Save change vvc</button>
                 
                 <br /><br /><br /><br /><br />  

            </div>
         </div>
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
     disp_result: (result) => dispatch(testResult(result)), 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)