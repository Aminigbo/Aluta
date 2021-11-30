import { supabase } from "../configs/index";

const new_supabase = supabase();

// @======== CHECK IF USER EXISTS
export async function userExists(email, phone) {
  return new_supabase
    .from("users")
    .select("*")
    .or(`email.eq.${email},phone.eq.${phone}`);
}

// @======== AUTH USER
export async function createUser(email, password) {
  return new_supabase.auth.signUp({
    email,
    password,
  });
}

//@========  SAVE USER DATA TO PUBLIC USER TABLE
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

// @======== LOGIN USER
export async function signInUser(email, password) {
  return new_supabase.auth.signIn({
    email,
    password,
  });
}

// @======== CREATE comment
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

// @======== FETCH ALL FEEDS
export async function fetchAllFeeds(payload) {
  return new_supabase
    .from("feeds")
    .select(
      `*, comments(*), post_likes(*), unlikes(*), giveaway-lucky-winners(*)`
    );
  // .eq("school", payload);
}

// @======== GET USERS OF A PARTICULAY UNIVERSITY
export async function fetchUsersOfUniversity(payload, userId) {
  return new_supabase.from("users").select("*").neq("id", userId);
  // .contains("meta", { school: payload });
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
    })
    .catch((error) => {
      return {
        error: true,
        message: "A network error occured",
      };
    });
}

// @======== ADD UNLIKE
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
    })
    .catch((error) => {
      return {
        error: true,
        message: "A network error occured",
      };
    });
}

export async function updateUserMeta(payload) {
  let { email, newUser } = payload;
  console.log(email);
  return new_supabase
    .from("users")
    .update([{ meta: newUser }])
    .eq("email", email)
    .then((res) => {
      console.log(res);
      if (res.body == null) {
        if (res.error.message == "JWT expired") {
          return {
            success: false,
            message: "auth error",
          };
        } else {
          return {
            success: false,
            message: "A network error occured",
          };
        }
      } else {
        return {
          success: true,
          message: "successful",
        };
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error,
      };
    });
}

//  @======== fetch user profile
export async function fetchUserProfile(payload) {
  return new_supabase.from("users").select(`*, feeds(*)`).eq("id", payload);
}

// @======== INSERT FEEDS TO DATABASE
export async function insertFeeds(payload) {
  return new_supabase.from("feeds").insert([
    {
      feed_id: payload.postId,
      poster: payload.poster,
      posterId: payload.poster.id,
      school: payload.school,
      data: payload,
      time: payload.time,
      privacy: payload.setPostPrivacy,
    },
  ]);
}

// @======== INSERT INTO BUCKET
export async function storageInsert(filePath, file) {
  return new_supabase.storage.from("posts").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });
}

// @======== GET THE NUMBER OF USERS WHO BENEFITED FROM A PERTICULAR GIVEAWAY
export async function allWhoBenefited(payload) {
  return new_supabase
    .from("giveaway-lucky-winners")
    .select("*")
    .eq("post", payload);
}

// @======== RECORD THOS WHO BENEFITED FROM GIVEAWAY TO DATABASE
export async function saveGiveawayBeneficiary(payload) {
  return new_supabase.from("giveaway-lucky-winners").insert([
    {
      post: payload.postId,
      luckywinner: payload.luckyWinner,
      giver: payload.poster,
      meta: payload,
      beneficiaryId: payload.luckyWinner.beneficiary,
    },
  ]);
}

// @========  RECORD THE CASHBACK GENERATED TO DATABASE
export async function saveCashBack(payload) {
  return new_supabase.from("cashback").insert([
    {
      token: payload.token,
      meta: payload.meta,
      user: payload.user,
    },
  ]);
}

// @======== VERIFY CASHBACK TOKEN
export async function verifyCashbackToken(payload) {
  return new_supabase
    .from("cashback")
    .select("*")
    .eq("token", payload)
    .eq("isActive", true);
}

// @======== DEACTIVATE TOKEN
export async function deactivateToken(payload, data) {
  return new_supabase
    .from("cashback")
    .update({
      isActive: false,
      meta: data,
    })
    .eq("token", payload);
}

// @======== CHECK IF USER ALREADY BENEFITED FROM THE GIVE AWAY
// @======== IF USER BENEFITED,RETURN TRUE ELSE RETURN FALSE
export async function userBenefited(payload) {
  return new_supabase
    .from("giveaway-lucky-winners")
    .select("*")
    .eq("beneficiaryId", payload)
    .then((res) => {
      if (res.body.length > 0) {
        return true;
      } else {
        return false;
      }
    });
}

// sync dp
export async function syncDB() {
  return new_supabase
    .from("comments")
    .delete()
    .then((del) => {
      return new_supabase
        .from("feeds")
        .delete()
        .then((del2) => {
          return new_supabase
            .from("post_likes")
            .delete()
            .then((del3) => {
              return new_supabase
                .from("unlikes")
                .delete()
                .then((del4) => {
                  return new_supabase
                    .from("buz-me")
                    .delete()
                    .then((del5) => {
                      return {
                        message: "done",
                      };
                    });
                });
            });
        });
    });
}

// @======== INSERT TO NOTIFICATION
export async function insertNotification(payload) {
  return new_supabase.from("notifications").insert([
    {
      from: payload.sendeId,
      to: payload.recieverId,
      meta: payload.meta,
      type: payload.type,
    },
  ]);
}

// @======== GET ALL BUZZ ME REQARDING TO A USER
export async function allBuzMe(userId) {
  return new_supabase
    .from("buz-me")
    .select("*")
    .or(`from.eq.${userId},to.eq.${userId}`);
}

// @========  FETCH ALL USER'S NOTIFICATION
// @======== VERIFY CASHBACK TOKEN
export async function fetchNotification(payload) {
  return new_supabase.from("notifications").select("*").eq("to", payload).order('id', { ascending: false })
}
