import { appStateType } from '../../reducers/combinedType';
import  { Dispatch }  from '../../reducers/combinedType';
import axios from 'axios'

//allow cross origin credentials
axios.defaults.withCredentials=true;

export const SET_FIELD = 'SET_FIELD';
export const SET_AUTH_STATE = 'SET_AUTH_STATE';

export const SET_USER_PROPERTIES = 'SET_USER_PROPERTIES';
export const LOGOUT_USER = 'LOGOUT_USER';

export const setUserProperties = (username: string, email: string) => ({type: SET_USER_PROPERTIES, username, email})
export const setUserLogoutProperties = () => ({type: LOGOUT_USER})

export const setField = (fieldName: string, payload: string) => ({ type: SET_FIELD, fieldName, payload });

export const setAuthState = (payload: number) => ({
    type: SET_AUTH_STATE, 
    payload
})

//constants for user auth state

export const USER_AUTHENTICATING = 0;
export const USER_NOT_AUTHENTICATED = 1;
export const USER_AUTHENTICATED = 2;

export const getCSRFCokie = (url: string) =>{
    return axios.get(url+"/accounts/csrf")
}

export const authUserWithCSRF = () => (dispatch: Dispatch, getState: () => appStateType, utils: any) => {
    getCSRFCokie(utils.api).then(res=> {
        axios.defaults.headers.common['X-CSRFToken']=res.data.csrfToken;
        dispatch(authUser())
    })
}

export const authUser = () => (dispatch: Dispatch, getState: () => appStateType, utils: any) => {
    axios.get(utils.api+"/accounts/auth").then((res) => {
        //populate attributes of user store
        dispatch(setUserProperties(res.data.username, res.data.email));
    }).catch((err) =>
        dispatch(setAuthState(USER_NOT_AUTHENTICATED)))
}

export const logoutUser = () => (dispatch: Dispatch, getState: () => appStateType, utils: any) => {
    axios.get(utils.api+"/accounts/logout").then((res) => {
        dispatch(setUserLogoutProperties())
        dispatch(authUserWithCSRF())
    }).catch((err)=>console.log(err))
}