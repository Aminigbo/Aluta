import  "../../static/css/home/index.css"
import {Link } from "react-router-dom"; 
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import FolderIcon from '@material-ui/icons/Folder';
// import RestoreIcon from '@material-ui/icons/Restore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Home, Person, SportsKabaddi, SportsRugby } from '@material-ui/icons'

import { connect } from 'react-redux'

// const useStyles = makeStyles({
//   root: {
//     width: 500, 
//   },
// });

function Footer({appState}) {
  // const classes = useStyles();
  // const [value, setValue] = React.useState('recents');
  // let history = useHistory(); 
  // const currentUrl = window.location.pathname;
  // {console.log(appState.loggedInUser.user.username)}
  const nav = (e)=>{
    // history.push(`${e}`)
    // setTimeout(() => history.push(`${e}`), 1000); 
  }
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // }; 
  return (
    // <BottomNavigation value={value} onChange={handleChange} id ='bottomNav' className={classes.root}>
    //   <BottomNavigationAction id='bottom_nav_link' label="Home" value="Home" icon={<Home />} onClick={(e)=>{nav('/')}} />
    //   <BottomNavigationAction className='bottom_nav_link' id="heh"  label="1 X 1" value="1x1" icon={<SportsKabaddi />} onClick={(e)=>{nav('/1x1')}} />
    //   <BottomNavigationAction className='bottom_nav_link' id="heh" label="Jackpot" value="Jackpot" icon={<SportsRugby />} onClick={(e)=>{nav('/jackpot')}} />
    //   <BottomNavigationAction className='bottom_nav_link' id="heh"  label="Aminigbo" value="Aminigbo" icon={<Person />} onClick={(e)=>{nav('./account')}} />
    // </BottomNavigation>

    <div id ='bottomNav'>
      <Link to="/" className="bottomnatChildren" onClick={(e)=>{nav('/')}} ><Home />  <br /> <div className="inline">Home</div> </Link>
      <Link to="/oneXone" className="bottomnatChildren"  onClick={(e)=>{nav('/1x1')}}><SportsKabaddi /> <br /> <div className="inline"> 1 X 1 </div> </Link>
      <Link to="/jackpot" className="bottomnatChildren"  onClick={(e)=>{nav('/jackpot')}}><SportsRugby />  <br /> <div className="inline">Jackpot</div> </Link>
      <Link to="/account/Aminigbo" className="bottomnatChildren" onClick={(e)=>{nav('/account')}}><Person />  <br /> <div className="inline"> {appState.loggedInUser.user.username} </div> </Link>
    </div>
  );
}


const mapStateToProps = state => { 
  return {
    appState: state.user
  }
}


const mapDispatchToProps = (dispatch,encoded) => {
  return {
    // log_out: () => dispatch(logOut()),  
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)