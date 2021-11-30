import { cashbackRegEx } from "../utils/index";
import {
  updateUserMeta,
  saveCashBack,
  verifyCashbackToken,
  deactivateToken,
  insertNotification,
} from "../models/index";

// @======== VERIFY CASHBACK TOKEN
export async function handleVerifyToken(
  token,
  compState,
  setStates,
  setVerifypayload,
  verifyPayload,
  setcashbackpinresolved
) {
  setStates({
    ...compState,
    loading: true,
  });
  verifyCashbackToken(token)
    .then((res) => {
      if (res.body.length > 0) {
        setcashbackpinresolved(true);
        setVerifypayload({
          ...verifyPayload,
          success: true,
          data: res.body[0],
        });
        setStates({
          ...compState,
          loading: false,
          error: false,
          errorMsg: null,
        });
      } else {
        setcashbackpinresolved(false);
        setVerifypayload({
          ...verifyPayload,
          success: false,
          data: null,
        });
        setStates({
          ...compState,
          loading: false,
          error: true,
          errorMsg: "The provided cashback token has expired",
        });
      }
    })
    .catch((err) => {
      setcashbackpinresolved(false);
      setStates({
        ...compState,
        loading: false,
        error: true,
        errorMsg: "We could not complete this operation due to network error",
      });
      setVerifypayload({
        ...verifyPayload,
        success: false,
        data: null,
      });
    });
}

export async function handleChashbackGeneration(
  setInitiateCreate,
  setGeneratedcode,
  setGeneratedToken,
  payload,
  login_suc,
  state,
  compState,
  setStates,
  setPin
) {
  let userwallet = payload.user.meta.wallet;
  let amount = payload.amount;
  let amountPlusCharge = payload.amountPlusCharge;
  let extraCharge = amountPlusCharge - amount;
  let adminPercentage = (35 * extraCharge) / 100;

  let userTakes = amountPlusCharge - adminPercentage;

  const newUserWallet = userwallet - amountPlusCharge;
  const newUserData = {
    ...payload.user.meta,
    wallet: newUserWallet,
  };

  // @======== NEW USER LOGIN DATA
  const newUserLogginData = {
    ...payload.user,
    meta: newUserData,
  };

  // @======== SAVE USER'S META DATA
  const metaDataPayload = {
    email: payload.user.email,
    newUser: newUserData,
  };

  setStates({
    ...compState,
    loading: true,
  });

  const token = cashbackRegEx(
    payload.user.meta.beneficiaryId,
    payload.user.phone,
    payload.user.email,
    payload.user.meta.password,
    payload.amount
  );

  updateUserMeta(metaDataPayload)
    .then((res) => {
      if (res.success === true) {
        let saveCashbackTokenData = {
          token,
          user: payload.user.id,
          meta: {
            amount: userTakes,
            name: payload.user.fullname,
            user: metaDataPayload,
            token,
          },
        };
        saveCashBack(saveCashbackTokenData)
          .then((res2) => {
            console.log(res2);
            if (res2.body.length > 0) {
              setStates({
                ...compState,
                error: false,
                loading: false,
              });
              login_suc({
                user: newUserLogginData,
                meta: state.loggedInUser.meta,
              });
              setGeneratedToken(token);
              setInitiateCreate(false);
              setGeneratedcode(true);
              setPin(null);
            } else {
              return setStates({
                ...compState,
                loading: false,
                error: true,
                errorMsg: "Sorry, this operation could not be completed.",
              });
            }
            // login_suc({user:newUserData,meta:state.loggedInUser.meta})
          })
          .catch((error) => {
            return setStates({
              ...compState,
              loading: false,
              error: true,
              errorMsg: "Sorry, this operation could not be completed",
            });
          });
      }
    })
    .catch((error) => {
      return setStates({
        ...compState,
        loading: false,
        error: true,
        errorMsg: "Sorry, this operation could not be completed",
      });
    });
}

// @======== CASH IN CASHBACK TOKEN
export async function settleCashbackToWallet(
  payload,
  setcashbackpinresolved,
  setValue,
  state,
  compState,
  setStates,
  login_suc,
  setResolved
) {
  setStates({
    ...compState,
    loading: true,
  });
  setcashbackpinresolved(false);
  setValue(null);
  //  form new TO object
  const to = {
    ...state.user.meta,
    fullname: state.user.fullname,
    phone: state.user.phone,
    email: state.user.email,
    id: state.user.id,
    wallet: null,
    transactionPin: null,
    password: null,
    uuid: null,
  };

  let newTokenData = {
    ...payload.data.meta,
    to: to,
  };
  let userWallet = state.user.meta.wallet;
  let amount = payload.data.meta.amount;

  let tokenId = payload.data.id;
  let token = payload.data.token;

  let userNewAmount = parseInt(userWallet) + parseInt(amount);

  // data to login
  let loginData = {
    meta: state.meta,
    user: {
      ...state.user,
      meta: { ...state.user.meta, wallet: userNewAmount },
    },
  };

  // user data to update  db
  let userDBupdataData = {
    email: state.user.email,
    newUser: { ...state.user.meta, wallet: userNewAmount },
  };

  verifyCashbackToken(token).then((res) => { 
    if (res.body.length > 0) {
      deactivateToken(token, newTokenData).then((res2) => {
        if (res2.body.length > 0) {
          updateUserMeta(userDBupdataData).then((res3) => {
            if (res3.success === true) {
                let notificationPayload = {
                  sendeId: state.user.id ,
                  recieverId:res.body[0].user,
                  meta: {amount:res.body[0].meta.amount, resolvedby:res.body[0].meta.name,token},
                  type:"CASHBACK RESOLVED"
                }
              insertNotification(notificationPayload).then((res4) => {
                login_suc(loginData);
                setResolved(true);
                setStates({
                  ...compState,
                  loading: false,
                  error: false,
                  errorMsg: "",
                });
              });
            } else {
              setStates({
                ...compState,
                loading: false,
                error: true,
                errorMsg: "Sorry, a network error occured",
              });
            }
          });
        } else {
          setStates({
            ...compState,
            loading: false,
            error: true,
            errorMsg: "Sorry, a network error occured",
          });
        }
      });
    } else {
      setStates({
        ...compState,
        loading: false,
        error: true,
        errorMsg: "The provided cashback token has expired",
      });
    }
  });
}
