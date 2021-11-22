import { error, success } from "../utils/index";

import {
  allWhoBenefited,
  saveGiveawayBeneficiary,
  userBenefited,
} from "../models/index";

// !======== DISPATCH ALL WHO BENEFITED TO REDUX STATE
export async function disp_all_who_benefited(postId, disp_allWhoBenefited, startLoading) {
    startLoading(true)
  return allWhoBenefited(postId).then((res) => { 
      
      if (res.body !== null) {
          disp_allWhoBenefited(res.body);
      } else {
          disp_allWhoBenefited([]);
      }
      
      startLoading(false)
  });
}

// @========  CONFIRM IF USER ALREADU BENEFITED
export async function rewardUser(
  payload,
  benefited,
  giveAwayConfirm,
  setGiveawayConfirm
) {
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

// @======== FINALLY BUZ USER
export async function finallyBuzBeneficiary(
  payload,
  benefited,
  giveAwayConfirm,
  setGiveawayConfirm,
  disp_allWhoBenefited, 
) {
  // @======== SHOW LOADER
  setGiveawayConfirm({
    ...giveAwayConfirm,
    miniLoad: true,
  });
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
}
