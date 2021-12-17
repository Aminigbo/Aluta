export const checkSession = (logout, set_session, state, supabase) => {
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

  // supabase.auth.api.getUser(state.loggedInUser.meta.access_token).then(res => {
  //   console.log(res)
  //   if (res.data === null && res.error.status == '401') {
  //     //  logout("HARD");
  //   } else {
      
  //   }
  // })
  if (timeDiff < -250 && state.session != 9999999999999) {
    logout();
    set_session(9999999999999);
    console.log("logout");
  } else {
    set_session(new Date().getTime());
    console.log("refresh");
    console.log(timeDiff);
  }

  //   const check = () => {

  //    let delaysecond = "";
  //    delaysecond = 0;
  //    var timeleft = delaysecond;
  //      var downloadTimer = setInterval(function () {
  //      if (state.session  == 9999999999999) {
  //        clearInterval(downloadTimer);
  //      } else {
  //         timeleft += 1;
  //         console.log(timeleft)
  //         console.log(timeDiff)
  //      }
  //    }, 1000);
  //  };

  //   setTimeout(() => check(), 10000);

  //  setInterval(() => check(), 1000);

  return;
};
