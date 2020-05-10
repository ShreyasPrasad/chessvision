export const APPLY_MOVE = 'APPLY_MOVE';

export const applyMove = (payload: string) => ({ type: APPLY_MOVE, payload });

//useful game state constants
//colour type
export const BLACK = 'b';
export const WHITE = 'w'; 

export const BISHOP = 'B';
export const KNIGHT = 'N';
export const ROOK = 'R';
export const PAWN = 'P';
export const KING = 'K';
export const QUEEN = 'Q';

//game state type
export const NO_GAME = 0;
export const GAME_ACTIVE = 1;
export const BLACK_WON = 'b';
export const WHITE_WON = 'w';
export const GAME_DRAW = 2;