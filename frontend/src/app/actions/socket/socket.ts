
//the following actions represent various states of facilitating a websocket connection

export const SOCKET_CONNECTING = 'SOCKET_CONNECTING';
export const SOCKET_OPENED = 'SOCKET_OPENED';
export const SOCKET_MESSAGED = 'SOCKET_MESSAGED';
export const SOCKET_ERROR = 'SOCKET_ERROR';
export const SOCKET_CLOSED = 'SOCKET_CLOSED';

//actions creators for socket actions defined above 

export const socketConnecting = () => ({
    type: SOCKET_CONNECTING,
})

export const socketOpening = (payload: any) => ({
    type: SOCKET_OPENED,
    payload
})

export const socketMessaged = (payload: any) => ({
    type: SOCKET_MESSAGED,
    payload
})

export const socketError = (payload: any) => ({
    type: SOCKET_ERROR,
    payload
})

export const socketClosed = () => ({
    type: SOCKET_CLOSED
})
