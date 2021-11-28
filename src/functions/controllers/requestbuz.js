import { supabase } from "../configs/index";
import { error, success } from "../utils/index";

let new_supabase = supabase();

// CREATE POST
export async function handleCreateRequest(
  payload,
  state,
  loadFeeds,
  disp_draft
) {
  let { gender, school } = state.loggedInUser.user.meta;
  let name = state.loggedInUser.user.fullname;
  let id = state.loggedInUser.user.id;
  let avater = state.loggedInUser.user.meta.avater;
  let postId = new Date().getTime() + "@" + id + "@" + new Date().getTime();
  let poster = {
    name,
    school,
    gender,
    id,
    avater,
  };

  // @====================  CHECK IF USER IS POSTING WITH IMAGE
  let setPostPrivacy = payload.postPrivacy;

  let new_payload = { ...payload, poster, id: postId, setPostPrivacy };
  // !====user is not posting with image
  return new_supabase
    .from("feeds")
    .insert([
      {
        feed_id: postId,
        poster: poster,
        posterId: id,
        school: poster.school,
        data: new_payload,
        time: JSON.stringify(payload.post.time),
        privacy: setPostPrivacy,
      },
    ])
    .then((res) => {
      console.log(res);
      if (res.body === null) {
        console.log(res);
        state.draft.push(new_payload);
        disp_draft(state.draft);
        return error(
          "Your operation could not be completed due to network error. Your post has been save to draft."
        );
      } else {
        let newData = {
          ...res.body[0].data,
          likes: [],
          unlikes: [],
          comments: [],
          success: true,
        };
        state.feeds.push(newData);
        loadFeeds(state.feeds);
        console.log(res.body[0]);

        console.log(setPostPrivacy.privacy);
        if (setPostPrivacy.privacy == "LISTED") {
          return new_supabase
            .from("buzz-request")
            .insert([
              {
                from: id,
                meta: new_payload,
                to: setPostPrivacy.sendTo,
              },
            ])
            .then((res33) => {
              return success("You have successfully placed a Buz request. ", {
                success: true,
              });
            });
        }
      }
    })
    .catch((error) => {
      state.draft.push(new_payload);
      disp_draft(state.draft);
      return error(
        "Your operation could not be completed due to network error. Your post has been save to draft."
      );
    });
}
