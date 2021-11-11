import  "../../../static/css/home/index.css"
import React, {useState} from 'react'
import { connect } from 'react-redux'
import {disp_jackpots,stage_match} from '../../../redux'
// import Naira from 'react-naira'
import { Link,useHistory } from "react-router-dom";
// import {HomeOutlined,TrackChangesOutlined,HorizontalSplitOutlined,HowToVoteOutlined,SportsRugbyOutlined,SportsKabaddiOutlined,Person} from '@material-ui/icons';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { supabase } from '../../../configurations/index'; 
import jackpots from "../../jackpots";
const button = {
   border: "1px solid lightgray",
   borderRadius: "5px",
   padding: "3px 7px",
   backgroundColor: "orange",
   color:'white'
}


const formHolder = {
   position: "fixed",
   top: "0px",
   left: "0px",
   width: "100%",
   backgroundColor: "rgb(0,0,0,0.6)",
   zIndex: "9000",
   height: "100%",
   textAlign:"center"
}

const input = {
   width: "70%",
   padding: "15px",
   border: "0.5px solid lightgray",
   borderRadius: "5px",
   outline:"none"
   
}

const form = {
   backgroundColor: "black",
   padding:"10px",
   borderRadius: "6px",
   width: "40%",
   position: 'relative',
   left: "30%",
   height:"460px"
}

const submitBtn = {
   backgroundColor: "orange",
   color: "black",
   borderRadius: "5px",
   outline: 'none',
   border: "0.5px solid lightgray",
   padding: "7px 17px",
   margin:"10px"
}

const submitBtn2 = {
   backgroundColor: "crimson",
   color: "white",
   borderRadius: "5px",
   outline: 'none',
   border: "0.5px solid lightgray",
   padding: "7px 17px",
   margin:"10px"
}

const formHeader = {
   color:"white"
}

const modalClose = {
   position: "absolute",
   top: "0px",
   right: "10px",
   fontSize: "20px",
   color: "orange",
   cursor:"pointer"
}


const form2 = {
   backgroundColor: "black",
   padding:"20px",
   borderRadius: "6px",
   width: "44%",
   position: 'relative',
   left: "10%",
   maxHeight: "95%",
   color: "white",
   textAlign: "left",
   overflow:"auto"
}

const form2Holder = {
   // border: "1px solid white",
   padding: "10px",
   position:"relative"
}


const vs = {
   fontSize: "10px",
   color:"gray"
}
const kickoff_date = {
   fontWeight: "bold",
   fontSize: "12px",
}


const predictions = {
   position: "fixed",
   right:"10px",
   top: "10px",
   height: "95%",
   backgroundColor: "gray",
   color: 'black',
   width: '40%',
  zIndex: "10000",
   overflow:"auto"
}

function Desktopright({ appState,dispjackpot, disp_stage_match}) {
   let history = useHistory();
   const state = appState
   const new_supabase = supabase()


   const [jackpotState, setStates] = useState({
     jackpotResult: [],
     end:true
   })
   const [jackpot, setJackpot] = useState('')
   const [desc, setDesc] = useState('')
   const [prize, setPrize] = useState('')




   const [homeClub, setHomeClub] = useState('')
  const [awayClub, setAwayClub] = useState('')
  const [KFDate, setKFDate] = useState('')
  const [KFHH, setKFHH] = useState('')
  const [KFMM, setKFMM] = useState('') 
   



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
      club:"Newcastle"
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
      league: "LEBELGIANAG1",
      club:"Club Brugg"
    },

    // turkey
    {
      league: "TURKY",
      club:"Besiktas J.K"
    },
    
    
  ]
   //  RETURN MATCHES FOR A PARTICULAR LEAGUE
   const matches = () => { 
      return clubs.map(matches => {
         return (<option>{matches.club}</option>)
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



     React.useEffect(() => {  
      new_supabase
      .from('jackpot')
      .select(`*, jackpotPredictions (*)`) 
         .then(response => {
         console.log(response)
         if (response.body.length > 0) {
         dispjackpot(response.body)
         } else {
            dispjackpot([])
         }
      })
      .catch(error => {
         
      }) 
   }, []);

// setStates({...jackpotState, view:true,data:jk,addMatchForm:true})



   
   // =========================  display all predictions
   const allPredictions = ()=>{
      
      if (jackpotState.data.jackpotPredictions.length < 1) {
        return (<div>No prediction added</div>)
      } else {
         
      return jackpotState.data.jackpotPredictions.map(mt => { 
         return ( 
            <div animateIn='fadeIn' onClick = {()=>{ setStates({...jackpotState, userPrediction:mt.prediction}) }}>
               
            <div className="matches">
            <div className="select_prediction_btn_holder2">
                
               <div>
                  <span style={kickoff_date}> {mt.created_at} </span>
               </div>
            </div>
            <div className="select_prediction_logo_holder">
               <b>{mt.username}</b>
               <div>
                  
               </div>
            </div>
               </div>
               
         </div>
         )
      }) 
     }
   }

   


   const userPrediction = () => { 
         if (jackpotState.userPrediction && jackpotState.userPrediction.length > 0) {
               return jackpotState.userPrediction.map(mt => { 
                  return ( 
                     <div animateIn='fadeIn'>
                        
                     <div className="matches">
                     <div className="select_prediction_btn_holder2">
                        <button className={mt.selected == 1  ? 'active' : 'select_prediction_btn'} id={1} onClick={(e)=>{ refreshState(mt.id, e.target.id, mt.id,) }} >Home</button>
                        <button className={mt.selected == 0  ? 'active' : 'select_prediction_btn'} id={0} onClick={(e)=>{ refreshState(mt.id, e.target.id, mt.id,) }}>Draw</button>
                        <button className={mt.selected == 2  ? 'active' : 'select_prediction_btn'} id={2} onClick={(e)=>{ refreshState(mt.id, e.target.id, mt.id,) }}>Away</button> 
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
   }





   // ====================== all the matches that will be updated with their results
   const allMatchesToFixResult = () => {
      if (jackpotState.data.matches.length < 1) {
        return (<div>No match added</div>)
      } else {
         
      return jackpotState.data.matches.map(mt => { 
         return ( 
            <div animateIn='fadeIn'>
               
            <div className="matches">
            <div className="select_prediction_btn_holder2">
               <button className={mt.selected == 1  ? 'active' : 'select_prediction_btn'} id={1} onClick={(e)=>{ refreshState(mt.id, e.target.id, mt.id,) }} >Home</button>
               <button className={mt.selected == 0  ? 'active' : 'select_prediction_btn'} id={0} onClick={(e)=>{ refreshState(mt.id, e.target.id, mt.id,) }}>Draw</button>
               <button className={mt.selected == 2  ? 'active' : 'select_prediction_btn'} id={2} onClick={(e)=>{ refreshState(mt.id, e.target.id, mt.id,) }}>Away</button> 
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
  }

   
   


   async function createJackpot(e) {
      e.preventDefault()
      if (!jackpot || !desc || !prize || jackpot.length < 3 || desc.length < 3 || prize.length < 1) {
         errorToast("Invalid form submitted")
      } else {
        new_supabase.from("jackpot").insert([{ title: jackpot, desc: desc, prize: prize }]).then(created => {

          const meta = { title: jackpot, desc: desc, prize: prize }
          new_supabase.from("feeds").insert([{ type: "NEW CRAETED JACKPOT", from: 'ADMIN', to: "ALL", meta: meta }]).then(res2 => {
            successToast("Jackpot created")
            state.jackpots.push(created.body[0])
            dispjackpot(state.jackpots)

          })
         }).catch(error => {
            errorToast("A network error occured")
         })
      }
   }

   const renderLeagues = () => {
   if(state.jackpots.length > 0){
      
      return state.jackpots.map(jk=>{
         return (
            <div onClick={() => {setStates({...jackpotState, view:true,data:jk,addMatchForm:true})}}   class="leagues">
               {/* <img alt={category.league} className='stakes' src={category.logo} />  */}
               <div className="stakes_price">
                  <b className='icon'>{jk.title}</b> <br />
                  <small className="matches_count">{jk.prize}</small>
               </div>
            </div>
         )
      })
   }
  }
  

  const deactivateJackpot = (id) => {
    new_supabase.from("jackpot").update([{ active: false }]).eq('id', id).then(created => {
      setStates({ ...jackpotState, end: false })
      new_supabase
      .from('jackpot')
      .select(`*, jackpotPredictions (*)`) 
      .then(response => {
         console.log(response)
         if (response.body.length > 0) {
         dispjackpot(response.body)
         } else {
            dispjackpot([])
         }
      })
    }).catch(error => {
      errorToast("A network error occured")
    })
  }
   

   //  modal to configure jackpot
   const viewJk = () => {
      
      return (
         <div className="leagueModalDefault">
            
            <div style={predictions}>
               {userPrediction()}
           </div>
            
            <div style={formHolder}>
               <br /> 
               <div style={form2}> <br />
                  <span style={modalClose}  onClick={(e)=>{setStates({...jackpotState, view:false,userPrediction:[]})}} >Close</span>
                  <b> {jackpotState.data.title} </b> <br /><br />

                  <b>  {jackpotState.data.prize}  </b>
                  <br /><br />
                  {jackpotState.data.desc} <br /><br />

                  <input type="button"  style={submitBtn} value="Add Matches"  onClick={(e) => {setStates({...jackpotState,addResult:false, addMatch:true,seePredictors:false})}} />
                  <input type="button" style={submitBtn} value="Add Results" onClick={(e) => { setStates({ ...jackpotState, addMatch: false, addResult: true ,seePredictors:false}) }} />
                  <input type="button" style={submitBtn} value="See predictions" onClick={(e) => { setStates({ ...jackpotState, addMatch: false, addResult: false, seePredictors: true }) }} />
                  {jackpotState.end == true && <spam>{jackpotState.data.active == true ? <input type="button" style={submitBtn2} value="End" onClick={(e) => { deactivateJackpot(jackpotState.data.id)  }} /> : "Inactive" }</spam>}
                  <br /><br />

                  {/* add match form */}
                  {jackpotState.addMatch == true && <div style = {form2Holder}>{addMatch()} <br /></div>}<br />

                  {/* {allMatchesToFixResult()} */}


                  {/* stagged matches */}
                  {matchData()} <br />

                  {/* save matches button */}
                  {state.stagged.length > 0 && <input type="submit" value="Add Matches" style={submitBtn} onClick={(e) => { saveMatches(e) }} />}
                  

                  {/* show all matches to add result */}
                  {jackpotState.addResult == true && <div style={form2Holder}>
                     <span style={modalClose} onClick={(e) => { setStates({ ...jackpotState, addResult: false }) }} >Close</span><br />
                     {allMatchesToFixResult()}</div>}
                  


                  {/* show all predictions */}
                  {jackpotState.seePredictors == true && <div style={form2Holder}>
                  <span style={modalClose} onClick={(e) => { setStates({ ...jackpotState, addResult: false,seePredictors:false,userPrediction:[] }) }} >Close</span><br />
                  {allPredictions()}</div>}
                  


                  {/* show button to add match results */}
                  {jackpotState.addResult == true && <div>
                    <input type="submit" value="Add Results" style={submitBtn} onClick={(e) => { saveResults(e) }} /> 
                  </div>}
               </div>

               
            </div>
          
          
         </div>
      )
   }

   //  save matches to jackpot
   const saveMatches = () => {
      new_supabase.from("jackpot").update([{matches:state.stagged}]).eq("id", jackpotState.data.id).then(updated=>{
         
         new_supabase
         .from('jackpot')
         .select('*')
         .eq('active', true)
         .then(response => {
            if (response.body.length > 0) {
            dispjackpot(response.body)
            }
            successToast("Jackpot matches added")
            setStates({...jackpotState,view:false})
            disp_stage_match([])
         })
         .catch(error => {
            
         }) 
      })
   }


   // save results
   const saveResults = () => { 
      let actualMatches = jackpotState.jackpotResult.filter(e=> e.jackpotId == jackpotState.data.id)
      console.log(actualMatches)
   }



   // ADD MATches FORM
   const addMatch = () => {
      return (
         <div>
            {jackpotState.addMatchForm == true ? 
               <form id="matchform">
                  <span style={modalClose}  onClick={(e)=>{setStates({...jackpotState, addMatch:false})}} >Close</span>
                  <small>Home and Away clubes</small> <br /><br />
                  <select className="homeClub" onChange={(e) => { setHomeClub(e.target.value)  }} value={homeClub}>
                  <option>Add Home club</option>
                  {matches()}
                  </select>
                  <select className="awayClub" onChange={(e) => { setAwayClub(e.target.value)  }} value={awayClub}>
                  <option>Add away club</option>
                  {matches()}
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
                  <input type="submit" value="Stage Match" className="stageMatchBtn" onClick={(e) => { stageMatch(e) }} /> 
               </form> :
               
               
               // ================   preview stagged matches
               <div>
                  
                 
               </div>
               }
         </div>
      )
   }





   let refreshState = (matchId, correct_score, leagueId) => {
      let new_matches = jackpotState.jackpotResult.filter(e => e.matchid === matchId).length
      let position1 = jackpotState.jackpotResult.findIndex(e => e.matchid === matchId)
      
      // 
      let new_matches2 = jackpotState.data.matches.filter(e => e.id === matchId)
      let position2 = jackpotState.data.matches.findIndex(e => e.id === matchId)
 
      
      let newNew_matches2 = ''
      if (new_matches2[0].selected && new_matches2[0].selected == correct_score) {
         newNew_matches2 = {
            ...new_matches2[0],
            selected:null
         }
          jackpotState.jackpotResult.splice(position1, 1)
      } else {
         newNew_matches2 = {
            ...new_matches2[0],
            selected:correct_score
         }
         
         if (new_matches > 0) {
            let ko = {jackpotId:jackpotState.data.id, matchid: matchId, correct: correct_score }
            jackpotState.jackpotResult.splice(position1, 1, ko) 
               
         } else {
            let ko = {jackpotId:jackpotState.data.id, matchid: matchId, correct: correct_score } 
            jackpotState.jackpotResult.push(ko) 
         }
   }

      
      jackpotState.data.matches.splice(position2, 1, newNew_matches2)
      setStates({...jackpotState, data:jackpotState.data})  
    }
   
   




   return ( 
     <div className="desktop"> 
         <button style={button} id="oneXone" onClick={(e)=>{setStates({...jackpotState, create:true})}}> Create Jackpot</button>  <br /><br/>
        
         {renderLeagues()}
         
         {console.log(jackpotState)}
         
         {/* create jackpot modal */}
        {jackpotState.create === true && <div className="leagueModalDefault">
          {console.log(state)}
            <div style={formHolder}>
               <br /><br /> <form style={form} onSubmit={(e) => { createJackpot(e) }} >
                  <span style={modalClose}  onClick={(e)=>{setStates({...jackpotState, create:false})}} >Close</span>
                  <ToastContainer autoClose={2000}/>
                  <small style={formHeader}>Create new jackpot</small> <br /><br />
                  <input style={input} onChange={(e) => { setJackpot(e.target.value)  }} value={jackpot} placeholder="Enter jackpot title" /><br /><br />
                  <input style={input} onChange={(e) => { setPrize(e.target.value)  }} value={prize} placeholder="Enter jackpot prize" /><br /><br />
                  <textarea style={input} onChange={(e) => { setDesc(e.target.value)  }} value={desc} placeholder="Enter jackpot description / Rules" /><br /><br /> 
                  <br /> 
                  <input type="submit" value="Add Jackpot" style={submitBtn} onClick={(e)=>{ }} /><br /><br />
               </form>
            </div>
          
          
         </div>}
         



         {/* view jackpot model */}
        {jackpotState.view === true &&<div> {viewJk()} </div> }
         



      </div> 
   );
} 

const mapStateToProps = state => { 
  return {
    appState: state.user
  }
}


const mapDispatchToProps = (dispatch,encoded) => {
  return {
      dispjackpot: (jackpot) => dispatch(disp_jackpots(jackpot)),
    disp_stage_match: (stagged) => dispatch(stage_match(stagged)), 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktopright)