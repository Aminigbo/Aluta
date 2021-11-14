import {allUniversities} from "../utils/index"

export function trigger(state, history, smile) {
   
  return (
    <div>
      {state.loggedInUser.user.meta.school === null && (
        <div className="realtime">
          <div className="realtimeParent">
            <div className="realtimeHeader" style={smile}>
              Add your university
            </div>
            <div className="realtimeBody">
            <b>  Hi {state.loggedInUser.user.fullname}</b> <br />
              <br />
              Add your university to get in touch with your schoolmates .
              <div className="description">
                Get the latest happening around the univers
              </div>{" "}
              <br />
              <button
                onClick={() => {
                  history.push(`/setschool`);
                }}
                className="active"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function resetPin(state, resetTPin,smile, setPins,pins) {
  return (
    <div>
      {state.loggedInUser.user.meta.transactionPin == "0000" && (
        <div className="realtime">
          <div className="realtimeParent">
            <div className="realtimeHeader" style={smile}>
              Reset your Pin
            </div>
            <div className="realtimeBody">
              Hi!! <br />
              It appeared that you are currently using the default transaction
                    pin <b>0000</b> .  <br /><br />
                    
                    <div style={{color:"gray",textAlign:"center"}}><b>Reset you pin</b> </div><br />
              <div className="description" style={{textAlign:"center"}}>
                       <input
                          onChange={(e) => {
                             setPins({
                                ...pins, first:e.target.value
                             })
                          }}
                          value={pins.first}
                          style={{ border: "none", borderBottom: "1px solid lightgray", width: "40%", margin: "0px 6px", textAlign: "left" }} placeholder="New pin" />
                       <input
                          onChange={(e) => {
                             setPins({
                                ...pins, second:e.target.value
                             })
                          }}
                          value={pins.second}
                          style={{ border: "none", borderBottom: "1px solid lightgray", width: "40%", margin: "0px 6px", textAlign: "left" }} placeholder="New pin again" />
                       
              </div>{" "}
              <br />
              <button
                onClick={() => {
                  resetTPin()
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