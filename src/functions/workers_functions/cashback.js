import { text_input } from "../../components/forms";

export function confirmCashbackCreation(
  amount,
  amountPlusCharge,
  cancel,
  confirm,
  btn_danger,
  btn_primary,
  compState,
  setPin,
  pin
) {
  return (
    <div>
      <div className="realtime">
        <div className="realtimeParent">
          <div className="realtimeHeader" style={{ background: "#0a3d62",color:"white" }}>
            <b> Confirm Cashback Generation</b>
          </div>
          <div className="realtimeBody" style={{ color: "gray" }}>
            You are about to generate a cashback of <b>NGN {amount}</b>.<br />  <br />
            <div style={{fontSize:"12px"}}>
              You will be charged
              <b> NGN {amountPlusCharge - amount}</b> as service fee.
            </div>
            <br />
            <div style={{ textAlign: "left " }}>
              {btn_danger("Cancel", cancel)}
              {compState.miniLoad === true ? (
                <> {btn_primary("Confirming", null)} </>
              ) : (
                <> {btn_primary("Confirm", confirm)} </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
