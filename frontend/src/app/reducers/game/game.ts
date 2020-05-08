import { AnyAction } from 'redux';
import { APPLY_MOVE } from '../../actions/game/game';
import { gameStateType } from '../game/types'

const defaultState = {
  gameMoves: []
}

export default function game(state: gameStateType = defaultState, action: AnyAction) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case APPLY_MOVE:
      newState.gameMoves.push(action.payload);
      return newState;
    default:
      return newState;
  }
}
