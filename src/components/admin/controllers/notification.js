export const mySubscription = (supabase,withdrawalRequestNoti) => { 
      supabase
      .from(`withdrawal:status=eq.pending`)
       .on('INSERT', payload => {
          withdrawalRequestNoti([payload.new])
          console.log(payload)
      })
      .subscribe()
   
}
   
export const check = (supabase,withdrawalRequestNoti) => {
      supabase.from("withdrawal").select("*").eq("status", "pending").then(res => {
         // console.log(res.body)
         if (res.body.length > 0) {
            withdrawalRequestNoti([res.body[0]])
         } else {
            withdrawalRequestNoti([])
         }
      })
   }