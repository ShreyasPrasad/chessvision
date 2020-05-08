import { Dispatch as ReduxDispatch, Store as ReduxStore, AnyAction } from 'redux';

//import individual reducer type representations
import { gameStateType } from './game/types';
import { loginStateType } from './login/types';
import { userStateType } from './user/types'

export type appStateType = { 
    game: gameStateType; //reducer to handle the state of an active game,
    login: loginStateType; //reducer to handle login and account signup auth flow
    user: userStateType; //reducer to handle state of active user
};

export type Dispatch = ReduxDispatch<AnyAction>;

export type Store = ReduxStore<appStateType, AnyAction>;