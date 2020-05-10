import React, {useState} from 'react';
import styles from './dashboard-styles.js';
import withStyles from 'react-jss';

//import individual dashboard components
import Header from "../../../containers/HeaderPage"
import Match from "../../../containers/MatchPage"
import Game from "../../../containers/GamePage"

function Dashboard(props) {
  return (
    <div className={props.classes.dashboard}>
      <Header/>
      <div className="content">
        <Game/>
        <Match/>
      </div>
    </div> 
  );
}

export default withStyles(styles)(Dashboard);


