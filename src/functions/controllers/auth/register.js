import {userExists} from "../../models/index"
// @========   IMPORT UTILITIES
import { success, error } from "../../utils/index"; 

export async function handleRegister(formData) {
   let loadedData = null
   let {email, phone} = formData
   userExists(email,phone).then(res => {
     console.log(res)
   })
   
    return loadedData = success("Registration successful", [{name:"Paul"}])
}
