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
          marginTop: "-10px",
          width: "90%",
          marginLeft: "5%",
          backgroundColor: " ",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "#efedc4",
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
              border: "2px solid #d3cf7a",
              position: "relative",
            }}
          >
            {/* Jazz LET, fantasy */}
            {/* OCR A Std, monospace */}
            <b
              style={{
                position: "absolute",
                top: "2px",
                left: "4px",
                fontSize: "14px",
                fontFamily: "OCR A Std, monospace",
                color: "#706e3b",
              }}
            >
              NGN {amount}
            </b>
            <b
              style={{
                position: "absolute",
                top: "1px",
                right: "4px",
                fontSize: "14px",
                fontFamily: "Comic Sans MS, Comic Sans, cursive",
                color: "#706e3b",
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
                color: "#706e3b",
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
                color: "#706e3b",
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
                color: "crimson",
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
                style={{ color: "#706e3b", marginTop: "25px", background: "#706e3b" }}
              >
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
                ): <b style={{fontSize:"20px"}}>NGN {amount}</b> }
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
              <div style={{width:"50%",display:"inline-block",marginLeft:"10px"}}>{btn_danger("Cancel", cancelCashback)}{" "}</div>
            </>
          )}

          {/* {copy && <>  {btn_primary("Copy your CBT", confirmCashback, copy)}  </>} */}
        </div>
      </div>
    </>
  );
}
