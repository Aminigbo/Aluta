import { supabase } from "../configs/index";

const new_supabase = supabase();

// @============= CHECK IF USER EXISTS
export async function userExists(email, phone) {
  return new_supabase
    .from("users")
    .select("*")
    .or(`email.eq.${email},phone.eq.${phone}`);
}

// @=========== AUTH USER
export async function createUser(email, password) {
  return new_supabase.auth.signUp({
    email,
    password,
  })
}

// SAVE USER DATA TO PUBLIC USER TABLE
export async function registerUser(data) {
  let { fullname, phone, email, meta } = data;
  return new_supabase.from("users").insert([
    {
      fullname,
      phone,
      email,
      meta,
    },
  ]);
}

// @==============  LOGIN USER
export async function signInUser(email, password) {
  return new_supabase.auth.signIn({
        email,
        password,
      });
}



// @=================  CREATE comment
export async function addComments(payload) {
  let { post, comment_id, user, comment, meta } = payload;
  return new_supabase.from("comments").insert([
    {
      post: payload.post,
      comment: payload.comment,
      comment_id: payload.comment_id,
      user: payload.user,
      meta: payload.meta,
    },
  ]);
}

// @====================================   FETCH ALL FEEDS
export async function fetchAllFeeds(payload) {
  return new_supabase
    .from("feeds")
    .select(`*, comments(*), post_likes(*), unlikes(*)`)
    // .eq("school", payload);
}

// @============  GET USERS OF A PARTICULAY UNIVERSITY
export async function fetchUsersOfUniversity(payload) {
  return new_supabase
    .from("users")
    .select("*")
    .contains("meta", { school: payload });
}

export async function addLikes(payload) {
  return new_supabase
    .from("post_likes")
    .select("*")
    .eq("post", payload.post)
    .eq("userId", payload.userId)
    .then((res) => {
      if (res.body.length < 1) {
        // @==============   add like
        return new_supabase.from("post_likes").insert([
          {
            fullname: payload.fullname,
            post: payload.post,
            user_data: payload.user_data,
            userId: payload.userId,
          },
        ]);
      } else {
        // @===== remove like
        return new_supabase
          .from("post_likes")
          .delete()
          .eq("post", payload.post)
          .eq("userId", payload.userId);
      }
    }).catch(error => {
      return {
        error: true,
        message:"A network error occured"
      }
    })
}

// @====== ADD UNLIKE
export async function addUnlike(payload) {
  return new_supabase
    .from("unlikes")
    .select("*")
    .eq("post", payload.post)
    .eq("userId", payload.userId)
    .then((res) => {
      if (res.body.length < 1) {
        // @==============   add like
        return new_supabase.from("unlikes").insert([
          {
            fullname: payload.fullname,
            post: payload.post,
            user_data: payload.user_data,
            userId: payload.userId,
          },
        ]);
      } else {
        // @===== remove like
        return new_supabase
          .from("unlikes")
          .delete()
          .eq("post", payload.post)
          .eq("userId", payload.userId);
      }
    }).catch(error => {
      return {
        error: true,
        message:"A network error occured"
      }
    })
}

export async function updateUserMeta(payload) {
  let {email, newUser } = payload;

  return new_supabase.from("users").update([{ meta: newUser }]).eq("email", email).then(res => {console.log(res)
    if (res.body == null) {
      return {
        success: false,
        message:"A network error occured"
      }
    } else {
      return {
        success: true,
        message:"successful"
      }
    }
  }).catch(error => {
     return {
        success: false,
        message:error
      }
  })

  
}


 
//  @============  fetch user profile
export async function fetchUserProfile(payload) {
  return new_supabase.from("users").select(`*, feeds(*)`).eq('id', payload)
}