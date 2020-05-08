import React from 'react';

//chess based libraries
import ChessBoard from "react-chessboardjs-wrapper";
import Chess from "chess.js";

//piece styling for game board (can be easily customized)

const pieceTheme = (piece) => {
    //load piece images using webpack
    const requireContext = require.context("../../../../static/images/chesspieces", true, /^\.\/.*\.png$/);
    requireContext.keys().map(requireContext);
    // wikipedia theme for white pieces
    return 'images/' + piece + '.png'
}

//initialize chess.js game to handle move validation and determine game state
const game = new Chess();

export default function Board() {

  //board object (initalized from chessboard.js)
  let board= {};

  //game logic specific functions as leveraged by chess.js

  const onDragStart = (source, piece, position, orientation) => {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false
  
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }
  
  const onDrop = (source, target) => {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
  
    // illegal move
    if (move === null) return 'snapback'
  }
  
  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  const onSnapEnd = () => {
    board.position(game.fen())
  }

  //customizable game configuration (fairly self-explanatory fields)

  const config = {
    position: "start",
    orientation: "black",
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
      width="80%" // string (%) || number (px)
    />
  );
}
