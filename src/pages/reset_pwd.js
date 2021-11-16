import React, { useState } from 'react'
import '../static/css/auth/login.css'
import { Redirect,useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import {TextField,Button } from '@material-ui/core'; 
import { Link } from "react-router-dom"; 
import {loginSuc,add_wallet,disp_session} from '../redux' 
import { supabase } from '../functions/configs/index'; 
import { ToastContainer, toast, Bounce } from 'react-toastify';
import loaderImg from "../static/logos/animation.gif"
import logo from "../static/logos/logo2.png"
import {Helmet} from "react-helmet";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      marginTop: theme.spacing(2),
    },
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const logoStyle = {
  position: "absolute",
  top: "0px",
  left: "0px",
  width:"25%"

}

function Login({appState,login_suc,walletAdd,set_session}) {
  // initialize supabase
   const new_supabase = supabase()
   
   let history = useHistory();
  

   const errorToast = (message) => { 
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      // onClose: () => { console.log("Redirect") },
      transition: Bounce 
    });
  }

  const successToast = (message) => { 
      toast.success(message, {
         position: toast.POSITION.TOP_CENTER,
         // onClose: () => { console.log("Redirect") },
         transition: Bounce 
      });
  }

  console.log(-0.0 < -305)


   React.useEffect((compState) => {  
      window.scrollTo(0, 0); 
      // setStates({ ...compState, loader: true})
      // setTimeout(() => setStates({ ...compState, loader: false}), 500);
   }, []);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
   const state = appState
   const [compState, setStates] = useState('')

   // reroute function
   let reroute = ()=>{
    setStates({ ...compState, loader: true}) 
  }


const sendOTP=(sendTo, message)=>{
    // Get the SMS service
    // const sms = AfricasTalking.SMS;
    // const options = { 
    //     to: [sendTo], 
    //     message, 
    //     // from: 'XXYYZZ'
    // } 
    // sms.send(options)
    // .then( response => {
    //     return response
    // })
    // .catch( error => {
    //     return error
    // });
}

   let login = () => { 
      setStates({ ...compState, loader: true,error:false,success:false})
      if (!email) {
        setStates({ ...compState, loader: false, error: true, errorMsg: "Please you have to fill out all forms" })
        errorToast("Please you have to fill out all forms")
      } else {
          return new_supabase
          .from('user')
          .select("*")
          .eq('email', email) 
          .then(response2 => {
            if(response2.body.length < 1){
              setStates({ ...compState, loader: false,error:true,errorMsg:"User not found"})
              console.log(response2);
              errorToast("User not found")
            } else {
               var axios = require('axios');
               var data = JSON.stringify({
               "email": email,
               "password": response2.body[0].password
               });

               var config = {
               method: 'post',
               url: 'https://Aluta Meter.herokuapp.com/api/v1/user/recover-pwd',
               headers: { 
                  'Content-Type': 'application/json'
               },
               data : data
               }; 
               axios(config)
               .then(function (response) {
                  successToast(`Your login password has been sent to ${email}`)
                  setStates({...compState, loader:false})
               })
               .catch(function (error) {
                  errorToast("network error")
                  setStates({ ...compState, loader: false})
               });

               
            }
            
          })
            .catch(error => {
          errorToast("A network error occured")
          setStates({ ...compState, loader: false})
        })
      }
  }
  



   


   
  


   return state.loggedIn === true ? (
    <div>
          <Redirect to="/" />  
    </div>
    
  ): (
       <div className="bg">
         {console.log(state)}
        <Helmet>
          <meta charSet="utf-8" />
          <title>Aluta Meter</title>
          <link rel="icon" href={logo} />
         </Helmet>
         
         <div id='formHolder'>
           <img style={logoStyle} src={logo} />
               <br /><br />
               <div id="welcomeBack">
               Recover Password
            </div> 
            <ToastContainer autoClose={4000}/> 

              
               <form className="form" noValidate autoComplete="off">
               <br /><br />
               <TextField  onChange={(e)=>{ setEmail(e.target.value)  }} value={email} required  id="input" label="Enter email address" type="email" variant="outlined" />
               <br /><br />
               {/* <TextField  onChange={(e)=>{ setPassword(e.target.value)  }} value={password} required   id="input" label="Enter password" type="password" variant="outlined" /> <br /> 
                <br /><br /> */}
               
             {compState.loader != true ? <Button onClick={(e) => { login() }} variant="outlined" color="primary" id='primary-btn'> Verify  </Button> :
               <img  src={loaderImg} />
               }  
            </form>


               <br />
               <div class=' '>
               <span>OR </span> <br /> <Link onClick={(e) => { reroute() }} className='action'  to="/login"> <b className='action'>Login</b></Link><br/><br/>
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
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)), 
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    set_session: (time) => dispatch(disp_session(time)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)