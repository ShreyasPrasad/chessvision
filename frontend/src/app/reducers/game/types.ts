//game state types to enforce type-checking in reducer defined in same file
export type gameStateType = {
  gameMoves: string[];
  gameState: any;
  activeGameID: null | string;
  gameColor: null | number;
  opponent: null | GameOpponent
};

export type GameOpponent = {
  name: string;
  rating: string;
}

export type GetState = () => gameStateType;

