var axios = require("axios");
// const url = "http://localhost:1100/api/v1/notifications/";
const url = "https://buzz-servre.herokuapp.com/api/v1/notifications/"

// // generate otp
// const generateOTP = (min, max) => {
//   let randomNum = Math.random() * (max - min) + min;
//   return Math.floor(randomNum);
// };

// @======== Send OTP
export function send_otp(payload,otp) {
  var data = JSON.stringify({
    phone: payload.phone,
    otp
  });

  var config = {
    method: "post",
    url: `${url}send-otp`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

// @========  BUZZ ALERT
export function send_buzz_alert(payload) {
  var data = JSON.stringify({
    phone: payload.phone,
    sender: payload.sender,
    amount: payload.amount,
    desc: payload.desc,
    balance: payload.balance,
  });

  var config = {
    method: "post",
    url: `${url}send-buzz-alert`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

// !======== GENERAYE CASH BACK
export function generate_cashback(payload) {
  var data = JSON.stringify({
    phone: payload.phone,
    token: payload.token,
    amount: payload.amount,
  });

  var config = {
    method: "post",
    url: `${url}send-generate-cashback-alert`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

// !======== RESOLVE CASHBACK
export function resolve_cashback(payload) {
  var data = JSON.stringify({
    phone1: payload.phone1, // who resolved
    phone2: payload.phone2,  // who created
    amount: payload.amount,
    name: payload.name,
    bal1: payload.bal1,  // who created
    bal2: payload.bal2,  // who created
  });

  var config = {
    method: "post",
    url: `${url}send-resolve-cashback-alert`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

// @========  BENEFITED FROM GIVEAWAY
export function benefit_from_giveaway(payload) {
  var data = JSON.stringify({
    phone: payload.phone,
    name: payload.name,
    amount: payload.amount,
    bal: payload.bal,
  });

  var config = {
    method: "post",
    url: `${url}send-giveaway-benefited-alert`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

// @======== BUZZ REQUEST ALERT
export function buzz_request(payload) {
  var data = JSON.stringify({
    phones: payload.phones, // array[]
    sender: payload.sender,
    amount: payload.amount,
    desc: payload.desc,
  });

  var config = {
    method: "post",
    url: `${url}send-buzz-request-alert`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

// @======== BENEFITED FROM GIVEAWAY
export function giveawaybefefit(payload) {
  var data = JSON.stringify({
    phones: payload.phone,
    name: payload.name,
    amount: payload.amount,
  });

  var config = {
    method: "post",
    url: `${url}send-giveaway-benefited-alert`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
