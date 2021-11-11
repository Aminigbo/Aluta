export function resetPin(state, history,smile) {
   return (

      <div>
         {state.loggedInUser.user.pin == "0000" && <div className="realtime">
         <div className="realtimeParent">
            <div className="realtimeHeader" style={smile}>
              Reset your Pin
            </div>
            <div className="realtimeBody">
               Hi!!  <br />
              It appeared that you are currently using the default transaction pin <b>0000</b> . 
               
               <div className="description" >
                  click the button bellow, click the setting button and reset your Transaction pin for stronger security.
               </div> <br />
                  <button onClick={()=>{ history.push(`/account/${state.loggedInUser.user.username}`)}} className='active' >Reset</button>
            </div>
         </div>
         
      </div> }
      </div>
   
   )
}