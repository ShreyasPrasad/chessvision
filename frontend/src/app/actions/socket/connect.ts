import { 
    socketConnecting, 
    socketOpening, 
    socketError,
    socketClosed, 
    socketMessaged
} from './socket'

import { Dispatch } from '../../reducers/combinedType'
import { AnyObj } from 'app/utils/extraTypes';

const socketInstances = {

}

export const initiateConnection = (name: string, uri: string) => (dispatch: Dispatch) => {
    if (!('WebSocket' in window)) {
        dispatch(socketError('WebSocket is not supported by your browser'));
        return;
    }
    const socket = new WebSocket(uri);
    
    dispatch(socketConnecting(name));

    socket.onopen = () => dispatch(socketOpening( name ));
    socket.onerror = (evt) => dispatch(socketError(name, evt));
    socket.onmessage = evt => dispatch(socketMessaged(name, JSON.parse(evt.data)));
    socket.onclose = () => dispatch(socketClosed(name));

    socketInstances[name]=socket;
};

export const sendMessage = (name: string, message: AnyObj) => {
    if (socketInstances[name]!==null){
        socketInstances[name].send(JSON.stringify(message));
    }
}