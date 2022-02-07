import Header from "../components/includes/mobile_header.js";
import HeaderALT from "../components/includes/headerALT.js";

import Toppills from "../components/includes/topdesktoppills";

export  function headerALT() {
  return (
    <>
      <div style={{ marginBottom: "10px", background: "" }}>
        <div className="header_footer"> 
          <HeaderALT />
        </div>
        
      </div>
    </>
  );
}

export function headers() {
  return (
    <>
      <div style={{ marginBottom: "10px", background: "#385b74" }}>
        <div className="header_footer"> 
          <Header />
        </div>
        
      </div>
    </>
  );
}



