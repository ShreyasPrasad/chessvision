import React, { useEffect } from 'react';
import styles from './game-styles.js';
import ChessBoard from "./board/board";
import withStyles from 'react-jss';

function Game(props) {
  const {
    applyMove,
    initiateConnection,
    gameMoves
  } = props;

  const applyChange = () => {
    applyMove('e4');
  }

  useEffect(() => {
    // inititate game websocket connection
    initiateConnection('ws://127.0.0.1:8000/ws/chat/newroom/')
  }, []);

  return (
    <div className={`${props.classes.game } game`}>
      {window.jQuery && <ChessBoard/>}
    </div>
  );
}

export default withStyles(styles)(Game);