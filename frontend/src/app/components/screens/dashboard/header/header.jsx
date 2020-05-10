import React, {useState} from 'react';
import styles from './header-styles.js';
import withStyles from 'react-jss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ChessvisionLogo from "../../../../static/images/chessvision-logo.png"
//import individual dashboard components

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={props.classes.header}>
      <AppBar position="absolute">
        <Toolbar className={props.classes.headerContent}>
            <img className="logo" src={ChessvisionLogo}/>
            <Button aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={handleClick}>{props.username}</Button>
        </Toolbar>
      </AppBar>
      <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={props.logoutUser}>Logout</MenuItem>
      </Menu>
    </div> 
  );
}

export default withStyles(styles)(Header);


