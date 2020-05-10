import { AnyAction } from 'redux';
import { SELECT_PIECE, REMOVE_PIECE } from '../../actions/match/match';
import { matchStateType } from '../match/types'

const defaultState = {
  selectedPieces: []
}

export default function match(state: matchStateType = defaultState, action: AnyAction) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case SELECT_PIECE:
      newState.selectedPieces.push(action.payload);
      return newState;
    case REMOVE_PIECE:
      newState.selectedPieces = newState.selectedPieces.filter((piece: string)=>piece!=action.payload);
      return newState;
    //later add support for loading selected pieces on page reload (likely involves listening to another socket message)
    default:
      return newState;
  }
}
