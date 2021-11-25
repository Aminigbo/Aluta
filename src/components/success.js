// @======== CONFIRM POP
export function successComponent(msg, callback) {
  return (
    <div>
      <div className="realtime">
        <div className="realtimeParent">
          <div
            className="realtimeHeader"
            style={{
              background:"#0a3d62" ,
              color: "white",
            }}
          >
            SUCCESS
          </div>
          <div
            className="realtimeBody"
            style={{ color: "black" }}
          >
            {msg}. <br />
            <br />
            <button
              style={{
                background:"#0a3d62",
              }}
              onClick={() => {
                callback()
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
