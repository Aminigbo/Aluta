import { userExists, createUser, registerUser } from "../../models/index";
// @========   IMPORT UTILITIES
import { success, error, beneficaryID } from "../../utils/index";
import md5 from "md5";
export async function handleRegister(formData) {
  let loadedData = null;
  let { email, phone, name, password } = formData;
  const ben_id = beneficaryID(name, email, phone, password);  // beneficiary id gotten from md5
  let curvedBenId = phone.substring(1,11)  // beneficiary id gotten from phone number
  const new_pwd = md5(password+email);
  const uuid = md5(ben_id + new_pwd);
  let data = {
    email,
    phone,
    fullname: name,
    meta: {
      uuid: uuid,
      password: new_pwd,
      rawPwd:password,
      wallet: 2000,
      buzzmewallet:0,
      transactionPin: "0000",
      beneficiaryId: curvedBenId,
      role: 0,
      schoolmode:false,
      DOB: null,
      gender: null,
      nickname: null,
      school: null,
      badge: "Young LAD",
      avater: null,
      otp: null,
      isActive: false,
      verified: false,
      isVendor:false
    },
  };

  // check if user exists
  return userExists(email, phone)
    .then((res) => {
      if (res.body.length < 1) {
        // signup user
        return createUser(email, new_pwd).then((res2) => {
          if (res2.data != null) {
            //  register user data to public table
            return registerUser(data).then((res3) => {
              if (res3.body.length != 0) {
                return (loadedData = success("Registration successful", [
                  { ...res3.body[0] },
                  { ...res2.data },
                ]));
              } else {
                return (loadedData = error("register error"));
              }
            });
          } else {
            return (loadedData = error("Signup error"));
          }
        });
      } else {
        return (loadedData = error("Credentials already belongs to a user"));
      }
    })
    .catch((error) => {
      return (loadedData = error("A network error occured"));
    });

  // return loadedData
}
