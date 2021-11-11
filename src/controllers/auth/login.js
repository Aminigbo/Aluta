import { supabase } from '../../configurations/index';
const newSupabase = supabase()

export const login = (username,phone,dob,password) => {
   return newSupabase
      .from('user')
      .select('username,phone')
      .eq('phone', phone)
      .then(response => {
         // if (success.body.length == 0) {
            
         // }
         console.log(response);
      })
}
