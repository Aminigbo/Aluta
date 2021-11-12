import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";
import Footer from "../components/includes/mobile_footer.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut } from "../redux";
import Toppills from "../components/includes/topdesktoppills";

// import {ListItem,List,ListItemText,Divider} from '@mui/material/ListItem';
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar"; 
import Divider from "@mui/material/Divider";

function Home({ appState }) {
  const schools = [
    {
      name: "Abia State University",
      code: "ABSU743",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHdH3gz7YNpstzvlAFprJdWFiM6Qc3_2QTSQ&usqp=CAU"
    },
    {
      name: "Akwa Ibom State University",
      code: "AKSU473",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJIkSpTrg_boLQgdYC0x0jAmddQdR-tYo_4nrTM_fzYZc8EyDLMgOUSYFGbKighNHKbpA&usqp=CAU"
    },
    {
      name: "Ahmadu Bello University",
      code: "ABU417",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFG-AWrNo_hgft1vgdmCmK-0kAn1NMjg3bg&usqp=CAU"
    },
    {
      name: "Anambra State University",
      code: "ANSU718",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXnMIUbMk_raRTpNtODSWixJ-doqdprTR_0YAC71VyxX5nNoISTZ1gOiyuncuB45nXjhU&usqp=CAU"
    },
    {
      name: "Ajayi Crowther University",
      code: "ACU839",
      img:"https://i1.wp.com/www.yabacampus.com/wp-content/uploads/2020/06/AJCU.jpg?fit=398%2C330&ssl=1"
    },
    {
      name: "Bells University of Technology",
      code: "BUT214",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu96XSrZ2wifrhB7t2kc-6oE6qtDxtT-o5zzr3tGZFL5eeJY8BBQHoPe4lu_E4YoMehWU&usqp=CAU"
    },
    {
      name: "Benue State University",
      code: "BSU835",
      img:"https://i2.wp.com/www.realmina.com/wp-content/uploads/2019/11/bsu.jpg?resize=268%2C180&ssl=1"
    },
    {
      name: "Bowen University",
      code: "BU927",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGUXm8_EUbqJUJtB1eA_asrn1xHmbgFdStxRu0u4MtLZ37wy9vOEj-KkEjjzinytW51Os&usqp=CAU"
    }, 
    {
      name: "National Open University of Nigeria",
      code: "NOUN503",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqhRwC1NX3ScBPr_w-pjNSDdTSPWHWOxU5DLG8eSiYc67GPCCqvj82dQ3CtjYRrpPJoU&usqp=CAU"
    },
    {
      name: "Cross River University of Technology",
      code: "CRUTECH532",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAKt5vnjefOJc3hvqzmx63VrQnmVMpOL3OuyF8yRMit76pyRCpmsdRmZUsfodFVrUso4I&usqp=CAU"
    },
    {
      name: "Delta State University Abraka",
      code: "DELSU096",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOU8RRmw8qSAJeNHdixmOnNdU5BKEWhtDgU7xYlSnFxMG49AY-xpw4Gt35HmcLZTxmMGo&usqp=CAU"
    },
    {
      name: "Ebonyi State University",
      code: "EBSU315",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0jmbMI6ibkvJd09Y679xiO4pGRci4ioOZkocS3V0VvkOCdMY93XLem3TSNU-63eGxm5s&usqp=CAU"
    },
    {
      name: "Federal University of Technology",
      code: "FUTA194",
      img:"https://upload.wikimedia.org/wikipedia/en/thumb/1/16/FUTO_logo.png/220px-FUTO_logo.png"
    },
    {
      name: "Gregory University Abia",
      code: "GUA520",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMca2VFnYiQhKk3tnjxceuYJx07wETcKwnWyaN9OPCgifaHCQF0uaGY56Fv2qcuxvirpk&usqp=CAU"
    },
    {
      name: "Lagos State University",
      code: "LASU324",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rt5cdQUTVbdRInIJOCj74_BIoqunsoHcJEoXfmidWfCh9BKncBiYR6lqiF2O8LqID74&usqp=CAU"
    },
    {
      name: "Taraba State University",
      code: "TSU987",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8us8pn9f2vx_e1dqfqdjQ75O13uI-DLEG2OyCv6Atp5D0uK6-yAQvcBoh0YjVCyBPy4&usqp=CAU"
    },
    {
      name: "University of Benin",
      code: "UNIBEN519",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQYz3yCABd2tIpJkG1FZwBtTHMiWje0hcBHQ&usqp=CAU"
    },
    {
      name: "University of Calabar",
      code: "UNICAL893",
      img:"https://i1.wp.com/educeleb.com/wp-content/uploads/2017/09/UNICAL.jpg?fit=400%2C300&ssl=1"
    },
    {
      name: "University of Ibadam",
      code: "UI213",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtERBuJvMuaQ8jx-AsQv9KPDp8skS3JjJr5mEQoxnCCiceJ-ZCLkhF5ER6Xd3xLqhIuI&usqp=CAU"
    },
    {
      name: "University of Lagos",
      code: "UNILAG065",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0XXWNPvlcr0LChbWjut165rWG_CHbWs7NYtmEH36xRtX3-eReQdczsY-to0AwHbHbqcY&usqp=CAU"
    },
    {
      name: "University of Port Harcourt",
      code: "UNIPORT629",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTLOvE2bFVW7qeppl9K-DHLuSXnLJTAgcR3qGh1MU4g-czQo3sIvTdwr_i7hCLrAmDFY&usqp=CAUhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTTLOvE2bFVW7qeppl9K-DHLuSXnLJTAgcR3qGh1MU4g-czQo3sIvTdwr_i7hCLrAmDFY&usqp=CAU"
    },
    {
      name: "University of Nigeria Nsuka",
      code: "UNN874",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGyDQArkPTze46T73EUm_-XQwqZUykg3bFt_29x80vq6EmzKDHCiyasQusTi8dbHlQICs&usqp=CAU"
    },
    {
      name: "University of Uyo",
      code: "UNIUYO684",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-MxTv9iLuj0aCJzYRG7CSEHg_zj94IhrdjZeTtiIiKuyUIOGn1Iyvd713AtKWyn8WaEo&usqp=CAU"
    },
    {
      name: "University of Jos",
      code: "UNIJSO189",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkeqAn7WuJczOU0WHFMIUQ9B6PSAir4LPaFQ_qMxO2UZMnnp5uGCS5AJSPSAh-y3wWL0&usqp=CAU"
    },
    {
      name: "University of Ilorin",
      code: "UNILORIN927",
      img:"https://nigerianfinder.com/wp-content/uploads/2018/02/unilorin-logo-347x300.jpg"
    },
    {
      name: "University of Education Rivers State",
      code: "UOE948",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8zkbBbzIaLJIMxpCroR-SXge8lvhUwNFRG_vgKBVELURkoHe178hsTVZPTo3hO7B2qOA&usqp=CAU"
    },
    {
      name: "Rivers State University",
      code: "RSU7405",
      img:"https://tethys-engineering.pnnl.gov/sites/default/files/styles/large/public/taxonomy-images/riversstate.png?itok=Y8Oyls7d"
    },
  ];


  let listOfSchools = () => {
    schools.sort(function (a, b) {
      return parseFloat(b.school) - parseFloat(a.school);
    });
    return schools.map(schl => {
      return (
        <>
          <ListItem
                  onClick={() => {
                    history.push(`touring/${schl.code}`);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <img style={{width:"40px"}} src={schl.img} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={schl.name}
                    // secondary="+99 new activities"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
          </>
      )
    })
  }

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  let history = useHistory();
  const state = appState;

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
  }, []);

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      <div className="mobile">
        <div className="header_footer">
          {/* <Footer /> */}
          <Header />
        </div>

        <div>
          <div>
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                background: " #f4f6f7",
                position: "sticky",
                top: "0px",
                zIndex: "1000",
                padding: "0px",
              }}
            >
              {" "}
              <Toppills />
            </div>

            <div animateIn="fadeIn">
              <div style={{ padding: "5px 10px",color:"lightgray" }}>
                <b>Take a tour round other universities</b>
              </div>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                 {listOfSchools()}
              </List>
            </div>
          </div>
        </div>
      </div>

      <Desktopleft />
      <Desktopright />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = (dispatch, encoded) => {
  return {
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    logout: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
