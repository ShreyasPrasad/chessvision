//socket state types to enforce type-checking in reducer defined in same file
export type socketStateType = {
    loading: boolean,
    connected: boolean,
    instance: any,
    error: any,
    message: any,
};
  
export type GetState = () => socketStateType;
  
  