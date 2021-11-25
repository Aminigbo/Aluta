import loaderImg from "../static/logos/animation.gif";
import CircularProgress from '@mui/material/CircularProgress';
// @======== LOADING TO GENERATE TOKEN
export function cashbackloader() {
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "fixed",
          background: "rgb(0,0,0,0.6)",
          left: "0px",
              top: "0px",
          zIndex:"100000"
        }}
      >
        <div
          style={{
            position: "relative",
            width: "15%",
            // height: "60px",
            background: "white",
            top: "40%",
            left: "40%",
                 borderRadius: "5px",
                 textAlign: "center",
            padding:"5px 0px"
          }}
           >
          {/* <img src={loaderImg} /> */}
          <CircularProgress />
        </div>
      </div>
    </>
  );
}
