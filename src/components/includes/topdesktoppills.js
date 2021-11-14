// import  "../../static/css/home/index.css"
import  "../../static/css/top-nav.css"

import {React,useState} from 'react'; 
import { connect } from 'react-redux'
import {logOut} from '../../redux' 
import {useHistory,Link} from "react-router-dom";
import {LocalAtm,Person,AddBoxOutlined, EmojiTransportationOutlined, CardGiftcardOutlined, ForumOutlined,HomeOutlined,StorefrontOutlined,SportsSoccer, CloseOutlined} from '@material-ui/icons';


//  function that checkes if the user is still using the default transaction pin
import {trigger, resetPin} from "../../functions/controllers/resetPin"
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


const smile = {
   color: "orange",
   fontSize:"20px"
}

const smile2 = {
   color: "orange",
   fontSize:"30px"
}


function Desktopright({ appState,logout}) {
   let history = useHistory();
  const state = appState
  
  const [pins, setPins] = useState({
    first: "",
    second:""
  })
   
  
  
  const resetTPin = () => {
    console.log(pins)
  }
  

   const [compState, setStates] = useState('')
  let pathname = window.location.pathname
  let split = pathname.split("/")[1]
   return (
     <>
       {split != "setschool" && <div>
         {/* {resetPin(state, resetTPin,smile,setPins, pins)} */}
         {trigger(state, history, smile)}
       </div>}
       
       <div id=" " className="top-nav-holder">
         
         <div onClick={() => { window.scrollTo(0, 0);; history.push("/")}}  className="top-nav-pills-holder">
            <span  className="top-nav-pills" >  <HomeOutlined/> </span>
            <p  className="top-nav-pills-title"> Home</p>
         </div>


        <div onClick={()=>{history.push("/transfer")}} className="top-nav-pills-holder">
            <span  className="top-nav-pills" >  <LocalAtm /> </span>
            <p className="top-nav-pills-title">Buz Me</p>
          </div>
          
          <div  onClick={()=>{history.push("/request")}} className="top-nav-pills-holder">
            <span  className="top-nav-pills" >  <CardGiftcardOutlined/> </span>
            <p className="top-nav-pills-title">Request Buz</p>
            </div>

            <div   onClick={()=>{history.push("/tour")}} className="top-nav-pills-holder">
            <span  className="top-nav-pills" >  <EmojiTransportationOutlined/> </span>
            <p className="top-nav-pills-title">Tour</p>
            </div>

            {/* <div className="top-nav-pills-holder">
            <span  className="top-nav-pills" >  <ForumOutlined/> </span>
            <p className="top-nav-pills-title">Forum</p>
            </div> */}

            <div   onClick={() => { history.push("/listmart")}}  className="top-nav-pills-holder">
            <span  className="top-nav-pills" >  <StorefrontOutlined/> </span>
            <p  className="top-nav-pills-title"> Aluta Mart</p>
         </div>
         
         <div  onClick={() => { history.push("/create")}} className="top-nav-pills-holder">
            <span  className="top-nav-pills" >  <AddBoxOutlined/> </span>
            <p  className="top-nav-pills-title"> CREATE</p>
         </div> 
         
          {/* <div  style={{fontSize:"15px",marginTop:"-11px",color:"orange"}}><b>@RiversStateUniversity</b></div> */}

        </div> 
     </>
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