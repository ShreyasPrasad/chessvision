import { AnyAction } from 'redux';
import { 
    SOCKET_CONNECTING, 
    SOCKET_OPENED, 
    SOCKET_MESSAGED,
    SOCKET_CLOSED, 
    SOCKET_ERROR
} from '../../actions/socket/socket';
import { socketStateType } from '../socket/types'

const defaultState = {
    instance: null,
    loading: false,
    connected: false,
    error: false,
    message: null,
}

export default function game(state: socketStateType = defaultState, action: AnyAction) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SOCKET_CONNECTING:
        newState.loading = true;
      return newState;
    case SOCKET_OPENED:
        newState.loading = false;
        newState.connected = true;
        newState.instance=action.payload;
        return newState;
    case SOCKET_MESSAGED:
        return newState;
    case SOCKET_CLOSED:
        return newState;
    case SOCKET_ERROR:
        newState.error=action.payload;
        newState.loading = false;
        return newState;
    default:
      return newState;
  }
}
