import { AnyAction } from 'redux';
import { SET_FIELD, SET_AUTH_STATE, SET_USER_PROPERTIES, LOGOUT_USER, 
  USER_AUTHENTICATING, USER_AUTHENTICATED, USER_NOT_AUTHENTICATED } from '../../actions/user/user';
import { userStateType } from '../user/types'

const defaultState = {
  username: null,
  email: null,
  authState: USER_AUTHENTICATING
}

export default function user(state: userStateType = defaultState, action: AnyAction) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SET_FIELD:
      newState[action.fieldName] = action.payload;
      return newState;
    case SET_AUTH_STATE:
      newState.authState=action.payload;
      return newState
    case SET_USER_PROPERTIES:
      newState.username = action.username;
      newState.email = action.email;
      newState.authState=USER_AUTHENTICATED;
      return newState;
    case LOGOUT_USER:
      newState.username=null;
      newState.email=null;
      newState.authState=USER_NOT_AUTHENTICATED;
      return newState;
    default:
      return newState;
  }
}
