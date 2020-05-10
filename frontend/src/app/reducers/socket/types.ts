//socket state types to enforce type-checking in reducer defined in same file
export type singleSocketStateType = {
    loading: boolean,
    connected: boolean,
    instance: any,
    error: false | string,
    message: any,
};

export type socketStateType = {
    [key: string]: singleSocketStateType
}
  
export type GetState = () => socketStateType;
  
  