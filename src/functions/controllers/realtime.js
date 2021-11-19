import { supabase } from "../configs/index";

const new_supabase = supabase();

export async function buzSubscription(beneficiaryId) {
  return new_supabase
    .from(`buz-me:to=eq.${beneficiaryId}`)
    .on("INSERT", (payload) => {
      return [payload.new];
    })
    .subscribe();
}
