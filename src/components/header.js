import Header from "../components/includes/mobile_header.js";
import Toppills from "../components/includes/topdesktoppills";

export default function header() {
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
