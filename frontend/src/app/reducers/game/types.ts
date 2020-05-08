//game state types to enforce type-checking in reducer defined in same file
export type gameStateType = {
  gameMoves: string[];
};

export type GetState = () => gameStateType;

