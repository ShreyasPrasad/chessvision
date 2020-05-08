import { AnyAction } from 'redux';
import { SET_LOADING_STATE, SET_ERROR_STATE } from '../../actions/login/login';
import { loginStateType } from '../login/types'

const defaultState = {
  errorMessage: null, 
  errorField: null,
  loginLoading: false,
  signupLoading: false
}

export default function game(state: loginStateType = defaultState, action: AnyAction) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_LOADING_STATE:
      newState[action.fieldName] = action.payload
      return newState;
    case SET_ERROR_STATE:
      newState.errorField=action.errorField;
      newState.errorMessage=action.message;
    default:
      return newState;
  }
}
