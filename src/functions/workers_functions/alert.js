export function alert(payload, setStateAlert) {
  return (
    <div>
      <div className="realtime">
        <div className="realtimeParent">
          <div
            className="realtimeHeader"
            style={{ background: payload.error == true ? "crimson" : "#0a3d62",color:"white" }}
          >
            {payload.title}
          </div>
          <div className="realtimeBody"  style={{ color: payload.error == true ? "crimson" : "#0a3d62" }}>
            {payload.msg}. <br /> 
            <br />
            <button
               style={{ background: payload.error == true ? "crimson" : "#0a3d62" }}
              onClick={() => {
                setStateAlert(null)
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
