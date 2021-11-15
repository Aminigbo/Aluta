import { userExists, createUser, registerUser } from "../../models/index";
// @========   IMPORT UTILITIES
import { success, error, code } from "../../utils/index";

export async function handleRegister(formData) {
  let loadedData = null;
  let { email, phone, name, password } = formData;
  let data = {
    email,
    phone,
    fullname:name,
    meta: {
      password: password,
      wallet: 0,
      transactionPin: '0000',
      beneficiaryId: code(`${phone}${new Date().getTime()}`),
      role: 0,
      DOB: null,
      gender: null, 
      nickname: null,
      school: null,
      badge: "Young LAD",
      avater:null
    },
  };

  // check if user exists
  return userExists(email, phone).then((res) => {
    if (res.body.length < 1) {
      // signup user
      return createUser(email, password).then((res2) => {
        if (res2.data != null) {
          //  register user data to public table
          return registerUser(data).then((res3) => {
            if (res3.body.length != 0) { 
              
              return (loadedData = success("Registration successful", [
                {...res3.body[0]}, {...res2.data}
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
      return loadedData = error("Credentials already belongs to a user");
    }
  });

  // return loadedData
}
