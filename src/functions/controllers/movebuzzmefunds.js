import {
  updateUserMeta, 
} from "../models/index";

export async function moveBuzzmeFunds( 
  state,
  compState,
  setStates,
   login_suc,
  setmovebuzzResolved
) { 

  let userWallet = state.user.meta.wallet;
  let amount = state.user.meta.buzzmewallet;

  let userNewAmount = parseInt(userWallet) + parseInt(amount);

  // data to login
  let loginData = {
    meta: state.meta,
    user: {
      ...state.user,
      meta: { ...state.user.meta, wallet: userNewAmount,buzzmewallet:0 },
    },
  };

  // user data to update  db
  let userDBupdataData = {
    email: state.user.email,
    newUser: { ...state.user.meta, wallet: userNewAmount,buzzmewallet:0 },
  };

  updateUserMeta(userDBupdataData).then((res3) => {
    if (res3.success === true) {
      login_suc(loginData); 
      setStates({
        ...compState,
        loader: false,
        error: false,
        errorMsg: "",
      });
       setmovebuzzResolved(true)
       return true
    } else {
      setStates({
        ...compState,
        loader: false,
        error: true,
        errorMsg: "Sorry, a network error occured",
      });
       return false
    }
  });
}
