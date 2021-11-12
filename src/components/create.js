import { TextareaAutosize } from "@mui/material";
 
export const createPanel = ( 
  history, 
) => {
  
  
  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          height: "",
          // background: "lightgray",
          width: "100%",
          marginBottom: "30px", 
        }}
      > 

        <TextareaAutosize 
          onClick={(e) => {
           history.push("/create")
          }}  
          id="postArea"
          // value={postText}
          aria-label="minimum height"
          minRows={3}
          maxRows={5}
          // disabled
          placeholder={"What is happening on campus???"}
          style={{
            width: "98%",
            outline: "none",
            borderRadius: "5px",
            border: "0.5px solid lightgray",
            background: "#f0f0f0",
            padding: "5px 10px",
            resize: "none",
            margin: "5px 1%",
            //  float:"right"
          }}
        />


      </div>
    </div>
  );
};
