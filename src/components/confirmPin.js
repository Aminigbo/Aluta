export function pinConfirmPop(compState, pwd, setPwd,closePwd,showPwd,text_input,btn_danger,btn_primary,setResolvedPinVerification) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          background: "rgb(0,0,0,0.6)",
          zIndex: "10000",
          top: "0px",
          left: "0px",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: "35%",
            height: "",
            width: "70%",
            left: "15%",
            background: "white",
            zIndex: "15000",
            padding: "5px 20px",
          }}
        >
          {text_input("Provide transaction pin", pwd, "number", setPwd)}
          <br />
          <div style={{ marginTop: "10px" }}>
            {compState.confirmpwderror === true && (
              <>
                {" "}
                <span style={{ color: "crimson" }}>
                  {compState.confirmpwderrormsg}{" "}
                </span>
              </>
            )}
          </div>
          <br />
          {btn_danger("Close", closePwd)} &nbsp;
          {btn_primary("Continue", showPwd)}
          <br />
          <br />
        </div>
      </div>{" "}
    </>
  );
}
