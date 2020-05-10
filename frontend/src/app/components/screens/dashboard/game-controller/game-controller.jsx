import React, { useEffect } from 'react';
import styles from './game-controller-styles.js';
import ChessBoard from "./board/board";
import PlayerCard from "./player-card/player-card";
import withStyles from 'react-jss';
import { sendMessage } from '../../../../actions/socket/connect';

function GameController(props) {

  const applyMove = (move) => {
    //signal move the opponent
    sendMessage('game', {type: 'gameMove', move: move})
  }

  useEffect(() => {
    // inititate game websocket connection every time active game ID changes and it is non-null
    if (props.activeGameID!=null){
      props.initiateConnection('game', `ws://127.0.0.1:8000/ws/game/${props.activeGameID}`)
    }
  }, [props.activeGameID]);

  return (
    <div className={`${props.classes.gameController } gameController`}>
      {props.opponent && <PlayerCard name={props.opponent.name} rating={props.opponent.rating}/>}
      {window.jQuery && 
      <ChessBoard selectedPieces = {props.selectedPieces} applyMove={applyMove} gameMoves={props.gameMoves}
          opponent={props.opponent} gameColor={props.gameColor} gameState={props.gameState}/>}
      <PlayerCard name={props.username} rating={1200}/>
    </div>
  );
}

export default withStyles(styles)(GameController);