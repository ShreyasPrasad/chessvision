//match state types to enforce type-checking in reducer defined in same file
export type matchStateType = {
    selectedPieces: string[];
  };
  
  export type GetState = () => matchStateType;
  