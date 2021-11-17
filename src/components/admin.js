import React, {useState} from 'react'
import { Redirect,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import  "../static/css/home/index.css"
import Footer from "./includes/mobile_footer.js"
import Header from "./includes/mobile_header.js" 
import Desktopleft from "./admin/includes/desktopleft"
import Desktopright from "./admin/includes/desktopright"
import Jackpot from "./admin/includes/jackpots"


import { supabase } from '../configurations';   

import { Link } from "react-router-dom";  
import {WhoLoggedIn} from "./admin/controllers/session" 
import {LinearProgress } from '@material-ui/core'; 
import {logOut,allMatches,stage_match,seePredicted} from '../redux'  

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





 
function Home({ appState,logout,disp_allMatches, disp_stage_match,disp_league_state,disp_predicted}) {
  let history = useHistory();
  const state = appState
  const new_supabase = supabase()

  
  

  React.useEffect((compState) => {  
    window.scrollTo(0, 0);
    let userId = "";
    let userRole = state.loggedInUser.user.role
    if (state.loggedIn === true) {
      userId =  state.loggedInUser.user.id
    } else {
      userId = ""
    }
    new_supabase
    .from('user')
    .select('id')
    .eq('id', state.loggedInUser.user.id)
    .then(response => {
      if (response.body.length < 1) {
        logout()
      }
    })
    .catch(error => {
      
    })
     
    setStates({ ...compState, loader: true})
    setTimeout(() => setStates({ ...compState, loader: false }), 500);
    // disp_allMatches(mtchData)

    WhoLoggedIn(userRole,logout)
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
  

   // toasts
   const successToast = (message) => { 
      toast.success(message, {
         position: toast.POSITION.TOP_CENTER,
        //  onClose: () => {history.push(`/board/${league}/${amount}`)}
      });
   }
   const errorToast = (message) => { 
      toast.error(message, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
   }
  
  const infoToast = (message) => { 
      toast.warning(message, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
   }
  
  

  
  const [compState, setStates] = useState('')
  
  const [homeClub, setHomeClub] = useState('')
  const [awayClub, setAwayClub] = useState('')
  const [KFDate, setKFDate] = useState('')
  const [KFHH, setKFHH] = useState('')
  const [KFMM, setKFMM] = useState('')

  const [KFDate_early, setKFDate_early] = useState('')
  const [KFHH_early, setKFHH_early] = useState('')
  const [KFMM_early, setKFMM_early] = useState('')

  // const [AM, setAM] = useState('')


  // ADDING CATEGORIES
  const [category, setCategory] = useState('')
  



  //   STAGGING MATCH
  let matchArray = []
  const stageMatch = (e) => {
    e.preventDefault()
    

    if (!KFHH || !KFMM || !homeClub || !awayClub || !KFDate) {
      errorToast("FIll out all forms");
    }else if (homeClub == "Add Home club") {
      errorToast("Add home club");
    } else if (awayClub == "Add Away club") {
      errorToast("Add away club");
    } else if (KFHH == "HH") {
      errorToast("Enter kick-off hour");
    } else if (KFMM == "MM") {
      errorToast("Enter kick-off minute");
    }
    else {

      // generate code 
      String.prototype.shuffle = function () {
        var a = this.split(""),
            n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
      }
      const radm = "theqbroyhyhyhwnfoxjumpsotyhyhyhthuickbrownfoxyhyhyjuhhythmpsobrownfoxjumpsovyhthyerthebjghjghfgjklrowtyhytnfoxjumpsolafgfhtyhzydog".shuffle()
      const radm2 = radm.shuffle();

      let radm3 = radm2.substring(3, 50).shuffle();
      const radm4 = radm3.shuffle().substring(3, 30).shuffle();

      const radm5 = radm4.shuffle().substring(3, 20).shuffle();

      const radm6 = radm5.shuffle().substring(4, 11).shuffle();
      const challengeCode = radm6.toUpperCase().shuffle()
      

      let matchData = {
        id:challengeCode,
        home:homeClub,
        away:awayClub,  
        date:KFDate,
        time:KFHH+":"+KFMM,
      }

      state.stagged.push(matchData)
      disp_stage_match(state.stagged)
      successToast("Match staged");

      // console.log(matchArray)
      // document.getElementById("matchform").reset();
    }
  }


  //  show stagged modals
  const previewStaged = () => {
    setStates({...compState, addMatchForm:false})
    console.log(state.stagged)
  }

  
  // close preview modal
  const closePreviewStaged = () => {
    setStates({ ...compState, addMatchForm: true })
    
  }

  
  // unstage all stagged matches
  const closePreviewStagedUnstage = () => {
    setStates({ ...compState, addMatchForm: true })
    disp_stage_match([])
  }

  
  // finally the admin have to save the matches 
  // in the database
  async function saveMatches() { 
    let general = {
      leageId: compState.leagueData.id,
      league: compState.leagueData.league,
      matches: state.stagged,
      kickedOff:false
    } 
    const data = {
      ...compState.leagueData,
      kickoff_date:KFDate_early+', '+KFHH_early+":"+KFMM_early,
      count: state.stagged.length,
      match: state.stagged, 
    }
    
    if (!KFHH_early || !KFMM_early || !KFDate_early) {
      errorToast("Enter kick-off date");
    } else if (KFHH_early == "HH") {
      errorToast("Enter kick-off Hour");
    } else if (KFMM_early == "MM") {
      errorToast("Enter kick-off minute");
    }
    else {
      if (data.match.length < 1) {
        errorToast("Please select a match")
      } else {
        setStates({ ...compState, loader: true})
        console.log(data)
        await new_supabase
        .from('matches')
        .select("*")
        .eq("league", data.id)
        .eq("status", "ACTIVE")
        .then(insert_response => {
          console.log(insert_response);
          if (insert_response.body.length > 0) {
            errorToast("This league seems to be active. De-activate and try again.");
            setStates({ ...compState, loader: false})
          } else {
            console.log(insert_response)
            new_supabase
            .from('matches')
            .insert([
              { league: data.id, status: "ACTIVE", matches: data},
            ]).then(insert_response => {
              new_supabase
              .from('all_matches')
              .select("*")
              .then(res => {
                

                if (res.body.length > 0) { 
                  res.body[0].matches.push(general) 
                  new_supabase
                  .from('all_matches')
                  .update({ matches: res.body[0].matches,status:"ACTIVE"})
                  .eq('league', 'LEAGUE')
                  .then(update_res=>{ 
                    successToast("Match addess successfully")
                    disp_league_state("ACTIVE")
                    disp_stage_match([])
                    setStates({ ...compState, loader: false,default: true, })
                  })
                } else {
                  
                  // INSERT TO ALL MATCHES MODEL
                  new_supabase
                  .from('all_matches')
                  .insert([
                    { matches: [general],league:"LEAGUE", status:"ACTIVE"},
                  ]).then(insert_response => { 
                    successToast("Match addess successfully")
                    disp_league_state("ACTIVE")
                    disp_stage_match([])
                    setStates({ ...compState, loader: false,default: true, })
                  })
                }
              })
            })
            .catch(error=>{
              errorToast("A network error occured.")
              setStates({ ...compState, loader: false})
            })
          }
          
        })
        .catch(error=>{
          errorToast("A network error occured.")
        })
      }
      // console.log(data )
    }
  }


  


  

  // save results
  async function save() {
    setStates({ ...compState,loader: true})
    let league = ""
    !compState.leagueData ? league = '' : league = compState.leagueData.id
    let matches = compState.adminResult


    //  TRYING TO deactivate the league matches....
    await new_supabase
    .from('all_matches')
    .select("*")
    .then(res => {  
      let leagueMatches = res.data[0].matches.filter(e => e.leageId == league)
      let leagueMatchesPosition = res.data[0].matches.findIndex(e => e.leageId == league) 
      let newLeagueMatch = { ...leagueMatches[0], kickedOff: true }
      res.data[0].matches.splice(leagueMatchesPosition,1,newLeagueMatch)
      console.log(res.data[0].matches)

      new_supabase
      .from('all_matches')
      .update({ matches:res.data[0].matches})
      .eq('league', 'LEAGUE').then(done => {
        




        new_supabase
        .from('results')
        .select('league') 
        .eq('league', league) 
        .then(response => { 
          if (response.data.length == 0) {
            new_supabase
            .from('results')
            .insert([
                { league: league, result: matches, status:"ACTIVE"},
            ]).then(insert_response => {
              console.log(insert_response);
              successToast("Result added")
              setStates({ ...compState,loader: false, addResult:false,default:true}) 
            })
          } else {
            new_supabase
            .from('results')
            .update([
              {result: matches},
            ])
            .eq('league',league)
              .then(update_response => {
              setStates({ ...compState,loader: false,addResult:false,default:true}) 
              successToast("Result added")
            })
          }

          // == SET CATEGORY RESULTS
          new_supabase.from("category_results").select("*").eq("categoryId", compState.category_result.category_id).then(response2 => {
            if (response2.body.length < 1) {
              new_supabase.from("category_results").insert([{ categoryId: compState.category_result.category_id, result: compState.category_result.newPredicted,status:"ACTIVE", leagueId:league}]).then(inserted => {
                
                
                // declearing feed meta data
                const feed_meta = {status: "ACTIVE", league_id: league, category_id: compState.category_result.category_id,amount:response2.body[0].result[0].amount}
                new_supabase.from("feeds").insert([{type:"NEW RESULT", from: "ADMIN", to: "ALL", meta: feed_meta}]).then(insert_response => {
                  successToast("Result added")
                  setStates({...compState,loader: false, addResult:false,default:true}) 

                })

              }).catch(error => {
                errorToast() 

                
              })
            } else {
              new_supabase.from("category_results").update([{ result: compState.category_result.newPredicted }]).eq("categoryId", compState.category_result.category_id).then(updated => {
                
                
                // declearing feed meta data
                const feed_meta = {status: "ACTIVE", league_id: league, category_id: compState.category_result.category_id,amount:updated.body[0].result[0].amount}
                new_supabase.from("feeds").insert([{type:"NEW RESULT", from: "ADMIN", to: "ALL", meta: feed_meta}]).then(insert_response => {

                  successToast("Result added")
                  setStates({ ...compState, loader: false, addResult: false, default: true })
                })


              }).catch(error => {
                errorToast() 
              })
            }
          }).catch(error => {
            errorToast() 
          })

          // DEACTIVATE CATEGORY
            
        }).catch(error => { errorToast() }) 



          
      })
    }) 
     
   }

  


  









  // ====   activate or deactivate league matches
  const activate_deactivate = (category) => {
    setStates({ ...compState, addMatchModal: true, default: true, leagueData: category,loader: true})
    new_supabase
      .from('matches')
      .select("*")
      .eq("league", category.id)
      .eq("status", "ACTIVE")
      .then(response => {
        if (response.body.length > 0) {
          
          new_supabase
          .from('predictions')
          .select('*') 
          .eq('league', category.id) 
          .then(response2 => {
            console.log(response2.data)
              disp_predicted(response2.data) 
          })

          disp_league_state(response.body[0].status)
        } else { 
          disp_league_state("INACTIVE")
          disp_predicted([])
        }
        setStates({ ...compState, addMatchModal: true, default: true, leagueData: category,loader: false})
      })
    .catch(error=>{
      errorToast("A network error occured");
      setStates({ ...compState, addMatchModal: true, default: true, leagueData: category,loader: false})
    })
  }
  
  

  const reroute_breadcrumb = (link) => {
    history.push(`/${link}`)
  }
  
  

  // show loader when rerouting
  let reroute = (category)=>{
    setStates({ ...compState, addMatchModal: true, default: true, leagueData: category })
    
  } 


  const renderLeagues = ()=>{
    return leagues.map(category=>{
        return (
          <div  style={{background:category.bk}} onClick={() => { reroute(category); activate_deactivate(category)}}  class="leagues">
              <img alt={category.league} className='stakes' src={category.logo} /> 
              <div className="stakes_price">
                <b className='icon'>{category.league}</b> <br />
                <small className="matches_count">{category.matches}</small>
              </div>
          </div>
        )
    })
  }


  
  // ======   view all stagged matches
  const matchData = () => { 
    if (state.stagged.length > 0) {
        return state.stagged.map(matches=>{
          return (
              <div animateIn='fadeIn'>
                <div className="matches">
                  <div className="select_prediction_btn_holder2">
                      <button className='select_prediction_btn' id={1}>Home</button>
                      <button className='select_prediction_btn' id={0}>Draw</button>
                      <button className='select_prediction_btn' id={2}>Away</button> 
                      <div>
                        <span style={kickoff_date}> {matches.date} {matches.time} </span>
                      </div>
                  </div>
                  <div className="select_prediction_logo_holder">
                    {matches.home}
                      <span style={vs}> VS </span>
                      {matches.away}
                      <div>
                        
                      </div>
                  </div>
              </div> 
              </div>
          )
        }) 
    }
  }

  

  // =========== deactivate league
  const deactivateLeague = () => {
    setStates({ ...compState, addMatchModal: true, default: true, leagueData: compState.leagueData,loader: true})
    let league = compState.leagueData.id
    new_supabase
    .from('matches')
    .update({ status: 'INACTIVE' })
    .eq('league', league)
    .then(response => {
      new_supabase
      .from('all_matches')
      .select("*")
      .then(res => {
        console.log(res.body[0].matches)
        let position = res.body[0].matches.findIndex(i => i.leagueId === league)
        res.body[0].matches.splice(position, 1)
        new_supabase
        .from('all_matches')
        .update({ matches: res.body[0].matches })
        .eq('league', 'LEAGUE')
        .then(update_res => {
           new_supabase
            .from('results')
            .update([
              {status: "INACTIVE"},
            ])
            .eq('league',league)
            .then(update_response => {
              new_supabase.from("categories").update([{ status: "INACTIVE" }]).eq("league_id", league).then(res => {
                disp_league_state("INACTIVE")
                successToast("League deactivated.")
                setStates({ ...compState, addMatchModal: true, default: true, leagueData: compState.leagueData, loader: false })
              })
            })
          
        })
      })
 
    })
    .catch(error=>{
      setStates({ ...compState, addMatchModal: true, default: true, leagueData: compState.leagueData, loader: false })
      errorToast("A network error occured.")
    })
  }



 

  
  const minutes = () => {
    let mins = []
    for (let i = 1; i < 61; i++) {
      mins.push(i)
    }
    // console.log(mins);
    return mins.map(MM => {
      return (
        <option>{MM}</option>
      )
    })
  }

  

  let refreshState = (matchId, correct_score, leagueId) => {
    // let newLeague_matches = mtchData.filter(e => e.id === leagueId) 

    let new_matches = compState.adminResult.filter(e => e.matchid === matchId).length
    let position1 = compState.adminResult.findIndex(e => e.matchid === matchId)
    let newPredicted = []
    let setNewPredicted = ""
    if (state.predicted.length > 0) {
      state.predicted.map(predictions => {  
          let mtchs = predictions.predictions.filter(e => e.id === matchId)
          let position = predictions.predictions.findIndex(e => e.id === matchId) 
          console.log(mtchs)
          if (mtchs.length > 0) {
            if (mtchs[0].selected == correct_score) {
              mtchs[0] = {...mtchs[0], correct:true}
            } else {
              mtchs[0] = {...mtchs[0], correct:false}
            }
            predictions.predictions.splice(position, 1, mtchs[0])
            newPredicted.push(predictions)
          } 
        
      }) 
      setNewPredicted = {
        newPredicted,
        category_id :newPredicted[0].categoryId
      }
      
    }
    


    // ==================================================================


    if (new_matches > 0) {
        let ko = { matchid: matchId, correct: correct_score }
        compState.adminResult.splice(position1, 1, ko)
      //  setStates({ ...compState, result: compState.adminResult })
        
    } else {
        let ko = { matchid: matchId, correct: correct_score } 
        compState.adminResult.push(ko)
      //  setStates({ ...compState, result:compState.adminResult })
    }
    setStates({ ...compState, league:leagueId,result:compState.adminResult }) 
    
    console.log(compState.adminResult)


    let selected_id = correct_score;
      let position = compState.matchesForResult.findIndex(i => i.id === matchId)
      console.log(position);
      
      if (compState.matchesForResult[position].selected === selected_id) {
         
         let modifiedPicked = { 
            ...compState.matchesForResult[position],
            selected:null
         }
    //     compState.matchesForResult.splice(position, 1, modifiedPicked)  
    setStates({ ...compState, matchesForResult:compState.matchesForResult}) 

      }
      else{

          let modifiedPicked = { 
              ...compState.matchesForResult[position],
              selected:selected_id,
          }  
          
      compState.matchesForResult.splice(position, 1, modifiedPicked)  
      setStates({ ...compState, matchesForResult:compState.matchesForResult})
      
        
      setStates({ ...compState, category_result:setNewPredicted})
      
      
    }  
  }
  



  

  const settResult = () => {
    setStates({ ...compState, loader: true}) 
    let league = ''
    !compState.leagueData ? league = '' : league = compState.leagueData.id
    new_supabase
    .from('matches')
    .select("*")
    .eq("league", league)
    .eq("status", "ACTIVE")
    .then(response => {
      console.log(response.body[0].matches.match)
      setStates({ ...compState,  addMatch: false,addMatchForm:false, default: false, loader: false, addResult: true,matchesForResult:response.body[0].matches.match,adminResult:[]}) 
      
    })
    .catch(error => {
      errorToast("A network error occured")
      setStates({ ...compState, loader: false}) 
    }) 
  }

  

  
  // ====================== all the matches that will be updated with their results
  const allMatchesToFixResult = () => {
    let league = ''
    !compState.leagueData ? league = '' : league = compState.leagueData.id
    return compState.matchesForResult.map(mt => { 
      return (
        // <div>
        // &nbsp;&nbsp; <button id={1} onClick={(e) => { refreshState(mt.id, e.target.id, league) }}>{mt.home} </button> &nbsp;&nbsp;
        // <button id={0} onClick={(e) => { refreshState(mt.id, e.target.id, league) }}>Draw</button> &nbsp;&nbsp;
        // <button id={2} onClick={(e)=>{refreshState(mt.id, e.target.id, league)}}>{mt.away}</button> <br /><br /></div>
        <div animateIn='fadeIn'>
          <div className="matches">
          <div className="select_prediction_btn_holder2">
              <button className={mt.selected == 1  ? 'active' : 'select_prediction_btn'} id={1} onClick={(e)=>{ refreshState(mt.id, e.target.id, league) }} >Home</button>
              <button className={mt.selected == 0  ? 'active' : 'select_prediction_btn'} id={0} onClick={(e)=>{ refreshState(mt.id, e.target.id, league) }}>Draw</button>
              <button className={mt.selected == 2  ? 'active' : 'select_prediction_btn'} id={2} onClick={(e)=>{ refreshState(mt.id, e.target.id, league) }}>Away</button> 
              <div>
                <span style={kickoff_date}> 2022-01-31 08:53 </span>
              </div>
          </div>
          <div className="select_prediction_logo_holder">
              <b>{mt.home}</b>
              <span style={vs}> VS </span>
              <b>{mt.away}</b>
              <div>
                
              </div>
          </div>
        </div> 
        </div>
      )
    })
  }


    //  CLUBES
  const clubs = [
    {
      league: "PL",
      club:"Chelsea FC"
    },
    {
      league: "PL",
      club:"Man United"
    },
    {
      league: "PL",
      club:"Liverpool"
    },
    {
      league: "PL",
      club:"Everton"
    },
    {
      league: "PL",
      club:"Man City"
    },
    {
      league: "PL",
      club:"Arsenal"
    },
    {
      league: "PL",
      club:"Leicester"
    },
    {
      league: "PL",
      club:"Newcastle"
    },
    {
      league: "PL",
      club:"Southampton"
    },
    {
      league: "PL",
      club:"Crystal Pal"
    },
    {
      league: "PL",
      club:"Brighton"
    },
    {
      league: "PL",
      club:"Tottenham"
    },
    {
      league: "PL",
      club:"West Ham"
    },
    {
      league: "PL",
      club:"Brentford"
    },
    {
      league: "PL",
      club:"Aston Villa"
    },
    {
      league: "PL",
      club:"Wotford"
    },
    {
      league: "PL",
      club:"Burnley"
    },
    {
      league: "PL",
      club:"Norwich"
    },
    {
      league: "PL",
      club:"Leeds"
    },
    {
      league: "PL",
      club:"Wolves"
    },


    //   LALIGA
    {
      league: "LALIGA",
      club:"Real Madrid"
    },
    {
      league: "LALIGA",
      club:"Valencia"
    },
    {
      league: "LALIGA",
      club:"Atletico"
    },
    {
      league: "LALIGA",
      club:"Real Sociedad"
    },
    {
      league: "LALIGA",
      club:"Athletic Club"
    },
    {
      league: "LALIGA",
      club:"Sevilla"
    },
    {
      league: "LALIGA",
      club:"Barcelona"
    },
    {
      league: "LALIGA",
      club:"Mallorca"
    },
    {
      league: "LALIGA",
      club:"Real Betis"
    },
    {
      league: "LALIGA",
      club:"Eiche"
    },
    {
      league: "LALIGA",
      club:"Osasuna"
    },
    {
      league: "LALIGA",
      club:"Roya Vallecano"
    },
    {
      league: "LALIGA",
      club:"Villarreal"
    },
    {
      league: "LALIGA",
      club:"Lavente"
    },
    {
      league: "LALIGA",
      club:"Espanyol"
    },
    {
      league: "LALIGA",
      club:"Cadiz"
    },
    {
      league: "LALIGA",
      club:"Granada"
    },
    {
      league: "LALIGA",
      club:"Celta Vigo"
    },
    {
      league: "LALIGA",
      club:"Getafe"
    },
    {
      league: "LALIGA",
      club:"Aleves"
    },

    // BUNDESLIGA
    {
      league: "BUND",
      club:"Wolfsburg"
    },
    {
      league: "BUND",
      club:"Bayem"
    },
    {
      league: "BUND",
      club:"Dortmund"
    },
    {
      league: "BUND",
      club:"Mainz"
    },
    {
      league: "BUND",
      club:"SC Freiburg"
    },
    {
      league: "BUND",
      club:"Leverkusen"
    },
    {
      league: "BUND",
      club:"Koln"
    },
    {
      league: "BUND",
      club:"Union Berlin"
    },
    {
      league: "BUND",
      club:"Hoffenheim"
    },
    {
      league: "BUND",
      club:"VFB Stuttgart"
    },
    {
      league: "BUND",
      club:"Monchendlas.."
    },
    {
      league: "BUND",
      club:"RB Leipzig"
    },
    {
      league: "BUND",
      club:"VFL Bochum"
    },
    {
      league: "BUND",
      club:"Arminia"
    },
    {
      league: "BUND",
      club:"Eintracht Fran..."
    },
    {
      league: "BUND",
      club:"Hertha"
    },
    {
      league: "BUND",
      club:"Augsburg"
    },
    {
      league: "BUND",
      club:"Furth"
    },
    {
      league: "BUND",
      club:"RB Salzburg"
    },

    // LIGUE  1
    {
      league: "LEAG1",
      club:"PSG"
    },
    {
      league: "LEAG1",
      club:"Angers"
    },
    {
      league: "LEAG1",
      club:"Lille OSC"
    },
    {
      league: "LEAG1",
      club:"Marseille"
    },
    {
      league: "LEAG1",
      club:"Nice"
    },
    {
      league: "LEAG1",
      club:"Lens"
    },
    {
      league: "LEAG1",
      club:"Clermont Foot"
    },
    {
      league: "LEAG1",
      club:"Lyon"
    },
    {
      league: "LEAG1",
      club:"Lorient"
    },
    {
      league: "LEAG1",
      club:"Montpellier"
    },
    {
      league: "LEAG1",
      club:"Reims"
    },
    {
      league: "LEAG1",
      club:"Rennes"
    },
    {
      league: "LEAG1",
      club:"Lille"
    },
    {
      league: "LEAG1",
      club:"Troyes"
    },
    {
      league: "LEAG1",
      club:"Nantes"
    },
    {
      league: "LEAG1",
      club:"Strasbourg"
    },
    {
      league: "LEAG1",
      club:"Monaco"
    },
    {
      league: "LEAG1",
      club:"Brest"
    },
    {
      league: "LEAG1",
      club:"Metz"
    },
    {
      league: "LEAG1",
      club:"St-Etienne"
    },
    {
      league: "LEAG1",
      club:"Bordeaux"
    },

    //  PORTUGUES
    {
      league: "PORT",
      club:"Benfica"
    },
    {
      league: "PORT",
      club:"Estoril Praia"
    },
    {
      league: "PORT",
      club:"Sporting"
    },
    {
      league: "PORT",
      club:"Porto"
    },
    {
      league: "PORT",
      club:"Boavista"
    },
    {
      league: "PORT",
      club:"Braga"
    },
    {
      league: "PORT",
      club:"Gil Vicente"
    },
    {
      league: "PORT",
      club:"Pacos Ferreira"
    },
    {
      league: "PORT",
      club:"Portimonense"
    },
    {
      league: "PORT",
      club:"Vitoria SC"
    },
    {
      league: "PORT",
      club:"Maritimo"
    },
    {
      league: "PORT",
      club:"Vizela"
    },
    {
      league: "PORT",
      club:"Arouca"
    },
    {
      league: "PORT",
      club:"Santa Clara"
    },
    {
      league: "PORT",
      club:"Moreirense"
    },
    {
      league: "PORT",
      club:"Tondela"
    },
    {
      league: "PORT",
      club:"Famalicao"
    },
    {
      league: "PORT",
      club:"B-SAD"
    },

    // SERIE A
    {
      league: "SERIE",
      club:"Roma"
    },
    {
      league: "SERIE",
      club:"Milan"
    },
    {
      league: "SERIE",
      club:"Napoli"
    },
    {
      league: "SERIE",
      club:"Inter Milan"
    },
    {
      league: "SERIE",
      club:"Udinese"
    },
    {
      league: "SERIE",
      club:"Bologna"
    },
    {
      league: "SERIE",
      club:"Lazio"
    },
    {
      league: "SERIE",
      club:"Fiorentina"
    },
    {
      league: "SERIE",
      club:"Sassuolo"
    },
    {
      league: "SERIE",
      club:"Atlanta"
    },
    {
      league: "SERIE",
      club:"Torino"
    },
    {
      league: "SERIE",
      club:"Empoli"
    },
    {
      league: "SERIE",
      club:"Genoa"
    },
    {
      league: "SERIE",
      club:"Venezia"
    },
    {
      league: "SERIE",
      club:"Sampdoria"
    },
    {
      league: "SERIE",
      club:"Juventus"
    },
    {
      league: "SERIE",
      club:"Cagliari"
    },
    {
      league: "SERIE",
      club:"Spezia"
    },
    {
      league: "SERIE",
      club:"Verona"
    },
    {
      league: "SERIE",
      club:"Salernitana"
    },


    // moldovan national division
    {
      league: "MODOVAN",
      club:"FC Sheriff"
    },

    // ukrain
    {
      league: "UKR",
      club:"Shakhtar"
    },
    {
      league: "UKR",
      club:"FC Dynamo"
    },

    // RUSSIA
    {
      league: "RUSS",
      club:"FC Zenit"
    },


    // Alsven
    {
      league: "ALVENS",
      club:"Malmo FF"
    },



    {
      league: "LEBELGIANAG1",
      club:"Club Brugg"
    },

    // turkey
    {
      league: "TURKY",
      club:"Besiktas J.K"
    },
    {
      league: "SWIZZ",
      club:"Young Boys"
    },



    // ================  new added clubs
    {
      league: "NEW",
      club:"Queens Park"
    },
    {
      league: "NEW",
      club:"Nottingham Forest"
    },
    {
      league: "NEW",
      club:"Trabzonspor"
    },
    {
      league: "NEW",
      club:"Rizespor"
    },
    {
      league: "NEW",
      club:"Oostende"
    },
    {
      league: "NEW",
      club:"KV Mechelen"
    },
    {
      league: "NEW",
      club:"Las Palmas"
    },
    {
      league: "NEW",
      club:"Young Boys"
    },
    {
      league: "NEW",
      club:"Darmstadt"
    },
    {
      league: "NEW",
      club:"Nuernberg"
    },
    {
      league: "NEW",
      club:"FC Heidenheim"
    },
    {
      league: "NEW",
      club:"Schalke 04"
    },
    {
      league: "NEW",
      club:"De Graafschap"
    },
    {
      league: "NEW",
      club:"ADO Den Haag"
    },
    {
      league: "NEW",
      club:"Racing Club"
    },
    {
      league: "NEW",
      club:"Defensa y Justicia"
    },
    {
      league: "NEW",
      club:"Dinamo Moscow"
    },
    {
      league: "NEW",
      club:"Dundalk"
    },
    {
      league: "NEW",
      club:"Waterford FC"
    },
    {
      league: "NEW",
      club:"JS Kabylie"
    },
    {
      league: "NEW",
      club:"ES Setif"
    },
    {
      league: "NEW",
      club:"NC Magra"
    },
    {
      league: "NEW",
      club:"MC Alger"
    },
    
    
  ]


  //  RETURN MATCHES FOR A PARTICULAR LEAGUE
  const matches = (leagueCode, clubs) => {
    let code = leagueCode;
    let leagueMatch = ""
    console.log(leagueCode)
    if (code !== 'CHAMP') {
      leagueMatch = clubs.filter(e => e.league == leagueCode)
    } else {
      leagueMatch = clubs
    }
    return clubs.map(matches => {
      return (<option>{matches.club}</option>)
    })
  }


  
  //   ADD CATEGORY....
  let addCategory = (e) => {
    e.preventDefault()
    // generate code 
    String.prototype.shuffle = function () {
      var a = this.split(""),
        n = a.length;
      for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
      }
      return a.join("");
    }
    const radm = "theqbroyhyhyhwnfoxjumpsotyhyhyhthuickbrownfoxyhyhyjuhhythmpewdewdewfthrgbwveqfesobrownfoxjumpsovyhthyerthebjghjghfgjklrowtyhytnfoxjumpsolafgfhtyhzydog".shuffle()
    const radm2 = radm.shuffle();
    let radm3 = radm2.substring(3, 50).shuffle();
    const radm4 = radm3.shuffle().substring(3, 30).shuffle();
    const radm5 = radm4.shuffle().substring(3, 20).shuffle();
    const radm6 = radm5.shuffle().substring(4, 12).shuffle();
    const code = radm6.toUpperCase().shuffle()
    

    let league = compState.leagueData.league;
    let leagueId = compState.leagueData.id;
    let amount = category;
    let data = ""
    if (!amount || amount.length < 1) {
       return errorToast("Missing parameter")
    } else {
      setStates({...compState, loader:true})
        data = [{ price: amount,league,stake: 0, id: code,leagueId,status:"ACTIVE",cashedout:"NO"}
      ];
      new_supabase.from("categories").select("*").eq("league_id", leagueId).eq("status", "ACTIVE").then(response => {
        if (response.body.length < 1) {
          new_supabase.from("categories").insert([{ amount, status: "ACTIVE", league_id: leagueId, data, category_id: code,cashedout:"NO" }]).then(insert_response => {           
            const feed_meta = { amount, status: "ACTIVE", league_id: leagueId, data, category_id: code, cashedout: "NO" }
            new_supabase.from("feeds").insert([{type:"NEW CATEGORY", from: "ADMIN", to: "ALL", meta: feed_meta}]).then(insert_response => {
              console.log(insert_response)
              successToast("Category added")
              setStates({...compState, loader:false})

            })
          }).catch(error => {
            errorToast("A network error occured")
            setStates({...compState, loader:false})
          })
        } else {
          if (response.body[0].amount == amount) {      // TO AVOID DUPLICATE AMOUNT
            infoToast("This amount already exists")
            setStates({...compState, loader:false})
          } else {
            let newData = {...data[0]}
            response.body[0].data.push(newData) 
            new_supabase.from("categories").update([{ data: response.body[0].data }]).eq("league_id", leagueId).eq("status", "ACTIVE").then(update_response => {
              
              new_supabase.from("categories").update([{amount}]).eq("league_id", leagueId).eq("status", "ACTIVE").then(update_response2 => {


                // declearing feed meta data
                const feed_meta = { amount, status: "ACTIVE", league_id: leagueId, data, category_id: code, cashedout: "NO" }
                new_supabase.from("feeds").insert([{type:"NEW CATEGORY", from: "ADMIN", to: "ALL", meta: feed_meta}]).then(insert_response => {
                  successToast("Category added")
                  setStates({...compState, loader:false})

                })


              }).catch(error => {
                errorToast("A network error occured")
                setStates({...compState, loader:false})
              })
              

            }).catch(error => {
              errorToast("A network error occured")
              setStates({...compState, loader:false})
            })
          }
        } 
      }).catch(error => {
        errorToast("A network error occured")
        setStates({...compState, loader:false})
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
        {console.log(compState)}
        {console.log(state)}
      <div className="mobile"> 
        {compState.loader && <div className="loader">  <LinearProgress /> </div>} 
        <div className="header_footer">
          <Footer  />
          <Header />
        </div>  
    <div>  
    <div>    
      {/* <div className="explore desktop">
        <span>Explore</span>
        <span className="logout" onClick={()=>{logout()}}>Logout</span>
      </div> <br /> */}
      {/* <Toppills /><br /> */}
      <div className='explore'>
        <span>All League</span>
      </div>
      <div animateIn='fadeIn'>
        <div className="leagues_holder">
          {renderLeagues()} 
        </div>
      </div> 
      </div><br /> <br /> 
      
       <Jackpot /> <br /> <br />
    </div> 
  </div>  
  <Desktopleft /> 
  <Desktopright />
  
  
  {/* league add match modal */}

  {compState.addMatchModal === true ? 
    <div className="leagueModal">
    <div className="leaguemodal1">
      <span className="leaguemodalClose" onClick={()=>{ 
        disp_stage_match([])
        setStates({ ...compState, addMatchModal: false,default:false, addMatch: false,seePredictions: false,addResult: false,addCategory:false}) }}>Close</span> <br /> <br />
      <div className="leagueModalHeader"><b>Premier League</b></div>
      
      <div  className="actionHolder">
        
        
        <Link className={compState.default == true ? "breadcrumb_pill actionBtn actionBtn_active":"breadcrumb_pill actionBtn "} id=""  onClick={()=>{
          setStates({ ...compState,default:false, addMatch: false,seePredictions: false,addResult: false,addCategory:false,default:true}) 
          }}> Overview
        </Link> 
        
        
        <Link className={compState.addMatch == true ? "breadcrumb_pill actionBtn actionBtn_active":"breadcrumb_pill actionBtn "} id=""  onClick={()=>{
          setStates({ ...compState,default:false, addMatch: true,addMatchForm:true,seePredictions: false,addResult: false,addCategory:false}) 
          }}> Add Matches
        </Link>
        
        <Link className={compState.addResult == true ? "breadcrumb_pill actionBtn actionBtn_active":"breadcrumb_pill actionBtn "} id="oneXone"  onClick={()=>{
        setStates({ ...compState,default:false, addMatch: false,addMatchForm:false,seePredictions: true,addResult: false,addCategory:false,addResult: true}); settResult() }}>  Add Results</Link>
          
          
        <Link className={compState.seePredictions == true ? "breadcrumb_pill actionBtn actionBtn_active":"breadcrumb_pill actionBtn "} id="jackpots"  onClick={()=>{
          setStates({ ...compState,default:false, addMatch: false,seePredictions: true,addResult: false,addCategory:false}) }}> See Predictions</Link> 
          
          
        <Link className={compState.addCategory == true ? "breadcrumb_pill actionBtn actionBtn_active":"breadcrumb_pill actionBtn "} id="jackpots"  onClick={()=>{ 
          setStates({ ...compState,default:false, addMatch: false,seePredictions: false,addResult: false,addCategory:true}) }}>Add category</Link> 
          
          
           {/* {state.league_status == 'ACTIVE' ? <Link className="breadcrumb_pill actionBtn deactivate" id="" onClick={()=>{
             deactivateLeague()
           }} >DEACTIVE LEAGUES</Link> :''} */}
          
          
      </div>
      
      
              
     
        {compState.default === true && <div className="leagueModalDefault">
        <div className="leagueModalActiveMatches">13 Active matches</div>
        <div className="leagueModalNoOfPredictions">9 Predictions</div>
        <div className="leagueModalNoOfCategories">53 Category(s)</div> <ToastContainer autoClose={2000}/> </div>}
        
              
              {/*  creating matches */}
        {compState.addMatch === true && <div className="leagueModalDefault">
          {compState.addMatchForm == true ? 
          <form className="addMatchForm" id="matchform">
            <small>Home and Away clubes</small> <br /><br />
            <select className="homeClub" onChange={(e) => { setHomeClub(e.target.value)  }} value={homeClub}>
              <option>Add Home club</option>
             {matches(compState.leagueData.code, clubs)}
            </select>
            <select className="awayClub" onChange={(e) => { setAwayClub(e.target.value)  }} value={awayClub}>
              <option>Add away club</option>
              {matches(compState.leagueData.code, clubs)}
            </select> <br />
            
            
            <ToastContainer autoClose={2000}/>
            
            
            <br /><small>Kick-off</small> <br />
            <input type="date" className="kickoffDateMain" onChange={(e) => { setKFDate(e.target.value)  }} value={KFDate}/>
            
            <select className="awayClub" className="kickoffDate" onChange={(e) => { setKFHH(e.target.value)  }} value={KFHH}>
              <option>HH</option>  
                <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
                <option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>
                <option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option>
                <option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>00</option>
            </select>
            <select className="awayClub" className="kickoffDate" onChange={(e) => { setKFMM(e.target.value)  }} value={KFMM}>
              <option>MM</option>
              {minutes()} 
            </select> 
            
            {/* <select className="awayClub" className="kickoffDate" onChange={(e) => { setAM(e.target.value)  }} vlaue={AM}>
              <option>AM</option>
              <option>PM</option> 
            </select> */}
            <br /><br /> 
            <input type="submit" value="Stage Match" className="stageMatchBtn" onClick={(e)=>{stageMatch(e)}} />
          </form> :
           
          
          // ================   preview stagged matches
          <div>
            
            {matchData()}
          </div>
          }
                



          
          {compState.addMatchForm == true ?
            <div>
              <br /><br /> <br />
              <div><b>{state.stagged.length} matche(s) staged</b> <input type="button" value="Preview them" className="previewMatches" onClick={()=>{previewStaged()}} /> </div>
            </div>
            
            :
            
            <div>
              <br /><br /> <br />
              <div><b>{state.stagged.length} matche(s) staged</b><br /><br />
                <input type="button" value="Close preview" className="closePreview"  onClick={()=>{closePreviewStaged()}} />&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button" value="Un-stage matches" className="closePreviewBack"  onClick={()=>{closePreviewStagedUnstage()}} />
                <ToastContainer autoClose={5000}/>
                
                {/* add early kick-off and save match */}
                <div className="earlyKickoff_holder"> <br / ><br /><br />
                  <span>Enter early kick-off time and continue..</span><br />
                  <input type="date" className="early_kickoff" onChange={(e) => { setKFDate_early(e.target.value)  }} value={KFDate_early}/>
                  <select className="awayClub" className="early_kickoff" onChange={(e) => { setKFHH_early(e.target.value)  }} value={KFHH_early}>
                    <option>HH</option> 
                     <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
                      <option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>
                      <option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option>
                      <option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>00</option> 
                  </select>
                  <select className="awayClub" className="early_kickoff" onChange={(e) => { setKFMM_early(e.target.value)  }} value={KFMM_early}>
                    <option>MM</option>
                    {minutes()} 
                  </select>
                  <input type="button" value="Add Matches" onClick={()=>{saveMatches()}} className="Matches"  /><br /><br /><br />
                </div>
                
                
              </div>
            </div>
          }
          
        </div>}
        
        {/* ==============================================================================================Add result */}
        {compState.addResult === true && <div className="leagueModalDefault">{allMatchesToFixResult()} <br />
        <ToastContainer autoClose={2000}/>
         <button className="active" onClick={(e) => { save() }}>Upload Result</button><br /><br />
       </div>}
        
              



        {/*   FORM FOR CREATING CATEGORIES.......... */}
        {compState.addCategory === true && <div className="leagueModalDefault">
          
          <form className="addMatchForm" id="matchform">
            <ToastContainer autoClose={2000}/>
            <small>Home and Away clubes</small> <br /><br />
            <input className="homeClub" onChange={(e) => { setCategory(e.target.value)  }} value={category} placeholder="Enter category amount" />
            <input value={compState.leagueData.league} className="awayClub" /><br /> 
            <br /><br /> 
            <input type="submit" value="Add category" className="stageMatchBtn" onClick={(e)=>{addCategory(e)}} />
          </form>
          
          
        </div>}
        
              
 
        
        {compState.seePredictions === true && <div className="leagueModalDefault">See predictions </div>}
        
        
       
        
              
    </div>
  </div> : 
  ""}      
        
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
    // disp_league_state: (status) => dispatch(league_status(status)),
    disp_predicted: (predicted) => dispatch(seePredicted(predicted)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)