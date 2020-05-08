//login state types to enforce type-checking in reducer defined in same file
export type loginStateType = {
    errorMessage: string | null;
    errorField: string | null;
    loginLoading: boolean;
    signupLoading: boolean;
};
  
export type GetState = () => loginStateType;
  
  