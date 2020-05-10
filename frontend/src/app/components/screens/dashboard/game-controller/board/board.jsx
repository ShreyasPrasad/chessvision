import React, { useEffect, useState } from 'react';

//chess based libraries
import ChessBoard from "react-chessboardjs-wrapper";
import Chess from "chess.js";
import { GAME_ACTIVE, BLACK, WHITE } from 'app/actions/game/game';


//initialize chess.js game to handle move validation, along with with persistent board
const game = new Chess();
//board object (initalized from chessboard.js)
let board = {}

export default function Board(props) {

  let [fen, setFen] = useState(null);
  //set opponents moves when they are received
  useEffect(()=>{
    if (props.gameMoves.length > game.history().length){
      game.move(props.gameMoves[props.gameMoves.length-1]);
      setFen(game.fen())
    }
  }, [props.gameMoves])

  //piece styling for game board (can be easily customized)

  const pieceTheme = (piece) => {
    //load piece images using webpack
    const requireContext = require.context("../../../../../static/images/chesspieces", true, /^\.\/.*\.png$/);
    requireContext.keys().map(requireContext);
    // wikipedia theme for white pieces
    if (props.selectedPieces.includes(piece)){
      return null; //hide pieces selected by the user
    } else {
      return 'images/' + piece + '.png';;
    }
  }

  //game logic specific functions as leveraged by chess.js

  const onDragStart = (source, piece, position, orientation) => {
    // do not pick up pieces if the game is over
    if (props.gameState!==GAME_ACTIVE) return false
    console.log(game.turn())
    // only pick up pieces for the side to move
    if ((game.turn() !== props.gameColor) ||
        (props.gameColor === BLACK && piece.search(/^w/) !== -1) ||
        (props.gameColor === WHITE && piece.search(/^b/) !== -1)) {
      return false
    }
  }
  
  const onDrop = (source, target) => {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for the timebeing
    })
  
    // illegal move
    if (move === null) {
      return 'snapback' 
    }
  }
  
  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  const onSnapEnd = () => {
    setFen(game.fen())
    //signal valid move to opponent
    const gameHistory = game.history();
    props.applyMove(gameHistory[gameHistory.length-1]);
  }

  //customizable game configuration (fairly self-explanatory fields)

  const config = {
    position: fen || "start",
    orientation: props.gameColor==BLACK ? "black" : "white",
    pieceTheme: pieceTheme,
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  }
  
  return (
      <ChessBoard
      animate // boolean, chessboard.js piece animations
      blackSquareColour="steelblue" // or hex
      border="10px solid #d3d3d3" // css border property
      config={config} // The chessboard.js config object
      onInitBoard={(_board, _boardId) => board=_board} // callback fn, gets passed the chessboard.js board object, and the unique id
      resize // effective if width prop is a string
      whiteSquareColour="aliceblue" // or hex
      width="400px" // string (%) || number (px)
    />
  );
}
