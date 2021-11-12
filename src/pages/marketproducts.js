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

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";

function Home({ appState }) {
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  let history = useHistory();
  const state = appState;

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
  }, []);

  //  user preducts

  const products = () => {
    return (
      [0, 0, 0, 0, 0,0, 0, 0, 0, 0].
      map((items) => {
        return (
          <>
            <Card sx={{ maxWidth: 150 }} style={{ display: "inline-block", textAlign:"left"}}>
              <CardMedia
                component="img"
                height="110"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPwpM4b9i48Cp1Te-91jM0Op2QsizDDLOOZA&usqp=CAU"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h9" component="b">
                  Luiz Viuton
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Unisex
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                  <b>NGN 5,000</b>
                </Typography>
              </CardContent>
            </Card>{" "}
          </>
        );
      })
    );
  };
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
              <Card
                style={{
                  width: "100%",
                  marginLeft: "0px",
                  borderRadius: "0px",
                  textAlign: "center",
                  marginTop: "10px",
                  background: " #f4f6f7",
                  position: "sticky",
                  top: "0px",
                  zIndex: "1000",
                  padding: "0px",
                }}
                sx={{ m: 2 }}
              >
                {/* <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  //   action={
                  //     <IconButton aria-label="settings">
                  //       <MoreVertIcon />
                  //     </IconButton>
                  //   }
                  title="Sneaker Empire"
                  subheader="905k visits"
                /> */}
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/imkqstoq6t2aagg6mtod/2021-best-sneakers?fimg-ssr-default"
                  alt="Paella dish"
                />
              </Card>

                       
                       {/* items */}
                       <div style={{ textAlign: "center",margin:"" }}>
                          {products()}
              </div>
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
