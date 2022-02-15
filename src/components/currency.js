import {
  LinearProgress,
  AssignmentReturnedOutlined,
  AddBoxOutlined,
  HistoryOutlined,
  FileCopyOutlined,
  LibraryAddCheckOutlined,
} from "@material-ui/icons";

export function cashbackCurrency(
  btn_primary,
  btn_danger,
  cancelCashback,
  confirmCashback,
  copy,
  setStates,
  compState,
  generatedToken,
  user,
  amount,
  isActive,
  toggleDrawer
) {
  return (
    <>
      <div
        style={{
          marginTop: "-30px",
          width: "96%",
          marginLeft: "2%",
          backgroundColor: " ",
          textAlign: "center",
        }}
      >
        <div
          style={{
            // background: "#efedc4",
            background:"#385b74",
            //   borderRadius: "4px",
            height: "150px",
            marginTop: "40px",
            padding: "5px",
          }}
        >
          <div
            style={{
              // background: "lightgray",
              //  borderRadius: "4px",
              height: "100%",
              // border: "2px solid #d3cf7a",
              position: "relative",
            }}
          >
            {/* Jazz LET, fantasy */}
            {/* OCR A Std, monospace */}

            {/* <b
              style={{
                position: "absolute",
                top: "2px",
                left: "4px",
                fontSize: "19px",
                fontFamily: "OCR A Std, monospace",
                color: "#706e3b",
              }}
            >
              NGN {amount}
            </b> */}
            <b
              style={{
                position: "absolute",
                top: "1px",
                left: "4px",
                fontSize: "19px",
                fontFamily: "Comic Sans MS, Comic Sans, cursive",
                // color: "#706e3b",
                color:"orange"
              }}
            >
              Cashback
              <AssignmentReturnedOutlined />
            </b>
            <b
              style={{
                position: "absolute",
                bottom: "2px",
                left: "4px",
                fontSize: "13px",
                fontFamily: "OCR A Std, monospace",
                // color: "#706e3b",
                color:"orange"
              }}
            >
              @{user}
            </b>
            {/* {console.log(isActive)} */}
            
            {isActive == true ? <b
              style={{
                position: "absolute",
                bottom: "2px",
                right: "4px",
                fontSize: "13px",
                fontFamily: "OCR A Std, monospace",
                // color: "#706e3b",
                color:"orange"
              }}
            >
             VALID
            </b> : <b
              style={{
                position: "absolute",
                bottom: "2px",
                right: "4px",
                fontSize: "13px",
                fontFamily: "OCR A Std, monospace",
                // color: "crimson",
                color:"orange"

              }}
            >
             INVALID
            </b>}
            <div
              style={{ 
                height: "60%",
                position: "absolute",
                left: "5%",
                width: "90%",
                top: "25%",
                // border: "2px solid white",
              }}
            >
              <div
                onClick={() => {
                  setStates({
                    ...compState,
                    copy: true,
                  });
                  if (toggleDrawer) {
                    toggleDrawer("bottom", false);
                  }
                  if (navigator && navigator.clipboard) {
                    navigator.clipboard.writeText(generatedToken);
                  }
                }}
                style={{ color: "#706e3b", marginTop: "10px", background: "",height:"60px",position:"relative" }}
              >
                <div style={{ color: "#706e3b", top: "10px", borderTop: "0.5px dotted orange", position: "absolute", height: "20px", width: "100%", left: "0px" }}></div>
                <div  style={{ color: "#706e3b", top: "20px", borderTop: "0.5px dotted orange",position:"absolute",height:"20px",width:"100%",left:"0px" }}></div>
                <div  style={{ color: "#706e3b", top: "30px", borderTop: "0.5px dotted orange",position:"absolute",height:"20px",width:"100%",left:"0px" }}></div>
                <div  style={{ color: "#706e3b", top: "40px", borderTop: "0.5px dotted orange",position:"absolute",height:"20px",width:"100%",left:"0px" }}></div>
                <div  style={{ color: "#706e3b", top: "50px", borderTop: "0.5px dotted orange",position:"absolute",height:"20px",width:"100%",left:"0px" }}></div>

                <b
                  style={{
                   
                    color: "#efedc4",
                    padding: " 6px 10px",
                  }}
                >
                   {copy !== null ? (
                  <> {generatedToken} &nbsp;&nbsp;
                    {" "}
                    {/* {compState.copy == true ? (
                      <LibraryAddCheckOutlined
                        style={{ fontSize: "24px", color: "mediumseagreen" }}
                      />
                    ) : (
                      <FileCopyOutlined
                        style={{ fontSize: "24px", color: "orange" }}
                      />
                    )} */}
                  </>
                ): <b style={{fontSize:"30px",zIndex:"10000",position:"absolute",top:"7px",width:"100%",textAlign:"center",left:"0px"}}>NGN {amount}</b> }
                </b>{" "}
               
              </div>
              <div
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  fontSize: "14px",
                  color: "gray",
                }}
              >
                {/* 21 &nbsp;20 &nbsp;29 */}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          {copy == null && (
            <>
              {" "}
              {btn_primary("Cash In", confirmCashback)}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             {btn_danger("Cancel", cancelCashback)}
            </>
          )}

          {/* {copy && <>  {btn_primary("Copy your CBT", confirmCashback, copy)}  </>} */}
        </div>
      </div>
    </>
  );
}
