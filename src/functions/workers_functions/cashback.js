import {text_input} from "../../components/forms"

export function confirmCashbackCreation(
  amount,
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
          <div className="realtimeHeader" style={{ background: "lightblue" }}>
           <b> Confirm Cashback Generation</b> 
          </div>
          <div className="realtimeBody" style={{ color: "gray" }}>
            You are about to generation a cashback of {amount} which will be deducted from your wallet.
            <br /> <br />
            <div style={{textAlign:"left "}}>
              
              {btn_danger("Cancel", cancel)}
            {compState.miniLoad === true ? (
             <> {btn_primary("Confirming",null)} </>
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