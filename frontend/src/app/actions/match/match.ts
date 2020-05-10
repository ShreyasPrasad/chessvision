
export const REMOVE_PIECE = 'REMOVE_PIECE';
export const SELECT_PIECE = 'SELECT_PIECE';

export const removePiece = (payload: string) => ({ type: REMOVE_PIECE, payload });

export const selectPiece = (payload: string) => ({type: SELECT_PIECE, payload})