import { Dispatch as ReduxDispatch, Store as ReduxStore, AnyAction } from 'redux';

//import individual reducer type representations
import { gameStateType } from './game/types';
import { loginStateType } from './login/types';
import { userStateType } from './user/types'
import {matchStateType} from './match/types'
import { socketStateType } from './socket/types';

export type appStateType = { 
    game: gameStateType; //reducer to handle the state of an active game,
    login: loginStateType; //reducer to handle login and account signup auth flow
    user: userStateType; //reducer to handle state of active user
    match: matchStateType; //reducer to handle state of match finding functionality
    socket: socketStateType //reducer to handle all socket interactions introduced by application
};

export type Dispatch = ReduxDispatch<AnyAction>;

export type Store = ReduxStore<appStateType, AnyAction>;