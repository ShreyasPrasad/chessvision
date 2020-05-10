import React, { useEffect } from 'react';
import styles from './player-card-styles.js';
import withStyles from 'react-jss';

function PlayerCard(props) {

  return (
    <div className={`${props.classes.playerCard } playerCard`}>
        <div className="playerName">
            <h2>
                {props.name}
            </h2>
            
        </div>
        <div className="playerRating">
            <h4> 
                {props.rating}
            </h4>
        </div>
    </div>
  );
}

export default withStyles(styles)(PlayerCard);