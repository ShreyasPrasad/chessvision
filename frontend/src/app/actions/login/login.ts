import { appStateType } from '../../reducers/combinedType';
import  { Dispatch }  from '../../reducers/combinedType';
import axios from 'axios'

export const SET_LOADING_STATE = 'SET_LOADING_STATE';

export const SET_ERROR_STATE = 'SET_ERROR_STATE';

export const setLoadingState = (fieldName: string, payload: boolean) => ({ type: SET_LOADING_STATE, fieldName, payload });

export const setErrorState = (errorField: string, message: string) => ({ type: SET_ERROR_STATE, errorField, message });

export const processLogin = (username: string, password: string) => (dispatch: Dispatch, getState: () => appStateType, utils: any) => {
    const loginData = {
        username,
        password
    }
    dispatch(setLoadingState('loginLoading', true))
    axios.post(utils.api+"/login", loginData).then((res)=>{
        console.log(res)
        dispatch(setLoadingState('loginLoading', false))
    }).catch((err)=>{
        if (err.status==401){
            dispatch(setErrorState("login", "Invalid credentials provided."))
        } else {
            dispatch(setErrorState("login", "We were unable to log you in at this time. Please try again later."))
        }
        dispatch(setLoadingState('loginLoading', false))
    })
}

export const createAccount = (username: string, email: string, password: string) => (dispatch: Dispatch, getState: () => appStateType, utils: any) => {
    const createAccountData = {
        username,
        password,
        email
    }
    dispatch(setLoadingState('signupLoading', true));
    axios.post(utils.api+"/create", createAccountData).then((res)=>{
        console.log(res);
        dispatch(setLoadingState('signupLoading', false));
    }).catch((err)=>{
        console.log(err);
        dispatch(setLoadingState('signupLoading', false));
    })
}