import md5 from "md5";

export const API_URL ='https://buzz-servre.herokuapp.com/images/tickets/'
  // 'http://localhost:2001/images/tickets/'
  // "https://qwtxgoxfoytosibklxtt.supabase.in/storage/v1/object/public";

export const error = (msg) => {
  return {
    success: false,
    message: msg,
    data: [],
  };
};

export const success = (msg, data) => {
  return {
    success: true,
    message: msg,
    data,
  };
};

// months abbr
export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

// action duration tracker
export const commentDuration = (commentedTime) => {
  // //Get 1 day in milliseconds
  // var one_day = 1000 * 60 * 60 * 24;
  // console.log(commentedTime)
  // // Convert both dates to milliseconds
  // var date1_ms = commentedTime.getTime();
  // var date2_ms = new Date().getTime();
  // // Calculate the difference in milliseconds
  // var difference_ms = date2_ms - date1_ms;
  // //take out milliseconds
  // difference_ms = difference_ms / 1000;
  // var seconds = Math.floor(difference_ms % 60);
  // difference_ms = difference_ms / 60;
  // var minutes = Math.floor(difference_ms % 60);
  // difference_ms = difference_ms / 60;
  // var hours = Math.floor(difference_ms % 24);
  // var days = Math.floor(difference_ms / 24);
  // let duration = "";
  // if (days < 1 && hours < 1 && minutes < 1) {
  //   duration = "Just now";
  // } else if (days < 1 && hours < 1 && minutes > 0) {
  //   duration = minutes + "m";
  // } else if (days < 1 && hours > 0) {
  //   duration = hours + "h";
  // } else if (days > 0) {
  //   duration = days + "d";
  // } else {
  //   duration =
  //     monthNames[commentedTime.getMonth()] +
  //     " " +
  //     commentedTime.getDate() +
  //     " " +
  //     commentedTime.getFullYear();
  // }
  // return duration;
};

// @============== shuffle
// generate code
String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};

// @==============  GENERATE CODE

// generate otp
export const generateOTP = (min, max) => {
  let randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
};

export const code = (baseInt) => {
  const radm =
    baseInt +
    "00938475846653425463775645246475993746738746738767387467389123214536765342435475867463544879800498769938576368599474896094836352425364758696907006" +
    baseInt.shuffle();
  const radm2 = radm.shuffle() + baseInt;
  const newRnd = generateOTP(1000101, 9999191) + radm2 + radm.shuffle();

  let radm3 = newRnd.substring(3, 400).shuffle();
  const radm4 = radm3.shuffle().substring(3, 300).shuffle();

  const radm5 = radm4.shuffle().substring(3, 200).shuffle();

  const radm6 = radm5.shuffle().substring(3, 100).shuffle();
  const radm7 = radm6.shuffle().substring(3, 50).shuffle();
  const radm8 = radm7.shuffle().substring(3, 25).shuffle();
  const radm9 = radm8.shuffle().substring(3, 15).shuffle();
  const radm10 =
    newRnd.substring(3, 400) +
    new Date().getTime() +
    radm9.shuffle().substring(3, 13).shuffle();
  const challengeCode = radm10.substring(3, 11).shuffle();
  return baseInt[7] + baseInt[8] + challengeCode;
};

// @============  VALIDATE EMAIL
export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// @============= VALIDATE EMAIL
export function validatePhoneNumber(input_str) {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(input_str);
}

//  !======================   export all universities
export function allUniversities() {
  let schools = [
    {
      label: "Abia State University",
      value: "ABSU743",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHdH3gz7YNpstzvlAFprJdWFiM6Qc3_2QTSQ&usqp=CAU",
    },
    {
      label: "Akwa Ibom State University",
      value: "AKSU473",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJIkSpTrg_boLQgdYC0x0jAmddQdR-tYo_4nrTM_fzYZc8EyDLMgOUSYFGbKighNHKbpA&usqp=CAU",
    },
    {
      label: "Ahmadu Bello University",
      value: "ABU417",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFG-AWrNo_hgft1vgdmCmK-0kAn1NMjg3bg&usqp=CAU",
    },
    {
      label: "Anambra State University",
      value: "ANSU718",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXnMIUbMk_raRTpNtODSWixJ-doqdprTR_0YAC71VyxX5nNoISTZ1gOiyuncuB45nXjhU&usqp=CAU",
    },
    {
      label: "Ajayi Crowther University",
      value: "ACU839",
      img: "https://i1.wp.com/www.yabacampus.com/wp-content/uploads/2020/06/AJCU.jpg?fit=398%2C330&ssl=1",
    },
    {
      label: "Bells University of Technology",
      value: "BUT214",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu96XSrZ2wifrhB7t2kc-6oE6qtDxtT-o5zzr3tGZFL5eeJY8BBQHoPe4lu_E4YoMehWU&usqp=CAU",
    },
    {
      label: "Benue State University",
      value: "BSU835",
      img: "https://i2.wp.com/www.realmina.com/wp-content/uploads/2019/11/bsu.jpg?resize=268%2C180&ssl=1",
    },
    {
      label: "Bowen University",
      value: "BU927",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGUXm8_EUbqJUJtB1eA_asrn1xHmbgFdStxRu0u4MtLZ37wy9vOEj-KkEjjzinytW51Os&usqp=CAU",
    },
    {
      label: "National Open University of Nigeria",
      value: "NOUN503",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqhRwC1NX3ScBPr_w-pjNSDdTSPWHWOxU5DLG8eSiYc67GPCCqvj82dQ3CtjYRrpPJoU&usqp=CAU",
    },
    {
      label: "Cross River University of Technology",
      value: "CRUTECH532",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKt5vnjefOJc3hvqzmx63VrQnmVMpOL3OuyF8yRMit76pyRCpmsdRmZUsfodFVrUso4I&usqp=CAU",
    },
    {
      label: "Delta State University Abraka",
      value: "DELSU096",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOU8RRmw8qSAJeNHdixmOnNdU5BKEWhtDgU7xYlSnFxMG49AY-xpw4Gt35HmcLZTxmMGo&usqp=CAU",
    },
    {
      label: "Ebonyi State University",
      value: "EBSU315",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0jmbMI6ibkvJd09Y679xiO4pGRci4ioOZkocS3V0VvkOCdMY93XLem3TSNU-63eGxm5s&usqp=CAU",
    },
    {
      label: "Federal University of Technology",
      value: "FUTA194",
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/FUTO_logo.png/220px-FUTO_logo.png",
    },
    {
      label: "Gregory University Abia",
      value: "GUA520",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMca2VFnYiQhKk3tnjxceuYJx07wETcKwnWyaN9OPCgifaHCQF0uaGY56Fv2qcuxvirpk&usqp=CAU",
    },
    {
      label: "Lagos State University",
      value: "LASU324",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rt5cdQUTVbdRInIJOCj74_BIoqunsoHcJEoXfmidWfCh9BKncBiYR6lqiF2O8LqID74&usqp=CAU",
    },
    {
      label: "Taraba State University",
      value: "TSU987",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8us8pn9f2vx_e1dqfqdjQ75O13uI-DLEG2OyCv6Atp5D0uK6-yAQvcBoh0YjVCyBPy4&usqp=CAU",
    },
    {
      label: "University of Benin",
      value: "UNIBEN519",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQYz3yCABd2tIpJkG1FZwBtTHMiWje0hcBHQ&usqp=CAU",
    },
    {
      label: "University of Calabar",
      value: "UNICAL893",
      img: "https://i1.wp.com/educeleb.com/wp-content/uploads/2017/09/UNICAL.jpg?fit=400%2C300&ssl=1",
    },
    {
      label: "University of Ibadam",
      value: "UI213",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtERBuJvMuaQ8jx-AsQv9KPDp8skS3JjJr5mEQoxnCCiceJ-ZCLkhF5ER6Xd3xLqhIuI&usqp=CAU",
    },
    {
      label: "University of Lagos",
      value: "UNILAG065",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0XXWNPvlcr0LChbWjut165rWG_CHbWs7NYtmEH36xRtX3-eReQdczsY-to0AwHbHbqcY&usqp=CAU",
    },
    {
      label: "University of Port Harcourt",
      value: "UNIPORT629",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTLOvE2bFVW7qeppl9K-DHLuSXnLJTAgcR3qGh1MU4g-czQo3sIvTdwr_i7hCLrAmDFY&usqp=CAUhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTLOvE2bFVW7qeppl9K-DHLuSXnLJTAgcR3qGh1MU4g-czQo3sIvTdwr_i7hCLrAmDFY&usqp=CAU",
    },
    {
      label: "University of Nigeria Nsuka",
      value: "UNN874",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyDQArkPTze46T73EUm_-XQwqZUykg3bFt_29x80vq6EmzKDHCiyasQusTi8dbHlQICs&usqp=CAU",
    },
    {
      label: "University of Uyo",
      value: "UNIUYO684",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-MxTv9iLuj0aCJzYRG7CSEHg_zj94IhrdjZeTtiIiKuyUIOGn1Iyvd713AtKWyn8WaEo&usqp=CAU",
    },
    {
      label: "University of Jos",
      value: "UNIJSO189",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkeqAn7WuJczOU0WHFMIUQ9B6PSAir4LPaFQ_qMxO2UZMnnp5uGCS5AJSPSAh-y3wWL0&usqp=CAU",
    },
    {
      label: "University of Ilorin",
      value: "UNILORIN927",
      img: "https://nigerianfinder.com/wp-content/uploads/2018/02/unilorin-logo-347x300.jpg",
    },
    {
      label: "University of Education Rivers State",
      value: "UOE948",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8zkbBbzIaLJIMxpCroR-SXge8lvhUwNFRG_vgKBVELURkoHe178hsTVZPTo3hO7B2qOA&usqp=CAU",
    },
    {
      label: "Rivers State University",
      value: "RSU7405",
      img: "https://tethys-engineering.pnnl.gov/sites/default/files/styles/large/public/taxonomy-images/riversstate.png?itok=Y8Oyls7d",
    },
  ];
  return schools;
}

// @======== GENERATE BENEFICIARY ID FOR EVERY SIGNUP'
export function beneficaryID(fullname, email, phone, password) {
  return md5(fullname + email + phone + password + new Date().getTime())
    .replace(/[^0-9]/g, "")
    .substr(0, 10);
}

// @======== GENERATE CODES FOR CASHBACK
export function cashbackRegEx(benID, phone, email, password, amount) {
  return md5(benID + phone + email + password + amount + new Date().getTime())
    .replace(/[^0-9]/g, "")
    .substr(0, 6);
}

// @======== CASHBACK chargeCENTAGES
export function cashbackchargecentage(amount) {
  let charge = "";
  if (amount > 99 && amount < 5001) {
    charge = 80;
  } else if (amount > 5000 && amount < 10001) {
    charge = 160;
  } else if (amount > 10000 && amount < 15001) {
    charge = 240;
  } else if (amount > 15000 && amount < 20001) {
    charge = 320;
  } else if (amount > 20000 && amount < 25001) {
    charge = 400;
  } else if (amount > 25000 && amount < 30001) {
    charge = 480;
  } else if (amount > 30000 && amount < 35001) {
    charge = 560;
  } else if (amount > 35000 && amount < 40001) {
    charge = 640;
  } else if (amount > 40000 && amount < 45001) {
    charge = 720;
  } else if (amount > 45000 && amount < 50001) {
    charge = 800;
  } else if (amount > 50000 && amount < 55001) {
    charge = 880;
  } else if (amount > 55000 && amount < 60001) {
    charge = 960;
  } else if (amount > 60000 && amount < 65001) {
    charge = 1040;
  } else if (amount > 65000 && amount < 70001) {
    charge = 1120;
  } else if (amount > 70000) {
    charge = 1500;
  }
  return charge;
}

export function notificationAlert(state) {
  if (state.notification === true) {
    return true;
  } else {
    return false;
  }
}

//  get current time
export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

// get days of the week
export function daysOfTheWeek(date) {
  var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  var d = new Date(date);
  var dayName = days[d.getDay()];
  return dayName;
}

// get curewnt month
export function monthsOfTheYear() {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date();
  return monthNames[d.getMonth()];
}

export const coinsPercentage = (amount, state) => {
  console.log(state);
  let coin = (1 * amount) / 100;
  let newCoin = parseInt(state.user.meta.buzzcoin + parseInt(coin));
  return {
    totalcoin: newCoin,
    gained: coin,
  };
};
