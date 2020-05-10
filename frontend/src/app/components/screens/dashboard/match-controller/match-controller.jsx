import React, { useEffect } from 'react';
import styles from './match-controller-styles.js';
import withStyles from 'react-jss';
import Button from '@material-ui/core/Button';

//imported constants for piece selection
import {BLACK, WHITE, BISHOP, KNIGHT, KING, PAWN, ROOK, QUEEN} from "../../../../actions/game/game";

function MatchController(props) {

  const submitMatchRequest = () => {
    // inititate match websocket connection
    props.initiateConnection('match', 'ws://127.0.0.1:8000/ws/match')
  }

  const selectPieceImage = (colour, type) => {
    //save piece selection to redux
    if (props.selectedPieces.includes(`${colour}${type}`)){
        props.removePiece(`${colour}${type}`);
    } else {
        props.selectPiece(`${colour}${type}`);
    }
  }

  const getPieceSelectionClassName = (colour, type) => {
      let pieceSelectionClassName="pieceSelection"
      if (props.selectedPieces.includes(`${colour}${type}`)){
          pieceSelectionClassName+=" selected"
      }
      return pieceSelectionClassName;
  }

  const generatePieceSelectionImages = () => {
      //white pieces
    const whitePieceSelectionImages = <div className="whitePieceSelections">
        <a className={getPieceSelectionClassName(WHITE, ROOK)} onClick={()=>selectPieceImage(WHITE, ROOK)}> <i className="fas fa-chess-rook piece-white"/></a>
        <a className={getPieceSelectionClassName(WHITE, KNIGHT)} onClick={()=>selectPieceImage(WHITE, KNIGHT)}> <i className="fas fa-chess-knight piece-white"/></a>
        <a className={getPieceSelectionClassName(WHITE, BISHOP)} onClick={()=>selectPieceImage(WHITE,  BISHOP)}> <i className="fas fa-chess-bishop piece-white"/></a>
        <a className={getPieceSelectionClassName(WHITE, PAWN)} onClick={()=>selectPieceImage(WHITE, PAWN)}> <i className="fas fa-chess-pawn piece-white"/></a>
        <a className={getPieceSelectionClassName(WHITE, QUEEN)} onClick={()=>selectPieceImage(WHITE, QUEEN)}> <i className="fas fa-chess-queen piece-white"/></a>
        <a className={getPieceSelectionClassName(WHITE, KING)} onClick={()=>selectPieceImage(WHITE, KING)}> <i className="fas fa-chess-king piece-white"/></a>
      </div>
      //black pieces
    const blackPieceSelectionImages = <div className="blackPieceSelections">
        <a className={getPieceSelectionClassName(BLACK, ROOK)} onClick={()=>selectPieceImage(BLACK, ROOK)}> <i className="fas fa-chess-rook"/></a>
        <a className={getPieceSelectionClassName(BLACK, KNIGHT)} onClick={()=>selectPieceImage(BLACK, KNIGHT)}> <i className="fas fa-chess-knight"/></a>
        <a className={getPieceSelectionClassName(BLACK, BISHOP)} onClick={()=>selectPieceImage(BLACK, BISHOP)}> <i className="fas fa-chess-bishop"/></a>
        <a className={getPieceSelectionClassName(BLACK, PAWN)} onClick={()=>selectPieceImage(BLACK, PAWN)}> <i className="fas fa-chess-pawn"/></a>
        <a className={getPieceSelectionClassName(BLACK, QUEEN)} onClick={()=>selectPieceImage(BLACK, QUEEN)}> <i className="fas fa-chess-queen"/></a>
        <a className={getPieceSelectionClassName(BLACK, KING)} onClick={()=>selectPieceImage(BLACK, KING)}> <i className="fas fa-chess-king"/></a>
    </div>
      return <div className="matchPieceSelector">
          {whitePieceSelectionImages}
          {blackPieceSelectionImages}
      </div>
  }

  return (
    <div className={`${props.classes.matchController } matchController`}>
      <div className="findMatchTitle">
        <h2>Find a Match</h2>
      </div>
      {generatePieceSelectionImages()}
      <div className="findMatchButtonContainer">
        <Button color="inherit" variant="contained" onClick={submitMatchRequest} className="findMatchButton" disabled={props.loading}>Find Match</Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(MatchController);