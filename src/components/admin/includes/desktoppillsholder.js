import  "../../static/css/home/index.css"
import {React,useState} from 'react'; 
import { connect } from 'react-redux'
import {logOut} from '../../redux'
// import Naira from 'react-naira'
import { Link,useHistory } from "react-router-dom";
import {HomeOutlined,TrackChangesOutlined,HorizontalSplitOutlined,HowToVoteOutlined,SportsRugbyOutlined,SportsKabaddiOutlined,Person} from '@material-ui/icons';

function Desktopright({ appState,log_out}) {
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
     <div className="breadcrumb_pill_holder3 desktop">
         {/* <Link className="breadcrumb_pill desktop" id="topup" onClick={(e) => { reroute_breadcrumb(e.target.id) }}><HomeOutlined fontSize="small" />Home</Link> */}
         <Link className="breadcrumb_pill desktop" id="oneXone" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><SportsKabaddiOutlined fontSize="small" /> oneXone</Link>
         <Link className="breadcrumb_pill" id="topup" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><HorizontalSplitOutlined fontSize="small" /> Top Up</Link>
         <Link className="breadcrumb_pill" id="withdraw" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><HowToVoteOutlined fontSize="small" /> Withdraw</Link>
         <Link className="breadcrumb_pill" id="jackpots" onClick={(e)=>{reroute_breadcrumb(e.target.id)}}><SportsRugbyOutlined fontSize="small" /> Jackpots</Link>
         <Link className="breadcrumb_pill" id="sell-ads" onClick={(e) => { reroute_breadcrumb(e.target.id) }}><TrackChangesOutlined fontSize="small" /> Ads Policy</Link>
         <Link className="breadcrumb_pill" id="sell-ads" onClick={()=>{log_out()}}><TrackChangesOutlined fontSize="small" />Logout</Link> 
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
    log_out: () => dispatch(logOut()),  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Desktopright)