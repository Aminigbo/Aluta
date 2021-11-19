import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../configs/index";
import { error, success } from "../utils/index";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/material/IconButton";
// import MoreVertIcon from '@mui/icons-material/IconButton';
import Skeleton from "@mui/material/Skeleton";
import { Avatar, Typography } from "@mui/material";
import { likedPost } from "./likes";
import {
  FavoriteBorderOutlined,
  CommentOutlined,
  ThumbDownOutlined,
  PublicOutlined,
  MoreHorizOutlined,
  PostAdd,
} from "@material-ui/icons";

import { commentDuration, API_URL } from "../utils/index";

import { fetchAllFeeds } from "../models/index";

let new_supabase = supabase();

// fetch feeds from database
export async function returnFeeds(
  school,
  loadFeeds,
  disp_signal,
  setStates,
  compState
) {
  setStates({ ...compState, loader: true });
  fetchAllFeeds(school)
    .then((res) => {
      let arry = [];
      if (res.body != null) {
        res.body.map((posts) => {
          let new_feeds = {
            ...posts.data,
            comments: posts.comments,
            likes: posts.post_likes,
            unlikes: posts.unlikes,
            feed_id: posts.data.id,
            id: posts.id,
          };
          arry.push(new_feeds);
        });
        loadFeeds(arry);
        disp_signal(true);
        setStates({ ...compState, loader: false });
      } else {
        disp_signal(false);
        setStates({ ...compState, loader: false });
      }
    })
    .catch((error) => {
      disp_signal(false);
      setStates({ ...compState, loader: false });
    });
}

export async function fetchFeeds(loadFeeds) {}

//  respond to all Buz request
const respondToBuzRequest = (
  amount,
  giverWallet,
  walletAdd,
  beneficiary,
  giverPin,
  requestId,
  giverUsername,
  beneficiaryUsername
) => {
  if (
    window.confirm(
      `${amount} Buz will be deducted from your wallet balance. Do you wish to continue?`
    )
  ) {
    if (amount > giverWallet) {
      alert("You have insufficient wallet balance");
    } else {
      let giverNewWallet = parseInt(giverWallet) - parseInt(amount);
      new_supabase
        .from("user")
        .select("*")
        .eq("OgPin", beneficiary)
        .then((fetch_bene) => {
          let beneficiaryNewWallet =
            parseInt(fetch_bene.body[0].wallet) + parseInt(amount); // add the requested ammount to the requester's wallet
          console.log(fetch_bene);
          new_supabase
            .from("user")
            .update([{ wallet: giverNewWallet }])
            .eq("OgPin", giverPin)
            .then((buzzed) => {
              // deduct from giver's wallet

              new_supabase
                .from("user")
                .update([{ wallet: beneficiaryNewWallet }])
                .eq("OgPin", beneficiary)
                .then((buzzed) => {
                  // add to requester wallet

                  walletAdd(giverNewWallet); // update giver's wallet state
                  alert("Successful");
                });
            });

          // add giver to the request response array
          new_supabase
            .from("requsts")
            .select("*")
            .eq("id", requestId)
            .then((req) => {
              let responseData = { name: giverUsername, amount, giverPin };
              console.log(req);
              let oldResponses = req.body[0].meta.response;
              oldResponses.push(responseData);
              let newMeta = { ...req.body[0].meta, response: oldResponses };

              // update response data
              new_supabase
                .from("requsts")
                .update([{ meta: newMeta }])
                .eq("id", requestId)
                .then((updated) => {
                  let meta = {
                    sender: {
                      username: giverUsername,
                      OgPin: giverPin,
                    },
                    reciever: {
                      username: beneficiaryUsername,
                      OgPin: beneficiary,
                    },
                    data: {
                      amount,
                      desc: `From your Buz request of ${amount}`,
                    },
                  };

                  new_supabase
                    .from("boxme")
                    .insert([{ from: giverPin, to: beneficiary, meta }])
                    .then((insertResponse) => {
                      console.log("updated response");
                    });
                });
            });
        });
    }
  } else {
    // Do nothing!
    console.log("Thing was not saved to the database.");
  }
};

export function ALLPOSTS(props) {
  const {
    loading = false,
    data,
    handleUnlikes,
    handleLike,
    history,
    toggleDrawer,
    state,
  } = props;

  let label = "";

  if (data.postType == "GIVE AWAY" && data.post.meta.giveaway.amount != null) {
    label = `GIVE AWAY  -  NGN ${data.post.meta.giveaway.amount}`;
  } else if (data.postType == "POST") {
  } else if (data.postType == "EVENT") {
    label = `EVENT  -   ${data.post.meta.event.date} |  ${data.post.meta.event.time}`;
  }
  return (
    <Card
      style={{ width: "100%", marginLeft: "0px", borderRadius: "0px" }}
      sx={{ m: 2 }}
    >
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar
              onDoubleClick={() => {
                console.log("hello");
              }}
              alt="Ted talk"
              src={data.poster.avater}
            />
          )
        }
        action={
          loading ? null : (
            <>
              {" "}
              {/* <MoreHorizOutlined style={{ fontSize: " 30px" }} />{" "} */}
            </>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <Link className="link" to="">
              <b>{data.poster.name}</b>
            </Link>
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            <>
              {" "}
              <small>@{data.poster.school}</small>{" "}
              <span style={{ fontSize: "12px" }}>
                {" "}
                &nbsp;&nbsp;
                {commentDuration(data.post.time)}
              </span>
              .<PublicOutlined style={{ fontSize: "15px" }} /> <br />
              <b style={{ color: "black", fontSize: "14px" }}>{label}</b> <br />
            </>
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <div>
          {data.post.photo != null && (
            <CardMedia
              onClick={() => {
                history.push(`/reaction/${data.id}`);
              }}
              component="img"
              // height="220"
              image={`${API_URL}/${data.post.photo}`}
              alt="image"
            />
          )}
        </div>
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="text.secondary" component="p">
            <b>
              <Link className="link">@{data.poster.name} </Link>
            </b>
            &nbsp; &nbsp;
            <span
              onClick={() => {
                history.push(`/reaction/${data.id}`);
              }}
              style={{ fontFamily: "" }}
            >
              {data.post.text}
            </span>
            <br />
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                position: "relative",
                width: "40px",
                height: "40px",
                background: " ",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              &nbsp;{" "}
              <FavoriteBorderOutlined
                style={{
                  color: likedPost(data.likes, state) == true ? "red" : "",
                }}
                onClick={() => {
                  handleLike(data.id);
                }}
              />
              <span style={{ fontSize: "11px" }}>{data.likes.length}</span>
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                position: "relative",
                width: "40px",
                height: "40px",
                background: " ",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              &nbsp;{" "}
              <ThumbDownOutlined
                style={{
                  color: likedPost(data.unlikes, state) == true ? "red" : "",
                }}
                onClick={() => {
                  handleUnlikes(data.id);
                }}
              />
              <span style={{ fontSize: "11px" }}>{data.unlikes.length}</span>
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                position: "relative",
                width: "40px",
                height: "40px",
                background: " ",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              &nbsp;{" "}
              <CommentOutlined
                onClick={() => {
                  history.push(`/reaction/${data.id}`);
                }}
              />
              <span style={{ fontSize: "11px" }}>{data.comments.length}</span>
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                position: "absolute",
                width: "55%",
                height: "40px",
                background: " ",
                textAlign: "left",
                display: "inline-block",
                marginLeft: "10px",
              }}
            >
              <small></small>
              <b className="link" style={{ float: "right", fontSize: "15px" }}>
                AMC - 110
              </b>
            </div>
          </Typography>
        )}
        {props.loading ? (
          ""
        ) : (
          <div
            style={{
              position: "relative",
              height: "44px",
              background: " #f0f0f0",
              borderRadius: "27px",
              padding: " 8px 13px",
              marginTop: "6px",
            }}
            onClick={toggleDrawer("bottom", true, { data })}
          >
            <span>Write a comment....</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// CREATE POST
export async function handleCreatePost(payload, state, loadFeeds, disp_draft) {
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
  let setPostPrivacy = "";
  if (payload.postType != "BUZ REQUEST") {
    setPostPrivacy = { privacy: "ALL" };
  } else {
    setPostPrivacy = payload.postPrivacy;
  }

  let new_payload = { ...payload, poster, id: postId, setPostPrivacy };
  if (payload.post.file === undefined) {
    // !====user is not posting with image
    return new_supabase
      .from("feeds")
      .insert([
        {
          feed_id: postId,
          poster: poster,
          posterId:id,
          school: poster.school,
          data: new_payload,
          time: JSON.stringify(payload.post.time),
          privacy: setPostPrivacy,
        },
      ])
      .then((res) => {
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
          return success("Done", { success: true });
        }
      })
      .catch((error) => {
        state.draft.push(new_payload);
        disp_draft(state.draft);
        return error(
          "Your operation could not be completed due to network error. Your post has been save to draft."
        );
      });
  } else {
    // @======   user is posting with image
    // @==========  AT THIS POINT, MAKE A AXIOS CALL TO THE BACKEND TO UPLOAD THE IMAGE AND REPLACE THE URL

    // if (payload.post.file === undefined) {
    // !====user is not posting with image
    let file = "";
    let fileExt = "";
    let fileName = "";
    let filePath = "";

    if (payload.post.file !== undefined) {
      file = payload.post.file;
      fileExt = file.name.split(".").pop();
      fileName = `${Math.random()}.${fileExt}`;
      filePath = `${fileName}`;
    }

    let new_payload = { ...payload, poster, id: postId, setPostPrivacy };
    return new_supabase.storage
      .from("posts")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((resAvater) => {
        if (resAvater.error === null) {
          console.log(resAvater);
          let newDataToUpload = {
            ...payload,
            post: { ...payload.post, photo: resAvater.data.Key },
            poster,
            id: postId,
            setPostPrivacy,
          };
          return new_supabase
            .from("feeds")
            .insert([
              {
                feed_id: postId,
                poster: poster,
                school: poster.school,
                posterId:id,
                data: newDataToUpload,
                time: JSON.stringify(payload.post.time),
                privacy: setPostPrivacy,
              },
            ])
            .then((res) => {
              if (res.body === null) {
                console.log(res);
                state.draft.push(newDataToUpload);
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
                return success("Done", { success: true });
              }
            });
        } else {
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
}
