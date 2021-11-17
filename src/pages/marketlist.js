import React from "react";
import { Redirect, useHistory,Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js";
import Footer from "../components/includes/mobile_footer.js";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut } from "../redux";
import Toppills from "../components/includes/topdesktoppills";
import { AddBoxOutlined, Send } from "@material-ui/icons";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { List } from "@material-ui/core";

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

  const list = () => {
    return [0, 0, 0, 0, 0].map((list) => {
      return (
        <>
          <Card
            style={{
              width: "100%",
              marginLeft: "0px",
              borderRadius: "0px",
            }}
            sx={{ m: 2 }}
          >
            <CardHeader
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
            />
            <CardMedia
              onClick={() => {
                history.push("/market/77dnd67ndlsnjhjk");
              }}
              component="img"
              height="194"
              image="https://image.shutterstock.com/image-vector/vector-collection-cool-sneakers-vans-260nw-1396046636.jpg"
              alt="Paella dish"
            />
            <CardContent>
              <b style={{ fontSize: "13px" }}>@Rivers state university</b>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              onClick={() => {
                history.push("/market/77dnd67ndlsnjhjk");
              }}
            >
              <IconButton
                style={{ fontWeight: "bold", fontSize: "16px" }}
                aria-label="share"
              >
                VISIT STORE
              </IconButton>
            </CardActions>
          </Card>
        </>
      );
    });
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
                marginTop: "10px",
                background: " #f4f6f7",
                position: "sticky",
                top: "0px",
                zIndex: "1000",
                padding: "0px  ",
              }}
            >
              <Toppills />
              <div style={{ marginTop: "-5px" }}>
                <Link
                  to="giveaway"
                  style={{
                    marginLeft: "10px",
                    fontSize: "13px",
                    color: "#0a3d62",
                    textDecoration: "none",
                  }}
                >
                  Create store &nbsp;
                  <AddBoxOutlined style={{ marginLeft: "-4px" }} />
                </Link> 
                <br /><br />
              </div>
            </div>

            <div animateIn="fadeIn">
              <div style={{ padding: "5px 10px" }}>
                <span>Explore the Aluta market</span>
              </div>

              {list()}
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
