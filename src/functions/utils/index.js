import { PermPhoneMsg } from "@material-ui/icons";

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


 