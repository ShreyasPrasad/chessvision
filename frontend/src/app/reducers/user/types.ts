//user state types to enforce type-checking in reducer defined in same file
export type userStateType = {
    username: string | null;
    email: string | null;
    authState: number;
};
  
export type GetState = () => userStateType;
  
  