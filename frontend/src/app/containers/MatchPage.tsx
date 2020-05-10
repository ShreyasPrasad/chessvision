import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MatchController from '../components/screens/dashboard/match-controller/match-controller';
import { selectPiece, removePiece } from '../actions/match/match';
import { appStateType } from '../reducers/combinedType';
import {initiateConnection} from '../actions/socket/connect';

/* ========== ~~~~~~~~~~ MatchPage: PARENT ~~~~~~~~~~ ========== */
// CONTAINER COMPONENT
// interacts with react-redux (application store)
// infuses child component (imported above) with state & actions by mapping to the component's props

function mapStateToProps({user, game, match, socket} : appStateType) {
  return {
    username: user.username,
    activeGameID: game.activeGameID,
    loading: Boolean(socket['match'] || socket['game']),
    selectedPieces: match.selectedPieces
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      selectPiece,
      removePiece,
      initiateConnection
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchController);
