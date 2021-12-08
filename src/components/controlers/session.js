export const checkSession = (logout, set_session, state) => {
  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds;
    else if (minutes < 60) return minutes;
    else if (hours < 24) return hours;
    else return days;
  }
  // < -1005

  let timeDiff = msToTime(state.session - new Date().getTime()); 

if (timeDiff < -200) {
      logout();
      set_session(new Date().getTime());
     //  console.log("logout");
    } 

  
   const check = () => {
    
    let delaysecond = "";
    delaysecond = 0;
    var timeleft = delaysecond;
      var downloadTimer = setInterval(function () { 
      if (timeleft > 20) {
        clearInterval(downloadTimer);
         set_session(new Date().getTime())
         logout()
      } else {
        if (state.loggedIn == false) {
          clearInterval(downloadTimer);
        } else {
           
         }
         set_session(new Date().getTime())
         timeleft += 1;
         console.log(timeleft)
      }
    }, 1000);
  };

   setTimeout(() => check(), 10000);

  //  setInterval(() => check(), 1000);

    

  return;
};
