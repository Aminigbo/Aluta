import { supabase } from "../configs/index"

const new_supabase = supabase()

// @============= CHECK IF USER EXISTS
export async function userExists(email,phone) {
   return new_supabase.from("user").select("*")
}

// .or(`email.eq.${email},phone.eq.${phone}`)
// @=========== REGISTER USER
export async function createUser() {
   
}


// @==============  LOGIN USER
export async function signInUser() {
   
}

