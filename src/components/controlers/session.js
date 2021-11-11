export const checkSession = (logout,set_session,state,errorToast) => {
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
   // < -305

   let timeDiff = msToTime(state.session - new Date().getTime())
   console.log(timeDiff) 
   
    if (timeDiff  < -1005 && state.session  != -0.1) {
      //  logout()
       set_session(new Date().getTime())
      //  errorToast("Session expired")
       console.log("logout")
      } else {
         set_session(new Date().getTime())
       console.log("refresh")
      }
   
   return 
   }