import React, { useState } from 'react'
import '../static/css/auth/login.css'
import { connect } from 'react-redux'
import {TextField,Button } from '@material-ui/core'; 
import { Link } from "react-router-dom";
import { Redirect,useHistory } from "react-router-dom";
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
      setStates({ ...compState, loader: true})
      setTimeout(() => setStates({ ...compState, loader: false}), 500);
   }, []);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
   const state = appState
   const [compState, setStates] = useState('')

   // reroute function
   let reroute = ()=>{
    setStates({ ...compState, loader: true}) 
  }

  const classes = useStyles();
  

   let login = () => { 
      setStates({ ...compState, loader: true,error:false,success:false})
      if (!email || !password) {
        setStates({ ...compState, loader: false, error: true, errorMsg: "Please you have to fill out all forms" })
        errorToast("Please you have to fill out all forms")
      } else {
          return new_supabase
          .from('user')
          .select(`*, transactions (*), predictions (*), challenge (*)`)
          .eq('email', email) 
          .then(response2 => {
            if(response2.body.length < 1){
              setStates({ ...compState, loader: false,error:true,errorMsg:"User not found"})
              console.log(response2);
              errorToast("User not found")
            } else {
              return new_supabase.auth.signIn({
                email,
                password,
              })
                .then(signin_response => {
                  if (signin_response.data === null || signin_response.data.length < 1) {
                    setStates({ ...compState, loader: false, error: true, errorMsg: signin_response.error.message })
                    console.log(signin_response);
                    errorToast("User not found")
                  } else {
                    const data = {
                      user:response2.body[0],
                      meta:signin_response.data
                    } 
                    walletAdd(data.user.wallet)
                    login_suc(data)
                    // set_session(-0.1)
                    setStates({ ...compState, loader: false, success: true, succMsg: "Logged In", error: false })
                    successToast("Logged In")
                  }

                })
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
          <title>Ogapredictor</title>
          <link rel="icon" href={logo} />
         </Helmet>
         
         <div id='formHolder'>
           <img style={logoStyle} src={logo} />
            <div id="welcomeBack">
               Login
            </div> 
            <ToastContainer autoClose={2000}/> 

            <form className="form" noValidate autoComplete="off">
               <br /><br />
               <TextField  onChange={(e)=>{ setEmail(e.target.value)  }} value={email} required  id="input" label="Enter email address" type="email" variant="outlined" />
               <br /><br />
               <TextField  onChange={(e)=>{ setPassword(e.target.value)  }} value={password} required   id="input" label="Enter password" type="password" variant="outlined" /> <br /> 
               <div onClick={()=>{history.push("/reset")}} style={{float:"right",marginTop:"10px", cursor:"pointer"}}>
                  <b>
                     Forgot Password? 
                  </b>
               </div><br /><br />
               
             {compState.loader != true ? <Button onClick={(e) => { login() }} variant="outlined" color="primary" id='primary-btn'> Login  </Button> :
               <img  src={loaderImg} />
               } 

               <div class='option'>
                  <br /><span>Don't have an account? </span> <Link onClick={(e) => { reroute() }} className='action'  to="/register"> <b className='action'>Register</b></Link>
               </div>
            </form>
            
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