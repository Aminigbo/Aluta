import { allCashback } from "../models/index";

export async function getAllCashback(userId, cashbackstate, setCashbackstate) {
  setCashbackstate({
    loading: true,
  });
  allCashback(userId).then((res) => {
    console.log(res)
    if(res.body !== null){
       if (res.body.length > 0) {
      let recieved = res.body.filter((e) => e.to == userId);
      let sent = res.body.filter((e) => e.user == userId);

      function add(accumulator, a) {
        return accumulator + a;
      }

      let recieveAmountArry = [];
      let sentAmountArry = [];
      for (let i = 0; i < recieved.length; i++) {
        const amount = parseInt(recieved[i].meta.amount);
        recieveAmountArry.push(amount);
          }
          
          console.log(sent)

      for (let i = 0; i < sent.length; i++) {
        const amount = parseInt(sent[i].meta.amount);
        sentAmountArry.push(amount);
      }

      let data = {
        from: sentAmountArry.reduce(add, 0),
        to: recieveAmountArry.reduce(add, 0),
      };
      setCashbackstate({
        ...cashbackstate,
        loading: false,
        data,
      });
       } else {
         let data = {
        from:0,
        to:0,
      };
      setCashbackstate({
        ...cashbackstate,
        loading: false,
        data,
      });
    }
    }
  });
}
