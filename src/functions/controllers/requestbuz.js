import { supabase } from "../configs/index";
import { error, success,formatAMPM,daysOfTheWeek, monthsOfTheYear } from "../utils/index";

let new_supabase = supabase();

// CREATE POST
export async function handleCreateRequest(payload, state) {
  let { gender, school } = state.loggedInUser.user.meta;
  let name = state.loggedInUser.user.fullname;
  let id = state.loggedInUser.user.id;
  let beneficiaryId = state.loggedInUser.user.meta.beneficiaryId;
  let postId = new Date().getTime() + "@" + id + "@" + new Date().getTime();
  let poster = {
    name,
    school,
    gender,
    id,
    beneficiaryId,
  };

  // @====================  CHECK IF USER IS POSTING WITH IMAGE
  let setPostPrivacy = payload.postPrivacy;

  let new_payload = { ...payload, poster, id: postId, setPostPrivacy };
  // !====user is not posting with image
  console.log(setPostPrivacy.privacy);

  if (setPostPrivacy.privacy == "LISTED") {
    for (let i = 0; i < setPostPrivacy.sendTo.length; i++) {
      console.log(new_payload);
      const element = setPostPrivacy.sendTo[i];
      let meta = {
        sender: {
          fullname: new_payload.poster.name,
          id: new_payload.poster.id,
          beneficiaryId: new_payload.poster.beneficiaryId,
        },
        reciever: {
          fullname: element.label,
          beneficiaryId: element.value,
          id: element.id,
        },
        data: {
          desc: new_payload.postText,
          amount: new_payload.post.meta.payload.amount,
        },
        date: {
          day: daysOfTheWeek(new Date()),
          month: monthsOfTheYear(),
          year: new Date().getFullYear(),
          date: new Date().getDate(),
          time: formatAMPM(new Date()),
        },
      };

      new_supabase
        .from("notifications")
        .insert([
          {
            from: id,
            meta: meta,
            to: element.id,
            type: "BUZZ REQUEST",
          },
        ])
        .then((res33) => {});
    }
  }

  return new_supabase
    .from("buzz-request")
    .insert([
      {
        from: id,
        meta: new_payload,
        to: setPostPrivacy.sendTo,
      },
    ])
    .then((res) => {
      if (res.body === null) {
        return error(
          "Your operation could not be completed due to network error."
        );
      } else {
        return success("You have successfully placed a Buz request. ", {
          success: true,
        });
      }
    })
    .catch((err) => {
      return error(
        "Your operation could not be completed due to network error."
      );
    });
}
