import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import GameController from '../components/screens/dashboard/game-controller/game-controller';
import { applyMove } from '../actions/game/game';
import { appStateType } from '../reducers/combinedType';
import {initiateConnection} from '../actions/socket/connect';

/* ========== ~~~~~~~~~~ GamePage: PARENT ~~~~~~~~~~ ========== */
// CONTAINER COMPONENT
// interacts with react-redux (application store)
// infuses child component (imported above) with state & actions by mapping to the component's props

function mapStateToProps({game, match, user} : appStateType) {
  return {
    gameMoves: game.gameMoves,
    activeGameID: game.activeGameID,
    gameState: game.gameState,
    username: user.username,
    opponent: game.opponent,
    gameColor: game.gameColor,
    selectedPieces: match.selectedPieces
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      applyMove, 
      initiateConnection
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GameController);
