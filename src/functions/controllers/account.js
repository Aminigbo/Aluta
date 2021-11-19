import { fetchUserProfile } from "../models/index"


export const getUserController = (payload) => {
   return fetchUserProfile(payload).then(res => {
     return res
   })
}