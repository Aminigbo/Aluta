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
import { Avatar, Typography, Divider } from "@mui/material";
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

import {
  fetchAllFeeds,
  updateUserMeta,
  insertFeeds,
  storageInsert,
} from "../models/index";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
  Placeholder,
} from "cloudinary-react";

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
    .catch((err) => {
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
    label = `${data.post.meta.event.date} |  ${data.post.meta.event.time}`;
  }
  return (
    <Card
      style={{
        width: "100%",
        marginLeft: "0px",
        borderRadius: "0px",
        padding: "0px",
      }}
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
                {/* {commentDuration(data.post.time)} */}
              </span>
              .<PublicOutlined style={{ fontSize: "15px" }} /> <br />
              <b style={{ color: "black", fontSize: "14px" }}>
                {data.postType == "EVENT" && (
                  <div>
                    <b>{data.post.meta.event.title && data.post.meta.event.title}</b>
                  </div>
                )}
                {label}
              </b>{" "}
              <br />
            </>
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <div
          style={{}}
          onClick={() => {
            history.push(`/reaction/${data.id}`);
          }}
        >
          {data.post.photo != null && (
            // <Image
            //   cloudName="aluta-meta"
            //   secure={true}
            //   upload_preset="rx54xe0r"
            //   publicId={`${data.post.photo}`}
            //   dpr="auto"
            //   responsive
            //   width="auto"
            //     crop="fill"
            //   //   loading="lazy"

            //   responsiveUseBreakpoints="true"
            //   >
            //     <Placeholder type="vectorize" />

            //     <Transformation  gravity="auto" width="300" height="250" crop="fill" />
            //     <Transformation quality="90" />

            //   </Image>

            <CardMedia
              style={{
                objectFit: "cover",
                objectPosition: "90% 10%",
                maxHeight: "300px",
              }}
              onClick={() => {
                history.push(`/reaction/${data.id}`);
              }}
              component="img"
              // height="350"
              image={`${API_URL}/${data.post.photo}`}
              // image={data.post.file.secure_url}
              alt="image"
            />
          )}
          {console.log(data.post.photo)}
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
            <br />
            <div style={{ textAlign: "right ", fontSize: "12px" }}>
              <small>
                {parseInt(data.likes.length) +
                  parseInt(data.unlikes.length) +
                  parseInt(data.comments.length)}{" "}
                Reactions
              </small>
              {/* 
              <FavoriteBorderOutlined   style={{fontSize:"18px",color:"#0a3d62",marginLeft:"-5px"}} />
                <CommentOutlined style={{ fontSize: "18px", color: "#0a3d62", marginLeft: "-5px" }} />
                &nbsp; {parseInt(data.likes.length)+ parseInt(data.unlikes.length)+parseInt(data.comments.length)} */}
            </div>
            <Divider />
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                position: "relative",
                width: " ",
                height: "40px",
                background: " ",
                textAlign: "center",
                display: "inline-block",
              }}
              onClick={() => {
                handleLike(data.id);
              }}
            >
              &nbsp;{" "}
              <FavoriteBorderOutlined
                style={{
                  color: likedPost(data.likes, state) == true ? "red" : "",
                }}
              />
              &nbsp;<span>Love</span>
              {/* <span style={{ fontSize: "11px" }}>{data.likes.length}</span> */}
            </div>
            &nbsp; &nbsp;{" "}
            <div
              onClick={() => {
                handleUnlikes(data.id);
              }}
              style={{
                marginTop: "10px",
                fontSize: "12px",
                position: "relative",
                width: " ",
                height: "40px ",
                background: "  ",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              &nbsp;{" "}
              <ThumbDownOutlined
                style={{
                  color: likedPost(data.unlikes, state) == true ? "red" : "",
                }}
              />
              &nbsp;<span>Dislike</span>
              {/* <span style={{ fontSize: "11px" }}>{data.unlikes.length}</span> */}
            </div>
            &nbsp; &nbsp;
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                position: "relative",
                width: " ",
                height: "40px",
                background: "  ",
                textAlign: "center",
                display: "inline-block",
              }}
              onClick={() => {
                history.push(`/reaction/${data.id}`);
              }}
            >
              &nbsp; <CommentOutlined />
              {/* <span style={{ fontSize: "11px" }}>{data.comments.length}</span> */}
              &nbsp;<span>Comment</span>
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                position: "absolute",
                width: " ",
                height: "40px",
                background: " ",
                textAlign: "left",
                display: "inline-block",
                marginLeft: "10px",
              }}
            >
              <small></small>
              {/* <b className="link" style={{ float: "right", fontSize: "15px" }}>
                AMC - 110
              </b> */}
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
export async function handleCreatePost(
  payload,
  state,
  loadFeeds,
  disp_draft,
  login,
  setStateAlert,
  setStates,
  compState,
  history
) {
  let sessionEmail = state.loggedInUser.user.email;
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

  // console.log(payload);
  let { amount, beneficiaries, delaysecond } = payload.post.meta.giveaway; // DESTRUCTURING THE GIVEAWAY OBJECT
  let { wallet } = state.loggedInUser.user.meta;

  let eachUserGets = amount / beneficiaries; //AMOUNT EACH BENEFICIARIES GETS

  // @============ MAKE SURE USERS DONT CREATE GIVEAWAY LES THAN 1000 BUZ
  if (payload.postType == "GIVE AWAY" && amount < 1000) {
    return error("The minimum amount for Give-away is 1000 Buz");
  }

  // @======== MAKE SURE USER'S WALLET IS GREATER THAN THE GIVE AWAY AMOUNT
  if (payload.postType == "GIVE AWAY" && amount > wallet) {
    return error(
      "Please add fund to your wallet, you have insufficient balance"
    );
  }

  // @======== SUBTRACT GIVEAWAY AMOUNT FROM USER'S WALLET
  let userNewWalletBalance = wallet - amount;

  // @======== CREATE A NEW USER META DATA UPDATING THE CURRENT WALLET BALANCE THAT WILL BE SAVED TO DB
  let userNewMetaData;
  if (payload.postType == "GIVE AWAY") {
    userNewMetaData = {
      ...state.loggedInUser.user.meta,
      wallet: userNewWalletBalance,
    };
  } else {
    userNewMetaData = state.loggedInUser.user;
  }

  // @======== CRETAE A NEW GIVE AWAY META DATA TO ADD WHAT EVERY BENEFICIARIES GET
  let newGiveawayMetaData = {
    ...payload.post.meta.giveaway,
    userGets: eachUserGets,
  };

  // @======== CREATE NEW PAYLOAD TO UPDATE THE NEW CREATED GIVE AWAY META DATA
  let newPayload = "";
  if (payload.postType == "GIVE AWAY") {
    newPayload = {
      ...new_payload,
      post: {
        ...payload.post,
        meta: {
          ...payload.post.meta,
          giveaway: newGiveawayMetaData,
        },
      },
    };
  } else {
    newPayload = new_payload; // new_payload was created above to include the poster details
  }
  let payloadExtra = {
    email: sessionEmail,
    newUser: userNewMetaData,
  };

  // insertFeeds(payload), storageInsert(filePath, file)
  const insertPayload = {
    ...payload,
    postId,
    poster,
    id,
    post: {
      ...payload.post,
      meta: {
        ...payload.post.meta,
        giveaway: newGiveawayMetaData,
      },
    },
    school: poster.school,
    time: JSON.stringify(payload.post.time),
    setPostPrivacy,
  };

  // @======== FAILED TO UPLOAD RESPONSE
  function failedToUpload() {
    setStateAlert(false);
    setStates({
      ...compState,
      loader: false,
      alertMsg:
        "Your operation could not be completed due to network error. Your post has been save to draft",
    });
  }

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

  // @======== INSERT FUNCTION
  const insertFunction = (insertPayload) => {
    return insertFeeds(insertPayload).then((insertRes) => {
      // console.log(insertRes);
      // @======== IF THE FEED IS A GIVEAWAY
      if (payload.postType == "GIVE AWAY") {
        return updateUserMeta(payloadExtra).then((debited) => {
          let loginData = {
            user: { ...state.loggedInUser.user, meta: userNewMetaData },
            meta: state.loggedInUser.meta,
          };
          login(loginData);
          if (insertRes.body === null) {
            failedToUpload();
          } else {
            // return uploadedSuccessfuly(insertRes);
            history.push("/");
          }
        });
      } else {
        if (insertRes.body === null) {
          failedToUpload();
        } else {
          // return uploadedSuccessfuly(insertRes);
          history.push("/");
        }
      }
    });
  };

  // @======== CHECK IF USER IS POSTING WITH IMAGE
  if (payload.post.file === undefined) {
    // @======== INSERT TO DB
    insertFunction(insertPayload);
  } else {
    let act = {
      filePath,
      file,
      newDataToUpload: {
        ...insertPayload,
        poster,
        id: postId,
        setPostPrivacy,
      },
    };

    var axios = require("axios");
    var FormData = require("form-data");
    var fs = require("fs");
    var data = new FormData();
    data.append("postimage", file);

    var config = {
      method: "post",
      url: "https://buzz-servre.herokuapp.com/api/v1/make-post/post",
      // url: "http://localhost:2001/api/v1/make-post/post",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        // @======== restructure insertPayload to include the image key gotten from Supabase
        const newDataToUpload = {
          ...insertPayload,
          post: { ...insertPayload.post, photo: response.data },
          poster,
          id: postId,
          setPostPrivacy,
        };

        // @======== INSERT TO DB
        insertFunction(newDataToUpload);
      })
      .catch(function (error) {
        failedToUpload();
      });
  }
}
