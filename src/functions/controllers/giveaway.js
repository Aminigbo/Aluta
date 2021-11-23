import { error, success } from "../utils/index";

import {
  allWhoBenefited,
  saveGiveawayBeneficiary,
  userBenefited,
  fetchUserProfile,
  updateUserMeta,
} from "../models/index";

// !======== DISPATCH ALL WHO BENEFITED TO REDUX STATE
export async function disp_all_who_benefited(
  postId,
  disp_allWhoBenefited,
  startLoading
) {
  startLoading(true);
  return allWhoBenefited(postId).then((res) => {
    if (res.body !== null) {
      disp_allWhoBenefited(res.body);
    } else {
      disp_allWhoBenefited([]);
    }

    startLoading(false);
  });
}

// @========  CONFIRM IF USER ALREADU BENEFITED
export async function rewardUser(
  payload,
  benefited,
  giveAwayConfirm,
  setGiveawayConfirm
) {
  console.log(benefited.length);
  console.log(payload.giveawayData.beneficiaries);
  if (benefited.length == payload.giveawayData.beneficiaries) {
    setGiveawayConfirm({
      ...giveAwayConfirm,
      pop: "COMPLETED",
    });
    console.log("you can not");
  } else {
    userBenefited(payload.luckyWinner.beneficiary)
      .then((res) => {
        if (res === true) {
          setGiveawayConfirm({
            ...giveAwayConfirm,
            pop: "ALREADY BENEFITED",
            miniLoad: false,
          });
        } else {
          setGiveawayConfirm({
            ...giveAwayConfirm,
            pop: true,
            miniLoad: false,
          });
        }
      })
      .catch((err) => {
        setGiveawayConfirm({
          ...giveAwayConfirm,
          pop: "ERROR",
        });
      });
  }
}

// @======== FINALLY BUZ USER
export async function finallyBuzBeneficiary(
  payload,
  benefited,
  giveAwayConfirm,
  setGiveawayConfirm,
  disp_allWhoBenefited
) {
  // @======== SHOW LOADER
  setGiveawayConfirm({
    ...giveAwayConfirm,
    miniLoad: true,
  });
  let craditUserPayload = {
    amount: payload.giveawayData.userGets,
    user: payload.luckyWinner,
  };
  fetchUserProfile(payload.luckyWinner.id)
    .then((res) => {
      let userMeta = res.body[0].meta;
      let oldWallet = userMeta.wallet;
      let newWallet = parseInt(craditUserPayload.amount) + parseInt(oldWallet);
      let userNewMeta = {
        ...userMeta,
        wallet: newWallet,
      };
      updateUserMeta({ email: res.body[0].email, newUser: userNewMeta })
        .then((res2) => {
          if (res2.success === true) {
            saveGiveawayBeneficiary(payload)
              .then((res) => {
                if (res.body.length > 0) {
                  benefited.push(res.body[0]);
                  disp_allWhoBenefited(benefited);
                  setGiveawayConfirm({
                    ...giveAwayConfirm,
                    pop: "CONFIRMED",
                  });
                } else {
                  setGiveawayConfirm({
                    ...giveAwayConfirm,
                    pop: "ERROR",
                  });
                }
              })
              .catch((err) => {
                setGiveawayConfirm({
                  ...giveAwayConfirm,
                  pop: "ERROR",
                });
              });
          } else {
            setGiveawayConfirm({
              ...giveAwayConfirm,
              pop: "ERROR",
            });
          }
        })
        .catch((err) => {
          setGiveawayConfirm({
            ...giveAwayConfirm,
            pop: "ERROR",
          });
        });
      console.log(userMeta);
      console.log(userNewMeta);
    })
    .catch((err) => {
      setGiveawayConfirm({
        ...giveAwayConfirm,
        pop: "ERROR",
      });
    });
}
