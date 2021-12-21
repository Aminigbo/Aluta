import { EuroSymbolOutlined } from "@material-ui/icons";
export function alert(payload, setStateAlert, sendToDefault) {
  return (
    <div>
      <div className="realtime">
        <div className="realtimeParent">
          <div
            className="realtimeHeader"
            // style={{
            //   background: payload.error == true ? "crimson" : "#0a3d62",
            //   color: "white",
            // }}
            style={{ background: "white",color:"#0a3d62" }}
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
                if (sendToDefault) {
                  sendToDefault();
                }
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
            // style={{
            //   background: payload.error == true ? "crimson" : "#0a3d62",
            //   color: "white",
            // }}
            style={{ background: "white",color:"#0a3d62" }}
          >
            <b
              style={{
                background: "#0a3d62",
                color: "white",
                padding: "3px 10px",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              {" "}
              NGN {payload.meta.data.amount}
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
          <div className="realtimeHeader" style={{ background: "white",color:"#0a3d62" }}>
           <b> Confirm Give-away</b>
          </div>
          <div className="realtimeBody" style={{ color: "gray" }}>
            You are about to send the sum of
            {payload.giveawayData.userGets} to{" "}
            <b> {payload.luckyWinner.name}</b> from your Give-Away
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
                style={{ background: "#0a3d62", opacity: "0.5" }}
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
            // style={{
            //   background: payload.error == true ? "crimson" : "#0a3d62",
            //   color: "white",
            // }}
            style={{ background: "white",color:"#0a3d62" }}
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
                  pop: null,
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
