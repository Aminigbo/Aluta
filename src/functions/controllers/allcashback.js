import { allCashback } from "../models/index";

export async function getAllCashback(userId, cashbackstate, setCashbackstate) {
  // setCashbackstate({
  //   loading: true,
  // });
  allCashback(userId)
    .then((res) => {
      // console.log(res);
      if (res.body !== null) {
        if (res.body.length > 0) {
          let recieved = res.body.filter((e) => e.to == userId);
          let sent = res.body.filter((e) => e.user == userId);

          function add(accumulator, a) {
            return accumulator + a;
          }

          let recieveAmountArry = [];
          let sentAmountArry = [];
          if (recieved.length > 0) {
            for (let i = 0; i < recieved.length; i++) {
              const amount = parseInt(recieved[i].meta.amount);
              recieveAmountArry.push(amount);
            }
          }

          console.log(sent);
          console.log(recieved);

          for (let i = 0; i < sent.length; i++) {
            const amount = parseInt(sent[i].meta.amountPlusCharge);
            sentAmountArry.push(amount);
          }
          let from = "";
          let to = "";
          if (recieved.length > 0) {
            to = recieveAmountArry.reduce(add, 0);
          } else {
            to = 0;
          }

          if (sent.length > 0) {
            from = sentAmountArry.reduce(add, 0);
          } else {
            from = 0;
          }

          let data = {
            from: sentAmountArry.reduce(add, 0) || 0,
            to: recieveAmountArry.reduce(add, 0),
          };
          setCashbackstate({
            ...cashbackstate,
            loading: false,
            data,
          });
          console.log(data);
        } else {
          let data = {
            from: 0,
            to: 0,
          };
          setCashbackstate({
            ...cashbackstate,
            loading: false,
            data,
          });
        }
      }
    })
    .catch((error) => {
      let data = {
        from: 0,
        to: 0,
      };
      setCashbackstate({
        ...cashbackstate,
        loading: false,
        data,
      });
    });
}
