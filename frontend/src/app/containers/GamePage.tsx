import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Game from '../components/screens/game/game';
import { applyMove } from '../actions/game/game';
import { appStateType } from '../reducers/combinedType';
import InitiateConnection from '../actions/socket/connect';

/* ========== ~~~~~~~~~~ GamePage: PARENT ~~~~~~~~~~ ========== */
// CONTAINER COMPONENT
// interacts with react-redux (application store)
// infuses child component (imported above) with state & actions by mapping to the component's props

function mapStateToProps({game} : appStateType) {
  return {
    gameMoves: game.gameMoves
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      applyMove,
      initiateConnection: InitiateConnection
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
