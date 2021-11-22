export function alert(payload, setStateAlert) {
  return (
    <div>
      <div className="realtime">
        <div className="realtimeParent">
          <div
            className="realtimeHeader"
            style={{
              background: payload.error == true ? "crimson" : "#0a3d62",
              color: "white",
            }}
          >
            {payload.title}
          </div>
          <div
            className="realtimeBody"
            style={{ color: payload.error == true ? "crimson" : "#0a3d62" }}
          >
            {payload.msg}. <br />
            <br />
            <button
              style={{
                background: payload.error == true ? "crimson" : "#0a3d62",
              }}
              onClick={() => {
                setStateAlert(null);
              }}
              className="active"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BuzAlert(payload, redirect) {
  console.log(payload);
  return (
    <div>
      <div className="realtime">
        <div className="realtimeParent">
          <div
            className="realtimeHeader"
            style={{
              background: payload.error == true ? "crimson" : "#0a3d62",
              color: "white",
            }}
          >
            <b>
              {payload.meta.data.amount} <s>BUZ</s>
            </b>{" "}
            &nbsp; from {payload.meta.sender.fullname}
          </div>
          <div
            className="realtimeBody"
            style={{ color: payload.error == true ? "crimson" : "#0a3d62" }}
          >
            {payload.meta.data.desc}` <br />
            <br />
            <button
              style={{
                background: payload.error == true ? "crimson" : "#0a3d62",
              }}
              onClick={() => {
                redirect();
              }}
              className="active"
            >
              See history
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// !======== GIVE AWAY CONFIRM ALERT

export function giveawayConfirm(
  payload,
  giveAwayConfirm,
  setGiveawayConfirm,
  confirm
) {
  return (
    <div>
      <div className="realtime">
        <div className="realtimeParent">
          <div className="realtimeHeader" style={{ background: "lightblue" }}>
            Confirm Give-away
          </div>
          <div className="realtimeBody" style={{ color: "gray" }}>
            You are about to Buz {payload.luckyWinner.name} with the sum of{" "}
            {payload.giveawayData.userGets} as Give-Away
            <br />
            <br />
            <button
              style={{ background: "crimson" }}
              onClick={() => {
                setGiveawayConfirm(false);
              }}
              className="active"
            >
              Cancel
            </button>
            {giveAwayConfirm.miniLoad === true ? (
              <button
                style={{ background: "#0a3d62",opacity:"0.5" }}
                
                className="active"
              >
               Confirming....
              </button>
            ) : (
              <button
                style={{ background: "#0a3d62" }}
                onClick={() => {
                  setGiveawayConfirm({
                    ...giveAwayConfirm,
                    miniLoad: true,
                  });
                  confirm(payload);
                }}
                className="active"
              > 
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// @======== CONFIRM POP
export function giveawayProceedAlert(payload, compState, setStateAlert) {
  return (
    <div>
      <div className="realtime">
        <div className="realtimeParent">
          <div
            className="realtimeHeader"
            style={{
              background: payload.error == true ? "crimson" : "#0a3d62",
              color: "white",
            }}
          >
            {payload.title}
          </div>
          <div
            className="realtimeBody"
            style={{ color: payload.error == true ? "crimson" : "#0a3d62" }}
          >
            {payload.msg}. <br />
            <br />
            <button
              style={{
                background: payload.error == true ? "crimson" : "#0a3d62",
              }}
              onClick={() => {
                setStateAlert({
                  ...compState,
                  pop:null
                });
              }}
              className="active"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// @======== WHEN USER ALREADY BENEFITED alreadyBenefited
