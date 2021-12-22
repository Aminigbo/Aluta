import { FileCopyOutlined, LibraryAddCheckOutlined } from "@material-ui/icons";
let action_btn_success2 = {
  // background:"#1e272e",
  // backgroundColor: "#0a3d62",
  backgroundImage: "linear-gradient(to right,lightgray, #385b74)",
  //   background:"#706e3b",
  padding: "2px 14px",
  //   marginLeft: "15px",
  color: "white",
  borderRadius: "3px",
  float: "  ",
  border: "none",
};

let danger = {
  // background:"#1e272e",
  // backgroundColor: "crimson",
  backgroundImage: "linear-gradient(to right,lightgray, crimson)",
  //   background:"#706e3b",
  padding: "2px 14px",
  // marginLeft: "15px",
  color: "white",
  borderRadius: "3px",
  float: "",
  border: "none",
};

export function btn_primary(text, callback, copy) {
  return (
    <>
      <button
        onClick={() => {
          if (callback) {
            callback();
          }
        }}
        style={{
          backgroundImage:copy ? "linear-gradient(to right,lightgray, orange" : "linear-gradient(to right,lightgray, #385b74)",
          padding: "2px 14px",
          color: "white",
          borderRadius: "3px",
          float: "  ",
          border: "none",
        }}
      >
        {text} 
      </button>
    </>
  );
}

export function btn_danger(text, callback) {
  return (
    <>
      <button
        onClick={() => {
          if (callback) {
            callback();
          }
        }}
        style={danger}
      >
        {text}
      </button>
    </>
  );
}
