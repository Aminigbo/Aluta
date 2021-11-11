import React, {useState} from 'react'

import {pickMatch,allMatches,seePredicted,add_wallet,logOut,match_refresh} from '../redux'

import { Redirect,useParams,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"

import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js"
// import Adsbanner from "./includes/adsbanner"
import Desktopleft from "./includes/desktopleft"
import Desktopright from "./includes/desktopright" 

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


function Matches({ appState, disp_pickedMatches, disp_allMatches,disp_predicted,walletAdd,logout,refresh_matches }) {
    // initialize supabase
   const new_supabase = supabase()
   const state = appState 
   const user = state.loggedInUser.user.id;
   const username = state.loggedInUser.user.username;
   // console.log(state);

   let history = useHistory();
   const { league, amount,categoryId } = useParams()
   


   React.useEffect(() => {  
      window.scrollTo(0, 0); 
      setStates({ ...compState, loader: true }) 
     
      return new_supabase
      .from('predictions')
      .select('*')
      .eq('user', user)
      .eq('league', league)
      .eq('categoryId', categoryId)
      .then(response2 => {
         if (response2.data.length>0) {
            history.goBack()
         } else {
            new_supabase.from("category_results").select("*").eq("categoryId", categoryId).then(response2 => {
               console.log(response2)
               if (response2.body.length > 0) {
                  disp_predicted(response2.body[0].result)
                  history.push(`/board/${league}/${categoryId}/${amount}`)
               } else {
                  setTimeout(() => setStates({ ...compState, loader: null}), 500);
                  
               }
            })
         }
      })
      .catch(error=>{
         errorToast()
      })
   }, []);

   const reroute_breadcrumb = (link) => {
    history.push(`/${link}`)
  }

   const [compState, setStates] = useState({
      amount:500,
      selected_count: 0,
      selected_matches :[],
   })

   // show loader when rerouting
   // let reroute = ()=>{
   //    setStates({ ...compState, loader: true}) 
   // } 


   // toasts
   const successToast = () => { 
      toast.info("Prediction added successfully", {
         position: toast.POSITION.TOP_CENTER,
         onClose: () => {history.push(`/board/${league}/${categoryId}/${amount}`)}
      });
   }
   const errorToast = () => { 
      toast.error("A network error occured", {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
   }

   const lowWalletToast = (wallet) => { 
      toast.info("You have a low wallet balance of "+ wallet+".00 . Kindly topup your wallet", {
         position: toast.POSITION.TOP_CENTER,
         onClose: () => {history.push("/topup") },
         transition: Bounce 
      });
   }
   



   function handleClick(event) {
      event.preventDefault();
      setStates({ ...compState, loader: true })
      setTimeout(() => history.push("/"), 500);
      
   }
 
   let newLeague = state.allMatches.filter(e => e.id === league)
   let newLeague_position = state.allMatches[0].matches.match.findIndex(e => e.id === league)
   let picked_count = state.allMatches[0].matches.match.filter(e => e.selected != null).length
   let match_count = state.allMatches[0].matches.match.length
 
   
   let pickMatch = (match,e)=>{
      let selected_id = e.target.id;
      let position = state.allMatches[0].matches.match.findIndex(i => i.id === match.id)
      console.log(position);
      
      if (state.allMatches[0].matches.match[position].selected === selected_id) {
         
         let modifiedPicked = { 
            ...state.allMatches[0].matches.match[position],
            user: state.loggedInUser.user.id,
            username:state.loggedInUser.user.username,
            selected:null
         }
        state.allMatches[0].matches.match.splice(position, 1, modifiedPicked)  
         // state.allMatches[0].matches.match.splice(newLeague_position, 1, ...newLeague)
         // console.log(state.allMatches);

         const newMatches = [...state.allMatches]; 
         disp_allMatches(newMatches)

      }
      else{

         let modifiedPicked = { 
            ...state.allMatches[0].matches.match[position],
            user: state.loggedInUser.user.id,
            username:state.loggedInUser.user.username,
            selected:selected_id,
         }  
         
         state.allMatches[0].matches.match.splice(position, 1, modifiedPicked)  
         // state.allMatches[0].matches.match.splice(newLeague_position, 1, ...newLeague)
         // console.log(state.allMatches);

         const newMatches = [...state.allMatches]; 
         disp_allMatches(newMatches) 
         // console.log(newMatches); 
      }  
   }



   
   const matchData = () => { 
      if (state.allMatches[0].matches.match.length > 0) {
         return state.allMatches[0].matches.match.map(matches=>{
            return (
               <div animateIn='fadeIn'>
                  <div className="matches">
                  <div className="select_prediction_btn_holder2">
                     <button className={matches.selected == 1  ? 'active' : 'select_prediction_btn'} id={1} onClick={(e)=>{pickMatch(matches,e)}}>Home</button>
                     <button className={matches.selected == 0  ? 'active' : 'select_prediction_btn'} id={0} onClick={(e)=>{pickMatch(matches,e)}}>Draw</button>
                     <button className={matches.selected == 2  ? 'active' : 'select_prediction_btn'} id={2} onClick={(e)=>{pickMatch(matches,e)}}>Away</button> 
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



   const previewData = ()=>{
      return state.allMatches[0].matches.match.map(matches=>{
         return (
            <div className="matches">
               <div className="select_prediction_btn_holder2">
                  <button className={matches.selected == 1  ? 'active' : 'select_prediction_btn'} id={1} >Home</button>
                  <button className={matches.selected == 0  ? 'active' : 'select_prediction_btn'} id={0} >Draw</button>
                  <button className={matches.selected == 2  ? 'active' : 'select_prediction_btn'} id={2} >Away</button> 
                  <div>
                     <span  style={kickoff_date}> 2022-01-31 08:53 </span>
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
         )
      })
   }

   


   async function savePrediction() {
      let category = state.categories.filter(e => e.id == categoryId)
      let position = state.categories.findIndex(e => e.id == categoryId)
      let newStake = category[0].stake + 1
      let newCategory = { ...category[0], stake: newStake} 
      state.categories.splice(position, 1, newCategory) 

      

      setStates({ ...compState, loader: true }) 
      const date = new Date().toLocaleString()
      const prediction =state.allMatches[0].matches.match
      const wallet = state.wallet;
      const email = state.loggedInUser.user.email;
      if (parseInt(amount) > parseInt(wallet)) {
         setStates({ ...compState, loader: null}) 
         lowWalletToast(wallet)
         document.body.style.overflow = "auto"
      } else {
         let newWallet = wallet - amount
         console.log(newWallet);
         await new_supabase
         .from('user')
         .update({ wallet: newWallet })
         .eq('email', email)
         .then(update => {
            walletAdd(update.body[0].wallet)
         })
         await new_supabase
            .from('predictions')
            .insert([
               { user: user, league: league, amount: amount, predicted_at: date, predictions: prediction,username:username,categoryId:categoryId },
            ]).then(insert_response => {
               // setStates({ ...compState, loader: null }) 
               return new_supabase
               .from('predictions')
               .select('*') 
               .eq('league', league)
               .eq('amount', amount)
               .then(response => {
                  
                  new_supabase.from("categories").select("*").eq("league_id", league).eq("status", "ACTIVE").then(catFetch => {
                     let categoryToUpdate = catFetch.body[0].data.filter(e => e.id == categoryId)
                     let categoryToUpdateId = catFetch.body[0].data.findIndex(e => e.id == categoryId)
                     let newCategory = { ...categoryToUpdate[0], stake: categoryToUpdate[0].stake + 1 }
                     catFetch.body[0].data.splice(categoryToUpdateId, 1, newCategory)
                     
                     new_supabase.from("categories").update([{ data: catFetch.body[0].data }]).eq("league_id", league).eq("status", "ACTIVE").then(updatedCate => {
                        console.log(updatedCate)
                        if (updatedCate.body[0].data[0].stake > 6) {
                           let createNewCategory = {
                              ...updatedCate.body[0].data[0],
                              stake: 0,
                              id:updatedCate.body[0].id+new Date().getTime().toString()
                           }
                           updatedCate.body[0].data.push(createNewCategory)
                           new_supabase.from("categories").update([{ data:updatedCate.body[0].data}]).eq("league_id", league).eq("status", "ACTIVE").then(createdNewCategory => {
                              disp_predicted(response.data)
                              successToast()
                           })
                        } else {
                           disp_predicted(response.data)
                           successToast()
                        }
                     })
                     console.log(catFetch.body[0].data)
                  })
                  // new_supabase.from("categories").update([{ data: state.categories }]).eq("league_id", league).then(done => { 
                  //    if (response.body.length > 6) {
                  //       let categoryToReplace = done.data[0].data.filter(e => e.id == categoryId)[0]

                        // let newCategory = {
                        //    ...categoryToReplace,
                        //    stake: 0,
                        //    id:categoryToReplace.id+new Date().getTime()
                        // }
                  //       done.data[0].data.push(newCategory)
                  //       new_supabase.from("categories").update([{ data:done.data[0].data}]).eq("league_id", league).then(done => {
                  //          disp_predicted(response.data)
                  //          successToast()
                  //       })
                  //    } else {
                  //       disp_predicted(response.data)
                  //       successToast()
                  //    }
                     // disp_predicted(response.data)
                     // successToast()
                  // }) 
                  // disp_predicted(response.data)
                  // successToast() 
               })
            })
            .catch(error => { errorToast() }) 
         document.body.style.overflow = "auto" 
      }
   }

   


   // show preview div
   let preview = ()=>{
      document.body.style.overflow = "hidden"
      setStates({ ...compState,preview_selections:true})
   }


   // Hide preview div
   let hide_preview = ()=>{
      document.body.style.overflow = "auto"
      setStates({ ...compState,preview_selections:null})
   }

   // clear_picked
   let clear_picked =()=>{
      setStates({ ...compState, loader: true }) 
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
         setStates({ ...compState, loader: false }) 
      })
      .catch (error=> {
         setStates({ ...compState, loader: false })
         errorToast()
      })
      disp_pickedMatches(0)
      window.scrollTo(0, 0);
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
      

      <br />  
      <div>   
        
        {/* <Toppills />  */}
         
        <div animateIn='fadeIn'>
          <div className="leagues_holder">
             
            {compState.preview_selections && 
               <div className="previewHolder"> 
                  <div>
                     <div className="previewHolderChild">
                        <ToastContainer autoClose={2000}/>
                        {previewData()}
                     </div>
                     <div className="stakeBtnHolder">
                       {compState.loader != true ?
                       <div>
                           <button className='active preview_btn' onClick={(e)=>{savePrediction()}}>Predict</button>
                           <button className='active alert_btn' onClick={(e)=>{hide_preview()}}>Back</button>
                        </div> : <div style={loaderHolder}> <img  src={loaderImg} /></div>}
                        <div className="totalMatches_amount">
                           {state.allMatches[0].matches.match.length} matches <br />
                           <b><Naira>{parseInt(amount, 10)}</Naira></b> 
                        </div>
                     </div>
                  </div>  
               </div>
            }
            
                          

            <div id="body"> 
               <Breadcrumbs aria-label="breadcrumb">
                  <StyledBreadcrumb
                  component="a"
                  href="#"
                  label="Home"
                  icon={<HomeIcon fontSize="small" />}
                  onClick={handleClick}
                  />
                  <StyledBreadcrumb component="a"  label={"Back"} onClick={history.goBack}  />
                  {/* <StyledBreadcrumb component="a"  label={amount}  />  */}
               </Breadcrumbs>

               <div>  
               
                  <br />
                  {state.allMatches[0].matches.match.length > 0 &&  <div className='sectionLabels'><span>Select All matches</span></div>} 
                  
                  {compState.loader != true ?
                     <div className="leagues_holder">
                     
                        {matchData()} 
                        
                        {state.allMatches[0].matches.match.length > 0 ? 
                           <div className='preview_btn_holder'> {picked_count === match_count && <div>
                           <button className='active preview_btn' onClick={(e)=>{preview()}}>Preview</button>
                           </div>} {picked_count > 0 && <button className='active alert_btn' onClick={(e) => { clear_picked() }}>Clear</button>}
                           </div> : <div style={noMatch}>
                           <br /> <br /><br /><h5 className ="primary">There is no available match.</h5><br />
                           <Link to="/" className="links">See other leagues</Link><br /> 
                        </div>} 
                     </div> :
                     <div className="img_loader">  <br /><br /><br /><br /><br /><br /><br /> <img  src={loaderImg} /> <br /> <br /><br /><br /><br /><br /><br /><br /></div>
                  }


               </div>
            </div>               
          </div>
        </div> 
      <Pills />   
      </div> <br /> <br /> <br /> <br />   
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
      disp_pickedMatches: (picked_matches) => dispatch(pickMatch(picked_matches)),
      disp_allMatches: (all_matches) => dispatch(allMatches(all_matches)),
      disp_predicted: (predicted) => dispatch(seePredicted(predicted)),
      walletAdd: (wallet) => dispatch(add_wallet(wallet)),
     logout: () => dispatch(logOut()),
      
     refresh_matches: (refresh) => dispatch(match_refresh(refresh)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches)