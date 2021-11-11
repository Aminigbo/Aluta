// import { supabase } from '../../configurations/index';
// const newSupabase = supabase()

export const register = (setStates) => {
   setStates({loader: true }) 
   return "Hello"
   // return newSupabase
   //    .from('user')
   //    .select('username,phone')
   //    .eq('phone', phone)
   //    .then(response => {
   //       if (response.body === null) {
   //          newSupabase
   //          .from('user')
   //          .insert([
   //             { fullname: '', username: username,user_id:'2345r35kjl',phone:phone,dob:dob,gender:'',password:password },
   //          ])
   //          .then(insertResponse => {
               
   //             return 'insertResponse'
   //          })
   //       }
   //    })
}
