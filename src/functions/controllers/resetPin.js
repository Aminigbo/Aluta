import { allUniversities } from "../utils/index";

export function trigger(state, history, smile) {

  if (state.loggedInUser.user.meta.schoolmode === true && state.loggedInUser.user.meta.school === null) {
    history.push("/setschool")
  } else
    if (state.loggedInUser.user.meta.gender === null || state.loggedInUser.user.meta.DOB === null) {
    history.push("/updateprofile")
  } 
}

export function resetPin(state, resetTPin, smile, setPins, pins) {
  return (
    <div>
      {state.loggedInUser.user.meta.transactionPin == "0000" && (
        <div className="realtime">
          <div className="realtimeParent" style={{top:"20%"}}>
            <div className="realtimeHeader" style={smile}>
              Reset your Pin
            </div>
            <div className="realtimeBody"> 
              It appeared that you are currently using the default transaction
              pin <b>0000</b> . <br />
              
              <div style={{ color: "gray", textAlign: "center", marginTop:"20px" }}>
                <b>Reset you pin</b>{" "}
              </div> 
              <div className="description" style={{ textAlign: "center" }}>
                <input
                type="number"
                  onChange={(e) => {
                    setPins({
                      ...pins,
                      first: e.target.value,
                    });
                  }}
                  value={pins.first}
                  style={{
                    border: "none",
                    borderBottom: "1px solid lightgray",
                    width: "40%",
                    margin: "0px 6px",
                    textAlign: "left",
                    padding:"6px",outline:"none"
                  }}
                  placeholder="New pin"
                />
                <input
                type="number"
                  onChange={(e) => {
                    setPins({
                      ...pins,
                      second: e.target.value,
                    });
                  }}
                  value={pins.second}
                  style={{
                    border: "none",
                    borderBottom: "1px solid lightgray",
                    width: "40%",
                    margin: "0px 6px",
                    textAlign: "left",
                    padding:"6px",outline:"none"
                  }}
                  placeholder="New pin again"
                />
              </div>
              <div style={{textAlign:"center"}}>
                 <small style={{fontSize:"12px",color:"orange"}}>
                {"This pin will be required for every financial transaction "}
              </small>
             </div>
              <br />
              <button
                onClick={() => {
                  resetTPin();
                }}
                className="active"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
