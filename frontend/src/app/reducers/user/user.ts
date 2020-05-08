import { AnyAction } from 'redux';
import { SET_FIELD, SET_AUTH_STATE, USER_AUTHENTICATING } from '../../actions/user/user';
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
      newState['authState']=action.payload;
      return newState
    default:
      return newState;
  }
}
