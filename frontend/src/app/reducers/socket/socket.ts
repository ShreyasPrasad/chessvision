import { AnyAction } from 'redux';
import { 
    SOCKET_CONNECTING, 
    SOCKET_OPENED, 
    SOCKET_MESSAGED,
    SOCKET_CLOSED, 
    SOCKET_ERROR
} from '../../actions/socket/socket';
import { socketStateType } from '../socket/types'

const defaultSocketState = {}

const defaultSingleSocketState = {
    loading: false,
    connected: false,
    error: false,
    message: null,
}

export default function socket(state: socketStateType = defaultSocketState, action: AnyAction) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SOCKET_CONNECTING:
        newState[action.name] = defaultSingleSocketState;
        newState.loading = true;
      return newState;
    case SOCKET_OPENED:
        newState[action.name].loading = false;
        newState[action.name].connected = true;
        return newState;
    case SOCKET_MESSAGED:
        //indicate most recent message from socket in question
        newState[action.name].message = action.message;
        return newState;
    case SOCKET_CLOSED:
        //remove socket, so that socket state only corresponds to active socket connections
        delete newState[action.name];
        return newState;
    case SOCKET_ERROR:
        newState[action.name].error=action.payload;
        newState[action.name].loading = false;
        return newState;
    default:
      return newState;
  }
}
