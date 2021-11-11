import  "../../static/css/home/index.css"
import {React,useState} from 'react'; 
import { connect } from 'react-redux'
import {logOut} from '../../redux' 
import {useHistory,Link} from "react-router-dom";
import {CallToAction,Person,ExitToApp, HorizontalSplitOutlined, HowToVoteOutlined, SportsRugbyOutlined,HomeOutlined,SportsKabaddiOutlined,SportsSoccer, CloseOutlined} from '@material-ui/icons';

const livescore = {
  backgroundColor:"#ff8a00"
}

const logoutBtn = {
  backgroundColor: "orange",
  color: "white",
  cursor:"pointer"
}

const pill1 = {
  fontSize:"20px"
}
function Desktopright({ appState,logout}) {
   let history = useHistory();
   const state = appState
   
   let reroute = ()=>{
      setStates({ ...compState, loader: true}) 
  }
  
  

   const reroute_breadcrumb = (link) => {
      history.push(`/${link}`)
   }
   const [compState, setStates] = useState('')
   
   return (
     <div>
       <div id="top" className="breadcrumb_pill_holder">
          <Link className="breadcrumb_pill desktop" to="/" ><HomeOutlined fontSize="small" />Home</Link>
         <Link className="breadcrumb_pill desktop" id="oneXone" onClick={(e) => { reroute_breadcrumb(e.target.id) }}><SportsKabaddiOutlined fontSize="small" /> oneXone</Link>
         <Link className="breadcrumb_pill desktop" to="/predict" ><SportsSoccer fontSize="small" /> Predict</Link>
          <Link className="breadcrumb_pill" to="/topup" ><HorizontalSplitOutlined fontSize="small" /> Top Up</Link>
          <Link className="breadcrumb_pill" to="/withdraw" ><HowToVoteOutlined fontSize="small" /> Withdraw</Link>
          <Link className="breadcrumb_pill" to="/jackpots" ><SportsRugbyOutlined fontSize="small" /> Jackpots</Link>
          <span className="breadcrumb_pill" style={logoutBtn}  onClick={()=>{logout()}}><ExitToApp fontSize="small" />Logout</span>
       </div><br />
       
         <div className="pill_holder">
          <div style={pill1} onClick={()=>{reroute_breadcrumb("transfer")}} className="pill1">Buz cash <CallToAction /> </div>
          <div onClick={()=>{reroute_breadcrumb("oneXone")}} className="pill2">oneXone</div>
          <div onClick={()=>{reroute_breadcrumb("jackpots")}} className="pill3">Jackpots</div>
          <div onClick={()=>{reroute_breadcrumb("topup")}} className="pill4">Top up</div>
          <div onClick={()=>{reroute_breadcrumb("withdraw")}} className="pill5">Withdraw</div> 
          <div onClick={()=>{reroute_breadcrumb(`account/${state.loggedInUser.user.username}`)}} className="pill6"><Person />{state.loggedInUser.user.username}</div>
          <div onClick={()=>{reroute_breadcrumb("")}} className="pill7">User guide</div>
          <div  onClick={()=>{reroute_breadcrumb("responsible")}}className="pill8">Bet Responsibly</div>
          <div style={livescore} onClick={()=>{window.location.assign("https://www.livescore.com/en/")}} className="pill9">Live score</div>   
        </div> 
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
    logout: () => dispatch(logOut()),  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktopright)