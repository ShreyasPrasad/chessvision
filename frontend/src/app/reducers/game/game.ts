import { AnyAction } from 'redux';
import { APPLY_MOVE, NO_GAME, GAME_ACTIVE } from '../../actions/game/game';
import { gameStateType } from '../game/types'
import { SOCKET_MESSAGED } from 'app/actions/socket/socket';
import { AnyObj } from 'app/utils/extraTypes';

const defaultState = {
  gameMoves: [],
  activeGameID: null,
  gameColor: null,
  gameState: NO_GAME,
  opponent: null
}

const processGameSocketMessage = (message: AnyObj, newState: gameStateType) => {
    if (message.type === 'gameData'){
      newState.opponent = message.opponent;
      newState.activeGameID = message.activeGameID;
      newState.gameState=message.gameState;
      if (message['gameMoves']){
        newState.gameMoves=message.gameMoves;
      }
    } else if (message.type === 'gameMove'){
      newState.gameMoves.push(message.move);
      newState.gameState = message.gameState;
    }
    return newState;
} 

const processMatchSocketMessage = (message: AnyObj, newState: gameStateType) => {
  if (message.type==='gameFound'){
    newState.activeGameID=message.activeGameID;
    newState.gameColor=message.gameColor;
    newState.opponent=message.opponent;
    newState.gameState=GAME_ACTIVE;
  }
  return newState;
}

export default function game(state: gameStateType = defaultState, action: AnyAction) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case APPLY_MOVE:
      newState.gameMoves.push(action.payload);
      return newState;
    case SOCKET_MESSAGED: 
      console.log(action)
      if (action.name === 'game'){
         newState = processGameSocketMessage(action.message, newState);
      } else if (action.name==='match'){
         newState = processMatchSocketMessage(action.message, newState);
      }
      console.log(newState)
      return newState;
    default:
      return newState;
  }
}
