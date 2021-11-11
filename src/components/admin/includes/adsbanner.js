 import  "../../static/css/home/index.css"
import React from 'react';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import logo from "../../static/logos/logo2.png"
// import {Dehaze, FindInPage} from '@material-ui/icons';
// import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import {logOut} from '../../redux'
// import Naira from 'react-naira'
import {Carousel} from 'react-bootstrap';
import promo2 from "../../static/slidder/promo2.jpg"
import promo4 from "../../static/slidder/promo4.jpg"

function Adsbanner({appState}) {
  // const state = appState 
  // const log_out = ()=>{
  //   console.log("Hello");
  // }
  //  const [setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
     <Carousel controls={false} className="adsPanel"  >
         <Carousel.Item  className="adsPanel">
            <div >
                  <img
                  className="slider"
                     src={promo4} 
                  alt="second slide"
                  />
                  {/* first */}
            </div>
            <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item  className="adsPanel">
            <div>
                  <img
                  className="slider"
                     src={promo2} 
                  alt="First slide"
                  />
                  {/* first */}
            </div>
            <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
         </Carousel.Item>
      </Carousel>  
  );
}
const mapStateToProps = state => { 
  return {
    appState: state.user
  }
}


const mapDispatchToProps = (dispatch,encoded) => {
  return {
    log_out: () => dispatch(logOut()),  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Adsbanner)