import { 
    socketConnecting, 
    socketOpening, 
    socketError,
    socketClosed, 
    socketMessaged
} from './socket'

import { Dispatch } from '../../reducers/combinedType'

export default (uri: string) => (dispatch: Dispatch) => {
    if (!('WebSocket' in window)) {
        dispatch(socketError({ error: 'WebSocket is not supported by your browser' }));
        return;
    }

    const socket = new WebSocket(uri);
    dispatch(socketConnecting());

    socket.onopen = () => dispatch(socketOpening({ instance: socket }));
    socket.onerror = () => dispatch(socketError({ error: true }));
    socket.onmessage = evt => dispatch(socketMessaged(JSON.parse(evt.data)));
    socket.onclose = () => dispatch(socketClosed());
};