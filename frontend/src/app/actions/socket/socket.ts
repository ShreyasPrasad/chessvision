
//the following actions represent various states of facilitating a websocket connection

export const SOCKET_CONNECTING = 'SOCKET_CONNECTING';
export const SOCKET_OPENED = 'SOCKET_OPENED';
export const SOCKET_MESSAGED = 'SOCKET_MESSAGED';
export const SOCKET_ERROR = 'SOCKET_ERROR';
export const SOCKET_CLOSED = 'SOCKET_CLOSED';

//actions creators for socket actions defined above 

export const socketConnecting = (name: string) => ({
    type: SOCKET_CONNECTING,
    name
})

export const socketOpening = (name: string) => ({
    type: SOCKET_OPENED,
    name
})

export const socketMessaged = (name: string, message: any) => ({
    type: SOCKET_MESSAGED,
    name,
    message
})

export const socketError = (name: string, payload: any) => ({
    type: SOCKET_ERROR,
    name,
    payload
})

export const socketClosed = (name: string) => ({
    type: SOCKET_CLOSED,
    name
})
