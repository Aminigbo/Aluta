import { allBuzMe } from "../models/index";

export async function getAllBuzz(userId, buzState, setBuzState) {
  setBuzState({
    loading: true,
  });
  allBuzMe(userId).then((res) => {
    // console.log(res)
    if(res.body !== null){
       if (res.body.length > 0) {
      let recieved = res.body.filter((e) => e.to == userId);
      let sent = res.body.filter((e) => e.from == userId);

      function add(accumulator, a) {
        return accumulator + a;
      }

      let recieveAmountArry = [];
      let sentAmountArry = [];
      for (let i = 0; i < recieved.length; i++) {
        const amount = parseInt(recieved[i].meta.data.amount);
        recieveAmountArry.push(amount);
      }

      for (let i = 0; i < sent.length; i++) {
        const amount = parseInt(sent[i].meta.data.amount);
        sentAmountArry.push(amount);
      }

      let data = {
        from: sentAmountArry.reduce(add, 0),
        to: recieveAmountArry.reduce(add, 0),
      };
      setBuzState({
        ...buzState,
        loading: false,
        data,
      });
       } else {
         let data = {
        from:0,
        to:0,
      };
      setBuzState({
        ...buzState,
        loading: false,
        data,
      });
    }
    }
  });
}
