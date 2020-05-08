import { appStateType } from '../../reducers/combinedType';
import  { Dispatch }  from '../../reducers/combinedType';
import axios from 'axios'
import { batch } from 'react-redux'

export const SET_FIELD = 'SET_FIELD';
export const SET_AUTH_STATE = 'SET_AUTH_STATE';

export const setField = (fieldName: string, payload: string) => ({ type: SET_FIELD, fieldName, payload });

export const setAuthState = (payload: number) => ({
    type: SET_AUTH_STATE, 
    payload
})

//constants for user auth state

export const USER_AUTHENTICATING = 0;
export const USER_NOT_AUTHENTICATED = 1;
export const USER_AUTHENTICATED = 2;

export const authUser = () => (dispatch: Dispatch, getState: () => appStateType, utils: any) => {
    axios.get(utils.api+"/auth").then((res) =>
        batch(()=> {
            //populate attributes of user store
            dispatch(setField('username', res.data.user.username)),
            dispatch(setField('email', res.data.user.email)),
            dispatch(setAuthState(USER_AUTHENTICATED))
        })      
    ).catch(() =>
        dispatch(setAuthState(USER_NOT_AUTHENTICATED)))
}